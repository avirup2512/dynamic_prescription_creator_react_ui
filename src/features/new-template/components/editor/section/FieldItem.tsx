import { Input } from "@/components/ui/input";
import type { ColumnInputItem } from "@/features/section/type/SectionType";
import { GripVertical, X } from "lucide-react";

function FieldItem({
    field, onRename, onDelete,
}: { field: ColumnInputItem; onRename: (v: string) => void; onDelete: () => void }) {
    // const Icon = fieldIcon[field.type];
    return (
        <div className="group grid grid-cols-[auto_minmax(0,1fr)_auto_auto] items-center gap-1.5 rounded-md px-1.5 py-1 hover:bg-muted/60">
            <GripVertical className="h-3 w-3 cursor-grab text-muted-foreground/40 opacity-0 group-hover:opacity-100" />
            <div className="flex min-w-0 items-center gap-1.5">
                <div className="grid h-5 w-5 shrink-0 place-items-center rounded bg-orange-100 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400">
                    {/* <Icon className="h-2.5 w-2.5" /> */}
                </div>
                <Input
                    value={field.input_entity_name}
                    onChange={(e) => onRename(e.target.value)}
                    className="h-6 min-w-0 border-0 bg-transparent px-1 text-xs shadow-none focus-visible:bg-background focus-visible:ring-1"
                />
            </div>
            <span className="shrink-0 rounded bg-muted px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground">
                {field.type}
            </span>
            <button
                onClick={onDelete}
                className="rounded p-0.5 text-muted-foreground opacity-0 transition-opacity hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
            >
                <X className="h-3 w-3" />
            </button>
        </div>
    );
}
export default FieldItem;