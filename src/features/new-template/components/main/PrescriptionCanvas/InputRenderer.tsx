import type { ReactNode } from "react";
import { Stethoscope } from "lucide-react";

import { cn } from "@/lib/utils";
import type { CanvasInput, CanvasMode, CanvasSelection } from "./prescriptionCanvasTypes";
import EditableField from "./EditableField";
import HoverToolbar from "./HoverToolbar";

interface InputRendererProps {
    input: CanvasInput;
    mode: CanvasMode;
    selection: CanvasSelection;
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

function MetricInput({ input }: { input: CanvasInput }) {
    return (
        <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">{input.label}</p>
            <p className="mt-1 text-[14px] font-bold tracking-wide text-slate-700">{input.value}</p>
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

export default function InputRenderer({ input, mode, selection, onSelect, sectionId, rowId, columnId, onQuickStyleInput, onOpenFieldEditor }: InputRendererProps) {
    const selected = selection.inputId === input.id;
    const selectInput = () => onSelect({ inputId: input.id });

    if (!input.variant || input.variant === "field") {
        return <EditableField input={input} mode={mode} selected={selected} onSelect={selectInput} sectionId={sectionId} rowId={rowId} columnId={columnId} onQuickStyle={() => onQuickStyleInput?.(sectionId, rowId, columnId, input.id)} onSettings={() => onOpenFieldEditor?.(input.id)} />;
    }

    const content = {
        clinic: <ClinicInput input={input} />,
        address: <AddressInput input={input} />,
        metric: <MetricInput input={input} />,
        medicines: <MedicineList input={input} />,
        tests: <TestList input={input} />,
        list: <InstructionList input={input} />,
        signature: <SignatureInput input={input} />,
        field: null,
    }[input.variant];

    return (
        <InputFrame input={input} mode={mode} selected={selected} onSelect={selectInput}>
            {content}
        </InputFrame>
    );
}
