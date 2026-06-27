import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import {
    Loader2,
    AlertCircle
} from "lucide-react";
import { Button } from "../../../../../components/ui/button";
function ConfirmDeleteDialog({
    trigger, title, description, onConfirm, loading,
}: {
    trigger: React.ReactNode;
    title: string;
    description: React.ReactNode;
    onConfirm: () => void;
    loading: boolean;
}) {
    return (
        <AlertDialogPrimitive.Root>
            <AlertDialogPrimitive.Trigger asChild>{trigger}</AlertDialogPrimitive.Trigger>
            <AlertDialogPrimitive.Portal>
                <AlertDialogPrimitive.Overlay className="fixed inset-0 z-[300] bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                <AlertDialogPrimitive.Content className="fixed left-1/2 top-1/2 z-[300] w-full max-w-xs -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-card p-5 shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
                    <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-destructive/10">
                            <AlertCircle className="h-4 w-4 text-destructive" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <AlertDialogPrimitive.Title className="text-sm font-semibold text-foreground">{title}</AlertDialogPrimitive.Title>
                            <AlertDialogPrimitive.Description className="mt-0.5 text-xs text-muted-foreground">{description}</AlertDialogPrimitive.Description>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                        <AlertDialogPrimitive.Cancel asChild>
                            <Button variant="outline" size="sm" className="h-7 px-3 text-xs">Cancel</Button>
                        </AlertDialogPrimitive.Cancel>
                        <AlertDialogPrimitive.Action asChild>
                            <Button variant="destructive" size="sm" className="h-7 px-3 text-xs" disabled={loading} onClick={onConfirm}>
                                {loading && <Loader2 className="h-3 w-3 animate-spin" />}
                                Delete
                            </Button>
                        </AlertDialogPrimitive.Action>
                    </div>
                </AlertDialogPrimitive.Content>
            </AlertDialogPrimitive.Portal>
        </AlertDialogPrimitive.Root>
    );
}

export default ConfirmDeleteDialog;