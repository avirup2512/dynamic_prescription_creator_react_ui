// ColumnEditor.tsx

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function ColumnEditor() {
    return (
        <div className="space-y-6">
            <div>
                <label className="text-sm">
                    Width
                </label>

                <Select>
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="25">
                            25%
                        </SelectItem>

                        <SelectItem value="50">
                            50%
                        </SelectItem>

                        <SelectItem value="75">
                            75%
                        </SelectItem>

                        <SelectItem value="100">
                            100%
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}