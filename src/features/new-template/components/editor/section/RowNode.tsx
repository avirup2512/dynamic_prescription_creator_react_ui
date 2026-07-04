import type { Rows } from "@/features/template/type/TemplateType";
import type { ColumnInputItem } from "@/features/section/type/SectionType";
import { Plus } from "lucide-react";
import NodeHeader from "./NodeHeader";
import { useState } from "react";
import ColumnNode from "./ColumnNode";
import { useDispatch } from "react-redux";
import { AddColumnToTemplateRow } from "@/features/new-template/store/TemplateSlice";

function RowNode({ row, rowIndex, sectionId, sectionType }: any) {
    const [open, setOpen] = useState(true);
    const dispatch = useDispatch();
    const addColumnToTemplate = () => {
        if (row?.columns.length < 3)
            dispatch(AddColumnToTemplateRow({ sectionType, sectionId, rowId: row?.id }));
        else
            alert("Maximum 3 column");
    }
    return (
        <div className="overflow-hidden bg-white">
            <NodeHeader
                accent="row" open={open} onToggle={() => { setOpen(!open) }}
                name={row.name} onRename={() => { }} onDelete={() => { }}
                meta={`${row.columns.length} col`}
            />
            {open && (
                <div className="space-y-1.5 border-t border-slate-100 bg-slate-50/70 p-2">
                    {row.columns.map((col: any, columnIndex: number) => (
                        <div key={col.id ?? col.column_id} className="overflow-hidden border border-slate-200 bg-white">
                            <ColumnNode sectionId={sectionId} column={col} columnIndex={columnIndex} rowIndex={rowIndex} sectionType={sectionType} />
                        </div>
                    ))}
                    <button
                        onClick={addColumnToTemplate}
                        className="flex h-7 w-full items-center justify-center gap-1.5 border border-dashed border-slate-200 bg-white text-[11px] font-medium text-slate-500 hover:border-blue-200 hover:bg-blue-50/60 hover:text-slate-900"
                    >
                        <Plus className="h-3 w-3" /> Add column
                    </button>
                </div>
            )}
        </div>
    );
}

export default RowNode;
