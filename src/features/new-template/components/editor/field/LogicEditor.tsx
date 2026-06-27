// field/LogicEditor.tsx

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function LogicEditor() {
    return (
        <div className="space-y-3">
            <Button
                variant="outline"
                size="sm"
                className="h-8 w-full text-[12px]"
            >
                <Plus className="h-3.5 w-3.5" />
                Add OR Condition
            </Button>
        </div>
    );
}
