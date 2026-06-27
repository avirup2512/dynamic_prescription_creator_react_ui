const PillLabel: React.FC<{ children: React.ReactNode; tone?: "row" | "column" }> = ({
    children,
}) => (
    <span className="inline-flex w-fit items-center rounded-md bg-blue-50 px-2.5 py-1 text-[12px] font-semibold text-blue-600">
        {children}
    </span>
);
export default PillLabel;