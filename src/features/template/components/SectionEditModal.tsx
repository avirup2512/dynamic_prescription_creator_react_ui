import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "../../../components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../../../components/ui/dialog";
import SectionRow from "@/features/section/components/SectionRow";
import SectionService from "@/features/section/service/SectionService";
import {
    AddRowsToSection,
    DeleteColumn,
    RemoveInputFromSections,
    RemoveRows,
    SetCurrentSection,
    SetSectionName,
    UpdateWidthOfColumn,
    recalculateRowOrder,
} from "@/features/section/store/SectionSlice";
import SectionUtilsService from "@/features/section/utils/SectionUtilsService";

type SectionEditModalProps = {
    isOpen: boolean
    mode: "add" | "edit"
    section?: any
    onOpenChange: (open: boolean) => void
    onSaved: (section: any) => void
}

function cloneSection(section: any) {
    return JSON.parse(JSON.stringify(section));
}

function buildDefaultSection() {
    return {
        id: "untitled-section",
        name: "untitled-section",
        rows: [
            {
                id: "untitled_header_rows",
                name: "untitled_header_rows",
                row_order: 1,
                columns: [
                    {
                        id: "untitled_column",
                        name: "untitled_column",
                        width: 100,
                        column_order: 1,
                        inputs: [],
                    },
                ],
            },
        ],
    };
}

function SectionEditModal({
    isOpen,
    mode,
    section,
    onOpenChange,
    onSaved,
}: SectionEditModalProps) {
    const dispatch = useDispatch();
    const SectionState = useSelector((state: any) => state.section);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!isOpen) return;

        const nextSection = mode === "edit" && section
            ? cloneSection(section)
            : cloneSection(SectionState?.defaultSection || buildDefaultSection());

        dispatch(SetCurrentSection(nextSection));
        setError("");
        setIsSaving(false);
    }, [isOpen, mode, section]);

    function addRows() {
        dispatch(AddRowsToSection());
        dispatch(recalculateRowOrder());
    }

    function removeSection(rowIndex: number) {
        dispatch((RemoveRows as any)({ rowIndex }));
        dispatch(recalculateRowOrder());
    }

    function handleDeleteColumn(columnIndex: number, rowIndex: number) {
        dispatch((DeleteColumn as any)({ columnIndex, rowIndex }));
        const currentLength = SectionState?.currentSection?.rows?.[rowIndex]?.columns?.length || 0;
        const width = SectionUtilsService.calculateWidthAfterColumnDeletion(Math.max(currentLength - 1, 0));
        dispatch((UpdateWidthOfColumn as any)({ rowIndex, width }));
    }

    function handleDeleteInput(inputIndex: number, rowIndex: number, columnIndex: number) {
        dispatch((RemoveInputFromSections as any)({ rowIndex, columnIndex, inputIndex }));
    }

    async function handleSave() {
        const currentSection = SectionState?.currentSection;
        const sectionName = currentSection?.name?.trim();

        if (!sectionName) {
            setError("Section name is required.");
            return;
        }

        if (!Array.isArray(currentSection?.rows) || currentSection.rows.length === 0) {
            setError("Add at least one row.");
            return;
        }

        setError("");
        setIsSaving(true);
        try {
            const payload = {
                name: sectionName,
                rows: currentSection.rows,
            };
            const response = mode === "edit" && section?.id
                ? await SectionService.updateSection(section.id, { data: payload })
                : await SectionService.createSection({ data: payload });

            if (!response?.success) {
                setError(response?.message || "Failed to save section.");
                return;
            }

            onSaved(response.data || {
                ...currentSection,
                ...payload,
                id: section?.id || currentSection?.id,
            });
            onOpenChange(false);
        } catch (error) {
            setError("Failed to save section.");
        } finally {
            setIsSaving(false);
        }
    }

    const currentSection = SectionState?.currentSection;
    const title = mode === "edit" ? "Edit Section" : "Add Section";

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[95vw] sm:max-w-[90vw] lg:max-w-[1100px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        Configure the section name, rows, columns, and inputs.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="sectionName">
                            Name <span className="text-destructive">*</span>
                        </label>
                        <input
                            className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/20"
                            disabled={isSaving}
                            id="sectionName"
                            name="name"
                            onChange={(event) => dispatch((SetSectionName as any)({ name: event.currentTarget.value }))}
                            placeholder="Enter name"
                            required
                            type="text"
                            value={currentSection?.name || ""}
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button className="h-9 gap-2" disabled={isSaving} onClick={addRows} type="button">
                            <Plus className="size-4" />
                            Add row
                        </Button>
                    </div>

                    <section className="rounded-xl border border-border bg-background p-4 shadow-sm">
                        {Array.isArray(currentSection?.rows) && currentSection.rows.length > 0 ? (
                            <div className="space-y-4">
                                {currentSection.rows.map((row: any, index: number) => (
                                    <SectionRow
                                        key={`${row?.id || "row"}-${index}`}
                                        rowData={row}
                                        rowIndex={index}
                                        onRemove={removeSection}
                                        onDeleteInput={handleDeleteInput}
                                        onDeleteColumn={handleDeleteColumn}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex min-h-48 items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
                                Add a row to start.
                            </div>
                        )}
                    </section>

                    {error ? <p className="text-sm text-destructive">{error}</p> : null}
                </div>

                <DialogFooter>
                    <Button className="h-9 px-4" disabled={isSaving} onClick={handleSave} type="button">
                        {isSaving ? "Saving..." : "Save"}
                    </Button>
                    <DialogClose asChild>
                        <Button className="h-9 px-4" disabled={isSaving} type="button" variant="outline">
                            Cancel
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default SectionEditModal;
