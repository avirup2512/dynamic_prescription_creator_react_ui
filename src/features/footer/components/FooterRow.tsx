import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'

import { Button } from '../../../components/ui/button'
import type { FooterSection as FooterSectionType } from '../type/FooterSectionType'
import FooterSection from './FooterSection'

const MAX_SECTIONS_PER_ROW = 3

function SortableRowSection({
  section,
  onAddInput,
  onDeleteInput,
}: {
  section: FooterSectionType
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
      className={`cursor-grab rounded-lg border border-border bg-background p-3 transition active:cursor-grabbing ${
        isDragging ? 'relative z-10 opacity-80 shadow-lg' : ''
      }`}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Button
            aria-label="Drag footer section"
            className="cursor-grab active:cursor-grabbing"
            size="icon"
            type="button"
            variant="ghost"
          >
            <GripVertical className="size-4" />
          </Button>
          <span className="text-sm font-medium">{section.title}</span>
        </div>

      </div>

      <FooterSection 
        sectionId={section.id}
        inputs={section.inputs}
        onAddInput={onAddInput}
        onDeleteInput={onDeleteInput}
      />
    </div>
  )
}

function FooterRow({
  rowId,
  sections,
  onReorderSections,
  onAddInput,
  onDeleteInput,
}: {
  rowId: string
  sections: FooterSectionType[]
  onReorderSections: (
    rowId: string,
    activeSectionId: string,
    overSectionId: string,
  ) => void
  onAddInput?: (sectionId: string, inputType: { id: string; name: string }) => void
  onDeleteInput?: (sectionId: string, inputId: string) => void
}) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (!over || active.id === over.id) {
      return
    }

    onReorderSections(rowId, String(active.id), String(over.id))
  }

  return (
    <div className="rounded-lg border border-dashed border-border bg-muted/20 p-3">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-xs font-medium text-muted-foreground">
          {sections.length}/{MAX_SECTIONS_PER_ROW} footer sections
        </p>
      </div>

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <SortableContext
          items={sections.map((section) => section.id)}
          strategy={horizontalListSortingStrategy}
        >
          <div className="grid gap-3 md:grid-cols-3">
            {sections.map((section) => (
              <SortableRowSection
                key={section.id}
                section={section}
                onAddInput={onAddInput}
                onDeleteInput={onDeleteInput}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {sections.length === 0 ? (
        <div className="flex min-h-24 items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
          Add a footer section to this row.
        </div>
      ) : null}
    </div>
  )
}

export default FooterRow
