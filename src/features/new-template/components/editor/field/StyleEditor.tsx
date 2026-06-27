// field/StyleEditor.tsx

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

export default function StyleEditor() {
    return (
        <div className="space-y-4">
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Width" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="auto">
                        Auto
                    </SelectItem>

                    <SelectItem value="full">
                        Full Width
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}