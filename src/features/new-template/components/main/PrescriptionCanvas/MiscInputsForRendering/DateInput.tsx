import { useEffect, useState } from "react"
import {
    DateSelector,
    formatDateValue,
    type DateSelectorValue,
} from "@/components/reui/date-selector"

import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon } from 'lucide-react'
import type { ColumnInputItem } from "@/features/new-template/type/TemplateType"

export function DateInput({ input, mode, onChange }: { input: ColumnInputItem, mode: string, onChange?: (value: DateSelectorValue | undefined) => void }) {

    // Normalize incoming values which might be a Date or a DateSelectorValue
    const toSelectorValue = (v: any): DateSelectorValue | undefined => {
        if (!v) return undefined
        // If already a DateSelectorValue (has period), return as-is
        if (typeof v === "object" && (v as any).period) return v as DateSelectorValue
        // If it's a Date object, convert to DateSelectorValue
        if (v instanceof Date) {
            return { period: "day", operator: "is", startDate: v }
        } else if (typeof v === "string") {
            const parsedDate = new Date(v)
            if (!isNaN(parsedDate.getTime())) {
                return { period: "day", operator: "is", startDate: parsedDate }
            }
        }
        return undefined
    }

    const [value, setValue] = useState<DateSelectorValue | undefined>(
        toSelectorValue(input?.template_input_value)
    )
    const [open, setOpen] = useState(false)
    const [internalValue, setInternalValue] = useState<DateSelectorValue | undefined>(
        toSelectorValue(input?.template_input_value)
    )

    // Prefer `value` from parent/store, but fall back to `internalValue` if parent hasn't updated yet
    const normalizedForDisplay = toSelectorValue(value ?? internalValue)
    const formattedValue = normalizedForDisplay ? formatDateValue(normalizedForDisplay) : ""
    const displayText = formattedValue || "Select a date"

    useEffect(() => {
        setInternalValue(value)
    }, [value])
    useEffect(() => {
        if (input?.template_input_value !== undefined) {
            setValue(toSelectorValue(input.template_input_value))
        }
    }, [input?.template_input_value])

    const handleCancel = () => {
        setInternalValue(value)
        setOpen(false)
    }

    return (
        <>
            {
                mode == "edit" ?
                    <Popover open={open} onOpenChange={setOpen}>
                        <div className="min-w-0 flex-1 mb-2">
                            <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                                {input.name || input.input_name || "Untitled"}
                            </div>
                        </div>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full min-w-0 max-w-full justify-start overflow-hidden text-left">
                                <CalendarIcon className="shrink-0" />
                                <span className="truncate">{displayText}</span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto gap-3 p-0" align="start" sideOffset={4}>
                            <div className="p-3">
                                <DateSelector
                                    value={internalValue}
                                    onChange={setInternalValue}
                                    allowRange={true}
                                    label="Select date"
                                    inputHint="Try: 2025, Q4, 05/10/2025"
                                />
                            </div>
                            <Separator className="p-0" />
                            <div className="flex justify-end gap-2 p-3 pt-0">
                                <Button variant="outline" onClick={handleCancel}>
                                    Cancel
                                </Button>
                                <Button onClick={() => {
                                    // Trace values to debug display update issue
                                    console.log("DateInput Apply -> internalValue:", internalValue)
                                    console.log("DateInput Apply -> previous value:", value)
                                    setValue(internalValue);
                                    onChange && onChange(internalValue);
                                    setOpen(false);
                                }}>Apply</Button>
                            </div>
                        </PopoverContent>
                    </Popover > : <div className="flex w-full min-w-0 items-center gap-2 justify-start overflow-hidden"><CalendarIcon size={16} className="shrink-0" /><span className="truncate">{displayText}</span></div>
            }
        </>
    )
}
