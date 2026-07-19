// SectionEditor.tsx

import type { Field, Row } from "@/features/new-template/type/ComponentType";
import { Plus, Section, X } from "lucide-react";
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
import { useParams } from "react-router-dom";
import type { Section as TemplateSection } from "@/features/template/type/TemplateType";
import { AddRowToTemplateSection } from "@/features/new-template/store/TemplateSlice";
// import { StylePanel } from "@/components/shared/StyleInspector";
import Style from "@/components/shared/StyleModule/Style";
interface SectionEditorProps {
    closeEditor?: () => void;
}
export default function SectionEditor({ closeEditor }: SectionEditorProps) {
    // const [style, setStyle] = useState(DEFAULT_STYLE);
    const TemplateState = useSelector((state: any) => state.template);
    const sectionService = SectionService;
    const dispatch = useDispatch();
    const { sectionId, sectionType, tab, entityTypeForStyle, entityId } = useParams();
    const { selectedId } = useBuilder();
    // const [sectionType, setSectionType] = useState('');
    const [localSectionType, setLocalSectionType] = useState(sectionType);
    const [currentSection, setCurrentSection] = useState<TemplateSection>();
    useEffect(() => {
        console.log(sectionId)
        if (sectionId) {
            getSectionDetailsById(sectionId);
        }
    }, [sectionId])
    useEffect(() => {
        if (tab) {
            switch (tab) {
                case 'content':
                    setActiveTab("Content")
                    break;
                case 'layout':
                    setActiveTab("Layout")
                    break;
                case 'style':
                    setActiveTab("Style")
                    break;
                default:
                    break;
            }
        }
    }, [tab])
    const getSectionDetailsById = useCallback(async (sectionId: string) => {
        console.log(TemplateState.CurrentTemplate)
        try {
            if (sectionType) {
                console.log(sectionType);
                console.log(TemplateState?.CurrentTemplate);
                TemplateState?.CurrentTemplate[sectionType]?.forEach((section: any) => {
                    if (section?.template_section_id == sectionId || section?.id == sectionId) {
                        setCurrentSection(section);
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
    }, [TemplateState?.CurrentTemplate, sectionType]);

    useEffect(() => {
        console.log(TemplateState?.CurrentTemplate)
        if (sectionId)
            getSectionDetailsById(sectionId);
    }, [TemplateState?.CurrentTemplate, sectionId]);
    useEffect(() => {
        setLocalSectionType(sectionType)
    }, [sectionType]);

    const [activeTab, setActiveTab] = useState<string>("Content");
    const [sectionName, setSectionName] = useState<string>("Patient Information");
    const [description, setDescription] = useState<string>("No Description");
    const [isSaving, setIsSaving] = useState(false);

    const handleCancel = (): void => {
        closeEditor?.();
    };

    const handleSave = async (): Promise<void> => {
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

    const AddRowToTemplate = () => {
        dispatch(AddRowToTemplateSection({ sectionType, sectionId }));
    }

    return (
        <div className="flex h-screen max-h-screen w-[360px] flex-col border-l border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.08)]">
            <div className="shrink-0 border-b border-slate-200 px-3 py-3">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex min-w-0 flex-1 items-center gap-2">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                            <Section className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <h3 className="truncate text-sm font-semibold text-slate-900">
                                {currentSection?.name}
                            </h3>
                            <p className="mt-0.5 text-xs text-slate-500">
                                Section - {currentSection?.rows?.length} rows - 6 fields
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

            <div className="shrink-0 border-b border-slate-200">
                <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>

            <div
                className="editor-scrollbar min-h-0 flex-1 overflow-y-auto bg-white px-3 py-3 pb-24"
                style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "#cbd5e1 transparent"
                }}
            >
                {activeTab === "Content" && (
                    <div className="space-y-3">
                        <SectionHeader
                            sectionName={currentSection?.name ?? "Patient Information"}
                            setSectionName={setSectionName}
                            description={currentSection?.description ?? "No Description"}
                            setDescription={setDescription}
                        />

                    </div>
                )}

                {activeTab === "Layout" && (
                    <div className="rounded-md bg-white py-3 text-center text-slate-400">
                        {/* <p className="text-[12px]">Layout settings</p> */}
                        {currentSection?.rows.map((row: any, rowIndex: number) => (
                            <div
                                key={row.id ?? row.template_row_id}
                                className="overflow-hidden border border-slate-200 bg-white shadow-[0_1px_1px_rgba(15,23,42,0.02)]"
                            >
                                <RowNode row={row as any} sectionId={sectionId} sectionType={sectionType} rowIndex={rowIndex} />
                            </div>
                        ))}
                        <button
                            onClick={AddRowToTemplate}
                            className="flex h-7 w-full items-center justify-center mt-3 gap-1.5 border border-dashed border-slate-200 bg-white text-xs font-medium text-slate-500 hover:border-blue-200 hover:bg-blue-50/60 hover:text-slate-900"
                        >
                            <Plus className="h-3 w-3" /> Add Row
                        </button>
                    </div>
                )}

                {activeTab === "Style" && (
                    <div className="space-y-2">
                        {/* <StyleTab /> */}
                        {/* <StylePanel onApply={(state) => console.log(state)} /> */}
                        {
                            entityTypeForStyle && entityId &&
                            <Style entityType={entityTypeForStyle} entityId={entityId} />
                        }
                    </div>
                )}

                {activeTab === "Validation" && (
                    <div className="rounded-md border border-dashed border-slate-200 bg-white py-10 text-center text-slate-400">
                        <p className="text-xs">Validation settings</p>
                    </div>
                )}

                {activeTab === "Logic" && (
                    <div className="rounded-md border border-dashed border-slate-200 bg-white py-10 text-center text-slate-400">
                        <p className="text-xs">Logic settings</p>
                    </div>
                )}
            </div>

            {/* <div className="sticky bottom-0 z-10 shrink-0 border-t border-slate-200 bg-white px-3 py-2.5 shadow-[0_-4px_12px_rgba(15,23,42,0.08)]">
                <div className="text-xs text-slate-500 mb-2">Last edited by Dr. Patel - 2m ago</div>
                <div className="space-y-2">
                    <ActionButtons onCancel={handleCancel} onSave={handleSave} />
                    {isSaving ? <p className="text-xs text-blue-600">Saving section…</p> : null}
                </div>
            </div> */}

            <style>{`
              .editor-scrollbar::-webkit-scrollbar {
                width: 6px;
              }
              .editor-scrollbar::-webkit-scrollbar-track {
                background: transparent;
              }
              .editor-scrollbar::-webkit-scrollbar-thumb {
                background-color: #cbd5e1;
                border-radius: 3px;
                border: 2px solid transparent;
                background-clip: padding-box;
              }
              .editor-scrollbar::-webkit-scrollbar-thumb:hover {
                background-color: #94a3b8;
                background-clip: padding-box;
              }
            `}</style>
        </div>
    );
}
