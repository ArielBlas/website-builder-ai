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
  const applyStyle = (property: string, value: string) => {
    if (selectedEl) {
      selectedEl.style[property as any] = value;
    }
  };
  return (
    <div className="w-96 shadow p-4">
      <h2 className="flex gap-2 items-center font-bold">
        <SwatchBook /> Settings
      </h2>

      <label className="text-sm">Font Size</label>

      <Select
        defaultValue={selectedEl?.style?.fontSize || "24px"}
        onValueChange={(value) => applyStyle("fontSize", value)}
      >
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

      <label className="text-sm mt-3">Text Color</label>
      <div>
        <input
          type="color"
          className="w-[40px] h-[40px] rounded-full"
          onChange={(event) => applyStyle("color", event.target.value)}
        />
      </div>
    </div>
  );
};

export default ElementSettingSection;
