import { Plus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

type FieldType = "Text" | "Date" | "Dropdown" | "Number" | "Email" | "Toggle";
function AddFieldButton({ rowId, columnId, inputGroupId, sectionType, sectionId }: any) {
    const navigate = useNavigate();
    const { id } = useParams();
    return (
        <button
            type="button"
            onClick={() => navigate(`/dashboard/new-template/edit/${id}/input/${sectionId}/${rowId}/${columnId}/${inputGroupId}/${sectionType}/inputs/INPUT_TYPE_1`)}
            className="flex h-7 w-full items-center justify-center gap-1.5 rounded-md border border-dashed border-slate-200 bg-white text-[11px] font-medium text-slate-500 hover:border-orange-200 hover:bg-orange-50/70 hover:text-slate-900"
        >
            <Plus className="h-3 w-3" /> Add field
        </button>
    );
}

export default AddFieldButton;
