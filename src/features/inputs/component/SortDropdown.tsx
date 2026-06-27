import { ChevronDown } from "lucide-react";

const SortDropdown: React.FC = () => (
    <button
        type="button"
        className="ml-auto flex shrink-0 items-center gap-1 text-[12px] text-slate-500 hover:text-slate-700"
    >
        <span>
            Sort: <span className="font-medium text-slate-700">Relevance</span>
        </span>
        <ChevronDown className="h-3 w-3" strokeWidth={2} />
    </button>
);
export default SortDropdown
