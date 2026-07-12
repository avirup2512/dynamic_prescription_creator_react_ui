import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FileText, X } from "lucide-react";

import TabNavigation from "../TabNavigation";
import ActionButtons from "./ActionButtons";
import InputHeader from "./InputHeader";
import StyleTab from "./StyleTab/StyleTab";
import Style from "@/components/shared/StyleModule/Style";
import { EditExtraNoteInTemplate, AddQuantityFieldToTemplate, AddVisibilityFieldToTemplate } from "@/features/new-template/store/TemplateSlice";

interface InputEditorProps {
    closeEditor?: () => void;
}

export default function InputEditor({ closeEditor }: InputEditorProps) {
    const { inputType, tab } = useParams();
    const templateState = useSelector((state: any) => state.template);
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState<string>("Content");
    const [inputName, setInputName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [isSaving, setIsSaving] = useState(false);
    const { sectionId, rowId, columnId, inputGroupId, sectionType, inputId } = useParams();
    const currentInput = useMemo(() => {

        const walk = (sections: any[] = []): any => {
            const currentSection = sectionType === 'header' ? templateState.CurrentTemplate.header : templateState.CurrentTemplate.body;
            if (currentSection === undefined || currentSection === null) return undefined;
            const section = currentSection.find((sec: any) => sec.template_section_id === sectionId || sec.id === sectionId);
            if (section === undefined || section === null) return undefined;
            const targetRow = section.rows.find((r: any) => r.template_row_id === rowId);
            if (targetRow === undefined || targetRow === null) return undefined;
            const currentColumn = targetRow.columns.find((c: any) => c.template_column_id === columnId);
            if (currentColumn && currentColumn?.inputGroup && Array.isArray(currentColumn.inputGroup)) {
                const inputGroup = currentColumn.inputGroup.find((g: any) => g.template_input_group_id === inputGroupId);
                if (inputGroup && inputGroup?.inputs) {
                    const input = inputGroup?.inputs.find((input: any) => input?.template_input_id == inputId);
                    if (input)
                        return input;
                }
            }
            return undefined;
        };

        return walk(templateState?.CurrentTemplate?.header) || walk(templateState?.CurrentTemplate?.body) || walk(templateState?.CurrentTemplate?.footer);
    }, [inputId, templateState?.CurrentTemplate]);

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
        setInputName(currentInput?.name || currentInput?.input_name || currentInput?.label || "Untitled input");
        setDescription(currentInput?.description || currentInput?.extra_note_value || "No Description");
    }, [currentInput]);

    const handleCancel = useCallback(() => closeEditor?.(), [closeEditor]);

    const handleSave = useCallback(() => {
        setIsSaving(true);
        window.setTimeout(() => {
            setIsSaving(false);
            closeEditor?.();
        }, 300);
    }, [closeEditor]);
    const setExtraNote = (value: boolean) => {
        console.log(value)
        const payload = { sectionId, rowId, columnId, inputGroupId, sectionType, inputId, extraNote: value ? 1 : 0 }
        dispatch(EditExtraNoteInTemplate(payload));
    }
    const setQuantity = (value: boolean) => {
        const payload = { sectionId, rowId, columnId, inputGroupId, sectionType, inputId, showQuantity: value ? 1 : 0 }
        dispatch(AddQuantityFieldToTemplate(payload));
    }
    const setVisibility = (value: boolean) => {
        const payload = { sectionId, rowId, columnId, inputGroupId, sectionType, inputId, isVisible: value ? 1 : 0 }
        dispatch(AddVisibilityFieldToTemplate(payload));
    }
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
                                {currentInput?.name || currentInput?.input_name || currentInput?.label || "Input"}
                            </h3>
                            <p className="mt-0.5 text-xs text-slate-500">
                                {inputType || currentInput?.type || "input"}
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

            <div className="editor-scrollbar min-h-0 flex-1 overflow-y-auto bg-white px-3 py-3 pb-24" style={{ scrollbarWidth: "thin", scrollbarColor: "#cbd5e1 transparent" }}>
                {activeTab === "Content" && (
                    <InputHeader inputName={inputName} setInputName={setInputName} description={description} setDescription={setDescription} setExtraNote={setExtraNote} setQuantity={setQuantity} setVisibility={setVisibility} extraNote={currentInput?.extra_note} visibility={currentInput?.is_visible} quantity={currentInput?.show_quantity} />
                )}

                {activeTab === "Layout" && (
                    <div className="rounded-md border border-dashed border-slate-200 bg-white py-10 text-center text-slate-400 text-[12px]">
                        Layout settings for this input will appear here.
                    </div>
                )}

                {activeTab === "Style" && (
                    <div className="space-y-2">
                        {currentInput?.template_input_id ? (
                            <Style entityType="input" entityId={currentInput.template_input_id} />
                        ) : (
                            <StyleTab />
                        )}
                    </div>
                )}

                {activeTab === "Validation" && (
                    <div className="rounded-md border border-dashed border-slate-200 bg-white py-10 text-center text-slate-400 text-[12px]">
                        Validation settings for this input will appear here.
                    </div>
                )}

                {activeTab === "Logic" && (
                    <div className="rounded-md border border-dashed border-slate-200 bg-white py-10 text-center text-slate-400 text-[12px]">
                        Logic settings for this input will appear here.
                    </div>
                )}
            </div>

            <div className="sticky bottom-0 z-10 shrink-0 border-t border-slate-200 bg-white px-3 py-2.5 shadow-[0_-4px_12px_rgba(15,23,42,0.08)]">
                <div className="mb-2 text-xs text-slate-500">Last edited by Dr. Patel - 2m ago</div>
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
