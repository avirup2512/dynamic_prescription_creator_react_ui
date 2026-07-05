import { Copy, Eye, EyeOff, Plus, Trash2 } from "lucide-react";

import { cn } from "@/lib/utils";
import type { CanvasMode, CanvasSection, CanvasSelection } from "./prescriptionCanvasTypes";
import HoverToolbar from "./HoverToolbar";
import InsertPlaceholder from "./InsertPlaceholder";
import RowRenderer from "./RowRenderer";
import { useNavigate, useParams } from "react-router-dom";

interface SectionRendererProps {
    section: any;
    mode: CanvasMode;
    selection: CanvasSelection;
    sectionType: "header" | "body" | "footer";
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

export default function SectionRenderer({
    section,
    mode,
    selection,
    sectionType,
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
}: SectionRendererProps) {
    const selected = selection.sectionId === section.id;
    const sectionLabel = section.name?.trim() || `Section ${section.area === "header" ? 1 : section.area === "footer" ? 3 : 2}`;
    const navigate = useNavigate();
    const { id } = useParams();
    if (section.isVisible === false) return null;
    const editSection = () => {
        console.log(section)
        const sectionType = section?.is_header ? "header" : section?.is_body ? "body" : "footer";
        navigate("/dashboard/new-template/edit/" + id + "/section/" + section?.template_section_id + "/" + sectionType)
    }
    return (
        <section
            className={cn(
                "group/section relative",
                section.area === "header" && "mb-12",
                section.area === "body" && "mb-8",
                section.area === "footer" && "mt-12",
                mode === "edit" && "rounded-md mt-4 border border-dashed border-sky-200/80 p-3 transition hover:border-sky-300 hover:bg-sky-50/10",
                mode === "edit" && selected && "border-sky-400 bg-sky-50/30 ring-1 ring-sky-100"
            )}
            onClick={(event) => {
                event.stopPropagation();
                onSelect({ sectionId: section.id });
            }}
        >
            {mode === "edit" ? (
                <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">{sectionLabel}</p>
                    </div>
                    <HoverToolbar
                        mode={mode}
                        label={sectionLabel}
                        visible={mode === "edit"}
                        onSettings={editSection}
                        onDelete={() => onDeleteSection(section.id)}
                        quickActions={[
                            { label: "Copy section", icon: <Copy className="h-3.5 w-3.5" />, onClick: () => onCopySection(section.id) },
                            { label: "Delete section", icon: <Trash2 className="h-3.5 w-3.5" />, onClick: () => onDeleteSection(section.id) },
                            { label: "Hide section", icon: section.isVisible === false ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />, onClick: () => onHideSection(section.id) },
                            { label: "Add row", icon: <Plus className="h-3.5 w-3.5" />, onClick: () => onAddRow(section.id) },
                        ]}
                        showDeleteIcon={false}
                        className="group-hover/section:flex"
                    />
                </div>
            ) : null}
            <div className="space-y-4">
                {section.rows.length > 0 ? (
                    section.rows.map((row: any) => (
                        <RowRenderer
                            key={row.template_row_id}
                            row={row}
                            mode={mode}
                            sectionType={sectionType}
                            selection={selection}
                            onSelect={onSelect}
                            sectionId={section.template_section_id}
                            onDeleteRow={onDeleteRow}
                            onHideRow={onHideRow}
                            onAddColumn={onAddColumn}
                            onDeleteColumn={onDeleteColumn}
                            onHideColumn={onHideColumn}
                            onQuickStyleInput={onQuickStyleInput}
                            onOpenFieldEditor={onOpenFieldEditor}
                        />
                    ))
                ) : (
                    <InsertPlaceholder mode={mode} label="Add row" />
                )}
            </div>
        </section>
    );
}
