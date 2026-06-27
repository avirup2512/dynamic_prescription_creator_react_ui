import type { FC } from "react";
import type { TabNavigationProps } from "../../type/ComponentType";

const TabNavigation: FC<TabNavigationProps> = ({ activeTab, setActiveTab }: any) => {
    const tabs: string[] = ['Content', 'Layout', 'Style', 'Validation', 'Logic'];

    return (
        <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-3 text-sm font-medium border-b-2 transition-all ${activeTab === tab
                        ? 'text-blue-600 border-b-blue-600'
                        : 'text-gray-500 border-b-transparent hover:text-gray-700'
                        }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};
export default TabNavigation;