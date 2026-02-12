import React, { useEffect, useState } from "react";
import PlaygroundHeader from "../_components/PlaygroundHeader";
import ChatSection from "../_components/ChatSection";
import WebsiteDesign from "../_components/WebsiteDesign";
import ElementSettingSection from "../_components/ElementSettingSection";
import { useParams, useSearchParams } from "next/navigation";
import axios from "axios";

type Props = {};

export type Frame = {
  projectId: string;
  frameId: string;
  designCode: string;
  chatMessages: Messages[];
};

export type Messages = {
  role: string;
  content: string;
};

const Prompt = `userInput: {userInput}
Based on the user input, generate a complete HTML Tailwind CSS code using Flowbite UI componentes.
Use a modern design with blue as the primary color theme. Do not add HTML head or title tag, just body make it fulll responsive.
Requirements:
- All primary components must match the theme color.
- Add proper padding and margin for each element.
- Components should not be connected to one onther; each element should be independent
- Design must be fully responsive for all screen sizes.
- Use placeholders for all images for light mode: 
https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg and for dark mode use:
https://www.cibaky.com/wp-content/uploads/2015/12/placeholder-3.jpg
For image, add alt tag with image prompt for that image
- Do no include broken links
- Library already install so do not installed or add in script
- Header menu options should be spread out and not connected.
use the following component where appropriate:
- fa fa icons
- **Flowbite** for UI copmonents like buttons, modals, forms, tables, tabs and alerts, cards, dialog, dropdown, etc
- Chart.js for charts & graphs
- Swiper.js for sliders/carousels
- tooltip & Popover library (Tippy.js)

Additional requirements:
- Ensure proper spacing, aligment, and hierarchy for all elements.
- Include interactive components like modals, dropdowns, and accordions where suitable.
- Ensure charts are visually appealing and match the theme color.
- Do not add any extra text before or after the HTML code.
- Output a complete, ready-to-use HTML page. Do not give any raw text before start and end pont the ai response

`;

const Playground = (props: Props) => {
  const { projectId } = useParams();
  const params = useSearchParams();
  const frameId = params.get("frameId");
  const [frameDetail, setFrameDetail] = useState<Frame | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Messages[]>([]);
  const [generatedCode, setGeneratedCode] = useState<string>("");

  useEffect(() => {
    if (frameId) GetFrameDetails();
  }, [frameId]);

  const GetFrameDetails = async () => {
    const result = await axios.get(
      "/api/frames?frameId=" + frameId + "&projectId=" + projectId,
    );
    console.log(result.data);
    setFrameDetail(result.data);
  };

  const SendMessage = async (message: string) => {
    setLoading(true);

    // Add user message to chat
    setMessages((prev) => [...prev, { role: "user", content: message }]);

    const result = await fetch("/api/ai-model", {
      method: "POST",
      body: JSON.stringify({
        messages: [
          ...messages,
          { role: "user", content: Prompt?.replace("{userInput}", message) },
        ],
      }),
    });

    const header = result.body?.getReader();
    const decorder = new TextDecoder();

    let aiResponse = "";
    let isCode = false;

    while (true) {
      const { done, value } = await header!.read();
      if (done) break;

      const chunk = decorder.decode(value, { stream: true });
      aiResponse += chunk;

      // Check if AI Start sending Code
      if (!isCode && aiResponse.includes("```html")) {
        isCode = true;
        const index = aiResponse.indexOf("```html") + 7;
        const initialCodeChunk = aiResponse.slice(index);
        setGeneratedCode((prev) => prev + initialCodeChunk);
      } else if (isCode) {
        setGeneratedCode((prev) => prev + chunk);
      }
    }
    // After Streaming End
    if (!isCode) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: aiResponse },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Your code is ready!" },
      ]);
    }
    setLoading(false);
  };

  return (
    <div>
      <PlaygroundHeader />

      <div className="flex">
        {/* ChatSection */}
        <ChatSection
          messages={messages ?? []}
          onSend={SendMessage}
          loading={loading}
        />

        {/* WebsiteDesign */}
        <WebsiteDesign />

        {/* Setting section */}
        <ElementSettingSection />
      </div>
    </div>
  );
};

export default Playground;
