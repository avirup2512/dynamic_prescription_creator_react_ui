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
    field: any;
}

export default function PropertyField({
    field,
}: Props) {
    switch (field.type) {
        case "input":
            return (
                <div className="space-y-2">
                    <Label>{field.label}</Label>

                    <Input
                        defaultValue={field.value}
                    />
                </div>
            );

        case "switch":
            return (
                <div className="flex justify-between items-center">
                    <Label>{field.label}</Label>

                    <Switch />
                </div>
            );

        case "select":
            return (
                <div className="space-y-2">
                    <Label>{field.label}</Label>

                    <Select>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            {field.options.map(
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