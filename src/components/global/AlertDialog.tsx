import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { type DialogAlertOptions } from "@/types/ui-services"

interface AlertDialogProps {
  open: boolean
  options: DialogAlertOptions
  onConfirm: () => void
  onClose: () => void
}

export function AlertDialog({ open, options, onConfirm, onClose }: AlertDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{options.title}</DialogTitle>
          <DialogDescription>{options.message}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onConfirm}>{options.confirmText ?? "OK"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
