import { SwatchBook } from "lucide-react";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  selectedEl: HTMLElement | null;
  clearSelection: () => void;
};

const ElementSettingSection = ({ selectedEl, clearSelection }: Props) => {
  return (
    <div className="w-96 shadow p-4">
      <h2 className="flex gap-2 items-center font-bold">
        <SwatchBook /> Settings
      </h2>

      <label className="text-sm">Font Size</label>

      <Select defaultValue={selectedEl?.style?.fontSize || "24px"}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Size" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {[...Array(53)].map((item, index) => (
              <SelectItem value={index + 12 + "px"} key={index}>
                {index + 12}px
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ElementSettingSection;
