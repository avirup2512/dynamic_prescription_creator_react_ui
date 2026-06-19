import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../components/ui/button'
import { Edit, Eye, EyeOff, GripVertical, Trash2 } from 'lucide-react'
import { DndContext, type DragEndEvent, type DragStartEvent, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import SectionService from '@/features/section/service/SectionService';
import { AppendSectionInTemplate, MoveSectionInTemplate, RemoveSectionFromTemplate, ToggleVisibilityInTemplate, UpdateSectionInTemplate } from '../store/TemplateSlice';
import SectionEditModal from './SectionEditModal';

const sectionLabels = {
  header: 'Header',
  body: 'Body',
  footer: 'Footer',
} as const;

const visibilityKeys = {
  header: 'show_header',
  body: 'show_body',
  footer: 'show_footer',
} as const;

type TemplateSectionManagerProps = {
  sectionType: 'header' | 'body' | 'footer'
  handleToggleSectionVisibility: (key: 'show_header' | 'show_body' | 'show_footer', value: boolean) => void
  handleAddSection: (sectionId: string, sectionType: 'header' | 'body' | 'footer') => void
  handleRemoveSection: (sectionType:'header'|'body'|'footer', rowIndex:number) => void
  savedSectionList: any[]
}

type SortableSectionItemProps = {
  section: any;
  index: number;
  visible: boolean;
  onToggleVisibility: (rowId: string) => void;
  onEdit: () => void;
  onRemove: () => void;
};

function SortableSectionItem({ section, index, visible, onToggleVisibility, onEdit, onRemove }: SortableSectionItemProps) {
  const itemId = section.id || `section-${index}`;
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: itemId });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li ref={setNodeRef} style={style} className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="rounded-full p-1 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="size-4" />
        </button>
        <span className={visible ? 'text-slate-800' : 'text-slate-400 line-through'}>
          {section.name || `Section ${index + 1}`}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="rounded-full p-1 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          onClick={() => onToggleVisibility(section.id || `${index}`)}
        >
          {section.isVisible ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
        </button>
        <button
          type="button"
          className="rounded-full p-1 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          onClick={onEdit}
        >
          <Edit className="size-4" />
        </button>
        <button
          type="button"
          className="rounded-full p-1 text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={onRemove}
        >
          <Trash2 className="size-4" />
        </button>
      </div>
    </li>
  );
}

function TemplateSectionManager({
  sectionType,
  handleToggleSectionVisibility,
  handleAddSection,
  handleRemoveSection,
  savedSectionList,
}: TemplateSectionManagerProps)
{
  const dispatch = useDispatch();
  const sectionService = SectionService;
  const TemplateState = useSelector((state: any) => state.template);
  const [pickerOpen, setPickerOpen] = useState(false)
  const [selectedSectionId, setSelectedSectionId] = useState('')
  const [sectionModalOpen, setSectionModalOpen] = useState(false)
  const [sectionModalMode, setSectionModalMode] = useState<'add' | 'edit'>('add')
  const [editingSection, setEditingSection] = useState<any>(null)
  const [editingSectionIndex, setEditingSectionIndex] = useState<number | null>(null)
  const [rowVisibility, setRowVisibility] = useState<Record<string, boolean>>({})
  const [activeId, setActiveId] = useState<string | null>(null)

  const currentSection = TemplateState.CurrentTemplate[sectionType] ?? []
  const sectionIds = currentSection.map((section: any, index: number) => section.id || `section-${index}`)
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  const toggleRowVisibility = (rowId: string, index:number) => {
    setRowVisibility((prev) => ({
      ...prev,
      [rowId]: !(prev[rowId] ?? true),
    }));
    const payload = {sectionIndex:index,sectionType,}
    dispatch(ToggleVisibilityInTemplate(payload))
  }

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id as string)
  }

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveId(null)
    if (!over || active.id === over.id) return

    const oldIndex = sectionIds.indexOf(active.id as string)
    const newIndex = sectionIds.indexOf(over.id as string)
    if (oldIndex === -1 || newIndex === -1) return

    dispatch(MoveSectionInTemplate({ sectionType, fromIndex: oldIndex, toIndex: newIndex }))
  }

    const isRowVisible = (rowId: string) => rowVisibility[rowId] ?? true
    const addSectionInTemplate = async (selectedSectionId: any) => {
        if (selectedSectionId)
        {
            const selectedSection = await sectionService.getSectionById(selectedSectionId);
            if (selectedSection && selectedSection.success)
            {
                dispatch(AppendSectionInTemplate({sectionType,section:selectedSection.data}))
            }
        }
    }
    const removeSectionFromTemplate = async (sectionIndex: any) => {
        console.log(sectionIndex)
        if(sectionIndex !== undefined || sectionIndex !== null) 
        dispatch(RemoveSectionFromTemplate({sectionType,sectionIndex}))
    }
    const openAddSectionModal = () => {
      setSectionModalMode('add')
      setEditingSection(null)
      setEditingSectionIndex(null)
      setSectionModalOpen(true)
    }
    const openEditSectionModal = (section: any, sectionIndex: number) => {
      setSectionModalMode('edit')
      setEditingSection(section)
      setEditingSectionIndex(sectionIndex)
      setSectionModalOpen(true)
    }
  const handleSectionSaved = async (section: any) => {
    console.log(section)
    if (section?.id)
    {
      const fetchedSection = await sectionService.getSectionById(section.id);
      if (fetchedSection && fetchedSection.success)
      {
        if (sectionModalMode === 'edit' ) {
          dispatch(UpdateSectionInTemplate({ sectionType, sectionIndex: editingSectionIndex, section:fetchedSection?.data }))
        } else {
          dispatch(AppendSectionInTemplate({ sectionType, section:fetchedSection?.data }))
          }
      }
    }
    }

  return (
    <section className="rounded-2xl border border-border bg-slate-50 p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h4 className="text-sm font-semibold text-slate-900">{sectionLabels[sectionType]}</h4>
          <p className="text-sm text-slate-500">Show/hide {sectionLabels[sectionType].toLowerCase()} block and add saved sections.</p>
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-700 hover:bg-slate-100"
            onClick={() => handleToggleSectionVisibility(visibilityKeys[sectionType], !TemplateState.CurrentTemplate[visibilityKeys[sectionType]])}
          >
            {TemplateState.CurrentTemplate[visibilityKeys[sectionType]] ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
          </button>
          {TemplateState.CurrentTemplate[visibilityKeys[sectionType]] ? 'Visible' : 'Hidden'}
        </label>
      </div>

      <div className="mb-4 rounded-2xl border border-border bg-white p-3 text-sm">
        <div className="text-xs uppercase tracking-[0.12em] text-slate-500">Current sections</div>
        <div className="mt-2 font-medium text-slate-800">
          {currentSection.length === 0 ? (
            'No sections added'
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={sectionIds} strategy={verticalListSortingStrategy}>
                <ul className="space-y-2">
                  {currentSection.map((section: any, index: number) => {
                    const visible = isRowVisible(section.id || `${index}`)
                    return (
                      <SortableSectionItem
                        key={section.id || `section-${index}`}
                        section={section}
                        index={index}
                        visible={visible}
                        onToggleVisibility={() => toggleRowVisibility(section.id || `${index}`,index)}
                        onEdit={() => openEditSectionModal(section, index)}
                        onRemove={() => removeSectionFromTemplate(index)}
                      />
                    )
                  })}
                </ul>
              </SortableContext>
            </DndContext>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
      <Button type="button" variant="outline" onClick={openAddSectionModal}>
        Add section
      </Button>
      <Button type="button" variant="ghost" onClick={() => setPickerOpen((prev) => !prev)}>
        Add saved section
      </Button>
      </div>

      {pickerOpen && (
        <div className="mt-4 rounded-2xl border border-border bg-white p-4 shadow-sm">
          <label className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Choose saved section</label>
          <select
            value={selectedSectionId}
            onChange={(event) => setSelectedSectionId(event.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
          >
            <option value="">Choose a section...</option>
            {savedSectionList.map((section:any) => (
              <option key={section.id} value={section.id}>
                {section.name}
              </option>
            ))}
          </select>
          <div className="mt-3 flex gap-2">
            <Button
              type="button"
              disabled={!selectedSectionId}
              onClick={() => {
                addSectionInTemplate(selectedSectionId)
                setPickerOpen(false)
                setSelectedSectionId('')
              }}
            >
              Add
            </Button>
            <Button type="button" variant="ghost" onClick={() => setPickerOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
      <SectionEditModal
        isOpen={sectionModalOpen}
        mode={sectionModalMode}
        section={editingSection}
        onOpenChange={(open) => {
          setSectionModalOpen(open)
          if (!open) {
            setEditingSection(null)
            setEditingSectionIndex(null)
          }
        }}
        onSaved={handleSectionSaved}
      />
    </section>
  )
}
export default TemplateSectionManager;
