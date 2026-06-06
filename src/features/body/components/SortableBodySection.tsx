import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, Trash2 } from "lucide-react"
import { Button } from "../../../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu"
import type { BodyRows } from "../type/BodySectionType"
import BodyRow from "./BodyRow"

function SortableBodySection({
  section,
  rowIndex,
  onRemove,
  onAddInput,
  onDeleteInput,
  onAddBodySection,
}: {
  section: BodyRows
  rowIndex: number
  onRemove: (rowIndex: number) => void
  onAddInput?: (sectionId: string, rowIndex: number, inputType: { id: string; name: string }) => void
  onDeleteInput?: (sectionId: string, inputIndex: number, rowIndex: number) => void
  onAddBodySection?: (width: string, rowIndex: number) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: section.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const addBodySection = (width: number, rowIndex: number) => {
    const totalWidth = Object.values(section.bodySections).reduce((sum, currentSection) => {
      return sum + Number(currentSection?.width || 0)
    }, 0)

    if (totalWidth + width < 101) {
      onAddBodySection?.(String(width), rowIndex)
    } else {
      alert("Maximum 3 sections are allowed in a row")
    }
  }

  return (
    <div
      className={`rounded-xl border border-border bg-card p-4 shadow-sm transition ${
        isDragging ? "relative z-10 opacity-80 shadow-lg" : ""
      }`}
      ref={setNodeRef}
      style={style}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button
            aria-label="Drag body section"
            className="cursor-grab active:cursor-grabbing"
            size="icon"
            type="button"
            variant="ghost"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="size-4" />
          </Button>
          <div>
            <h2 className="text-sm font-semibold">{section.name}</h2>
            <p className="text-xs text-muted-foreground">Drag to reposition this section.</p>
          </div>
        </div>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>Add section</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Width options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => addBodySection(100, rowIndex)}>Full width</DropdownMenuItem>
              <DropdownMenuItem onClick={() => addBodySection(50, rowIndex)}>Half width</DropdownMenuItem>
              <DropdownMenuItem onClick={() => addBodySection(34, rowIndex)}>One third width</DropdownMenuItem>
              <DropdownMenuItem onClick={() => addBodySection(25, rowIndex)}>One fourth width</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button aria-label="Remove body section" onClick={() => onRemove(rowIndex)} size="icon" type="button" variant="ghost">
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>

      <BodyRow
        rowIndex={rowIndex}
        rowObject={section.bodySections}
        onAddInput={onAddInput}
        onDeleteInput={onDeleteInput}
      />
    </div>
  )
}

export default SortableBodySection
