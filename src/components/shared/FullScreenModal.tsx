import { X } from "lucide-react";

import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Props {
    open: boolean;
    onClose(): void;
    children: React.ReactNode;
}

export default function FullScreenModal({
    open,
    onClose,
    children,
}: Props) {
    return (
        <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
            <DialogContent
                showCloseButton={false}
                className="
          fixed
          inset-0
          h-screen
          w-screen
          max-w-none
          translate-x-0
          translate-y-0
          rounded-none
          border-0
          p-0
          gap-0
        "
            >
                <button
                    onClick={onClose}
                    className="absolute right-5 top-5 z-50"
                >
                    <X className="h-5 w-5" />
                </button>

                {children}
            </DialogContent>
        </Dialog>
    );
}
