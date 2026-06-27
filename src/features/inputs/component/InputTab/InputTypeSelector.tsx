import { memo } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { inputTypeOptions } from "./input-tab-mock-data";
import type { InputTypeId } from "./input-tab-types";

interface InputTypeSelectorProps {
  value: InputTypeId;
  onChange: (value: InputTypeId) => void;
}

const InputTypeSelector = memo(({ value, onChange }: InputTypeSelectorProps) => (
  <div className="flex items-end justify-between gap-3">
    <div className="min-w-0 flex-1">
      <label className="mb-1 block text-[12px] font-semibold text-slate-700">Input type</label>
      <Select value={value} onValueChange={(nextValue) => onChange(nextValue as InputTypeId)}>
        <SelectTrigger className="h-9 w-full max-w-[430px] rounded-md border-slate-200 bg-white text-[13px] text-slate-800">
          <SelectValue />
        </SelectTrigger>
        <SelectContent align="start" className="z-[500]" position="popper">
          {inputTypeOptions.map((option) => (
            <SelectItem key={option.id} value={option.id}>
              {option.label} - {option.description}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  </div>
));

InputTypeSelector.displayName = "InputTypeSelector";

export default InputTypeSelector;
