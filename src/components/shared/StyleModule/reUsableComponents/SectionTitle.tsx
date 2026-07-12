const SectionTitle = function ({ children }: { children: string }) {
    return (
        <span className="text-xs font-semibold text-slate-700 uppercase select-none">
            {children}
        </span>
    );
}
export default SectionTitle;