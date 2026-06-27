const FieldsBadge: React.FC<{ count: number }> = ({ count }) => (
    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium leading-none text-slate-500">
        {count} field{count === 1 ? "" : "s"}
    </span>
);

export default FieldsBadge;
