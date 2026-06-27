import { Button } from "@/components/ui/button";
import { Settings, TypeIcon } from "lucide-react";

interface LeafFieldRowProps {
    input: unknown;
    indent: number;
}

const LeafFieldRow: React.FC<LeafFieldRowProps> = ({
    input,
    indent,
}) => {
    const label = (input as { input_entity_name?: string }).input_entity_name ?? "Field";

    return (
        <div
            className="group relative flex items-center justify-between gap-2 rounded-md py-1 pr-1 hover:bg-slate-50"
            style={{ paddingLeft: 6 + indent * 18 }}
        >
            <div className="flex min-w-0 items-center gap-1.5">
                <span className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded border border-slate-200 bg-white text-slate-400">
                    <TypeIcon className="h-3 w-3" strokeWidth={2} />
                </span>
                <span className="truncate text-[11.5px] text-slate-600">{label}</span>
            </div>
            <div className="flex items-center justify-end opacity-0 transition-opacity group-hover:opacity-100">
                <Button
                    size="icon-xs"
                    type="button"
                    variant="ghost"
                    className="flex items-center justify-center border-none text-slate-400 hover:bg-white hover:text-slate-700"
                >
                    <Settings className="size-3.5" />
                </Button>
            </div>
        </div>
    );
};
export default LeafFieldRow;
