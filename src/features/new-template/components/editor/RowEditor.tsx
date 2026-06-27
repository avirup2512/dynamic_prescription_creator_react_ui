// RowEditor.tsx

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function RowEditor() {
    return (
        <div className="space-y-6">
            <div>
                <Label>Gap</Label>

                <Input
                    type="number"
                    defaultValue={16}
                />
            </div>
        </div>
    );
}