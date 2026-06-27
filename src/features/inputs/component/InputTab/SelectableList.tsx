import { ListChecks } from "lucide-react";
import { memo } from "react";

import { cn } from "@/lib/utils";

import type { SelectableListItem } from "./input-tab-types";

interface SelectableListProps {
  title: string;
  countLabel?: string;
  items: SelectableListItem[];
  selectedId: string;
  onSelect: (id: string) => void;
  search?: string;
  onSearchChange?: (value: string) => void;
}

const SelectableList = memo(
  ({ title, countLabel, items, selectedId, onSelect, search, onSearchChange }: SelectableListProps) => (
    <section className="rounded-lg border border-slate-200 bg-white p-3">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-[14px] font-bold text-slate-900">{title}</h3>
        {countLabel ? <span className="text-[12px] text-slate-400">{countLabel}</span> : null}
      </div>
      {onSearchChange ? (
        <input
          value={search ?? ""}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={`Search ${title.toLowerCase()}`}
          className="mb-2 h-8 w-full rounded-md border border-slate-200 px-3 text-[12px] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      ) : null}
      <div className="max-h-[330px] space-y-1 overflow-y-auto pr-1">
        {items.map((item) => {
          const Icon = item.icon ?? ListChecks;
          const selected = item.id === selectedId;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={cn(
                "flex w-full items-center gap-2 rounded-md px-2 py-2 text-left transition-colors",
                selected ? "border-l-[3px] border-blue-600 bg-blue-50 pl-2" : "hover:bg-slate-50",
              )}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500">
                <Icon className="h-3.5 w-3.5" strokeWidth={2} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[12.5px] font-medium text-slate-800">
                  {item.title}
                </span>
                <span className="block truncate text-[11px] text-slate-400">{item.meta}</span>
              </span>
              {item.chips?.slice(0, 2).map((chip) => (
                <span
                  key={chip}
                  className="hidden max-w-[96px] truncate rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] text-slate-500 xl:inline"
                >
                  {chip}
                </span>
              ))}
            </button>
          );
        })}
      </div>
    </section>
  ),
);

SelectableList.displayName = "SelectableList";

export default SelectableList;
