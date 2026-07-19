import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BookOpen, CalendarDays, Clock, FileText, Hash, X } from "lucide-react";
import ActionButtons from "./ActionButtons";
import { EditExtraNoteInTemplate, AddQuantityFieldToTemplate, AddVisibilityFieldToTemplate, AddInputTypeToTemplate } from "@/features/new-template/store/TemplateSlice";
import { v4 as uuid } from "uuid"
import { INPUT_TYPE } from "@/constant/inputType.enum";

interface InputEditorProps {
    closeEditor?: () => void;
}

export default function AddNewInputEditor({ closeEditor }: InputEditorProps) {
    const templateState = useSelector((state: any) => state.template);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSaving, setIsSaving] = useState(false);
    const { id, sectionId, rowId, columnId, inputGroupId, sectionType } = useParams();

    useEffect(() => {

    }, []);
    const inputOptions = useMemo(
        () => [
            { key: "blankText", label: "Blank Text", icon: BookOpen },
            { key: "date", label: "Date", icon: CalendarDays },
            { key: "time", label: "Time", icon: Clock },
            { key: "number", label: "Number", icon: Hash },
            { key: "library", label: "Library", icon: FileText },
        ],
        []
    );
    const [selectedOption, setSelectedOption] = useState<string>(inputOptions[0].key);
    const handleCancel = useCallback(() => closeEditor?.(), [closeEditor]);

    const handleSave = useCallback(() => {
        setIsSaving(true);
        switch (selectedOption) {
            case "blankText":
                const input = {
                    "template_input_id": uuid(),
                    "input_name": "Label",
                    "input_type_name": INPUT_TYPE.INPUTTYPE_7,
                    "template_input_value": "",
                    "status": "draft"
                }
                const payload = { sectionId, rowId, columnId, input, inputGroupId: inputGroupId, sameGroup: true, sectionType: sectionType ? sectionType : '' }
                dispatch(AddInputTypeToTemplate(payload));
                closeEditor?.();
                break;
            case "date":
                const dateInput = {
                    "template_input_id": uuid(),
                    "input_name": "Date",
                    "input_type_name": INPUT_TYPE.INPUTTYPE_6,
                    "template_input_value": new Date().toISOString(),
                }
                const datePayload = { sectionId, rowId, columnId, input: dateInput, inputGroupId: inputGroupId, sameGroup: true, sectionType: sectionType ? sectionType : '' }
                dispatch(AddInputTypeToTemplate(datePayload));
                closeEditor?.();
                break;
            case "time":
                const timeInput = {
                    "template_input_id": uuid(),
                    "input_name": "Time",
                    "input_type_name": INPUT_TYPE.INPUTTYPE_8,
                    "template_input_value": "",
                }
                const timePayload = { sectionId, rowId, columnId, input: timeInput, inputGroupId: inputGroupId, sameGroup: true, sectionType: sectionType ? sectionType : '' }
                dispatch(AddInputTypeToTemplate(timePayload));
                closeEditor?.();
                break;
            case "number":
                const numberInput = {
                    "template_input_id": uuid(),
                    "input_name": "Number",
                    "input_type_name": INPUT_TYPE.INPUTTYPE_10,
                    "template_input_value": 1,
                }
                const numberPayload = { sectionId, rowId, columnId, input: numberInput, inputGroupId: inputGroupId, sameGroup: true, sectionType: sectionType ? sectionType : '' }
                dispatch(AddInputTypeToTemplate(numberPayload));
                closeEditor?.();
                break;
            case "library":
                navigate(`/dashboard/new-template/edit/${id}/sectionType/input/${sectionId}/${rowId}/${columnId}/${inputGroupId}/${sectionType}/inputs/INPUT_TYPE_1`)
                break;
            default:
                break;
        }
        setIsSaving(false);
        // closeEditor?.();
    }, [closeEditor, selectedOption]);




    const renderOption = (option: { key: string; label: string; icon: any }) => {
        const Icon = option.icon;
        const active = selectedOption === option.key;

        return (
            <button
                key={option.key}
                type="button"
                onClick={() => setSelectedOption(option.key)}
                className={`group flex h-18 flex-col items-center justify-center gap-1.5 rounded-xl border px-2.5 py-2 text-xs font-medium transition-all duration-200 ${active
                    ? "border-violet-500 bg-violet-50 text-violet-700 shadow-sm"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                    }`}
            >
                <span
                    className={`flex h-9 w-9 items-center justify-center rounded-xl ${active ? "bg-violet-100 text-violet-700" : "bg-slate-100 text-slate-500"
                        }`}
                >
                    <Icon className="h-4 w-4" />
                </span>
                <span className="text-xs leading-4">{option.label}</span>
            </button>
        );
    };

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
                                Add New Input
                            </h3>
                            <p className="mt-0.5 text-xs text-slate-500">
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

            {/* <div className="shrink-0 border-b border-slate-200">
                <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
            </div> */}

            <div className="editor-scrollbar min-h-0 flex-1 overflow-y-auto bg-white px-3 py-3 pb-48" style={{ scrollbarWidth: "thin", scrollbarColor: "#cbd5e1 transparent" }}>
                <div className="space-y-3">
                    <div className="rounded-3xl bg-slate-50 p-3">
                        <div className="mb-2.5 flex items-center justify-between gap-2">
                            <div>
                                <h4 className="text-xs font-semibold text-slate-900">Select input type</h4>
                                <p className="mt-1 text-[11px] text-slate-500">Choose one option to define the new input field.</p>
                            </div>
                            {/* <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-600">
                                1 of 1
                            </span> */}
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {inputOptions.map(renderOption)}
                        </div>
                    </div>
                </div>
            </div>

            <div className="sticky bottom-0 z-10 shrink-0 border-t border-slate-200 bg-white px-3 py-2.5 shadow-[0_-4px_12px_rgba(15,23,42,0.08)]">
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
