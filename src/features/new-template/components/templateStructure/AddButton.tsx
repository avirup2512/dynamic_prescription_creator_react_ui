import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface AddButtonProps {
    type: string;
    onAction?: () => void;
}

const AddButton = ({ type, onAction }: AddButtonProps) => {
    return (
        <Button
            onClick={onAction}
            type="button"
            variant="ghost"
            size="sm"
            className="my-1 flex h-7 w-full items-center justify-center gap-1 rounded-md border border-dashed border-slate-200 bg-white text-[11.5px] font-medium text-slate-500 hover:border-blue-200 hover:bg-blue-50/60 hover:text-blue-600"
        >
            <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
            Add {type}
        </Button>
    )
};
export default AddButton
