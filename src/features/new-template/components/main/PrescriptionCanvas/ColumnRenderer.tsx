import { cn } from "@/lib/utils";
import type { CanvasColumn, CanvasMode, CanvasSelection } from "./prescriptionCanvasTypes";
import HoverToolbar from "./HoverToolbar";
import InputRenderer from "./InputRenderer";
import InsertPlaceholder from "./InsertPlaceholder";

interface ColumnRendererProps {
    column: CanvasColumn;
    mode: CanvasMode;
    selection: CanvasSelection;
    onSelect: (selection: CanvasSelection) => void;
    sectionId: string;
    rowId: string;
    onDeleteColumn?: (sectionId: string, rowId: string, columnId: string) => void;
    onHideColumn?: (sectionId: string, rowId: string, columnId: string) => void;
    onQuickStyleInput?: (sectionId: string, rowId: string, columnId: string, inputId: string) => void;
    onOpenFieldEditor?: (inputId: string) => void;
}

export default function ColumnRenderer({ column, mode, selection, onSelect, sectionId, rowId, onDeleteColumn, onHideColumn, onQuickStyleInput, onOpenFieldEditor }: ColumnRendererProps) {
    const hasInputs = column?.inputGroups?.some((group) => group.inputs.length > 0);
    const columnLabel = `Column ${column?.id?.split("-").pop() ?? "1"}`;

    if (column.isVisible === false) return null;

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
            <div className="mb-2 flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">{columnLabel}</p>
                </div>
                <HoverToolbar
                    mode={mode}
                    label={columnLabel}
                    visible={mode === "edit"}
                    onDelete={onDeleteColumn ? () => onDeleteColumn(sectionId, rowId, column.id) : undefined}
                    quickActions={[
                        { label: "Delete column", onClick: () => onDeleteColumn?.(sectionId, rowId, column.id) },
                        { label: "Hide column", onClick: () => onHideColumn?.(sectionId, rowId, column.id) },
                    ]}
                    className="group-hover/column:flex"
                />
            </div>
            <div className="space-y-2">
                {column?.inputGroups?.map((group, groupIndex) => (
                    <div key={group.id} className="space-y-2">
                        {group.relation === "or" && groupIndex > 0 && mode === "edit" && (
                            <div className="flex items-center gap-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-300">
                                <span className="h-px flex-1 bg-slate-100" />
                                or
                                <span className="h-px flex-1 bg-slate-100" />
                            </div>
                        )}
                        {group.inputs.map((input) => (
                            <InputRenderer
                                key={input.id}
                                input={input}
                                mode={mode}
                                selection={selection}
                                onSelect={onSelect}
                                sectionId={sectionId}
                                rowId={rowId}
                                columnId={column.id}
                                onQuickStyleInput={onQuickStyleInput}
                                onOpenFieldEditor={onOpenFieldEditor}
                            />
                        ))}
                    </div>
                ))}
                {!hasInputs && <InsertPlaceholder mode={mode} label="Add field" />}
            </div>
        </div>
    );
}
