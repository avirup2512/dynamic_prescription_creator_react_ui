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
        <div className="space-y-3">
            <Select>
                <SelectTrigger className="h-8 w-full text-[12px]">
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
