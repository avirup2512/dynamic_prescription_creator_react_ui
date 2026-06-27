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
        <div className="space-y-3 rounded-md border border-slate-200 bg-white p-3">
            <div>
                <label className="mb-1.5 block text-[11px] font-semibold text-slate-600">
                    Width
                </label>

                <Select>
                    <SelectTrigger className="h-8 w-full text-[12px]">
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
