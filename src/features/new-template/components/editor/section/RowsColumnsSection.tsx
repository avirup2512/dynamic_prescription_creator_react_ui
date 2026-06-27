import type { RowsColumnsSectionProps } from "@/features/new-template/type/ComponentType";
import { Columns3, Plus } from "lucide-react";
import type { FC } from "react";

const RowsColumnsSection: FC<RowsColumnsSectionProps> = ({
    rows,
    onDeleteRow,
    onAddColumn,
}) => {
    return (
        <div className="space-y-3 border-t border-gray-200 pt-4 mt-4">
            <label className="text-xs font-semibold text-gray-700 block tracking-wide">
                ROWS & COLUMNS
            </label>

            {/* 2-Column Grid Layout */}
            <div className="grid grid-cols-2 gap-2">
                {rows.map((row) => (
                    <div key={row.id} className="flex items-center gap-2">
                        <div className="text-gray-400">
                            <Columns3 size={14} />
                        </div>
                        <span className="text-sm text-gray-700">{row.name}</span>
                    </div>
                ))}
            </div>

            {/* Add Row Button - Dashed Border */}
            <button className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-colors">
                <Plus size={16} />
                Add Row
            </button>
        </div>
    );
};

export default RowsColumnsSection;
