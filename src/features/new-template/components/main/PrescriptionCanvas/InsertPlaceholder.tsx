import { Plus } from "lucide-react";

import type { CanvasMode } from "./prescriptionCanvasTypes";

interface InsertPlaceholderProps {
    mode: CanvasMode;
    label: string;
}

export default function InsertPlaceholder({ mode, label }: InsertPlaceholderProps) {
    if (mode === "preview") return null;

    return (
        <button
            type="button"
            className="flex min-h-14 w-full items-center justify-center gap-1.5 rounded-md border border-dashed border-sky-200 bg-sky-50/30 text-[11px] font-semibold text-sky-600 transition hover:border-sky-300 hover:bg-sky-50"
        >
            <Plus className="h-3.5 w-3.5" />
            {label}
        </button>
    );
}
