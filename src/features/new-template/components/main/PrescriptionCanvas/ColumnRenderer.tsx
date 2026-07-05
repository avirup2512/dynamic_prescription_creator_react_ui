import { cn } from "@/lib/utils";
import type { CanvasColumn, CanvasMode, CanvasSelection } from "./prescriptionCanvasTypes";
import HoverToolbar from "./HoverToolbar";
import InputRenderer from "./InputRenderer";
import InsertPlaceholder from "./InsertPlaceholder";
import { useNavigate, useParams } from "react-router-dom";
import { Copy, Eye, EyeOff, Plus, Trash2 } from "lucide-react";

interface ColumnRendererProps {
    column: CanvasColumn;
    mode: CanvasMode;
    selection: CanvasSelection;
    onSelect: (selection: CanvasSelection) => void;
    sectionType: "header" | "body" | "footer";
    sectionId: string;
    rowId: string;
    onDeleteColumn?: (sectionId: string, rowId: string, columnId: string) => void;
    onHideColumn?: (sectionId: string, rowId: string, columnId: string) => void;
    onQuickStyleInput?: (sectionId: string, rowId: string, columnId: string, inputId: string) => void;
    onOpenFieldEditor?: (inputId: string) => void;
}

export default function ColumnRenderer({ column, mode, selection, sectionType, onSelect, sectionId, rowId, onDeleteColumn, onHideColumn, onQuickStyleInput, onOpenFieldEditor }: ColumnRendererProps) {
    const hasInputs = column?.inputGroups?.some((group) => group.inputs.length > 0);
    const columnLabel = `Column ${column?.id?.split("-").pop() ?? "1"}`;
    const navigate = useNavigate();
    const { id } = useParams();
    if (column.isVisible === false) return null;
    console.log(column)
    const onAddField = (groupId: string) => {
        console.log("onAddField", sectionId, rowId, column.template_column_id);
        navigate(`/dashboard/new-template/edit/${id}/input/${sectionId}/${rowId}/${column?.template_column_id}/${groupId}/${sectionType}/inputs/INPUT_TYPE_1`)
    }

    return (
        <div
            className={cn(
                "group/column relative min-w-0",
                mode === "edit" && "rounded-md border border-dashed border-slate-200/80 p-2 transition hover:border-sky-200 hover:bg-sky-50/10",
                mode === "edit" && selection.columnId === column.id && "border-sky-300 bg-sky-50/30"
            )}
            onClick={(event) => {
                event.stopPropagation();
                onSelect({ columnId: column.id });
            }}

        >
            {mode === "edit" ? (
                <div className="mb-2 flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">{columnLabel}</p>
                    </div>
                    <HoverToolbar
                        mode={mode}
                        label={columnLabel}
                        visible={mode === "edit"}
                        showSettings={false}
                        showDeleteIcon={false}
                        onDelete={onDeleteColumn ? () => onDeleteColumn(sectionId, rowId, column.id) : undefined}
                        quickActions={[
                            { label: "Copy column", icon: <Copy className="h-3.5 w-3.5" />, onClick: () => { } },
                            { label: "Hide column", icon: column?.isVisible === false ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />, onClick: () => { } },
                            { label: "Delete section", icon: <Trash2 className="h-3.5 w-3.5" />, onClick: () => { } },
                        ]}
                        className="group-hover/column:flex"
                    />
                </div>
            ) : null}
            <div className="space-y-2">
                {column?.inputGroup?.map((group: any, groupIndex: number) => (
                    <div key={group.id} className="space-y-2">
                        {group.relation === "or" && groupIndex > 0 && mode === "edit" && (
                            <div className="flex items-center gap-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-300">
                                <span className="h-px flex-1 bg-slate-100" />
                                or
                                <span className="h-px flex-1 bg-slate-100" />
                            </div>
                        )}
                        {group.inputs.map((input: any) => (
                            <InputRenderer
                                key={input.template_input_id}
                                input={input}
                                mode={mode}
                                sectionType={sectionType}
                                selection={selection}
                                onSelect={onSelect}
                                sectionId={sectionId}
                                rowId={rowId}
                                inputGroupId={group.template_input_group_id}
                                columnId={column.template_column_id}
                                onQuickStyleInput={onQuickStyleInput}
                                onOpenFieldEditor={onOpenFieldEditor}
                            />
                        ))}
                        {!hasInputs && <InsertPlaceholder mode={mode} label="Add field" onClick={() => { onAddField(group?.template_input_group_id) }} />}
                    </div>
                ))}
            </div>
        </div>
    );
}
