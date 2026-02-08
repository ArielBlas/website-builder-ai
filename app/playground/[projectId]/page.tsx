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

  const SendMessage = async (message: string) => {};

  return (
    <div>
      <PlaygroundHeader />

      <div className="flex">
        {/* ChatSection */}
        <ChatSection
          messages={frameDetail?.chatMessages ?? []}
          onSend={SendMessage}
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
