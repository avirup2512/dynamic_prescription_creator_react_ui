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

interface SectionEditorProps {
    closeEditor?: () => void;
}

interface EditorSectionState {
    defaultSection?: unknown;
    currentSection?: {
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
            dispatch(SetCurrentSection(SectionState?.defaultSection));
        }
    }, [SectionState?.defaultSection, dispatch, getSectionDetailsById, selectedId, isEditMode]);

    const [activeTab, setActiveTab] = useState<string>("Content");
    const [sectionName, setSectionName] = useState<string>("Patient Information");
    const [description, setDescription] = useState<string>("No Description");
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
        alert("Changes canceled");
    };

    const handleSave = (): void => {
        alert("Changes saved");
        console.log({ sectionName, description, fields, rows });
    };

    const currentRows = SectionState?.currentSection?.rows ?? [];

    return (
        <div className="flex h-screen w-[360px] flex-col border-l border-slate-200 bg-[#fbfbfa] shadow-[0_8px_30px_rgba(15,23,42,0.08)]">
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

            <div className="min-h-0 flex-1 bg-white space-y-3 overflow-y-auto px-3 py-3">
                {activeTab === "Content" && (
                    <div className="space-y-3">
                        <SectionHeader
                            sectionName={SectionState?.currentSection?.name}
                            setSectionName={setSectionName}
                            description={SectionState?.currentSection?.description}
                            setDescription={setDescription}
                        />

                    </div>
                )}

                {activeTab === "Layout" && (
                    <div className="rounded-md border border-dashed border-slate-200 bg-white py-10 text-center text-slate-400">
                        <p className="text-[12px]">Layout settings</p>
                        {currentRows.map((row: { id?: string; template_row_id?: string }) => (
                            <div
                                key={row.id ?? row.template_row_id}
                                className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-[0_1px_1px_rgba(15,23,42,0.02)]"
                            >
                                <RowNode row={row} />
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === "Style" && (
                    <div className="rounded-md border border-dashed border-slate-200 bg-white py-10 text-center text-slate-400">
                        <p className="text-[12px]">Style settings</p>
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

            <div className="shrink-0 border-t border-slate-200 bg-white px-3 py-2.5">
                <p className="mb-2 text-[11px] text-slate-500">Last edited by Dr. Patel - 2m ago</p>
                <ActionButtons onCancel={handleCancel} onSave={handleSave} />
            </div>
        </div>
    );
}
