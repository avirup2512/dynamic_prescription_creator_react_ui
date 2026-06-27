import { LayoutTemplate, MoreHorizontal, Search } from "lucide-react";

const PanelHeader: React.FC = () => (
    <div className="px-1">
        <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
                <LayoutTemplate className="h-4 w-4 text-slate-400" strokeWidth={2} />
                <h5 className="text-xl font-bold text-slate-900 mb-2 mt-2">Template Structure</h5>
                {/* <p className="mt-0.5 text-sm text-slate-400">Template Name</p> */}
            </div>
            <button
                type="button"
                aria-label="More options"
                className="flex h-9 w-9 items-center justify-center border-slate-200 text-slate-500 hover:bg-slate-50"
            >
                <MoreHorizontal className="h-4 w-4" strokeWidth={2} />
            </button>
        </div>

        <div className="relative mt-4">
            <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                strokeWidth={2}
            />
            <input
                type="text"
                placeholder="Find a section..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 py-2.5 pl-10 pr-4 text-sm text-slate-500 placeholder:text-slate-400 outline-none focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
        </div>
    </div>
);
export default PanelHeader;