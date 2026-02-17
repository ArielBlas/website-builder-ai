import React from "react";
import { Button } from "@/components/ui/button";
import { Monitor, TabletSmartphone } from "lucide-react";

type Props = {
  selectedScreenSize: "web" | "mobile";
  setSelectedScreenSize: React.Dispatch<React.SetStateAction<"web" | "mobile">>;
};

const WebPageTools = ({ selectedScreenSize, setSelectedScreenSize }: Props) => {
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
    </div>
  );
};

export default WebPageTools;
