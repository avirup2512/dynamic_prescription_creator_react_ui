import {
    Trash2
} from "lucide-react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
function DeleteIconButton({ onDelete, label = "Delete item" }: { onDelete: () => void; label?: string }) {
    return (
        <TooltipPrimitive.Root>
            <TooltipPrimitive.Trigger asChild>
                <button
                    type="button"
                    onClick={onDelete}
                    aria-label={label}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                >
                    <Trash2 className="h-3 w-3" />
                </button>
            </TooltipPrimitive.Trigger>
            <TooltipPrimitive.Portal>
                <TooltipPrimitive.Content className="rounded bg-foreground px-1.5 py-0.5 text-[10px] text-background shadow" sideOffset={4}>
                    {label}
                </TooltipPrimitive.Content>
            </TooltipPrimitive.Portal>
        </TooltipPrimitive.Root>
    );
}
export default DeleteIconButton;
