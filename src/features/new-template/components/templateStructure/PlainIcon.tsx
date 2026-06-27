const PlainIcon: React.FC<{ icon: React.ElementType; className?: string }> = ({
    icon: Icon,
    className = "",
}) => (
    <span
        className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded border border-slate-200 bg-white text-slate-400 ${className}`}
    >
        <Icon className="h-3 w-3" strokeWidth={2} />
    </span>
);

export default PlainIcon;
