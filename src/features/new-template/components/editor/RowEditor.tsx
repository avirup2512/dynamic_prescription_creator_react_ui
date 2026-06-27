// RowEditor.tsx

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function RowEditor() {
    return (
        <div className="space-y-3 rounded-md border border-slate-200 bg-white p-3">
            <div>
                <Label className="mb-1.5 text-[11px] font-semibold text-slate-600">Gap</Label>

                <Input
                    type="number"
                    defaultValue={16}
                    className="h-8 text-[12px]"
                />
            </div>
        </div>
    );
}
