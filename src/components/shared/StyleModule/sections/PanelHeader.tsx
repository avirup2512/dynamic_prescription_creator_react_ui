import { MoreHorizontal, RotateCcw, Search } from "lucide-react";

const PanelHeader = function () {
    return (
        <div className="flex items-center px-3 h-[46px] border-b border-slate-200 shrink-0">
            <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-900 leading-snug truncate">
                    Hero Heading
                </p>
                <p className="text-[10px] text-slate-500 leading-none mt-[1px]">Text Element</p>
            </div>
            <div className="flex items-center gap-0.5 ml-2">
                {([<Search size={13} />, <RotateCcw size={13} />, <MoreHorizontal size={13} />] as const).map(
                    (icon, i) => (
                        <button
                            key={i}
                            className="w-[26px] h-[26px] flex items-center justify-center rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                        >
                            {icon}
                        </button>
                    ),
                )}
            </div>
        </div>
    );
}
export default PanelHeader;