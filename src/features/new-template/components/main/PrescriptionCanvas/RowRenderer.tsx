import { cn } from "@/lib/utils";
import type { CanvasMode, CanvasRow, CanvasSelection } from "./prescriptionCanvasTypes";
import { getColumnGridClass } from "./prescriptionCanvasUtils";
import ColumnRenderer from "./ColumnRenderer";
import HoverToolbar from "./HoverToolbar";
import InsertPlaceholder from "./InsertPlaceholder";

interface RowRendererProps {
    row: CanvasRow;
    mode: CanvasMode;
    selection: CanvasSelection;
    onSelect: (selection: CanvasSelection) => void;
    sectionId: string;
    onDeleteRow?: (sectionId: string, rowId: string) => void;
    onHideRow?: (sectionId: string, rowId: string) => void;
    onAddColumn?: (sectionId: string, rowId: string) => void;
    onDeleteColumn?: (sectionId: string, rowId: string, columnId: string) => void;
    onHideColumn?: (sectionId: string, rowId: string, columnId: string) => void;
    onQuickStyleInput?: (sectionId: string, rowId: string, columnId: string, inputId: string) => void;
    onOpenFieldEditor?: (inputId: string) => void;
}

export default function RowRenderer({ row, mode, selection, onSelect, sectionId, onDeleteRow, onHideRow, onAddColumn, onDeleteColumn, onHideColumn, onQuickStyleInput, onOpenFieldEditor }: RowRendererProps) {
    const visibleColumns = row.columns.slice(0, 3);
    const rowLabel = `Row ${row.id.split("-").pop() ?? "1"}`;

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
            <div className="mb-2 flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">{rowLabel}</p>
                </div>
                <HoverToolbar
                    mode={mode}
                    label={rowLabel}
                    visible={mode === "edit"}
                    onDelete={onDeleteRow ? () => onDeleteRow(sectionId, row.id) : undefined}
                    quickActions={[
                        { label: "Delete row", onClick: () => onDeleteRow?.(sectionId, row.id) },
                        { label: "Hide row", onClick: () => onHideRow?.(sectionId, row.id) },
                        { label: "Add column", onClick: () => onAddColumn?.(sectionId, row.id) },
                    ]}
                    className="group-hover/row:flex"
                />
            </div>
            {visibleColumns.length > 0 ? (
                <div className={cn("grid gap-4", getColumnGridClass(visibleColumns.length))}>
                    {visibleColumns.map((column) => (
                        <ColumnRenderer
                            key={column.id}
                            column={column}
                            mode={mode}
                            selection={selection}
                            onSelect={onSelect}
                            sectionId={sectionId}
                            rowId={row.id}
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
