const PlainIcon: React.FC<{ icon: React.ElementType; className?: string }> = ({
    icon: Icon,
    className = "",
}) => (
    <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-400 ${className}`}
    >
        <Icon className="h-3.5 w-3.5" strokeWidth={2} />
    </span>
);

export default PlainIcon;