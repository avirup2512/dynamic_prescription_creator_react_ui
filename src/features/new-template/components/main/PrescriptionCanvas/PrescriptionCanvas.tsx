import { useEffect, useMemo, useState } from "react";
import { Download, Eye, FolderOpen, Pencil } from "lucide-react";

import { cn } from "@/lib/utils";
import { useBuilder } from "@/features/new-template/context/BuilderContext";
import type { CanvasColumn, CanvasMode, CanvasRow, CanvasSection, CanvasSelection } from "./prescriptionCanvasTypes";
import { getOrderedSections, normalizePrescriptionAreas, paginateSections } from "./prescriptionCanvasUtils";
import PageBreak from "./PageBreak";
import PrescriptionPage from "./PrescriptionPage";

interface PrescriptionCanvasProps {
    header: unknown;
    body: unknown;
    footer: unknown;
}

export default function PrescriptionCanvas({ header, body, footer }: PrescriptionCanvasProps) {
    const { openEditor } = useBuilder();
    const [mode, setMode] = useState<CanvasMode>("edit");
    const [selection, setSelection] = useState<CanvasSelection>({});

    const initialSections = useMemo(() => getOrderedSections(normalizePrescriptionAreas(header, body, footer)), [body, footer, header]);
    const [sections, setSections] = useState<CanvasSection[]>(initialSections);

    useEffect(() => {
        setSections(initialSections);
    }, [initialSections]);

    const createId = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 8)}`;

    const cloneSection = (section: CanvasSection): CanvasSection => ({
        ...section,
        id: createId("section"),
        rows: section.rows.map((row) => ({
            ...row,
            id: createId("row"),
            columns: row.columns.map((column) => ({
                ...column,
                id: createId("column"),
                inputGroups: column.inputGroups.map((group) => ({
                    ...group,
                    id: createId("group"),
                    inputs: group.inputs.map((input) => ({ ...input, id: createId("input") })),
                })),
            })),
        })),
    });

    const handleOpenSectionEditor = (sectionId: string) => {
        openEditor("section", sectionId);
    };

    const handleCopySection = (sectionId: string) => {
        setSections((prev) => {
            const index = prev.findIndex((section) => section.id === sectionId);
            if (index === -1) return prev;
            const copiedSection = cloneSection(prev[index]);
            return [...prev.slice(0, index + 1), copiedSection, ...prev.slice(index + 1)];
        });
    };

    const handleDeleteSection = (sectionId: string) => {
        setSections((prev) => prev.filter((section) => section.id !== sectionId));
        setSelection((prev) => (prev.sectionId === sectionId ? {} : prev));
    };

    const handleHideSection = (sectionId: string) => {
        setSections((prev) => prev.map((section) => (section.id === sectionId ? { ...section, isVisible: false } : section)));
        setSelection((prev) => (prev.sectionId === sectionId ? {} : prev));
    };

    const handleAddRow = (sectionId: string) => {
        setSections((prev) =>
            prev.map((section) =>
                section.id === sectionId
                    ? {
                        ...section,
                        rows: [
                            ...section.rows,
                            {
                                id: createId("row"),
                                columns: [
                                    {
                                        id: createId("column"),
                                        inputGroups: [],
                                    },
                                ],
                            },
                        ],
                    }
                    : section
            )
        );
    };

    const handleDeleteRow = (sectionId: string, rowId: string) => {
        setSections((prev) => prev.map((section) => (section.id === sectionId ? { ...section, rows: section.rows.filter((row) => row.id !== rowId) } : section)));
        setSelection((prev) => (prev.rowId === rowId ? {} : prev));
    };

    const handleHideRow = (sectionId: string, rowId: string) => {
        setSections((prev) => prev.map((section) => (section.id === sectionId ? { ...section, rows: section.rows.map((row) => (row.id === rowId ? { ...row, isVisible: false } : row)) } : section)));
        setSelection((prev) => (prev.rowId === rowId ? {} : prev));
    };

    const handleAddColumn = (sectionId: string, rowId: string) => {
        setSections((prev) =>
            prev.map((section) =>
                section.id === sectionId
                    ? {
                        ...section,
                        rows: section.rows.map((row) =>
                            row.id === rowId
                                ? {
                                    ...row,
                                    columns: [
                                        ...row.columns,
                                        {
                                            id: createId("column"),
                                            inputGroups: [],
                                        },
                                    ],
                                }
                                : row
                        ),
                    }
                    : section
            )
        );
    };

    const handleDeleteColumn = (sectionId: string, rowId: string, columnId: string) => {
        setSections((prev) =>
            prev.map((section) =>
                section.id === sectionId
                    ? {
                        ...section,
                        rows: section.rows.map((row) => (row.id === rowId ? { ...row, columns: row.columns.filter((column) => column.id !== columnId) } : row)),
                    }
                    : section
            )
        );
        setSelection((prev) => (prev.columnId === columnId ? {} : prev));
    };

    const handleHideColumn = (sectionId: string, rowId: string, columnId: string) => {
        setSections((prev) =>
            prev.map((section) =>
                section.id === sectionId
                    ? {
                        ...section,
                        rows: section.rows.map((row) => (row.id === rowId ? { ...row, columns: row.columns.map((column) => (column.id === columnId ? { ...column, isVisible: false } : column)) } : row)),
                    }
                    : section
            )
        );
        setSelection((prev) => (prev.columnId === columnId ? {} : prev));
    };

    const handleQuickStyleInput = (sectionId: string, rowId: string, columnId: string, inputId: string) => {
        setSections((prev) =>
            prev.map((section) =>
                section.id === sectionId
                    ? {
                        ...section,
                        rows: section.rows.map((row) =>
                            row.id === rowId
                                ? {
                                    ...row,
                                    columns: row.columns.map((column) =>
                                        column.id === columnId
                                            ? {
                                                ...column,
                                                inputGroups: column.inputGroups.map((group) => ({
                                                    ...group,
                                                    inputs: group.inputs.map((input) =>
                                                        input.id === inputId
                                                            ? {
                                                                ...input,
                                                                isBold: !input.isBold,
                                                                fontSize: input.fontSize === "large" ? "" : "large",
                                                            }
                                                            : input
                                                    ),
                                                })),
                                            }
                                            : column
                                    ),
                                }
                                : row
                        ),
                    }
                    : section
            )
        );
    };

    const handleOpenFieldEditor = (inputId: string) => {
        openEditor("field", inputId);
    };

    const pages = useMemo(() => paginateSections(sections.filter((section) => section.isVisible !== false)), [sections]);
    return (
        <div className="flex h-screen min-w-0 flex-col bg-slate-100">
            <div className="sticky top-0 z-20 flex h-12 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4">
                <div className="min-w-0">
                    <p className="truncate text-[13px] font-bold text-slate-900">
                        Standard OPD Template <span className="font-medium text-slate-400">/ Draft v1.02</span>
                    </p>
                </div>

                <div className="flex items-center rounded-md border border-slate-200 bg-slate-50 p-0.5">
                    <button
                        type="button"
                        onClick={() => setMode("edit")}
                        className={cn(
                            "flex h-8 items-center gap-1.5 rounded px-3 text-[12px] font-semibold transition",
                            mode === "edit" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-700"
                        )}
                    >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit Mode
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setSelection({});
                            setMode("preview");
                        }}
                        className={cn(
                            "flex h-8 items-center gap-1.5 rounded px-3 text-[12px] font-semibold transition",
                            mode === "preview" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-700"
                        )}
                    >
                        <Eye className="h-3.5 w-3.5" />
                        Preview
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <button type="button" className="text-[12px] font-semibold text-slate-400 transition hover:text-slate-700">
                        Discard
                    </button>
                    <button
                        type="button"
                        className="flex h-8 items-center gap-1.5 rounded-md bg-slate-950 px-3 text-[12px] font-bold text-white shadow-sm transition hover:bg-slate-800"
                    >
                        <Download className="h-3.5 w-3.5" />
                        Export PDF
                    </button>
                </div>
            </div>

            <div className="min-h-0 flex-1 overflow-auto px-6 py-10">
                <div className="mx-auto flex w-max flex-col gap-9">
                    {pages.map((page, index) => (
                        <div key={page.id} className="space-y-5">
                            {index > 0 && <PageBreak pageNumber={index + 1} />}
                            <PrescriptionPage
                                page={page}
                                mode={mode}
                                selection={selection}
                                onSelect={setSelection}
                                onOpenSectionEditor={handleOpenSectionEditor}
                                onCopySection={handleCopySection}
                                onDeleteSection={handleDeleteSection}
                                onHideSection={handleHideSection}
                                onAddRow={handleAddRow}
                                onDeleteRow={handleDeleteRow}
                                onHideRow={handleHideRow}
                                onAddColumn={handleAddColumn}
                                onDeleteColumn={handleDeleteColumn}
                                onHideColumn={handleHideColumn}
                                onQuickStyleInput={handleQuickStyleInput}
                                onOpenFieldEditor={handleOpenFieldEditor}
                            />
                        </div>
                    ))}
                    {
                        pages?.length == 1 && pages[0].sections.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-6 text-center h-full bg-white rounded-md border border-dashed border-slate-200 shadow-[0_1px_1px_rgba(15,23,42,0.02)]">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted mb-2">
                                    <FolderOpen className="h-4 w-4 text-muted-foreground/50" />
                                </div>
                                <p className="text-xs font-medium text-foreground mb-0.5">No Section selected</p>
                                <p className="text-[11px] text-muted-foreground">Create sections to get started.</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}
