const GroupHeading: React.FC<{ heading: string; count: number }> = ({
    heading,
    count,
}) => (
    <div className="mb-0.5 flex items-center gap-1.5 px-2 pt-2">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            {heading}
        </span>
        <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-slate-100 px-1 text-[10px] font-medium text-slate-500">
            {count}
        </span>
    </div>
);
export default GroupHeading;
