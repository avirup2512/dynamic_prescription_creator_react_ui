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
    const border = accent === "row" ? "border-l-blue-500" : "border-l-blue-500";
    const labelColor = accent === "row" ? "text-primary-600" : "text-primary-600";
    const label = accent === "row" ? "ROW" : "COL";
    return (
        <div className={`group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 border-l-2 ${border} px-3 py-2`}>
            <button
                onClick={onToggle}
                className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
                {open ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
            </button>
            <div className="flex min-w-0 items-center gap-1.5">
                <span className={`shrink-0 text-[9px] font-bold tracking-wider ${labelColor}`}>{label}</span>
                <Input
                    value={name}
                    onChange={(e) => onRename(e.target.value)}
                    className="h-6 min-w-0 border-0 bg-transparent px-1 text-sm font-medium shadow-none focus-visible:bg-background focus-visible:ring-1"
                />
                <span className="shrink-0 text-[10px] text-muted-foreground">{meta}</span>
            </div>
            <button
                onClick={onDelete}
                className="rounded p-1 text-muted-foreground opacity-0 transition-opacity hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
            >
                <Trash2 className="h-3 w-3" />
            </button>
        </div>
    );
}

export default NodeHeader;