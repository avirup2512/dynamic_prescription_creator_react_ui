const ToolbarIconButton: React.FC<{
    icon: React.ElementType;
    ariaLabel: string;
    tone?: "default" | "danger";
    onClick?: () => void;
}> = ({ icon: Icon, ariaLabel, tone = "default", onClick }) => (
    <button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel}
        className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors ${tone === "danger"
            ? "text-rose-500 hover:bg-rose-50"
            : "text-slate-600 hover:bg-slate-100"
            }`}
    >
        <Icon className="h-4 w-4" strokeWidth={2} />
    </button>
);

export default ToolbarIconButton;