import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

type Props = {};

const PlaygroundHeader = (props: Props) => {
  return (
    <div className="flex justify-between items-center p-4 shadow">
      <Image src="/logo.png" alt="Logo" width={40} height={40} />
      <Button>Save</Button>
    </div>
  );
};

export default PlaygroundHeader;
