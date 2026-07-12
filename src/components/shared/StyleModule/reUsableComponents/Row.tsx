import Label from "./Label";

const Row = function ({
    label,
    children,
    lw,
}: {
    label: string;
    children: React.ReactNode;
    lw?: string;
}) {
    return (
        <div className="flex items-center gap-1.5 min-h-[24px]">
            <Label w={lw}>{label}</Label>
            <div className="flex items-center gap-1 flex-1 min-w-0">{children}</div>
        </div>
    );
}
export default Row;