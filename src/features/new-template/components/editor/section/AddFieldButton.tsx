import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

type FieldType = "Text" | "Date" | "Dropdown" | "Number" | "Email" | "Toggle";
function AddFieldButton({ onAdd }: { onAdd: (t: FieldType) => void }) {
    const navigate = useNavigate();

    return (
        <button
            type="button"
            onClick={() => navigate("/dashboard/input")}
            className="flex w-full items-center justify-center gap-1.5 border border-dashed border-border py-1.5 text-[11px] font-medium text-muted-foreground hover:border-orange-500 hover:bg-orange-50 hover:text-foreground dark:hover:bg-orange-950/30"
        >
            <Plus className="h-3 w-3" /> Add field
        </button>
    );
}

export default AddFieldButton;
