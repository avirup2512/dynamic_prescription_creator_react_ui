import type { Rows } from "@/features/template/type/TemplateType";
import { Plus } from "lucide-react";
import NodeHeader from "./NodeHeader";
import AddFieldButton from "./AddFieldButton";
import FieldItem from "./FieldItem";
import { useState } from "react";
import ColumnNode from "./ColumnNode";

function RowNode(p: {
    row: Rows;
}) {
    const [open, setOpen] = useState(false);
    return (
        <div className="overflow-hidden border border-border bg-card">
            <NodeHeader
                accent="row" open={open} onToggle={() => { setOpen(!open) }}
                name={p.row.name} onRename={() => { }} onDelete={() => { }}
                meta={`${p.row.columns.length} col`}
            />
            {open && (
                <div className="space-y-1.5 bg-muted/40 p-2">
                    {p.row.columns.map((col: any, colIndex: number) => (
                        <div key={col.id} className="overflow-hidden border border-border bg-card">
                            <ColumnNode column={col} />
                        </div>
                    ))}
                    <button
                        onClick={() => { }}
                        className="flex w-full items-center justify-center gap-1.5 rounded-md border border-dashed border-border py-1.5 text-[11px] font-medium text-muted-foreground hover:border-cyan-600 hover:bg-cyan-50 hover:text-foreground dark:hover:bg-cyan-950/30"
                    >
                        <Plus className="h-3 w-3" /> Add column
                    </button>
                </div>
            )}
        </div>
    );
}

export default RowNode;