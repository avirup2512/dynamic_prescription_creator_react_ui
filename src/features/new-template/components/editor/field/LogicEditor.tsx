// field/LogicEditor.tsx

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function LogicEditor() {
    return (
        <div className="space-y-4">
            <Button
                variant="outline"
                className="w-full"
            >
                <Plus className="mr-2 h-4 w-4" />
                Add OR Condition
            </Button>
        </div>
    );
}