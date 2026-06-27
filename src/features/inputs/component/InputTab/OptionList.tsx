import { GripVertical, Plus, Trash2 } from "lucide-react";
import { memo } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type { DropdownOption } from "./input-tab-types";

interface OptionListProps {
  options: DropdownOption[];
  onAdd: () => void;
  onChange: (id: string, patch: Partial<DropdownOption>) => void;
  onDelete: (id: string) => void;
}

const OptionList = memo(({ options, onAdd, onChange, onDelete }: OptionListProps) => (
  <div>
    <div className="mb-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <label className="text-[12px] font-semibold text-slate-700">Options</label>
        <span className="rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[11px] text-slate-500">
          {options.length}
        </span>
      </div>
      <Button type="button" variant="ghost" size="sm" className="text-blue-600" onClick={onAdd}>
        <Plus className="h-3.5 w-3.5" />
        Add option
      </Button>
    </div>
    <div className="space-y-1.5">
      {options.map((option) => (
        <div key={option.id} className="grid grid-cols-[22px_minmax(0,1fr)_110px_28px] items-center gap-2">
          <GripVertical className="h-4 w-4 cursor-grab text-slate-400" strokeWidth={2} />
          <Input
            value={option.label}
            onChange={(event) => onChange(option.id, { label: event.target.value })}
            placeholder="Option label..."
            className="h-8 rounded-md text-[12px]"
          />
          <Input
            value={option.value}
            onChange={(event) => onChange(option.id, { value: event.target.value })}
            placeholder="value"
            className="h-8 rounded-md text-[12px]"
          />
          <button
            type="button"
            onClick={() => onDelete(option.id)}
            className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-red-50 hover:text-red-500"
            aria-label={`Delete ${option.label}`}
          >
            <Trash2 className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
        </div>
      ))}
    </div>
  </div>
));

OptionList.displayName = "OptionList";

export default OptionList;
