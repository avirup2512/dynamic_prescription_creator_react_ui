import { useState } from "react";
import type { RowData } from "../../type/TemplateStructure";
import ChevronToggle from "./ChevronToggle";
import PlainIcon from "./PlainIcon";
import { LayoutGrid, Plus, Trash2 } from "lucide-react";
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
                className="flex items-center justify-between gap-2 py-1.5"
                style={{ paddingLeft: 8 + indent * 24 }}
            >
                <div className="flex items-center justify-between gap-2">
                    <ChevronToggle open={open} onClick={() => setOpen((o) => !o)} />
                    {/* <PlainIcon icon={LayoutGrid} /> */}
                    <span className="text-sm text-slate-700">{row.label || "Row" + (index + 1) + ""}</span>
                </div>
                <div className="flex items-center justify-ends">
                    <Button
                        size="icon"
                        type="button"
                        variant="ghost"
                        className="flex items-center justify-center border-none border-slate-200 text-slate-500 hover:bg-white"
                    >
                        <Trash2 className="size-3.5 text-red-600" />
                    </Button>
                </div>
            </div>
            {open && (
                <div className="relative">
                    <span
                        className="absolute top-0 bottom-0 border-l border-dashed border-slate-200"
                        style={{ left: 8 + indent * 24 + 10 }}
                        aria-hidden
                    />
                    {row.columns.map((col: any, index: number) => (
                        <ColumnBlock key={index + Date.now()} col={col} index={index} indent={indent + 1} />
                    ))}
                    <AddButton type="column" />
                </div>
            )}
        </div>
    );
};

export default RowBlock;