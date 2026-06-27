import { ArrowDown, ArrowUp, Copy, GripVertical, Trash2 } from "lucide-react";
import ToolbarIconButton from "./ToolbarIconButton";

const SectionToolbar: React.FC = () => (
    <div className="mx-auto mb-4 flex w-fit items-center gap-1 rounded-xl border border-slate-200 bg-white px-2 py-1.5 shadow-sm">
        <span className="flex h-7 w-7 cursor-grab items-center justify-center text-slate-400">
            <GripVertical className="h-4 w-4" strokeWidth={2} />
        </span>
        <span className="mx-1 rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-slate-600">
            SECTION
        </span>
        <span className="mx-1 h-5 w-px bg-slate-200" aria-hidden />
        <ToolbarIconButton icon={Copy} ariaLabel="Duplicate section" />
        <ToolbarIconButton icon={ArrowUp} ariaLabel="Move section up" />
        <ToolbarIconButton icon={ArrowDown} ariaLabel="Move section down" />
        <ToolbarIconButton icon={Trash2} ariaLabel="Delete section" tone="danger" />
    </div>
);
export default SectionToolbar;