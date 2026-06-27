import { ChevronDown, ChevronRight } from "lucide-react";

const ChevronToggle: React.FC<{ open: boolean; onClick?: () => void }> = ({
    open,
    onClick,
}) => (
    <button
        type="button"
        onClick={onClick}
        className="flex h-5 w-5 shrink-0 items-center justify-center text-slate-400 hover:text-slate-600"
        aria-label={open ? "Collapse" : "Expand"}
    >
        {open ? (
            <ChevronDown className="h-4 w-4" strokeWidth={2} />
        ) : (
            <ChevronRight className="h-4 w-4" strokeWidth={2} />
        )}
    </button>
);
export default ChevronToggle;