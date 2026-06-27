import { useState } from "react";
import type { RowData } from "../../type/TemplateStructure";
import ChevronToggle from "./ChevronToggle";
import { Trash2 } from "lucide-react";
import ColumnBlock from "./ColumnBlock";
import { Button } from "@/components/ui/button";
import AddButton from "./AddButton";

const RowBlock: React.FC<{ row: RowData; indent: number, index: number }> = ({
    row,
    indent,
    index
}) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="relative">
            <div
                className="group flex items-center justify-between gap-2 rounded-md py-1 pr-1 hover:bg-slate-50"
                style={{ paddingLeft: 6 + indent * 18 }}
            >
                <div className="flex min-w-0 items-center gap-1.5">
                    <ChevronToggle open={open} onClick={() => setOpen((o) => !o)} />
                    {/* <PlainIcon icon={LayoutGrid} /> */}
                    <span className="truncate text-[11.5px] font-medium text-slate-700">{row.label || "Row" + (index + 1) + ""}</span>
                </div>
                <div className="flex items-center justify-end opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                        size="icon-xs"
                        type="button"
                        variant="ghost"
                        className="flex items-center justify-center border-none text-slate-400 hover:bg-white hover:text-red-600"
                    >
                        <Trash2 className="size-3.5" />
                    </Button>
                </div>
            </div>
            {open && (
                <div className="relative">
                    <span
                        className="absolute bottom-0 top-0 border-l border-dashed border-slate-200"
                        style={{ left: 6 + indent * 18 + 9 }}
                        aria-hidden
                    />
                    {row.columns.map((col, index) => (
                        <ColumnBlock key={col.id ?? index} col={col} index={index} indent={indent + 1} />
                    ))}
                    <AddButton type="column" />
                </div>
            )}
        </div>
    );
};

export default RowBlock;
