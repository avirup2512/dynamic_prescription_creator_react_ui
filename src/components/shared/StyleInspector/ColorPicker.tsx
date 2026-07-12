import { Input } from "@/components/ui/input";

interface Props {
    label?: string;
    value: string;
    onChange: (color: string) => void;
}

export default function ColorPicker({
    label,
    value,
    onChange,
}: Props) {

    return (
        <div className="space-y-2">

            {label && (
                <label className="text-xs font-medium">
                    {label}
                </label>
            )}

            <div className="flex items-center gap-3">

                <input
                    type="color"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="h-10 w-10 rounded border cursor-pointer"
                />

                <Input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />

            </div>

        </div>
    );
}