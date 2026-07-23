import { useEffect, useState, type FC } from "react";
import type { TabNavigationProps } from "../../type/ComponentType";

const TabNavigation: FC<TabNavigationProps> = ({ activeTab, entityType, setActiveTab }) => {
    const tabs: string[] = ['Content', 'Layout', 'Style', 'Validation', 'Logic'];
    const [currentTab, setCurrentTab] = useState(tabs);
    useEffect(() => {
        switch (entityType) {
            case "INPUT_GROUP":
                setCurrentTab(['Content']);
                break;
            case "INPUT":
                setCurrentTab(['Content', 'Style']);
                break;
            case "ROW":
                setCurrentTab(['Layout', 'Style']);
                break;
            case "COLUMN":
                setCurrentTab(['Layout', 'Style']);
                break;
            case "SECTION":
                setCurrentTab(['Content', 'Layout', 'Style']);
                break;
            default:
                setCurrentTab(tabs);
                break;
        }
    }, [entityType])
    return (
        <div className="flex gap-0.5 border-b border-slate-200 px-2 py-1">
            {currentTab.map((tab) => (
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
