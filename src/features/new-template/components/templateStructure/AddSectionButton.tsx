import { Plus } from "lucide-react";

const AddSectionButton: React.FC = () => (
    <button
        type="button"
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-blue-200 py-4 text-sm font-semibold text-blue-600 hover:bg-blue-50/50"
    >
        <Plus className="h-4 w-4" strokeWidth={2.5} />
        Add section
    </button>
);
export default AddSectionButton