import { CornerDownLeft, HelpCircle } from "lucide-react";

const ModalFooter: React.FC<{ onCancel: () => void; onInsert: () => void }> = ({
    onCancel,
    onInsert,
}) => (
    <div className="flex items-center justify-between border-t border-slate-100 px-5 py-2.5">
        <p className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <HelpCircle className="h-3 w-3" strokeWidth={2} />
            Tip: type <code className="rounded bg-slate-100 px-1 text-slate-500">{">"}</code>{" "}
            to filter by type,{" "}
            <code className="rounded bg-slate-100 px-1 text-slate-500">#</code> to filter by
            category
        </p>
        <div className="flex items-center gap-2">
            <button
                type="button"
                onClick={onCancel}
                className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-medium text-slate-600 hover:bg-slate-50"
            >
                Cancel
            </button>
            <button
                type="button"
                onClick={onInsert}
                className="flex items-center gap-1.5 rounded-md bg-blue-600 px-3 py-1.5 text-[12px] font-medium text-white shadow-sm hover:bg-blue-700"
            >
                Insert selected
                <CornerDownLeft className="h-3 w-3" strokeWidth={2} />
            </button>
        </div>
    </div>
);
export default ModalFooter;
