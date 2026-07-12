import { cn } from "@/lib/utils";
import type { CanvasMode, CanvasRow, CanvasSelection } from "./prescriptionCanvasTypes";
import { getColumnGridClass } from "./prescriptionCanvasUtils";
import ColumnRenderer from "./ColumnRenderer";
import HoverToolbar from "./HoverToolbar";
import InsertPlaceholder from "./InsertPlaceholder";
import { Copy, CopyPlus, Eye, EyeOff, Plus, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { AddColumnToTemplateRow, CopyTemplateSectionRow, RemoveRowFromTemplateSection, ToggleRowVisibilityInTemplate } from "@/features/new-template/store/TemplateSlice";

interface RowRendererProps {
    row: CanvasRow;
    mode: CanvasMode;
    selection: CanvasSelection;
    onSelect: (selection: CanvasSelection) => void;
    sectionType: "header" | "body" | "footer";
    sectionId: string;
    onAddColumn?: (sectionId: string, rowId: string, sectionType: string) => void;
    onDeleteColumn?: (sectionId: string, rowId: string, columnId: string) => void;
    onHideColumn?: (sectionId: string, rowId: string, columnId: string) => void;
    onQuickStyleInput?: (sectionId: string, rowId: string, columnId: string, inputId: string) => void;
    onOpenFieldEditor?: (inputId: string) => void;
}

export default function RowRenderer({ row, mode, selection, sectionType, onSelect, sectionId, onAddColumn, onDeleteColumn, onHideColumn, onQuickStyleInput, onOpenFieldEditor }: RowRendererProps) {
    const visibleColumns = row?.columns.slice(0, 3);
    const rowLabel = `Row ${row?.row_order}`
    const dispatch = useDispatch();

    // if (row.isVisible === false) return null;

    const addColumn = () => {
        const payload = { sectionId, rowId: row?.template_row_id, sectionType }
        dispatch(AddColumnToTemplateRow(payload))
    }
    const onCopyRow = (sectionId: string, rowId: string, sectionType: string) => {
        dispatch(CopyTemplateSectionRow({ sectionId, rowId, sectionType }))
    }
    const onHideRow = (sectionId: string, rowId: string, sectionType: string) => {
        dispatch(ToggleRowVisibilityInTemplate({ sectionId, rowId, sectionType }))
    }
    const onDeleteRow = (sectionId: string, rowId: string, sectionType: string) => {
        dispatch(RemoveRowFromTemplateSection({ sectionId, rowId, sectionType }))
    }

    return (
        <div
            className={cn(
                "group/row relative",
                mode === "edit" && "rounded-md border border-dashed border-slate-200/80 p-2 transition hover:border-sky-200 hover:bg-sky-50/10",
                mode === "edit" && selection.rowId === row.template_row_id && "border-sky-300 bg-sky-50/30"
            )}
            onClick={(event) => {
                event.stopPropagation();
                onSelect({ rowId: row.template_row_id });
            }}
        >
            {mode === "edit" ? (
                <div className="mb-2 flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">{rowLabel}</p>
                    </div>
                    <HoverToolbar
                        mode={mode}
                        label={rowLabel}
                        visible={mode === "edit"}
                        showSettings={false}
                        showDeleteIcon={false}
                        onDelete={onDeleteRow ? () => onDeleteRow(sectionId, row?.template_row_id) : undefined}
                        quickActions={[
                            { label: "Copy row", icon: <Copy className="h-3.5 w-3.5" />, onClick: () => { onCopyRow(sectionId, row?.template_row_id, sectionType) } },
                            { label: "Hide row", icon: row?.is_visible === 1 ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />, onClick: () => { onHideRow(sectionId, row?.template_row_id, sectionType) } },
                            { label: "Add column", disabled: row?.columns && row?.columns?.length === 3 ? true : false, icon: <Plus className="h-3.5 w-3.5" />, onClick: () => { addColumn() } },
                            { label: "Delete section", icon: <Trash2 className="h-3.5 w-3.5" />, onClick: () => { onDeleteRow(sectionId, row?.template_row_id, sectionType) } },
                        ]}
                        className="group-hover/row:flex"
                    />
                </div>
            ) : null}
            {visibleColumns.length > 0 ? (
                <div className={cn("grid gap-4", getColumnGridClass(visibleColumns.length))}>
                    {visibleColumns.map((column: any, columnIndex: number) => (
                        <ColumnRenderer
                            key={column.template_column_id}
                            column={column}
                            columnIndex={columnIndex}
                            columnLength={row?.columns?.length}
                            sectionType={sectionType}
                            mode={mode}
                            selection={selection}
                            onSelect={onSelect}
                            sectionId={sectionId}
                            rowId={row?.template_row_id}
                            onDeleteColumn={onDeleteColumn}
                            onHideColumn={onHideColumn}
                            onQuickStyleInput={onQuickStyleInput}
                            onOpenFieldEditor={onOpenFieldEditor}
                        />
                    ))}
                </div>
            ) : (
                <InsertPlaceholder mode={mode} label="Add column" />
            )}
        </div>
    );
}
