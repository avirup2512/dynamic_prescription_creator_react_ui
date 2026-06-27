import { Plus } from "lucide-react";

const AddRowButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <button
        type="button"
        onClick={onClick}
        className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white py-2.5 text-[13.5px] font-medium text-slate-600 shadow-sm hover:bg-slate-50"
    >
        <Plus className="h-3.5 w-3.5" strokeWidth={2} />
        Add Row
    </button>
);
export default AddRowButton;