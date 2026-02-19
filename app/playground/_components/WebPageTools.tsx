import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Code2Icon,
  Download,
  Monitor,
  SquareArrowOutUpRight,
  TabletSmartphone,
} from "lucide-react";
import ViewCodeBlock from "./ViewCodeBlock";

type Props = {
  selectedScreenSize: "web" | "mobile";
  setSelectedScreenSize: React.Dispatch<React.SetStateAction<"web" | "mobile">>;
  generatedCode: string;
};

const HTML_CODE = `
      <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta name="description" content="AI Website Builder - Modern TailwindCSS + Flowbite Template">
              <title>AI Website Builder</title>

              <!-- Tailwind CSS -->
              <script src="https://cdn.tailwindcss.com"></script>

              <!-- Flowbite CSS & JS -->
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css" />
              <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>

            <!-- Font Awesome Icons -->
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />

            <!-- Chart.js for charts & graphs -->
            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

            <!-- ADS (Animate On Scroll) for croll animations -->
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css" />
            <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>

            <!-- GSAP (GreenSock) for advanced animations -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

            <!-- Lottie for JSON-based animations -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.11.2/lottie.min.js"></script>

            <!-- Swiper.js for sliders/carousels -->
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css" />
            <script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js"></script>

            <!-- Optional: Tooltip & Popover library (Tippy.js) -->
            <link rel="stylesheet" href="https://unpkg.com/tippy.js@6/dist/tippy.css" />
            <script src="https://unpkg.com/@popperjs/core@2"></script>
            <script src="https://unpkg.com/tippy.js@6"></script>
          </head>
            {code}
          </html>
    `;

const WebPageTools = ({
  selectedScreenSize,
  setSelectedScreenSize,
  generatedCode,
}: Props) => {
  const [finalCode, setFinalCode] = useState<string>("");

  useEffect(() => {
    if (!generatedCode) return;

    const cleanCode = (HTML_CODE.replace("{code}", generatedCode) || "")
      .replaceAll("```html", "")
      .replaceAll("```", "")
      .replace("html", "");

    setFinalCode(cleanCode);
  }, [generatedCode]);

  const ViewInNewTab = () => {
    if (!finalCode) return;

    const blob = new Blob([finalCode ?? ""], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    window.open(url, "_blank");
  };

  return (
    <div className="p-2 shadow rounded-xl w-full">
      <div className="flex gap-2">
        <Button
          variant={"ghost"}
          className={`${selectedScreenSize === "web" ? "border border-primary" : ""}`}
          onClick={() => setSelectedScreenSize("web")}
        >
          <Monitor />
        </Button>
        <Button
          variant={"ghost"}
          className={`${selectedScreenSize === "mobile" ? "border border-primary" : ""}`}
          onClick={() => setSelectedScreenSize("mobile")}
        >
          <TabletSmartphone />
        </Button>
      </div>
      <div className="flex gap-2">
        <Button variant={"outline"} onClick={() => ViewInNewTab()}>
          View <SquareArrowOutUpRight />
        </Button>
        <ViewCodeBlock code={finalCode}>
          <Button>
            Code <Code2Icon />
          </Button>
        </ViewCodeBlock>
        <Button>
          Download <Download />
        </Button>
      </div>
    </div>
  );
};

export default WebPageTools;
