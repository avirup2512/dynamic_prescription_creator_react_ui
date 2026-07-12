import { Sparkles } from "lucide-react";

export default function StyleTab() {
    return (
        <div className="rounded-md border border-dashed border-slate-200 bg-slate-50/60 p-3 text-center text-[12px] text-slate-500">
            <div className="mb-2 flex justify-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <Sparkles className="h-4 w-4" />
                </div>
            </div>
            <p className="font-medium text-slate-700">Input styling options</p>
            <p className="mt-1 text-[11px] text-slate-500">Use the shared style panel to adjust typography, spacing, borders, and colors.</p>
        </div>
    );
}
