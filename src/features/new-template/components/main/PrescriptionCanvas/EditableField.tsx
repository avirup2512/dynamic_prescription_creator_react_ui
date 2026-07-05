import { useState, useEffect } from "react";
import { Palette, Settings } from "lucide-react";

import { cn } from "@/lib/utils";
import type { CanvasInput, CanvasMode } from "./prescriptionCanvasTypes";

interface EditableFieldProps {
    input: CanvasInput;
    mode: CanvasMode;
    selected: boolean;
    onSelect: () => void;
    onSettings?: () => void;
    onQuickStyle?: () => void;
    onValueChanges?: (value: string) => void;
    sectionId: string;
    rowId: string;
    columnId: string;
}

export default function EditableField({ input, mode, selected, onSelect, onSettings, onQuickStyle, onValueChanges, sectionId, rowId, columnId }: EditableFieldProps) {
    const [value, setValue] = useState(input.value ?? input?.input_entity_value);
    const label = input.showLabel === false ? "" : input.name || input.label;
    const isMultiline = value?.includes("\n") || value?.length > 72;
    const [debounceQuery, setDebounceQuery] = useState('');

    useEffect(() => {
        const timeout = setTimeout(() => {
            onValueChanges?.(debounceQuery);
        }, 500); // or 300–500ms
        return () => clearTimeout(timeout);
    }, [debounceQuery])
    return (
        <div
            className={cn(
                "group/field relative rounded-md",
                mode === "edit" && "border border-transparent p-2 transition hover:border-dashed hover:border-sky-200 hover:bg-sky-50/20",
                mode === "edit" && selected && "border-sky-300 bg-sky-50/40 ring-1 ring-sky-200"
            )}
            onClick={onSelect}
        >
            {mode === "edit" && (
                <div className="absolute right-1.5 top-1.5 hidden items-center gap-1 group-hover/field:flex">
                    <button
                        type="button"
                        aria-label={`Quick style for ${input.name || input.label}`}
                        onClick={(event) => {
                            event.stopPropagation();
                            onQuickStyle?.();
                        }}
                        className="flex h-6 w-6 items-center justify-center rounded bg-white text-slate-400 shadow-sm transition hover:bg-violet-50 hover:text-violet-600"
                    >
                        <Palette className="h-3.5 w-3.5" />
                    </button>
                    <button
                        type="button"
                        aria-label={`Settings for ${input.name || input.label}`}
                        onClick={(event) => {
                            event.stopPropagation();
                            onSettings?.();
                        }}
                        className="flex h-6 w-6 items-center justify-center rounded bg-white text-slate-400 shadow-sm transition hover:bg-sky-50 hover:text-sky-600"
                    >
                        <Settings className="h-3.5 w-3.5" />
                    </button>
                </div>
            )}

            {label && input?.showLabel && <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">{label}</p>}

            {mode === "preview" ? (
                <p
                    className={cn(
                        "whitespace-pre-line text-[13px] leading-relaxed text-slate-700",
                        input.isBold && "font-semibold text-slate-800",
                        input.fontSize === "large" && "text-[15px]"
                    )}
                >
                    {value || " "}
                </p>
            ) : isMultiline ? (
                <textarea
                    value={value}
                    onChange={(event) => { setDebounceQuery?.(event.target.value); setValue(event.target.value) }}
                    className="min-h-14 w-full resize-none border-0 bg-transparent p-0 pr-7 text-[13px] leading-relaxed text-slate-700 outline-none placeholder:text-slate-300"
                    placeholder="Enter value"
                />
            ) : (
                <input
                    value={value}
                    onChange={(event) => { setDebounceQuery?.(event.target.value), setValue(event.target.value) }}
                    className="w-full border-0 bg-transparent p-0 pr-7 text-[13px] font-medium leading-relaxed text-slate-700 outline-none placeholder:text-slate-300"
                    placeholder="Enter value"
                />
            )}

            {input.note && <p className="mt-0.5 whitespace-pre-line text-[11px] leading-snug text-slate-400">{input.note}</p>}
        </div>
    );
}
