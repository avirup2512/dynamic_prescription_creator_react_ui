import { Columns2, Plus } from "lucide-react";

const EmptyColumnState: React.FC<{ onAddField: () => void }> = ({ onAddField }) => (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 py-8 text-center">
        <Columns2 className="h-7 w-7 text-slate-300" strokeWidth={1.75} />
        <p className="text-[13px] font-medium text-slate-500">Drag & drop fields here</p>
        <p className="text-[12px] text-slate-400">or</p>
        <button
            type="button"
            onClick={onAddField}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-[13px] font-medium text-slate-600 shadow-sm hover:bg-slate-50"
        >
            <Plus className="h-3.5 w-3.5" strokeWidth={2} />
            Add Field
        </button>
    </div>
);
export default EmptyColumnState;