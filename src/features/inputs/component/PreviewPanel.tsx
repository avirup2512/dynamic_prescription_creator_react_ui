import { ArrowRight, ListChecks, Share2, User } from "lucide-react";
import { CornerLeftDown, TypeIcon, ChevronDownIcon, ToggleRight, Apple, ChefHat, CheckSquare } from "lucide-react";

import PreviewMetaRow, { PreviewOptionChip } from "./PreviewMetaRow";
const kindIcon: Record<any, React.ElementType> = {
    TEXT: TypeIcon,
    DROPDOWN: ChevronDownIcon,
    TOGGLE: ToggleRight,
    FOOD: Apple,
    RECIPE: ChefHat,
    CHECKBOX: CheckSquare,
};
const kindIconStyle: Record<any, string> = {
    TEXT: "bg-slate-500 text-white",
    DROPDOWN: "bg-blue-600 text-white",
    TOGGLE: "bg-violet-500 text-white",
    FOOD: "bg-amber-400 text-white",
    RECIPE: "bg-rose-400 text-white",
    CHECKBOX: "bg-emerald-600 text-white",
};
const dropdownOptions = ["qd", "bid", "tid", "q6h", "prn"];
const PreviewPanel: React.FC<{ item: any }> = ({ item }) => {
    const Icon = kindIcon[item.kind];
    return (
        <aside className="hidden w-[240px] shrink-0 flex-col border-l border-slate-100 px-4 py-3 lg:flex">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                Preview
            </p>

            <div className="mb-3 flex items-start gap-2.5">
                <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${kindIconStyle[item.kind]}`}
                >
                    <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                </span>
                <p className="text-[13px] font-semibold leading-snug text-slate-900">
                    {item.title}
                </p>
            </div>

            <div className="divide-y divide-slate-100">
                <PreviewMetaRow icon={ListChecks} label="Type" value="Dropdown" />
                <PreviewMetaRow icon={Share2} label="Category" value="Medication" />
                <PreviewMetaRow icon={User} label="Created by" value="Dr. Ayesha" />
                <PreviewMetaRow icon={Share2} label="Used in" value="14 templates" />
            </div>

            <p className="mb-1.5 mt-3 text-[12px] font-semibold text-slate-700">Options</p>
            <div className="space-y-1">
                {dropdownOptions.map((opt) => (
                    <PreviewOptionChip key={opt} label={opt} />
                ))}
            </div>

            <button
                type="button"
                className="mt-3 flex items-center gap-1.5 text-[12px] font-medium text-blue-600 hover:text-blue-700"
            >
                Open in Inputs tab
                <ArrowRight className="h-3 w-3" strokeWidth={2} />
            </button>
        </aside>
    );
};
export default PreviewPanel;
