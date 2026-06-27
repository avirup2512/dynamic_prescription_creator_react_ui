import type { Rows } from "@/features/template/type/TemplateType";
import type { ColumnInputItem } from "@/features/section/type/SectionType";
import { Plus } from "lucide-react";
import NodeHeader from "./NodeHeader";
import { useState } from "react";
import ColumnNode from "./ColumnNode";

interface EditorColumn {
    id?: string;
    column_id?: string;
    name?: string;
    column_name?: string;
    inputGroup?: Array<{ inputs?: ColumnInputItem[] }>;
}

function RowNode(p: {
    row: Rows & { columns: EditorColumn[] };
}) {
    const [open, setOpen] = useState(false);
    return (
        <div className="overflow-hidden bg-white">
            <NodeHeader
                accent="row" open={open} onToggle={() => { setOpen(!open) }}
                name={p.row.name} onRename={() => { }} onDelete={() => { }}
                meta={`${p.row.columns.length} col`}
            />
            {open && (
                <div className="space-y-1.5 border-t border-slate-100 bg-slate-50/70 p-2">
                    {p.row.columns.map((col) => (
                        <div key={col.id ?? col.column_id} className="overflow-hidden rounded-md border border-slate-200 bg-white">
                            <ColumnNode column={col} />
                        </div>
                    ))}
                    <button
                        onClick={() => { }}
                        className="flex h-7 w-full items-center justify-center gap-1.5 rounded-md border border-dashed border-slate-200 bg-white text-[11px] font-medium text-slate-500 hover:border-blue-200 hover:bg-blue-50/60 hover:text-slate-900"
                    >
                        <Plus className="h-3 w-3" /> Add column
                    </button>
                </div>
            )}
        </div>
    );
}

export default RowNode;
