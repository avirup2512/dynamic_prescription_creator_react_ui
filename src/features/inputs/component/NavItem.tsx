const NavItem: React.FC<{
    icon: React.ElementType;
    label: string;
    active: boolean;
    onClick: () => void;
}> = ({ icon: Icon, label, active, onClick }) => (
    <button
        type="button"
        onClick={onClick}
        aria-current={active ? "page" : undefined}
        className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-[12px] transition-colors ${active
            ? "bg-blue-50 font-medium text-blue-600"
            : "text-slate-600 hover:bg-slate-50"
            }`}
    >
        <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
        <span className="truncate">{label}</span>
    </button>
);
export default NavItem;
