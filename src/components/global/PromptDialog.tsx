import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { DialogPromptOptions } from "@/types/ui-services"

interface PromptDialogProps {
  open: boolean
  options: DialogPromptOptions
  onConfirm: (value: string) => void
  onCancel: () => void
}

export function PromptDialog({ open, options, onConfirm, onCancel }: PromptDialogProps) {
  const [value, setValue] = useState(options.defaultValue ?? "")

  return (
    <Dialog open={open} onOpenChange={(value) => !value && onCancel()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{options.title}</DialogTitle>
          <DialogDescription>{options.message}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
            {options.placeholder ?? "Enter value"}
          </label>
          <input
            type={options.inputType ?? "text"}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            placeholder={options.placeholder ?? "Enter value"}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            {options.cancelText ?? "Cancel"}
          </Button>
          <Button onClick={() => onConfirm(value)}>{options.confirmText ?? "Submit"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
