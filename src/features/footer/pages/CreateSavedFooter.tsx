import { useState } from 'react'
import { Button } from '../../../components/ui/button'
import { ArrowRight, ChevronDown } from 'lucide-react'
import AppObject from '../../../demoData/AllData'
import { INPUT_TYPE } from '../../../constant/inputType.enum'

type SavedFooterData = {
  id: string
  templateId: string
  rowData: Array<{
    [key: number]: Array<{
      inputEntityId: string
      type: string
      value?: string
    }>
  }>
}

const footerTemplates = AppObject.App.footer.templates

export default function CreateSavedFooter() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [savedData, setSavedData] = useState<SavedFooterData>({
    id: `saved_footer_${Date.now()}`,
    templateId: '',
    rowData: [],
  })
  const [inputValues, setInputValues] = useState<Record<string, string>>({})

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId)
    setSavedData((prev) => ({
      ...prev,
      templateId,
      rowData: [],
    }))
    setInputValues({})
  }

  const template = footerTemplates.find((t) => t.id === selectedTemplate)

  const handleInputChange = (
    key: string,
    value: string,
  ) => {
    setInputValues((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSave = () => {
    if (!selectedTemplate) {
      alert('Please select a template first')
      return
    }

    // Build the row data from inputs
    const newRowData = template?.headerRows.map((row) => {
      const sectionData: Record<number, Array<{ inputEntityId: string; type: string; value?: string }>> = {}

      Object.keys(row.footerSections).forEach((sectionKey) => {
        const sectionNum = parseInt(sectionKey)
        const inputs = row.footerSections[sectionNum as keyof typeof row.footerSections]

        sectionData[sectionNum] = inputs.map((input) => {
          const inputKey = `${sectionNum}-${input.type}`
          return {
            inputEntityId: inputKey,
            type: input.type,
            value: inputValues[inputKey] || '',
          }
        })
      })

      return sectionData
    }) || []

    const finalData: SavedFooterData = {
      ...savedData,
      rowData: newRowData,
    }

    console.log('Saving footer data:', finalData)
    // TODO: Implement API call to save data
    alert('Footer data saved successfully!')
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-normal">
          Create Saved Footer
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Select a footer template and fill in the data to create a saved instance.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
        {/* Template Selection */}
        <div className="mb-8">
          <label className="text-sm font-medium">Select Footer Template *</label>
          <div className="relative mt-2">
            <select
              value={selectedTemplate}
              onChange={(e) => handleTemplateChange(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-3 text-sm outline-none transition appearance-none cursor-pointer focus:border-ring focus:ring-3 focus:ring-ring/20"
            >
              <option value="">Choose a footer template</option>
              {footerTemplates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>

        {/* Template Content */}
        {selectedTemplate && template && (
          <div className="space-y-6">
            <div className="border-t border-border pt-6">
              <h2 className="mb-4 text-lg font-semibold">Fill Template Data</h2>

              {template.headerRows.map((row, rowIndex) => (
                <div key={rowIndex} className="mb-8 rounded-lg border border-border bg-muted/20 p-4">
                  <h3 className="mb-4 text-sm font-semibold text-muted-foreground">
                    Row {rowIndex + 1}
                  </h3>

                  <div className="grid gap-4 md:grid-cols-3">
                    {Object.keys(row.footerSections).map((sectionKey) => {
                      const sectionNum = parseInt(sectionKey)
                      const inputs = row.footerSections[sectionNum as keyof typeof row.footerSections]

                      return (
                        <div
                          key={`section-${sectionNum}`}
                          className="rounded-lg border border-dashed border-border bg-background p-3"
                        >
                          <p className="mb-3 text-xs font-semibold text-muted-foreground">
                            Section {sectionNum}
                          </p>

                          <div className="space-y-3">
                            {inputs.length > 0 ? (
                              inputs.map((input, inputIndex) => {
                                const inputKey = `${sectionNum}-${input.type}`
                                const inputTypeName = AppObject.App.inputType.find(
                                  (t) => t.id === input.type,
                                )?.name

                                return (
                                  <div key={`${sectionNum}-${inputIndex}`}>
                                    <label className="text-xs font-medium text-muted-foreground">
                                      {inputTypeName} {inputIndex + 1}
                                    </label>

                                    {input.type === INPUT_TYPE.INPUTTYPE_1 && (
                                      <input
                                        type="text"
                                        value={inputValues[inputKey] || ''}
                                        onChange={(e) => handleInputChange(inputKey, e.target.value)}
                                        placeholder={`Enter ${inputTypeName}`}
                                        className="mt-1 w-full rounded-md border border-input bg-background px-2 py-1.5 text-xs outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
                                      />
                                    )}

                                    {input.type === INPUT_TYPE.INPUTTYPE_2 && (
                                      <select
                                        value={inputValues[inputKey] || ''}
                                        onChange={(e) => handleInputChange(inputKey, e.target.value)}
                                        className="mt-1 w-full rounded-md border border-input bg-background px-2 py-1.5 text-xs outline-none transition appearance-none cursor-pointer focus:border-ring focus:ring-2 focus:ring-ring/20"
                                      >
                                        <option value="">Select an option</option>
                                        {AppObject.App.inputEntity.dropdown.map((dropdown) => (
                                          <optgroup key={dropdown.id} label={dropdown.name}>
                                            {dropdown.values.map((value) => (
                                              <option key={value} value={value}>
                                                {value}
                                              </option>
                                            ))}
                                          </optgroup>
                                        ))}
                                      </select>
                                    )}

                                    {input.type === INPUT_TYPE.INPUTTYPE_3 && (
                                      <textarea
                                        value={inputValues[inputKey] || ''}
                                        onChange={(e) => handleInputChange(inputKey, e.target.value)}
                                        placeholder={`Enter ${inputTypeName}`}
                                        className="mt-1 w-full rounded-md border border-input bg-background px-2 py-1.5 text-xs outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
                                        rows={2}
                                      />
                                    )}
                                  </div>
                                )
                              })
                            ) : (
                              <p className="text-xs text-muted-foreground">No inputs in this section</p>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 border-t border-border pt-6">
              <Button onClick={handleSave} className="gap-2">
                Save Footer
                <ArrowRight className="size-4" />
              </Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </div>
        )}

        {!selectedTemplate && (
          <div className="flex min-h-96 items-center justify-center rounded-lg border border-dashed border-border">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Select a footer template to get started
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
