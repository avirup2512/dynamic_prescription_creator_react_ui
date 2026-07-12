import { RotateCcw } from "lucide-react";

const PanelFooter = function () {
    return (
        <div className="flex items-center gap-2 px-3 h-[46px] border-t border-slate-200 shrink-0">
            <button className="flex items-center gap-1 h-[28px] px-2.5 rounded-md text-xs font-medium text-slate-600 border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors">
                <RotateCcw size={11} />
                Reset
            </button>
            <div className="flex-1" />
            <button className="h-[28px] px-3 rounded-md text-xs font-medium text-slate-600 border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors">
                Cancel
            </button>
            <button className="h-[28px] px-4 rounded-md text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                Apply
            </button>
        </div>
    );
}
export default PanelFooter;