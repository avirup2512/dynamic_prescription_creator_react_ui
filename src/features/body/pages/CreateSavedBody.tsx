import { useEffect, useState } from "react"
import { ArrowRight, ChevronDown, Trash2 } from "lucide-react"
import { useLocation, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "../../../components/ui/button"
import { Checkbox } from "../../../components/ui/checkbox"
import { InputMenuWithAddButton } from "../components/InputMenuWithAddButton"
import type { SavedBody } from "../type/BodySectionType"
import {
  AddInputToBodySectionsForSavedData,
  AddSavedBody,
  EditSavedBody,
  EditSavedQuantityField,
  HandleInputChange,
  HandleInputQuantityChange,
  RemoveInputFromBodySectionsForSavedData,
  SetCurrentSavedBody,
} from "../store/BodySlice"
import BodyUtilsService from "../utils/utilsService"
import { INPUT_TYPE } from "../../../constant/inputType.enum"

const getSavedList = <T,>(key: string): T[] => {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]") || []
  } catch {
    return []
  }
}

export default function CreateSavedBody() {
  const BodyState = useSelector((state: any) => state.body)
  const dispatch = useDispatch<any>()
  const location = useLocation()
  const { id } = useParams()
  const isEditMode = location.pathname.includes("/edit")

  const savedInputList = {
    input: getSavedList<any>("savedInputList"),
    dropdown: getSavedList<any>("savedDropdownList"),
    textbox: getSavedList<any>("savedTextboxList"),
    quantity: getSavedList<any>("savedQuantityList"),
  }

  const bodyTemplates = getSavedList<any>("savedBodyTemplateList")
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("")
  const [name, setName] = useState<string>("")

  useEffect(() => {
    if (!isEditMode || !id) {
      return
    }

    const savedBody = getSavedList<any>("savedBodyList").find((item) => item.id === id)

    if (!savedBody) {
      return
    }

    setName(savedBody.name || "")
    setSelectedTemplateId(savedBody.templateId || "")
    dispatch(SetCurrentSavedBody(savedBody))
  }, [dispatch, id, isEditMode])

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplateId(templateId)

    const template = bodyTemplates.find((item: any) => item.id === templateId)

    if (template) {
      dispatch(SetCurrentSavedBody(template))
    }
  }

  const handleInputChange = (rowIndex: number, sectionKey: string, inputIndex: number, value: string) => {
    dispatch(
      (HandleInputChange as any)({
        bodyRowIndex: rowIndex,
        bodySectionIndex: sectionKey,
        inputIndex,
        inputValue: value,
      }),
    )
  }

  const handleInputQuantityChange = (rowIndex: number, sectionKey: string, inputIndex: number, value: string) => {
    dispatch(
      (HandleInputQuantityChange as any)({
        bodyRowIndex: rowIndex,
        bodySectionIndex: sectionKey,
        inputIndex,
        inputValue: value,
      }),
    )
  }

  const handleQuantityToggle = (rowIndex: number, sectionKey: string, inputIndex: number, checked: boolean) => {
    dispatch(
      (EditSavedQuantityField as any)({
        bodyRowIndex: rowIndex,
        bodySectionIndex: sectionKey,
        inputSectionIndex: inputIndex,
        quantityField: checked,
      }),
    )
  }

  const handleSelectInputType = (inputType: { id: string; name: string }, rowIndex: number, sectionKey: string) => {
    dispatch(
      (AddInputToBodySectionsForSavedData as any)({
        bodyRowsIndex: rowIndex,
        bodySectionIndex: sectionKey,
        inputType: {
          id: `body-input-${Date.now()}`,
          type: inputType.id,
          quantityField: false,
          quantityDataId: "",
          inputEntityTypeId: inputType.id,
          inputEntityDataId: "",
        },
      }),
    )
  }

  const handleDeleteInput = (rowIndex: number, sectionKey: string, inputIndex: number) => {
    dispatch(
      (RemoveInputFromBodySectionsForSavedData as any)({
        bodyRowsIndex: rowIndex,
        bodySectionIndex: sectionKey,
        inputIndex,
      }),
    )
  }

  const handleSave = () => {
    if (!name.trim()) {
      alert("Please enter a name for this body")
      return
    }

    if (!selectedTemplateId) {
      alert("Please select a template first")
      return
    }

    const savedBodyData: SavedBody = {
      name,
      id: isEditMode && id ? id : `saved_body_${Date.now()}`,
      templateId: selectedTemplateId,
      bodyRows: BodyState.currentSavedBody?.bodyRows || [],
    }

    if (isEditMode && id) {
      dispatch((EditSavedBody as any)({ editedSavedBody: savedBodyData, savedBodyId: id }))
    } else {
      dispatch((AddSavedBody as any)(savedBodyData))
    }

    alert("Body data saved successfully!")
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-normal">
          {isEditMode ? "Edit Saved Body" : "Create Saved Body"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {isEditMode
            ? "Update the body data below."
            : "Select a body template and fill in the data to create a saved instance."}
        </p>
      </div>

      <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
        <div className="mb-8">
          <label className="text-sm font-medium">Body Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a name for this saved body"
            className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-3 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/20"
          />
        </div>

        <div className="mb-8">
          <label className="text-sm font-medium">Select Body Template *</label>
          <div className="relative mt-2">
            <select
              value={selectedTemplateId}
              onChange={(e) => handleTemplateChange(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-3 text-sm outline-none transition appearance-none cursor-pointer focus:border-ring focus:ring-3 focus:ring-ring/20"
            >
              <option value="">Choose a body template</option>
              {bodyTemplates.map((template: any) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>

        {selectedTemplateId && BodyState.currentSavedBody?.bodyRows?.length ? (
          <div className="space-y-6">
            <div className="border-t border-border pt-6">
              <h2 className="mb-4 text-lg font-semibold">Fill Template Data</h2>

              {BodyState.currentSavedBody.bodyRows.map((row: any, rowIndex: number) => (
                <div key={row.id || rowIndex} className="mb-8 rounded-lg border border-border bg-muted/20 p-4">
                  <h3 className="mb-4 text-sm font-semibold text-muted-foreground">Row {rowIndex + 1}</h3>

                  <div className="grid grid-cols-12 gap-3">
                    {Object.keys(row.bodySections || {}).map((sectionKey) => {
                      const section = row.bodySections[sectionKey]
                      const inputs = section?.inputs || []

                      return (
                        <div
                          key={`section-${sectionKey}`}
                          className={`rounded-lg border border-dashed border-border bg-background p-3 ${BodyUtilsService.getWidthClass(section?.width)}`}
                        >
                          <p className="mb-3 text-xs font-semibold text-muted-foreground">Section {sectionKey}</p>

                          <div className="space-y-3">
                            {inputs.length > 0 ? (
                              inputs.map((input: any, inputIndex: number) => {
                                const inputTypeName =
                                  BodyState.INPUT_TYPES.find((type: any) => type.id === input.type)?.name || "Input"

                                return (
                                  <div key={input.id || `${sectionKey}-${inputIndex}`} className="rounded-md border border-border/60 bg-background p-2">
                                    <label className="text-xs font-medium text-muted-foreground">
                                      {inputTypeName} {inputIndex + 1}
                                    </label>

                                    <div className="mt-1 flex gap-2">
                                      {input.type === INPUT_TYPE.INPUTTYPE_1 ? (
                                        <select
                                          value={input.inputEntityDataId || ""}
                                          onChange={(event) =>
                                            handleInputChange(rowIndex, sectionKey, inputIndex, event.target.value)
                                          }
                                          className="w-full rounded-md border border-input bg-background px-2 py-1.5 text-xs outline-none transition appearance-none cursor-pointer focus:border-ring focus:ring-2 focus:ring-ring/20"
                                        >
                                          <option value="">Select an option</option>
                                          {savedInputList.input.map((item: any) => (
                                            <option key={item.id} value={item.id}>
                                              {item.label}
                                            </option>
                                          ))}
                                        </select>
                                      ) : input.type === INPUT_TYPE.INPUTTYPE_2 ? (
                                        <select
                                          value={input.inputEntityDataId || ""}
                                          onChange={(event) =>
                                            handleInputChange(rowIndex, sectionKey, inputIndex, event.target.value)
                                          }
                                          className="w-full rounded-md border border-input bg-background px-2 py-1.5 text-xs outline-none transition appearance-none cursor-pointer focus:border-ring focus:ring-2 focus:ring-ring/20"
                                        >
                                          <option value="">Select an option</option>
                                          {savedInputList.dropdown.map((item: any) => (
                                            <option key={item.id} value={item.id}>
                                              {item.label}
                                            </option>
                                          ))}
                                        </select>
                                      ) : (
                                        <input
                                          type="text"
                                          value={input.inputEntityDataId || ""}
                                          onChange={(event) =>
                                            handleInputChange(rowIndex, sectionKey, inputIndex, event.target.value)
                                          }
                                          placeholder={`Enter ${inputTypeName}`}
                                          className="w-full rounded-md border border-input bg-background px-2 py-1.5 text-xs outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
                                        />
                                      )}

                                      <Button
                                        aria-label="Delete input"
                                        onClick={() => handleDeleteInput(rowIndex, sectionKey, inputIndex)}
                                        size="icon"
                                        type="button"
                                        variant="ghost"
                                        className="h-8 w-8 hover:bg-red-100"
                                      >
                                        <Trash2 className="size-3 text-red-600" />
                                      </Button>
                                    </div>

                                    <div className="mt-2 flex flex-wrap items-center gap-3">
                                      <label className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Checkbox
                                          checked={Boolean(input.quantityField)}
                                          onCheckedChange={(checked) =>
                                            handleQuantityToggle(rowIndex, sectionKey, inputIndex, checked === true)
                                          }
                                        />
                                        Add Quantity
                                      </label>

                                      {input.quantityField ? (
                                        <select
                                          value={input.quantityDataId || ""}
                                          onChange={(event) =>
                                            handleInputQuantityChange(rowIndex, sectionKey, inputIndex, event.target.value)
                                          }
                                          className="w-32 rounded-md border border-input bg-background px-2 py-1.5 text-xs outline-none transition appearance-none cursor-pointer focus:border-ring focus:ring-2 focus:ring-ring/20"
                                        >
                                          <option value="">Qty</option>
                                          {savedInputList.quantity.map((quantity: any) => (
                                            <option key={quantity.id} value={quantity.id}>
                                              {quantity.label}
                                            </option>
                                          ))}
                                        </select>
                                      ) : null}
                                    </div>
                                  </div>
                                )
                              })
                            ) : (
                              <p className="text-xs text-center text-muted-foreground">No inputs in this section</p>
                            )}

                            <InputMenuWithAddButton
                              handleSelectInputType={handleSelectInputType}
                              rowIndex={rowIndex}
                              sectionKey={sectionKey}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 border-t border-border pt-6">
              <Button onClick={handleSave} className="gap-2">
                {isEditMode ? "Update Body" : "Save Body"}
                <ArrowRight className="size-4" />
              </Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </div>
        ) : (
          <div className="flex min-h-96 items-center justify-center rounded-lg border border-dashed border-border">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Select a body template to get started</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
