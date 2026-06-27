import { Button } from "@/components/ui/button";
import { Settings, TypeIcon } from "lucide-react";

const LeafFieldRow: React.FC<{ input: any; indent: number }> = ({
    input,
    indent,
}) => (
    <div
        className="relative flex items-center justify-between gap-2 py-1.5"
        style={{ paddingLeft: 8 + indent * 24 }}
    >
        <div className="flex items-center justify-between gap-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-slate-200 bg-white text-slate-400">
                <TypeIcon className="h-3 w-3" strokeWidth={2} />
            </span>
            <span className="text-sm text-slate-600">{input?.input_entity_name}</span>
        </div>
        <div className="flex items-center justify-ends">
            <Button
                size="icon"
                type="button"
                variant="ghost"
                className="flex items-center justify-center border-none border-slate-200 text-slate-500 hover:bg-white"
            >
                <Settings className="size-4" />
            </Button>
        </div>
    </div>
);
export default LeafFieldRow;