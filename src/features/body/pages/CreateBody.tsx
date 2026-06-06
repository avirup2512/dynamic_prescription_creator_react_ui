import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "../../../components/ui/button"
import SortableBodySection from "../components/SortableBodySection"
import type { BodyTemplates } from "../type/BodySectionType"
import {
  AddBodySection,
  AddInputToBodySections,
  AddRows,
  AddTemplate,
  EditBodyTemplate,
  RemoveInputFromBodySections,
  RemoveRows,
  SetCurrentBody,
} from "../store/BodySlice"

const getSavedList = <T,>(key: string): T[] => {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]") || []
  } catch {
    return []
  }
}

export default function CreateBody() {
  const BodyState = useSelector((state: any) => state.body)
  const dispatch = useDispatch<any>()
  const location = useLocation()
  const { id } = useParams()
  const isEdit = location.pathname.includes("/edit")
  const [rows, setRows] = useState<BodyTemplates>(BodyState.defaultBody)

  useEffect(() => {
    dispatch(SetCurrentBody(BodyState.defaultBody))
  }, [dispatch, BodyState.defaultBody])

  useEffect(() => {
    setRows(BodyState.currentBody || BodyState.defaultBody)
  }, [BodyState.currentBody, BodyState.defaultBody])

  useEffect(() => {
    if (!isEdit || !id) {
      return
    }

    const currentTemplate = getSavedList<any>("savedBodyTemplateList").find((template) => template.id === id)

    if (currentTemplate) {
      dispatch(SetCurrentBody(currentTemplate))
    }
  }, [dispatch, id, isEdit])

  const addRows = () => {
    dispatch((AddRows as any)())
  }

  const removeSection = (rowIndex: number) => {
    dispatch((RemoveRows as any)({ rowIndex }))
  }

  const handleAddInput = (sectionId: string, rowIndex: number, inputType: { id: string; name: string }) => {
    dispatch(
      (AddInputToBodySections as any)({
        bodyRowsIndex: rowIndex,
        bodySectionIndex: sectionId,
        inputType,
      }),
    )
  }

  const handleDeleteInput = (sectionId: string, inputIndex: number, rowIndex: number) => {
    dispatch(
      (RemoveInputFromBodySections as any)({
        bodyRowsIndex: rowIndex,
        bodySectionIndex: sectionId,
        bodySectionInputIndex: inputIndex,
      }),
    )
  }

  const handleAddBodySection = (width: string, rowIndex: number) => {
    const totalWidth = Object.values(rows.bodyRows[rowIndex]?.bodySections || {}).reduce((sum: number, section: any) => {
      return sum + Number(section?.width || 0)
    }, 0)

    if (totalWidth + Number(width) < 101) {
      dispatch((AddBodySection as any)({ bodyRowsIndex: rowIndex, width: Number(width) }))
    } else {
      alert("Total width of body sections cannot exceed 3.")
    }
  }

  const handleSaveTemplate = () => {
    const templateObject = {
      id: isEdit && id ? id : `body_template_${Date.now()}`,
      name: rows.name || `Body Template ${new Date().toLocaleString()}`,
      bodyRows: rows.bodyRows,
    }

    if (isEdit && id) {
      dispatch((EditBodyTemplate as any)({ editedBodyTemplate: templateObject, bodyTemplateId: id }))
    } else {
      dispatch((AddTemplate as any)(templateObject))
    }

    alert("Body template saved successfully!")
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-normal">{isEdit ? "Edit Body" : "Create Body"}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Add body sections and reorder them inside the container.
          </p>
        </div>

        <div className="flex gap-2">
          <Button className="h-9 gap-2" type="button" onClick={addRows}>
            <Plus className="size-4" />
            Add row
          </Button>
          <Button className="h-9 gap-2" type="button" onClick={handleSaveTemplate}>
            <Plus className="size-4" />
            {isEdit ? "Update Body" : "Create Body"}
          </Button>
        </div>
      </div>

      <section className="rounded-xl border border-border bg-background p-4 shadow-sm">
        <div className="space-y-4">
          {rows.bodyRows?.map((section, index) => (
            <SortableBodySection
              key={section.id}
              rowIndex={index}
              onRemove={() => removeSection(index)}
              onAddInput={handleAddInput}
              onDeleteInput={handleDeleteInput}
              onAddBodySection={handleAddBodySection}
              section={section}
            />
          ))}
        </div>

        {rows.bodyRows?.length === 0 ? (
          <div className="flex min-h-48 items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
            Add a row to start.
          </div>
        ) : null}
      </section>
    </div>
  )
}

