"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ChevronDownIcon } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "../ui/button"

export type FontSizeOption = 12 | 14 | 16 | 18

export interface InputUtilityOptionsProps {
  inputIndex: number
  inputGroupIndex: number
  showLabel: boolean
  isBold: boolean
  extraNote: boolean
  fontSize: FontSizeOption
  extraNoteValue?: string
  onShowLabelChange: (index:number,inputGroup:number,value: boolean) => void
  onIsBoldChange: (index:number,inputGroup:number,value: boolean) => void
  onExtraNoteChange: (index:number,inputGroup:number,value: boolean) => void
  onFontSizeChange: (index: number, inputGroupIndex: number, value: FontSizeOption) => void
  onExtraNoteValueChange?: (index: number, inputGroupIndex: number, value: string) => void
  className?: string
  showExtraNoteTextBox?: boolean
}

const fontSizeOptions: Array<{ value: FontSizeOption; label: string }> = [
  { value: 12, label: "Small (12px)" },
  { value: 14, label: "Medium (14px)" },
  { value: 16, label: "Large (16px)" },
  { value: 18, label: "Extra Large (18px)" },
]

function OptionTile({
  id,
  checked,
  label,
  onChange,
  index = 0,
  inputGroupIndex = 0
}: {
  id: string
  checked: boolean
  label: string
  onChange: (index: number,inputGroupIndex:number, value: boolean) => void
  index?: number
  inputGroupIndex?: number
}) {
  return (
    <Label
      htmlFor={id}
      className="group flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-accent/30"
    >
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(value) => onChange(index, inputGroupIndex, value === true)}
        className="shrink-0"
      />
      <span className="text-xs font-medium leading-tight text-foreground">
        {label}
      </span>
    </Label>
  )
}

export function InputUtilityOptions({
  inputIndex,
  inputGroupIndex,
  showLabel,
  isBold,
  extraNote,
  fontSize,
  extraNoteValue,
  onShowLabelChange,
  onIsBoldChange,
  onExtraNoteChange,
  onFontSizeChange,
  onExtraNoteValueChange,
  className,
  showExtraNoteTextBox = false
}: InputUtilityOptionsProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [localExtraNoteValue, setLocalExtraNoteValue] = useState(extraNoteValue || "")
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
  console.log(extraNoteValue)
  return (
    <section
      className={cn(
        "flex flex-col gap-3.5 rounded border border-border/60 bg-card/50 p-1 md:gap-4 md:rounded md:p-1 mt-2",
        className
      )}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="group flex items-center justify-between gap-2 rounded-lg px-1 py-1 transition-colors hover:bg-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        aria-expanded={isExpanded}
      >
        <div className="flex flex-col gap-1 text-left">
          {/* <h3 className="text-xs font-bold uppercase tracking-wider text-foreground/80 md:text-sm">
            Input Options
          </h3> */}
          <p className="font-bold text-xs leading-tight text-muted-foreground md:text-sm md:leading-snug">
            Configure input utilities and styling
          </p>
        </div>
        <ChevronDownIcon
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform duration-200 md:size-5",
            isExpanded && "rotate-180"
          )}
        />
      </button>

      {isExpanded && (
        <div className="flex flex-col gap-3.5 animate-in fade-in duration-200">
          <div className="flex flex-wrap gap-1">
            <OptionTile
              id="input-utility-show-label"
              checked={showLabel}
              label="Show Label"
              onChange={onShowLabelChange}
              index={inputIndex}
              inputGroupIndex={inputGroupIndex}
            />
            <OptionTile
              id="input-utility-is-bold"
              checked={isBold}
              label="Is Bold"
              onChange={onIsBoldChange}
              index={inputIndex}
              inputGroupIndex={inputGroupIndex}
            />
            <OptionTile
              id="input-utility-extra-note"
              checked={extraNote}
              label="Extra Note"
              onChange={onExtraNoteChange}
              index={inputIndex}
              inputGroupIndex={inputGroupIndex}

            />
          </div>

          {extraNote && showExtraNoteTextBox && (
            <div className="space-y-2 rounded-lg border border-border/40 bg-background/40 px-3 py-3 md:rounded-xl md:px-3.5 md:py-3">
              <label className="text-xs font-semibold text-foreground">Extra Note</label>
              <textarea
                className="min-h-[90px] w-full resize-none rounded-lg border border-input bg-transparent px-3 py-2 text-sm text-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/50"
                placeholder="Add an extra note here..."
                value={localExtraNoteValue}
                onChange={(e) => {
                  setLocalExtraNoteValue(e.target.value);
                  setSaveButtonDisabled(false);
                }}
              />
              <Button 
                onClick={() => {
                  onExtraNoteValueChange && onExtraNoteValueChange(inputIndex, inputGroupIndex, localExtraNoteValue);
                  setSaveButtonDisabled(true);
                }}
                disabled={saveButtonDisabled}
              >
                save
              </Button>
            </div>
          )}

          <div className="space-y-1.5 rounded-lg border border-border/40 bg-background/40 px-3 py-2.5 md:rounded-xl md:px-3.5 md:py-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-foreground">Font Size</label>
              <p className="text-xs text-muted-foreground">
                Select text size
              </p>
            </div>
            <Select value={String(fontSize)} onValueChange={(value) => onFontSizeChange(inputIndex, inputGroupIndex, Number(value) as FontSizeOption)}>
              <SelectTrigger className="h-8 w-full text-xs md:h-9 md:text-sm" size="sm">
                <SelectValue placeholder="Choose size" />
              </SelectTrigger>
              <SelectContent>
                {fontSizeOptions.map((option) => (
                  <SelectItem key={option.value} value={String(option.value)}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </section>
  )
}
