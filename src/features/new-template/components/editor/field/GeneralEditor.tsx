// field/GeneralEditor.tsx

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function GeneralEditor() {
    return (
        <div className="space-y-3">
            <div>
                <Label className="mb-1.5 text-[11px] font-semibold text-slate-600">Label</Label>
                <Input className="h-8 text-[12px]" />
            </div>

            <div>
                <Label className="mb-1.5 text-[11px] font-semibold text-slate-600">Placeholder</Label>
                <Input className="h-8 text-[12px]" />
            </div>

            <div className="flex items-center justify-between">
                <Label className="text-[12px] text-slate-700">Required</Label>
                <Switch />
            </div>

            <div className="flex items-center justify-between">
                <Label className="text-[12px] text-slate-700">Readonly</Label>
                <Switch />
            </div>

            <div className="flex items-center justify-between">
                <Label className="text-[12px] text-slate-700">Hidden</Label>
                <Switch />
            </div>
        </div>
    );
}
