import {
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical,Trash2 } from 'lucide-react'
import type { HeaderRows } from '../../type/HeaderSectionType'
import { Button } from '../../../../components/ui/button'
import { useEffect } from 'react'
import HeaderRowSection from './HeaderRowSection'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu"
function HeaderRow({
  section,
  rowIndex,
  onRemove,
  onReorderSections,
  onAddInput,
  onDeleteInput,
  onAddHeaderSection
}: {
  section: HeaderRows
  rowIndex:number
  onRemove: (rowIndex: number) => void
  onReorderSections: (
    rowId: string,
    activeSectionId: string,
    overSectionId: string,
  ) => void
  onAddInput?: (sectionId: string, inputType: { id: string; name: string }) => void
  onDeleteInput?: (sectionId: string, inputId: string) => void,
  onAddHeaderSection?: (width: string, rowIndex: number) => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }
  useEffect(()=>{
    console.log(section);
    
  },[section]);
  const addHeaderSection = (width: number, rowIndex: number) => {
    console.log(section.headerSections);
    const headerSectionWidth = Object.values(section.headerSections).reduce(
      (total, headerSection) => {
        const sectionWidth = headerSection.width ? parseInt(headerSection.width, 10) : 0
        return total + sectionWidth
      },
      0,
    )
    if (headerSectionWidth+width < 101) {
      onAddHeaderSection && onAddHeaderSection(width, rowIndex)
    } else {
      alert('Maximum 3 sections are allowed in a row')
    }
  }
  return (
    <div
      className={`rounded-xl border border-border bg-card p-4 shadow-sm transition ${
        isDragging ? 'relative z-10 opacity-80 shadow-lg' : ''
      }`}
      ref={setNodeRef}
      style={style}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button
            aria-label="Drag header section"
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
            <h2 className="text-sm font-semibold">{section?.name}</h2>
            <p className="text-xs text-muted-foreground">
              {/* Drag to reposition this section. */}
            </p>
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
                <DropdownMenuItem onClick={() => addHeaderSection(100,rowIndex)}>
                  Full width
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => addHeaderSection(50,rowIndex)}>
                  Half width
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => addHeaderSection(33.33,rowIndex)}>
                  One third width
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => addHeaderSection(25,rowIndex)}>
                  One fourth width
                </DropdownMenuItem>
              </DropdownMenuContent>
          </DropdownMenu>
        <Button
          aria-label="Remove header section"
          onClick={() => onRemove(rowIndex)}
          size="icon"
          type="button"
          variant="ghost"
        >
          <Trash2 className="size-4" />
        </Button>
        </div>
      </div>
      <HeaderRowSection
        rowId={section.id}
        rowIndex={rowIndex}
        rowObject={section?.headerSections}
        onReorderSections={onReorderSections}
        onAddInput={onAddInput}
        onDeleteInput={onDeleteInput}
      />
    </div>
  )
}

export default HeaderRow;
