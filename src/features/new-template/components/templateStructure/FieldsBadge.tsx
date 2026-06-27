const FieldsBadge: React.FC<{ count: number }> = ({ count }) => (
    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
        {count} field{count === 1 ? "" : "s"}
    </span>
);

export default FieldsBadge;