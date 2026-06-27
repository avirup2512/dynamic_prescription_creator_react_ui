import type { FC } from "react";
import type { TabNavigationProps } from "../../type/ComponentType";

const TabNavigation: FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
    const tabs: string[] = ['Content', 'Layout', 'Style', 'Validation', 'Logic'];

    return (
        <div className="flex gap-0.5 border-b border-slate-200 px-2 py-1">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-md px-2 py-1 text-[11px] font-medium transition-colors ${activeTab === tab
                        ? 'bg-slate-100 text-slate-900'
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                        }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};
export default TabNavigation;
