// SectionEditor.tsx

import type { Field, Row } from "@/features/new-template/type/ComponentType";
import { Section, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useBuilder } from "@/features/new-template/context/BuilderContext";
import SectionService from "@/features/section/service/SectionService";
import { SetCurrentSection } from "@/features/section/store/SectionSlice";

import TabNavigation from "../TabNavigation";
import ActionButtons from "./ActionButtons";
import RowNode from "./RowNode";
import SectionHeader from "./SectionHeader";
import StyleTab from "./StyleTab/StyleTab";

interface SectionEditorProps {
    closeEditor?: () => void;
}

interface EditorSectionState {
    defaultSection?: any;
    currentSection?: {
        id?: string;
        name?: string;
        description?: string;
        rows?: Array<{ id?: string; template_row_id?: string }>;
    };
}

export default function SectionEditor({ closeEditor }: SectionEditorProps) {
    const SectionState = useSelector((state: { section: EditorSectionState }) => state.section);
    const sectionService = SectionService;
    const dispatch = useDispatch();
    const { selectedId } = useBuilder();
    const isEditMode = Boolean(selectedId);

    const getSectionDetailsById = useCallback(async (id: string) => {
        try {
            const fetchedSectionDetails = await sectionService.getSectionById(id);
            if (fetchedSectionDetails && fetchedSectionDetails.success) {
                dispatch(SetCurrentSection(fetchedSectionDetails?.data));
            }
        } catch (error) {
            console.log(error);
        }
    }, [dispatch, sectionService]);

    useEffect(() => {
        if (selectedId && isEditMode) {
            getSectionDetailsById(selectedId);
        } else {
            dispatch(SetCurrentSection(SectionState?.defaultSection ?? {}));
        }
    }, [SectionState?.defaultSection, dispatch, getSectionDetailsById, selectedId, isEditMode]);

    const [activeTab, setActiveTab] = useState<string>("Content");
    const [sectionName, setSectionName] = useState<string>("Patient Information");
    const [description, setDescription] = useState<string>("No Description");
    const [isSaving, setIsSaving] = useState(false);
    const [fields] = useState<Field[]>([
        { id: 1, name: "Full Name", type: "Text", required: true },
        { id: 2, name: "Date of Birth", type: "Date", required: true },
        { id: 3, name: "Sex", type: "Dropdown", required: true },
        { id: 4, name: "MRN", type: "Text", required: false },
        { id: 5, name: "Phone", type: "Tel", required: true },
        { id: 6, name: "Email", type: "Email", required: false },
    ]);
    const [rows] = useState<Row[]>([
        { id: 1, name: "Full Name" },
        { id: 2, name: "Date of Birth" },
        { id: 3, name: "Sex" },
        { id: 4, name: "MRN" },
        { id: 5, name: "Phone" },
        { id: 6, name: "Email" },
    ]);

    const handleCancel = (): void => {
        closeEditor?.();
    };

    const handleSave = async (): Promise<void> => {
        const currentSection = (SectionState?.currentSection ?? SectionState?.defaultSection ?? {}) as any;
        const trimmedName = sectionName?.trim() || currentSection?.name?.trim();

        if (!trimmedName) {
            alert("Section name is required.");
            return;
        }

        setIsSaving(true);

        try {
            const payload = {
                ...(currentSection ?? {}),
                name: trimmedName,
                description: description?.trim() || currentSection?.description || "",
                rows: currentSection?.rows ?? [],
            };

            const sectionId = currentSection?.id || selectedId;
            const response = sectionId
                ? await sectionService.updateSection(sectionId, { data: payload })
                : await sectionService.createSection({ data: payload });

            if (response?.success) {
                dispatch(SetCurrentSection(response.data || payload));
                closeEditor?.();
            } else {
                alert(response?.message || "Unable to save section.");
            }
        } catch (error) {
            console.error(error);
            alert("Unable to save section.");
        } finally {
            setIsSaving(false);
        }
    };

    const currentRows = SectionState?.currentSection?.rows ?? [];

    return (
        <div className="flex h-screen max-h-screen w-[360px] flex-col border-l border-slate-200 bg-[#fbfbfa] shadow-[0_8px_30px_rgba(15,23,42,0.08)]">
            <div className="shrink-0 border-b border-slate-200/80 bg-white px-3 py-3">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex min-w-0 flex-1 items-center gap-2">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                            <Section className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <h3 className="truncate text-[13px] font-semibold text-slate-900">
                                {SectionState?.currentSection?.name}
                            </h3>
                            <p className="mt-0.5 text-[11px] text-slate-500">
                                Section - {currentRows.length} rows - 6 fields
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        aria-label="Close editor"
                        onClick={() => closeEditor?.()}
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div className="shrink-0 bg-white">
                <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto bg-white px-3 py-3">
                {activeTab === "Content" && (
                    <div className="space-y-3">
                        <SectionHeader
                            sectionName={SectionState?.currentSection?.name ?? "Patient Information"}
                            setSectionName={setSectionName}
                            description={SectionState?.currentSection?.description ?? "No Description"}
                            setDescription={setDescription}
                        />

                    </div>
                )}

                {activeTab === "Layout" && (
                    <div className="rounded-md bg-white py-3 text-center text-slate-400">
                        {/* <p className="text-[12px]">Layout settings</p> */}
                        {currentRows.map((row: { id?: string; template_row_id?: string }) => (
                            <div
                                key={row.id ?? row.template_row_id}
                                className="overflow-hidden  border border-slate-200 bg-white shadow-[0_1px_1px_rgba(15,23,42,0.02)]"
                            >
                                <RowNode row={row as any} />
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === "Style" && (
                    <div className="space-y-2">
                        <StyleTab />
                    </div>
                )}

                {activeTab === "Validation" && (
                    <div className="rounded-md border border-dashed border-slate-200 bg-white py-10 text-center text-slate-400">
                        <p className="text-[12px]">Validation settings</p>
                    </div>
                )}

                {activeTab === "Logic" && (
                    <div className="rounded-md border border-dashed border-slate-200 bg-white py-10 text-center text-slate-400">
                        <p className="text-[12px]">Logic settings</p>
                    </div>
                )}
            </div>

            <div className="sticky bottom-0 z-10 shrink-0 border-t border-slate-200 bg-white px-3 py-2.5">
                <div className="mb-2 text-[11px] text-slate-500">Last edited by Dr. Patel - 2m ago</div>
                <div className="space-y-2">
                    <ActionButtons onCancel={handleCancel} onSave={handleSave} />
                    {isSaving ? <p className="text-[11px] text-blue-600">Saving section…</p> : null}
                </div>
            </div>
        </div>
    );
}
