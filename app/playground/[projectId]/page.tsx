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
        messages: [...messages, { role: "user", content: message }],
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
        <ChatSection messages={messages ?? []} onSend={SendMessage} />

        {/* WebsiteDesign */}
        <WebsiteDesign />

        {/* Setting section */}
        <ElementSettingSection />
      </div>
    </div>
  );
};

export default Playground;
