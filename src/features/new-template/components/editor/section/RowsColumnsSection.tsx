import type { RowsColumnsSectionProps } from "@/features/new-template/type/ComponentType";
import { Columns3, Plus } from "lucide-react";
import type { FC } from "react";

const RowsColumnsSection: FC<RowsColumnsSectionProps> = ({ rows }) => {
    return (
        <div className="mt-3 space-y-2.5 border-t border-slate-200 pt-3">
            <label className="block text-[11px] font-semibold tracking-wide text-slate-600">
                ROWS & COLUMNS
            </label>

            {/* 2-Column Grid Layout */}
            <div className="grid grid-cols-2 gap-2">
                {rows.map((row) => (
                    <div key={row.id} className="flex items-center gap-1.5">
                        <div className="text-slate-400">
                            <Columns3 size={14} />
                        </div>
                        <span className="truncate text-[12px] text-slate-700">{row.name}</span>
                    </div>
                ))}
            </div>

            {/* Add Row Button - Dashed Border */}
            <button className="flex h-8 w-full items-center justify-center gap-1.5 rounded-md border border-dashed border-slate-200 bg-white text-[12px] font-medium text-slate-600 transition-colors hover:border-blue-200 hover:bg-blue-50/60 hover:text-slate-900">
                <Plus size={14} />
                Add Row
            </button>
        </div>
    );
};

export default RowsColumnsSection;
