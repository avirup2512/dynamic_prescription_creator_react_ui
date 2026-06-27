import { Plus } from "lucide-react";

const AddFieldLink: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <button
        type="button"
        onClick={onClick}
        className="mt-2 flex items-center gap-1.5 text-[13px] font-medium text-blue-600 hover:text-blue-700"
    >
        <Plus className="h-3.5 w-3.5" strokeWidth={2} />
        Add Field
    </button>
);

export default AddFieldLink;