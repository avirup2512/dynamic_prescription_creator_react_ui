function cx(...cs: (string | false | null | undefined)[]) {
    return cs.filter(Boolean).join(" ");
}
const Num = function ({
    value,
    onChange,
    w = "w-10",
}: {
    value: number | string;
    onChange?: (v: number | "auto") => void;
    w?: string;
}) {
    return (
        <input
            type={value === "auto" ? "text" : "number"}
            value={value}
            onChange={(e) => {
                const raw = e.target.value;
                onChange?.(raw === "auto" ? "auto" : Number(raw));
            }}
            className={cx(
                w,
                "h-[24px] bg-slate-100 rounded-md border border-slate-200 outline-none",
                "text-xs font-medium text-slate-900 text-center",
                "hover:bg-slate-50 transition-colors",
                "focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
                "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none",
            )}
        />
    );
}
export default Num;