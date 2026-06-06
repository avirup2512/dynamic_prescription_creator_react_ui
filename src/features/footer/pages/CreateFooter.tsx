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
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { Plus} from 'lucide-react'
import { useState } from 'react'
import { Button } from '../../../components/ui/button'
import SortableFooterSection from '../components/SortableFooterSection'
import type { FooterSection, FooterSectionItem } from '../type/FooterSectionType'

function createDefaultFooterSections(rowId: string): FooterSection[] {
  return [1, 2, 3].map((sectionNumber) => ({
    id: `${rowId}-section-${sectionNumber}`,
    title: `Footer Section ${sectionNumber}`,
    inputs: [],
  }))
}

export default function CreateFooter() {
  const [rows, setRows] = useState<FooterSectionItem[]>([
    {
      id: 'row-1',
      title: 'Footer Row 1',
      sections: createDefaultFooterSections('row-1'),
    },
  ])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  function addSection() {
    setRows((currentSections) => {
      const nextIndex = currentSections.length + 1
      const rowId = `row-${Date.now()}`

      return [
        ...currentSections,
        {
          id: rowId,
          title: `Footer Row ${nextIndex}`,
          sections: createDefaultFooterSections(rowId),
        },
      ]
    })
  }

  function removeSection(sectionId: string) {
    setRows((currentSections) =>
      currentSections.filter((section) => section.id !== sectionId),
    )
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (!over || active.id === over.id) {
      return
    }

    setRows((currentSections) => {
      const oldIndex = currentSections.findIndex(
        (section) => section.id === active.id,
      )
      const newIndex = currentSections.findIndex(
        (section) => section.id === over.id,
      )

      return arrayMove(currentSections, oldIndex, newIndex)
    })
  }

  function reorderFooterSections(
    rowId: string,
    activeSectionId: string,
    overSectionId: string,
  ) {
    setRows((currentRows) =>
      currentRows.map((row) => {
        if (row.id !== rowId) {
          return row
        }

        const oldIndex = row.sections.findIndex(
          (section) => section.id === activeSectionId,
        )
        const newIndex = row.sections.findIndex(
          (section) => section.id === overSectionId,
        )

        if (oldIndex === -1 || newIndex === -1) {
          return row
        }

        return {
          ...row,
          sections: arrayMove(row.sections, oldIndex, newIndex),
        }
      }),
    )
  }

  function handleAddInput(
    sectionId: string,
    inputType: { id: string; name: string },
  ) {
    setRows((currentRows) =>
      currentRows.map((row) => ({
        ...row,
        sections: row.sections.map((section) => {
          if (section.id !== sectionId) {
            return section
          }

          const newInput = {
            id: `input-${Date.now()}`,
            inputTypeId: inputType.id,
            name: inputType.name,
          }

          return {
            ...section,
            inputs: [...(section.inputs || []), newInput],
          }
        }),
      })),
    )
  }

  function handleDeleteInput(sectionId: string, inputId: string) {
    setRows((currentRows) =>
      currentRows.map((row) => ({
        ...row,
        sections: row.sections.map((section) => {
          if (section.id !== sectionId) {
            return section
          }

          return {
            ...section,
            inputs: (section.inputs || []).filter((input) => input.id !== inputId),
          }
        }),
      })),
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-normal">
            Create Footer
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Add footer sections and reorder them inside the container.
          </p>
        </div>

        <Button className="h-9 gap-2" type="button" onClick={addSection}>
          <Plus className="size-4" />
          Add row
        </Button>
        <Button className="h-9 gap-2" type="button" onClick={addSection}>
          <Plus className="size-4" />
          Save Footer
        </Button>
      </div>

      <section className="rounded-xl border border-border bg-background p-4 shadow-sm">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <SortableContext
            items={rows.map((section) => section.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {rows.map((section) => (
                <SortableFooterSection
                  key={section.id}
                  onRemove={removeSection}
                  onReorderSections={reorderFooterSections}
                  onAddInput={handleAddInput}
                  onDeleteInput={handleDeleteInput}
                  section={section}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {rows.length === 0 ? (
          <div className="flex min-h-48 items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
            Add a row to start.
          </div>
        ) : null}
      </section>
    </div>
  )
}
