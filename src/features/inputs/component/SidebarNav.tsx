import { Clock, HelpCircle, ListCheck, Paintbrush, Search, Share2 } from "lucide-react";
import NavItem from "./NavItem";
const navItems = [
    { id: "search", label: "Search", icon: Search },
    { id: "inputs", label: "Inputs", icon: ListCheck },
];

const recentItems: any[] = [
    { id: "patient-weight", label: "Patient Weight" },
    { id: "frequency", label: "Frequency" },
    { id: "vitamin-d3", label: "Vitamin D3" },
];
const SidebarNav: React.FC<{ activeId: string; onSelect: (id: string) => void }> = ({
    activeId,
    onSelect,
}) => (
    <aside className="flex w-[190px] shrink-0 flex-col justify-between border-r border-slate-100 px-3 py-3">
        <div>
            <p className="px-2 pb-1.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                Navigate
            </p>
            <div className="space-y-0.5">
                {navItems.map((item) => (
                    <NavItem
                        key={item.id}
                        icon={item.icon}
                        label={item.label}
                        active={activeId === item.id}
                        onClick={() => onSelect(item.id)}
                    />
                ))}
            </div>

            <p className="px-2 pb-1.5 pt-4 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                Recent
            </p>
            <div className="space-y-0.5">
                {recentItems.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-[12px] text-slate-600 hover:bg-slate-50"
                    >
                        <Clock className="h-3.5 w-3.5 shrink-0 text-slate-400" strokeWidth={2} />
                        <span className="truncate">{item.label}</span>
                    </button>
                ))}
            </div>
        </div>

        <button
            type="button"
            className="flex items-center justify-between rounded-md px-2 py-1.5 text-[12px] text-slate-500 hover:bg-slate-50"
        >
            <span className="flex items-center gap-2">
                <HelpCircle className="h-3.5 w-3.5 text-slate-400" strokeWidth={2} />
                Help
            </span>
            <kbd className="rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium text-slate-500">
                ⌘/
            </kbd>
        </button>
    </aside>
);
export default SidebarNav;
