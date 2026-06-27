import { ChevronDown, ChevronRight } from "lucide-react";

const ChevronToggle: React.FC<{ open: boolean; onClick?: () => void }> = ({
    open,
    onClick,
}) => (
    <button
        type="button"
        onClick={onClick}
        className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        aria-label={open ? "Collapse" : "Expand"}
    >
        {open ? (
            <ChevronDown className="h-3.5 w-3.5" strokeWidth={2} />
        ) : (
            <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
        )}
    </button>
);
export default ChevronToggle;
