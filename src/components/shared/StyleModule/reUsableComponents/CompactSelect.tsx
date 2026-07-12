import * as Select from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";
function cx(...cs: (string | false | null | undefined)[]) {
    return cs.filter(Boolean).join(" ");
}
const CompactSelect = function ({
    value,
    onValueChange,
    options,
    className,
}: {
    value: string;
    onValueChange: (v: string) => void;
    options: { value: string; label: string }[];
    className?: string;
}) {
    return (
        <Select.Root value={value} onValueChange={onValueChange}>
            <Select.Trigger
                className={cx(
                    "flex items-center justify-between gap-1 bg-slate-100 rounded-md h-[24px] px-2 border border-slate-200",
                    "text-xs text-slate-900 outline-none hover:bg-slate-50 transition-colors",
                    className,
                )}
            >
                <Select.Value />
                <Select.Icon>
                    <ChevronDown size={10} className="text-slate-400" />
                </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
                <Select.Content className="bg-white rounded-lg shadow-lg border border-slate-200 z-50">
                    <Select.Viewport className="p-1">
                        {options.map((o) => (
                            <Select.Item
                                key={o.value}
                                value={o.value}
                                className="text-xs px-2.5 py-1.5 rounded-md cursor-pointer text-slate-900 outline-none data-[highlighted]:bg-slate-100"
                            >
                                <Select.ItemText>{o.label}</Select.ItemText>
                            </Select.Item>
                        ))}
                    </Select.Viewport>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    );
}
export default CompactSelect;