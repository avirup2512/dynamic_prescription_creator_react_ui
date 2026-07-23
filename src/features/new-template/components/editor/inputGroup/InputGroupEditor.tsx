import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FileText, X } from "lucide-react";

import TabNavigation from "../TabNavigation";
import ActionButtons from "./ActionButtons";
import InputGroupContent from "./InputGroupContent";
import {
    InputGroupNameUpdateInTemplate,
    AddConditionInputGroupToTemplateColumn,
    UpdateVisibilityInputGroupToTemplate,
} from "@/features/new-template/store/TemplateSlice";

interface InputEditorProps {
    closeEditor?: () => void;
}

export default function InputGroupEditor({ closeEditor }: InputEditorProps) {
    const { inputType, tab } = useParams();
    const templateState = useSelector((state: any) => state.template);
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState<string>("Content");
    const [inputGroupName, setInputGroupName] = useState<string>("");
    const [isSaving, setIsSaving] = useState(false);
    const [inputFormData, setInputFormData] = useState<any>(null);
    const { sectionId, rowId, columnId, inputGroupId, sectionType, inputId } = useParams();
    const [hasPreviousInputGroup, setHasPreviousInputGroup] = useState(false);
    const [previousInputGroupId, setPreviousInputGroupId] = useState<string>('');
    const currentInputGroup = useMemo(() => {
        const walk = (sections: any[] = []): any => {
            const currentSection = sectionType === 'header' ? templateState.CurrentTemplate.header : templateState.CurrentTemplate.body;
            if (currentSection === undefined || currentSection === null) return undefined;
            const section = currentSection.find((sec: any) => sec.template_section_id === sectionId || sec.id === sectionId);
            if (section === undefined || section === null) return undefined;
            const targetRow = section.rows.find((r: any) => r.template_row_id === rowId);
            if (targetRow === undefined || targetRow === null) return undefined;
            const currentColumn = targetRow.columns.find((c: any) => c.template_column_id === columnId);
            if (currentColumn && currentColumn?.inputGroup && Array.isArray(currentColumn.inputGroup)) {
                const inputGroupIndex = currentColumn.inputGroup.findIndex((g: any) => g.template_input_group_id === inputGroupId);
                const previousInputGroup = currentColumn.inputGroup[inputGroupIndex - 1];
                if (inputGroupIndex !== -1) {
                    setHasPreviousInputGroup((previousInputGroup ? true : false));
                    setPreviousInputGroupId(previousInputGroup?.template_input_group_id || '');
                    return currentColumn.inputGroup[inputGroupIndex];
                }
            }
            return undefined;
        };

        return walk(templateState?.CurrentTemplate?.header) || walk(templateState?.CurrentTemplate?.body) || walk(templateState?.CurrentTemplate?.footer);
    }, [inputGroupId, templateState?.CurrentTemplate]);

    useEffect(() => {
        if (tab) {
            switch (tab) {
                case "content":
                    setActiveTab("Content");
                    break;
                case "layout":
                    setActiveTab("Layout");
                    break;
                case "style":
                    setActiveTab("Style");
                    break;
                default:
                    break;
            }
        }
    }, [tab]);

    useEffect(() => {
        setInputGroupName(currentInputGroup?.input_group_name || "Untitled input");
        console.log(currentInputGroup);
    }, [currentInputGroup]);

    const handleCancel = useCallback(() => closeEditor?.(), [closeEditor]);

    const handleSave = useCallback(() => {
        console.log("InputEditor Save -> formData:", inputFormData);
        const targetInputGroupId = currentInputGroup?.template_input_group_id || inputGroupId;
        const basePayload = {
            sectionId,
            rowId,
            columnId,
            inputGroupId: targetInputGroupId,
            sectionType,
        };
        if (targetInputGroupId) {
            dispatch(InputGroupNameUpdateInTemplate({ ...basePayload, inputGroupName: inputFormData.label }));
            if (hasPreviousInputGroup && previousInputGroupId)
                dispatch(AddConditionInputGroupToTemplateColumn({ ...basePayload, previousInputGroupId, conditionName: inputFormData.selectedRelationshipValue }))
            dispatch(UpdateVisibilityInputGroupToTemplate({ ...basePayload, isVisible: inputFormData.visible ? 1 : 0 }))
        }
        setIsSaving(true);
        window.setTimeout(() => {
            setIsSaving(false);
            closeEditor?.();
        }, 300);
    }, [closeEditor, currentInputGroup, dispatch, inputFormData, inputGroupId, inputId, rowId, sectionId, sectionType, columnId]);
    return (
        <div className="flex h-screen max-h-screen w-[360px] flex-col border-l border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.08)]">
            <div className="shrink-0 border-b border-slate-200 px-3 py-3">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex min-w-0 flex-1 items-center gap-2">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-violet-50 text-violet-600 ring-1 ring-violet-100">
                            <FileText className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <h3 className="truncate text-sm font-semibold text-slate-900">
                                {currentInputGroup?.input_group_name || "Input Group"}
                            </h3>
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
                <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} entityType="INPUT_GROUP" />
            </div>

            <div className="editor-scrollbar min-h-0 flex-1 overflow-y-auto bg-white px-3 py-3 pb-48" style={{ scrollbarWidth: "thin", scrollbarColor: "#cbd5e1 transparent" }}>
                {activeTab === "Content" && (
                    <InputGroupContent
                        hasPreviousInputGroup={hasPreviousInputGroup}
                        inputGroup={currentInputGroup}
                        onFormDataChange={setInputFormData}
                        inputEntityId={currentInputGroup?.input_entity_id || currentInputGroup?.id}
                    />
                )}
            </div>

            <div className="sticky bottom-0 z-10 shrink-0 border-t border-slate-200 bg-white px-3 py-2.5 shadow-[0_-4px_12px_rgba(15,23,42,0.08)]">
                {/* <div className="mb-2 text-xs text-slate-500">Last edited by Dr. Patel - 2m ago</div> */}
                <div className="space-y-2">
                    <ActionButtons onCancel={handleCancel} onSave={handleSave} />
                    {isSaving ? <p className="text-xs text-blue-600">Saving input…</p> : null}
                </div>
            </div>

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
