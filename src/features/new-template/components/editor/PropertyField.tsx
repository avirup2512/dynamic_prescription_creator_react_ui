import {
    Input,
} from "@/components/ui/input";

import {
    Switch,
} from "@/components/ui/switch";

import {
    Label,
} from "@/components/ui/label";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Props {
    field: {
        type: "input" | "switch" | "select";
        label: string;
        value?: string;
        options?: string[];
    };
}

export default function PropertyField({
    field,
}: Props) {
    switch (field.type) {
        case "input":
            return (
                <div className="space-y-1.5">
                    <Label className="text-[11px] font-semibold text-slate-600">{field.label}</Label>

                    <Input
                        className="h-8 text-[12px]"
                        defaultValue={field.value}
                    />
                </div>
            );

        case "switch":
            return (
                <div className="flex items-center justify-between">
                    <Label className="text-[12px] text-slate-700">{field.label}</Label>

                    <Switch />
                </div>
            );

        case "select":
            return (
                <div className="space-y-1.5">
                    <Label className="text-[11px] font-semibold text-slate-600">{field.label}</Label>

                    <Select>
                        <SelectTrigger className="h-8 w-full text-[12px]">
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            {field.options?.map(
                                (option: string) => (
                                    <SelectItem
                                        key={option}
                                        value={option}
                                    >
                                        {option}
                                    </SelectItem>
                                )
                            )}
                        </SelectContent>
                    </Select>
                </div>
            );

        default:
            return null;
    }
}
