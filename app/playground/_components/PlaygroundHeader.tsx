import { Button } from "@/components/ui/button";
import { OnSaveContext } from "@/context/OnSaveContext";
import Image from "next/image";
import React, { useContext } from "react";

type Props = {};

const PlaygroundHeader = (props: Props) => {
  const { onSaveData, setOnSaveData } = useContext(OnSaveContext);
  return (
    <div className="flex justify-between items-center p-4 shadow">
      <Image src="/logo.png" alt="Logo" width={40} height={40} />
      <Button onClick={() => setOnSaveData(Date.now())}>Save</Button>
    </div>
  );
};

export default PlaygroundHeader;
