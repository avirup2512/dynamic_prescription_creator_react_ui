import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { DialogConfirmOptions } from "@/types/ui-services"

interface ConfirmDialogProps {
  open: boolean
  options: DialogConfirmOptions
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({ open, options, onConfirm, onCancel }: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(value) => !value && onCancel()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{options.title}</DialogTitle>
          <DialogDescription>{options.message}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={onCancel}>
              {options.cancelText ?? "Cancel"}
            </Button>
          </DialogClose>
          <Button onClick={onConfirm}>{options.confirmText ?? "Confirm"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
