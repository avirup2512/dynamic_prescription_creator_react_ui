import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronRight, Trash2 } from "lucide-react";

function NodeHeader({
    accent, open, onToggle, name, onRename, onDelete, meta,
}: {
    accent: "row" | "col";
    open: boolean; onToggle: () => void;
    name: string; onRename: (v: string) => void;
    onDelete: () => void; meta: string;
}) {
    const border = accent === "row" ? "border-l-blue-500" : "border-l-cyan-500";
    const labelColor = accent === "row" ? "text-blue-600" : "text-cyan-600";
    const label = accent === "row" ? "ROW" : "COL";
    return (
        <div className={`group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-1.5 border-l-2 ${border} px-2 py-1.5`}>
            <button
                onClick={onToggle}
                className="rounded p-0.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
                {open ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
            </button>
            <div className="flex min-w-0 items-center gap-1.5">
                <span className={`shrink-0 text-[9px] font-bold tracking-wider ${labelColor}`}>{label}</span>
                <Input
                    value={name}
                    onChange={(e) => onRename(e.target.value)}
                    className="h-6 min-w-0 border-0 bg-transparent px-1 text-[12px] font-medium text-slate-800 shadow-none focus-visible:bg-white focus-visible:ring-1"
                />
                <span className="shrink-0 rounded bg-slate-100 px-1.5 py-0.5 text-[10px] leading-none text-slate-500">{meta}</span>
            </div>
            <button
                onClick={onDelete}
                className="rounded p-1 text-slate-400 opacity-0 transition-opacity hover:bg-red-50 hover:text-red-600 group-hover:opacity-100"
            >
                <Trash2 className="h-3 w-3" />
            </button>
        </div>
    );
}

export default NodeHeader;
