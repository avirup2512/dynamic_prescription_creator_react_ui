import { LayoutTemplate, MoreHorizontal, Search } from "lucide-react";

const PanelHeader: React.FC = () => (
    <div>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
                <span className="flex h-5.5 w-5.5 items-center justify-center rounded-md bg-slate-100 text-slate-500">
                    <LayoutTemplate className="h-3 w-3" strokeWidth={2.5} />
                </span>
                <h5 className="text-xs font-semibold tracking-tight text-slate-900">Template Structure</h5>
                {/* <p className="mt-0.5 text-sm text-slate-400">Template Name</p> */}
            </div>
            <button
                type="button"
                aria-label="More options"
                className="flex h-5.5 w-5.5 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            >
                <MoreHorizontal className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
        </div>

        <div className="relative mt-1.5">
            <Search
                className="pointer-events-none absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-300"
                strokeWidth={2.5}
            />
            <input
                type="text"
                placeholder="Find a section..."
                className="h-6.5 w-full rounded-md border border-slate-200 bg-slate-50 pl-7 pr-2.5 text-[11px] text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-1 focus:ring-blue-500/50"
            />
        </div>
    </div>
);
export default PanelHeader;
