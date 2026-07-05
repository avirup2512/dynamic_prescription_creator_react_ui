import { cn } from "@/lib/utils";
import type { CanvasMode, CanvasRow, CanvasSelection } from "./prescriptionCanvasTypes";
import { getColumnGridClass } from "./prescriptionCanvasUtils";
import ColumnRenderer from "./ColumnRenderer";
import HoverToolbar from "./HoverToolbar";
import InsertPlaceholder from "./InsertPlaceholder";
import { Copy, CopyPlus, Eye, EyeOff, Plus, Trash2 } from "lucide-react";

interface RowRendererProps {
    row: CanvasRow;
    mode: CanvasMode;
    selection: CanvasSelection;
    onSelect: (selection: CanvasSelection) => void;
    sectionType: "header" | "body" | "footer";
    sectionId: string;
    onDeleteRow?: (sectionId: string, rowId: string) => void;
    onHideRow?: (sectionId: string, rowId: string) => void;
    onAddColumn?: (sectionId: string, rowId: string) => void;
    onDeleteColumn?: (sectionId: string, rowId: string, columnId: string) => void;
    onHideColumn?: (sectionId: string, rowId: string, columnId: string) => void;
    onQuickStyleInput?: (sectionId: string, rowId: string, columnId: string, inputId: string) => void;
    onOpenFieldEditor?: (inputId: string) => void;
}

export default function RowRenderer({ row, mode, selection, sectionType, onSelect, sectionId, onDeleteRow, onHideRow, onAddColumn, onDeleteColumn, onHideColumn, onQuickStyleInput, onOpenFieldEditor }: RowRendererProps) {
    const visibleColumns = row?.columns.slice(0, 3);
    const rowLabel = `Row ${row?.id?.split("-").pop() ?? "1"}`;

    if (row.isVisible === false) return null;

    return (
        <div
            className={cn(
                "group/row relative",
                mode === "edit" && "rounded-md border border-dashed border-slate-200/80 p-2 transition hover:border-sky-200 hover:bg-sky-50/10",
                mode === "edit" && selection.rowId === row.id && "border-sky-300 bg-sky-50/30"
            )}
            onClick={(event) => {
                event.stopPropagation();
                onSelect({ rowId: row.id });
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
                        onDelete={onDeleteRow ? () => onDeleteRow(sectionId, row.id) : undefined}
                        quickActions={[
                            { label: "Copy row", icon: <Copy className="h-3.5 w-3.5" />, onClick: () => { } },
                            { label: "Hide row", icon: row?.isVisible === false ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />, onClick: () => { } },
                            { label: "Add column", icon: <Plus className="h-3.5 w-3.5" />, onClick: () => { } },
                            { label: "Delete section", icon: <Trash2 className="h-3.5 w-3.5" />, onClick: () => { } },
                        ]}
                        className="group-hover/row:flex"
                    />
                </div>
            ) : null}
            {visibleColumns.length > 0 ? (
                <div className={cn("grid gap-4", getColumnGridClass(visibleColumns.length))}>
                    {visibleColumns.map((column: any) => (
                        <ColumnRenderer
                            key={column.template_column_id}
                            column={column}
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
