import {
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical,Trash2 } from 'lucide-react'
import FooterRow from './FooterRow'
import type { FooterSectionItem } from '../type/FooterSectionType'
import { Button } from '../../../components/ui/button'

function SortableFooterSection({
  section,
  onRemove,
  onReorderSections,
  onAddInput,
  onDeleteInput,
}: {
  section: FooterSectionItem
  onRemove: (id: string) => void
  onReorderSections: (
    rowId: string,
    activeSectionId: string,
    overSectionId: string,
  ) => void
  onAddInput?: (sectionId: string, inputType: { id: string; name: string }) => void
  onDeleteInput?: (sectionId: string, inputId: string) => void
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
            aria-label="Drag footer section"
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
            <h2 className="text-sm font-semibold">{section.title}</h2>
            <p className="text-xs text-muted-foreground">
              Drag to reposition this section.
            </p>
          </div>
        </div>

        <Button
          aria-label="Remove footer section"
          onClick={() => onRemove(section.id)}
          size="icon"
          type="button"
          variant="ghost"
        >
          <Trash2 className="size-4" />
        </Button>
      </div>

      <FooterRow
        rowId={section.id}
        sections={section.sections}
        onReorderSections={onReorderSections}
        onAddInput={onAddInput}
        onDeleteInput={onDeleteInput}
      />
    </div>
  )
}

export default SortableFooterSection;
