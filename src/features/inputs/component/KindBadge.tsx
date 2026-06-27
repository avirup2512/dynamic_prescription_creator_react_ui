
type ResultKind = "TEXT" | "DROPDOWN" | "TOGGLE" | "FOOD" | "RECIPE" | "CHECKBOX";
const kindBadgeStyle: Record<ResultKind, string> = {
    TEXT: "bg-slate-100 text-slate-500",
    DROPDOWN: "bg-blue-50 text-blue-600",
    TOGGLE: "bg-violet-50 text-violet-600",
    FOOD: "bg-amber-50 text-amber-600",
    RECIPE: "bg-rose-50 text-rose-500",
    CHECKBOX: "bg-emerald-50 text-emerald-600",
};
const KindBadge: React.FC<{ kind: ResultKind }> = ({ kind }) => (
    <span
        className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold tracking-wide ${kindBadgeStyle[kind]}`}
    >
        {kind}
    </span>
);
export default KindBadge
