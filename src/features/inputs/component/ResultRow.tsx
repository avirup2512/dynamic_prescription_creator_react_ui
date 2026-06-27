import { CornerLeftDown, TypeIcon, ChevronDownIcon, ToggleRight, Apple, ChefHat, CheckSquare } from "lucide-react";
import KindBadge from "./KindBadge";
type ResultKind = "TEXT" | "DROPDOWN" | "TOGGLE" | "FOOD" | "RECIPE" | "CHECKBOX";
interface ResultItem {
    id: string;
    kind: ResultKind;
    title: string;
    meta: string;
    selected?: boolean;
}
const kindIcon: Record<ResultKind, React.ElementType> = {
    TEXT: TypeIcon,
    DROPDOWN: ChevronDownIcon,
    TOGGLE: ToggleRight,
    FOOD: Apple,
    RECIPE: ChefHat,
    CHECKBOX: CheckSquare,
};
const kindIconStyle: Record<ResultKind, string> = {
    TEXT: "bg-slate-500 text-white",
    DROPDOWN: "bg-blue-600 text-white",
    TOGGLE: "bg-violet-500 text-white",
    FOOD: "bg-amber-400 text-white",
    RECIPE: "bg-rose-400 text-white",
    CHECKBOX: "bg-emerald-600 text-white",
};
const ResultRow: React.FC<{
    item: ResultItem;
    onSelect: () => void;
}> = ({ item, onSelect }) => {
    const Icon = kindIcon[item.kind];
    return (
        <button
            type="button"
            onClick={onSelect}
            aria-current={item.selected ? "true" : undefined}
            className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors ${item.selected
                ? "border-l-[3px] border-blue-600 bg-blue-50/60 pl-2"
                : "hover:bg-slate-50"
                }`}
        >
            <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${kindIconStyle[item.kind]}`}
            >
                <Icon className="h-3.5 w-3.5" strokeWidth={2} />
            </span>
            <div className="min-w-0 flex-1">
                <p className="truncate text-[12.5px] font-medium text-slate-800">{item.title}</p>
                <p className="truncate text-[11px] text-slate-400">{item.meta}</p>
            </div>
            <KindBadge kind={item.kind} />
            {item.selected && (
                <kbd className="hidden shrink-0 items-center gap-0.5 rounded-md border border-blue-200 bg-blue-100 px-1 py-0.5 text-[10px] font-medium text-blue-600 sm:flex">
                    ⌘<CornerLeftDown className="h-3 w-3" strokeWidth={2} />
                </kbd>
            )}
        </button>
    );
};
export default ResultRow
