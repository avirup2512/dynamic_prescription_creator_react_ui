import { useEffect, useState, type ReactNode } from "react";
import { Stethoscope } from "lucide-react";

import { cn } from "@/lib/utils";
import type { CanvasInput, CanvasMode, CanvasSelection } from "./prescriptionCanvasTypes";
import EditableField from "./EditableField";
import HoverToolbar from "./HoverToolbar";
import { INPUT_TYPE } from "@/constant/inputType.enum";
import { useDispatch } from "react-redux";
import { AddEditDropdownTextValueToTemplate } from "@/features/new-template/store/TemplateSlice";

interface InputRendererProps {
    input: CanvasInput;
    mode: CanvasMode;
    selection: CanvasSelection;
    sectionType: "header" | "body" | "footer";
    inputGroupId: string;
    onSelect: (selection: CanvasSelection) => void;
    sectionId: string;
    rowId: string;
    columnId: string;
    onQuickStyleInput?: (sectionId: string, rowId: string, columnId: string, inputId: string) => void;
    onOpenFieldEditor?: (inputId: string) => void;
}

function InputFrame({
    input,
    mode,
    selected,
    onSelect,
    children,
}: {
    input: CanvasInput;
    mode: CanvasMode;
    selected: boolean;
    onSelect: () => void;
    children: ReactNode;
}) {
    return (
        <div
            className={cn(
                "group relative rounded-md",
                mode === "edit" && "border border-transparent p-2 transition hover:border-dashed hover:border-sky-200 hover:bg-sky-50/20",
                mode === "edit" && selected && "border-sky-300 bg-sky-50/40 ring-1 ring-sky-200"
            )}
            onClick={onSelect}
        >
            <HoverToolbar mode={mode} label={input.label} />
            {children}
        </div>
    );
}

function ClinicInput({ input }: { input: CanvasInput }) {
    return (
        <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-sky-100 bg-sky-50 text-sky-600">
                <Stethoscope className="h-6 w-6" />
            </div>
            <div className="min-w-0">
                <p className="truncate text-[19px] font-black leading-tight text-slate-900">{input.value}</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">{input.note}</p>
            </div>
        </div>
    );
}

function AddressInput({ input }: { input: CanvasInput }) {
    return <p className="whitespace-pre-line text-right text-[11px] leading-relaxed text-slate-400">{input.value}</p>;
}

function RecipeInput({ input }: { input: CanvasInput }) {
    const recipeData = input as CanvasInput & {
        recipeCode?: string | null;
        description?: string | null;
        servingSize?: number | string | null;
        servingUnit?: string | null;
        preparationTime?: number | string | null;
        instructions?: string | null;
        nutrients?: Record<string, number | string | null | undefined>;
        ingredients?: Array<{
            name?: string;
            quantity?: number | string | null;
            unit?: string | null;
            remarks?: string | null;
            optional?: boolean;
        }>;
        groupName?: string | null;
        category?: string | null;
    };

    const recipeName = recipeData.name || recipeData.value || recipeData.label || "Recipe";
    const servingLabel = recipeData.servingSize
        ? `${recipeData.servingSize}${recipeData.servingUnit ? ` ${recipeData.servingUnit}` : ""}`
        : "";
    const nutrientEntries = Object.entries(recipeData.nutrients ?? {}).filter(([, value]) => value !== null && value !== undefined && value !== "");
    const ingredientItems = Array.isArray(recipeData.ingredients) ? recipeData.ingredients : [];
    const featuredNutrients = ["energy", "protein", "carbohydrate", "fat", "fiber"];

    const highlightedNutrients = nutrientEntries.filter(([key]) => featuredNutrients.includes(key.toLowerCase()));

    return (
        <div className="rounded-md border border-slate-200 bg-white p-3 shadow-sm">
            <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                    <p className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-900">{recipeName}</p>
                    {servingLabel ? (
                        <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-600">{servingLabel}</p>
                    ) : null}
                </div>
                {highlightedNutrients.length ? (
                    <div className="flex flex-wrap justify-end gap-1">
                        {highlightedNutrients.slice(0, 3).map(([key, value], index) => (
                            <span key={`${recipeData.id ?? input.id}-nutrient-${index}`} className="rounded-full bg-slate-50 px-2 py-0.5 text-[9px] font-semibold text-slate-600">
                                {key.replace(/_/g, " ")}: {value}
                            </span>
                        ))}
                    </div>
                ) : null}
            </div>

            <div className="mt-3">
                <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">Ingredients</p>
                <ul className="space-y-1.5">
                    {ingredientItems.length ? (
                        ingredientItems.slice(0, 6).map((item, index) => {
                            const ingredientName = item.name || `Ingredient ${index + 1}`;
                            const portionLabel = [item.quantity, item.unit].filter(Boolean).join(" ");
                            const remark = item.remarks ? ` • ${item.remarks}` : "";
                            return (
                                <li key={`${recipeData.id ?? input.id}-ingredient-${index}`} className="flex items-start justify-between gap-2 rounded border border-slate-100 px-2 py-1.5">
                                    <span className="text-[11px] text-slate-700">{ingredientName}</span>
                                    <span className="text-right text-[10px] font-medium text-slate-500">{portionLabel || "—"}{remark}</span>
                                </li>
                            );
                        })
                    ) : (
                        <li className="rounded border border-dashed border-slate-200 px-2 py-1.5 text-[11px] text-slate-500">
                            No ingredients available yet.
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}

function MetricInput({ input }: { input: CanvasInput }) {
    return (
        <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">{input.label}</p>
            <p className="mt-1 text-[14px] font-bold tracking-wide text-slate-700">{input.value}</p>
        </div>
    );
}

function DropdownInput({ input, mode, onValueChange }: { input: CanvasInput; mode: any, onValueChange: (value: string) => void }) {
    const selectedOptionId = input.dropdown_option_id ?? "";
    const options = (input.dropdown_options ?? []).map((item, index) => {
        const optionId = item.id ?? `${input.id}-option-${index + 1}`;
        const optionValue = item.value ?? item.label ?? item.name ?? `${index + 1}`;
        const optionLabel = item.label ?? item.name ?? optionValue;
        return { id: optionId, value: optionValue, label: optionLabel };
    });
    const selectedOptionValue = options.length ? options?.find((o: any) => o.id === selectedOptionId)?.value : ''

    return (
        <div>
            {
                input?.showLabel === 1 && <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">{input.label || input?.name}</p>
            }
            {
                mode == "edit" && <select
                    value={selectedOptionId}
                    className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-700 outline-none ring-0"
                    onChange={(e) => {
                        onValueChange(e.target.value);
                    }}
                >
                    {!selectedOptionId && <option value="">Select an option</option>}
                    {options.map((option: any) => (
                        <option key={option.id} value={option.id}>
                            {option.label}
                        </option>
                    ))}
                </select>
            }
            <span className={cn(
                "whitespace-pre-line text-[13px] leading-relaxed text-slate-700",
                input.isBold && "font-semibold text-slate-800",
                input.fontSize === "large" && "text-[15px]"
            )}>
                {selectedOptionValue}
            </span>
        </div>
    );
}

function MedicineList({ input }: { input: CanvasInput }) {
    return (
        <div>
            <p className="mb-5 text-[13px] font-black uppercase tracking-[0.24em] text-slate-900">RX - Medications</p>
            <div className="divide-y divide-slate-100">
                {(input.items ?? []).map((item, index) => (
                    <div key={`${input.id}-${index}`} className="grid grid-cols-[minmax(0,1.55fr)_minmax(92px,0.8fr)_72px_72px] items-start gap-4 py-4 first:pt-0 last:pb-0">
                        <div>
                            <p className="text-[13px] font-bold text-slate-800">{item.name}</p>
                            <p className="mt-0.5 text-[10px] text-slate-400">{item.type}</p>
                        </div>
                        <p className="font-mono text-[12px] font-semibold text-slate-600">{item.dose}</p>
                        <p className="text-[12px] font-medium text-slate-600">{item.duration}</p>
                        <p className="justify-self-end rounded bg-slate-100 px-2 py-0.5 text-center text-[10px] font-black text-slate-700">
                            {item.tag}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function TestList({ input }: { input: CanvasInput }) {
    return (
        <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">{input.label}</p>
            <div className="divide-y divide-slate-100">
                {(input.items ?? []).map((item, index) => (
                    <div key={`${input.id}-${index}`} className="grid grid-cols-[46px_minmax(0,1fr)] gap-4 py-2.5">
                        <p className="font-mono text-[10px] font-semibold uppercase text-slate-400">{item.code}</p>
                        <p className="text-[13px] font-medium text-slate-700">{item.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function InstructionList({ input }: { input: CanvasInput }) {
    return (
        <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">{input.label}</p>
            <ul className="list-disc space-y-1 pl-4 text-[13px] leading-relaxed text-slate-700">
                {(input.items ?? []).map((item, index) => (
                    <li key={`${input.id}-${index}`}>{item.text}</li>
                ))}
            </ul>
        </div>
    );
}

function SignatureInput({ input }: { input: CanvasInput }) {
    return (
        <div className="border-t border-slate-400 pt-2 text-center">
            <p className="text-[12px] font-black text-slate-900">{input.value}</p>
            <p className="text-[10px] text-slate-400">{input.note}</p>
        </div>
    );
}

export default function InputRenderer({ input, mode, selection, sectionType, onSelect, sectionId, rowId, columnId, inputGroupId, onQuickStyleInput, onOpenFieldEditor }: InputRendererProps) {
    const selected = selection.inputId === input.template_input_id;
    const selectInput = () => onSelect({ inputId: input.template_input_id });
    console.log("InputRenderer", input, mode, selection, sectionType, sectionId, rowId, columnId)
    const [variant, setVariant] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        if (input.type_name) {
            const variant = input?.type_name === INPUT_TYPE.INPUTTYPE_1 ? "field" : input?.type_name === INPUT_TYPE.INPUTTYPE_2 ? "dropdown" : input?.type_name === INPUT_TYPE.INPUTTYPE_3 ? "address" : input?.type_name === INPUT_TYPE.INPUTTYPE_4 ? "recipe" : input?.type_name === INPUT_TYPE.INPUTTYPE_5 ? "medicines" : input?.type_name === INPUT_TYPE.INPUTTYPE_6 ? "tests" : input?.type_name === INPUT_TYPE.INPUTTYPE_7 ? "list" : input?.type_name === INPUT_TYPE.INPUTTYPE_8 ? "signature" : input?.type_name === INPUT_TYPE.INPUTTYPE_9 ? "recipe" : 'field';
            setVariant(variant);
        } else {
            setVariant('field');
        }
    }, [input]);
    const AddEditDropdownValue = (value: string) => {
        console.log("AddEditDropdownValue", input);
        // Handle the value change here, e.g., update the input value in the state or make an API call
        const payload = { sectionId, rowId, columnId, inputId: input.template_input_id || input?.id, inputGroupId, dropdownOptionId: value, sectionType }
        dispatch(AddEditDropdownTextValueToTemplate(payload))
    }
    const EditFieldValue = (value: string) => {
        console.log(value);
    }
    if (variant === "field") {
        return <EditableField input={input} mode={mode} onValueChanges={EditFieldValue} selected={selected} onSelect={selectInput} sectionId={sectionId} rowId={rowId} columnId={columnId} onQuickStyle={() => onQuickStyleInput?.(sectionId, rowId, columnId, input.id)} onSettings={() => onOpenFieldEditor?.(input.id)} />;
    }
    const content = {
        clinic: <ClinicInput input={input} />,
        dropdown: <DropdownInput input={input} mode={mode} onValueChange={AddEditDropdownValue} />,
        address: <AddressInput input={input} />,
        metric: <MetricInput input={input} />,
        medicines: <MedicineList input={input} />,
        tests: <TestList input={input} />,
        list: <InstructionList input={input} />,
        signature: <SignatureInput input={input} />,
        recipe: <RecipeInput input={input} />,
        field: null,
    }[variant];

    return (
        <InputFrame input={input} mode={mode} selected={selected} onSelect={selectInput}>
            {content}
        </InputFrame>
    );
}
