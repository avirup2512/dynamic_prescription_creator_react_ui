import { ChevronDown, ChevronUp, CornerDownLeft, Search } from "lucide-react";

const SearchField: React.FC<{ value: string; onChange: (v: string) => void }> = ({
    value,
    onChange,
}) => (
    <div className="relative">
        <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            strokeWidth={2}
        />
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search inputs, foods, recipes..."
            autoFocus
            className="w-full rounded-lg border-2 border-blue-500 bg-white py-2 pl-9 pr-4 text-[13px] text-slate-800 outline-none ring-2 ring-blue-100 placeholder:text-slate-400"
        />
        <div className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-2 text-[11px] text-slate-400 sm:flex">
            <span className="flex items-center gap-1">
                <CornerDownLeft className="h-3 w-3" strokeWidth={2} /> select
            </span>
            <span className="flex items-center gap-1">
                <ChevronUp className="h-3 w-3" strokeWidth={2} />
                <ChevronDown className="h-3 w-3" strokeWidth={2} /> move
            </span>
            <span>Esc clear</span>
        </div>
    </div>
);

export default SearchField;
