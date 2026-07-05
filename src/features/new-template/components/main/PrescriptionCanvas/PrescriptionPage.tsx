import type { CanvasMode, CanvasPage, CanvasSelection } from "./prescriptionCanvasTypes";
import EditLayer from "./EditLayer";
import PreviewLayer from "./PreviewLayer";
import { FolderOpen } from "lucide-react";
import { useSelector } from "react-redux";

interface PrescriptionPageProps {
    page: CanvasPage;
    mode: CanvasMode;
    selection: CanvasSelection;
    onSelect: (selection: CanvasSelection) => void;
    onOpenSectionEditor: (sectionId: string) => void;
    onCopySection: (sectionId: string) => void;
    onDeleteSection: (sectionId: string) => void;
    onHideSection: (sectionId: string) => void;
    onAddRow: (sectionId: string) => void;
    onDeleteRow: (sectionId: string, rowId: string) => void;
    onHideRow: (sectionId: string, rowId: string) => void;
    onAddColumn: (sectionId: string, rowId: string) => void;
    onDeleteColumn: (sectionId: string, rowId: string, columnId: string) => void;
    onHideColumn: (sectionId: string, rowId: string, columnId: string) => void;
    onQuickStyleInput: (sectionId: string, rowId: string, columnId: string, inputId: string) => void;
    onOpenFieldEditor: (inputId: string) => void;
}

export default function PrescriptionPage({
    page,
    mode,
    selection,
    onSelect,
    onOpenSectionEditor,
    onCopySection,
    onDeleteSection,
    onHideSection,
    onAddRow,
    onDeleteRow,
    onHideRow,
    onAddColumn,
    onDeleteColumn,
    onHideColumn,
    onQuickStyleInput,
    onOpenFieldEditor,
}: PrescriptionPageProps) {
    return (
        <article className="mx-auto min-h-[1123px] w-[794px] bg-white px-6 py-8 text-slate-800 shadow-[0_16px_45px_rgba(15,23,42,0.10)]">
            {mode === "edit" ? (
                <EditLayer
                    sections={page.sections}
                    selection={selection}
                    onSelect={onSelect}
                    onOpenSectionEditor={onOpenSectionEditor}
                    onCopySection={onCopySection}
                    onDeleteSection={onDeleteSection}
                    onHideSection={onHideSection}
                    onAddRow={onAddRow}
                    onDeleteRow={onDeleteRow}
                    onHideRow={onHideRow}
                    onAddColumn={onAddColumn}
                    onDeleteColumn={onDeleteColumn}
                    onHideColumn={onHideColumn}
                    onQuickStyleInput={onQuickStyleInput}
                    onOpenFieldEditor={onOpenFieldEditor}
                />
            ) : (
                <PreviewLayer sections={page.sections} />
            )}
            {
                page.sections && page.sections.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-6 text-center h-full bg-white rounded-md border border-dashed border-slate-200 shadow-[0_1px_1px_rgba(15,23,42,0.02)]">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted mb-2">
                            <FolderOpen className="h-4 w-4 text-muted-foreground/50" />
                        </div>
                        <p className="text-xs font-medium text-foreground mb-0.5">No Section selected</p>
                        <p className="text-[11px] text-muted-foreground">Create sections to get started.</p>
                    </div>
                )
            }
        </article>
    );
}
