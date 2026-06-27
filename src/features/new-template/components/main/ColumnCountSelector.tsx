import type { ColumnCount } from "../../type/ComponentType";

const ColumnCountSelector: React.FC<{
    value: ColumnCount;
    onChange: (n: ColumnCount) => void;
}> = ({ value, onChange }) => (
    <div className="mx-auto mt-5 w-fit rounded-xl border border-slate-200 bg-white px-4 py-3 text-center shadow-sm">
        <div className="flex items-center justify-center gap-3">
            <span className="text-[13px] font-semibold text-slate-700">Columns</span>
            <div className="flex items-center gap-2">
                {([1, 2, 3] as ColumnCount[]).map((n) => (
                    <button
                        key={n}
                        type="button"
                        onClick={() => onChange(n)}
                        aria-pressed={value === n}
                        className={`flex h-8 w-8 items-center justify-center rounded-md border text-[13px] font-medium transition-colors ${value === n
                            ? "border-blue-500 bg-blue-50 text-blue-600"
                            : "border-slate-200 text-slate-600 hover:bg-slate-50"
                            }`}
                    >
                        {n}
                    </button>
                ))}
            </div>
        </div>
        <p className="mt-1.5 text-[12px] text-slate-400">Max 3 columns allowed</p>
    </div>
);
export default ColumnCountSelector