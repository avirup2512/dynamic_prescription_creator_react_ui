const FilterPill: React.FC<{
    label: string;
    active: boolean;
    onClick: () => void;
}> = ({ label, active, onClick }) => (
    <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={`shrink-0 rounded-md px-2.5 py-1 text-[12px] font-medium transition-colors ${active
            ? "bg-blue-600 text-white"
            : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
    >
        {label}
    </button>
);
export default FilterPill
