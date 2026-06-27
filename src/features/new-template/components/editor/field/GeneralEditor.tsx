// field/GeneralEditor.tsx

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function GeneralEditor() {
    return (
        <div className="space-y-4">
            <div>
                <Label>Label</Label>
                <Input />
            </div>

            <div>
                <Label>Placeholder</Label>
                <Input />
            </div>

            <div className="flex items-center justify-between">
                <Label>Required</Label>
                <Switch />
            </div>

            <div className="flex items-center justify-between">
                <Label>Readonly</Label>
                <Switch />
            </div>

            <div className="flex items-center justify-between">
                <Label>Hidden</Label>
                <Switch />
            </div>
        </div>
    );
}