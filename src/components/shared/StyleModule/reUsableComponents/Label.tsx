function cx(...cs: (string | false | null | undefined)[]) {
    return cs.filter(Boolean).join(" ");
}
const Label = function ({ children, w = "w-[86px]" }: { children: string; w?: string }) {
    return (
        <span className={cx("text-xs text-slate-600 shrink-0 leading-none", w)}>
            {children}
        </span>
    );
}

export default Label;