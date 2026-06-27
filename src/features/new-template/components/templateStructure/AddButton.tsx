import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const AddButton = ({ type, onAction }: any) => {
    return (
        <Button
            onClick={onAction}
            type="button"
            className="mt-2 flex w-full items-center justify-center gap-1 rounded-xl border-2 border-none border-blue-200 py-1 mb-2 text-sm  text-blue-600 bg-white hover:bg-blue-50/50"
        >
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            Add {type}
        </Button>
    )
};
export default AddButton