import { useEffect, useState } from 'react'
import { Button } from '../../../components/ui/button'
import { ArrowRight } from 'lucide-react'
import TemplateSectionDetails from '../components/TemplateSectionDetails'
import { useSelector,useDispatch } from 'react-redux';
import { AddQuantityTextValueToTemplate, AddQuantityValueToTemplate, SelectBodyTemplate, AppendBodyTemplate, AppendHeaderTemplate, SelectFooterTemplate, SetCurrentTemplate, SetTemplateVisibility, AddDropdownOptionValueToTemplate, AddDropdownOptionValueToBodyTemplate, onDeleteInputFromTemplate } from '../store/TemplateSlice';
import type { Section } from '../type/TemplateType';
import { INPUT_TYPE } from '../../../constant/inputType.enum';
import TemplateService from "../service/TemplateService";
import SectionService from '@/features/section/service/SectionService';
import InputEntityTypeService from '@/features/inputEntityType/services/InputEntityTypeService';
import QuantityService from '@/features/inputEntityType/services/quantityService';
import { useNavigate, useParams } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../../components/ui/dialog'
import CreatePrescription from '@/features/prescription/pages/CreatePrescription';
const cloneTemplateObject = <T,>(value: T): T => JSON.parse(JSON.stringify(value))

export default function CreateTemplate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const templateService = TemplateService;
  const sectionService = SectionService;
  const quantityService = QuantityService;
  const inputEntityService = InputEntityTypeService;

  const TemplateState = useSelector((state: any) => state.template);
  const [savedSectionList, setSavedSectionList] = useState<Section[]>([]);
  const [headerPickerOpen, setHeaderPickerOpen] = useState(false)
  const [bodyPickerOpen, setBodyPickerOpen] = useState(false)
  const [footerPickerOpen, setFooterPickerOpen] = useState(false)
  const [selectedHeaderSectionId, setSelectedHeaderSectionId] = useState('')
  const [selectedBodySectionId, setSelectedBodySectionId] = useState('')
  const [selectedFooterSectionId, setSelectedFooterSectionId] = useState('')

  const [savedInputList,setSavedInputList] = useState<any>({ input:[], dropdown:[], quantity:[], textbox:[]});
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  

  useEffect(()=>{
    getAllSection();
    getAllInputsEntities();
  }, []);
  useEffect(() => {
    console.log(TemplateState)
   },[TemplateState])
  useEffect(() => {
    if (id && isEditMode)
    {
      getTemplateInfoById(id);
    }
  },[id,isEditMode])
  async function getAllSection()
  {
    try {
      const fetchedSection = await sectionService.getAllSections();
      if (fetchedSection && fetchedSection.success)
      {
        setSavedSectionList(fetchedSection.data);
      }
    } catch (error) {
      
    }
  }
  async function getAllInputsEntities()
  {
    try {
      const [input, dropdown, textbox, quantity] = await Promise.allSettled([inputEntityService.getInputEntityTypes('INPUT_TYPE_1'),
      inputEntityService.getInputEntityTypes('INPUT_TYPE_2'),
        inputEntityService.getInputEntityTypes('INPUT_TYPE_3'), quantityService.getAllQuantity()]);
      if (input.status === "fulfilled")
        setSavedInputList((prev: any) => ({ ...prev, input: input.value?.data }))
      if (dropdown.status === "fulfilled")
        setSavedInputList((prev: any) => ({ ...prev, dropdown: dropdown.value?.data }))
      if (textbox.status === "fulfilled")
        setSavedInputList((prev: any) => ({ ...prev, textbox: textbox.value?.data }))
      if (quantity.status === "fulfilled")
          setSavedInputList((prev:any)=> ({...prev,quantity:quantity.value?.data}))
    } catch (error) {
      
    }
  }
   async function getTemplateInfoById(id: any)
  {
    try {
      const fetchedTemplateData = await templateService.getTemplateById(id);
      if (fetchedTemplateData && fetchedTemplateData.success)
      {
        const templateData = fetchedTemplateData.data;
        dispatch(SetCurrentTemplate(templateData));
      }
    } catch (error) {
      
    }
  }
  const [template, setTemplate] = useState<any>({})
  const updateSelectedBody = (updater: (body: Section) => void) => {
    const currentBody = TemplateState?.CurrentTemplate?.body as Section | undefined

    if (!currentBody?.id) {
      return
    }

    const nextBody = cloneTemplateObject(currentBody)
    updater(nextBody)
    dispatch(SelectBodyTemplate(nextBody))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setTemplate((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleAddSection = (sectionId: string, sectionType: 'header' | 'body' | 'footer') => {
    if (!sectionId) {
      return
    }

    const selectedSection = savedSectionList.find((section) => section.id === sectionId)
    if (!selectedSection) {
      return
    }

    if (sectionType === 'header') {
      dispatch(AppendHeaderTemplate(selectedSection))
      setHeaderPickerOpen(false)
      setSelectedHeaderSectionId('')
    } else if (sectionType === 'body') {
      dispatch(AppendBodyTemplate(selectedSection))
      setBodyPickerOpen(false)
      setSelectedBodySectionId('')
    } else {
      dispatch(SelectFooterTemplate(selectedSection))
      setFooterPickerOpen(false)
      setSelectedFooterSectionId('')
    }
  }

  const handleToggleSectionVisibility = (key: 'show_header' | 'show_body' | 'show_footer', value: boolean) => {
    dispatch(SetTemplateVisibility({ [key]: value }))
  }

  const handleCodeGenerate = () => {
    const code = template.name
      .toUpperCase()
      .replace(/\s+/g, '_')
      .replace(/[^\w_]/g, '')
    setTemplate((prev) => ({
      ...prev,
      code,
    }))
  }

  const handleSave = async () => {
    if (isEditMode && id) {
      // Call update API
      const savedTemplate = await templateService.updateTemplate(id, { data: TemplateState.CurrentTemplate });
      if (savedTemplate && savedTemplate.success)
        {
          navigate("/dashboard/template")
        }
    } else {
      // Call create API
        const savedTemplate = await templateService.createTemplate({ data: TemplateState.CurrentTemplate });
        if (savedTemplate && savedTemplate.success) {
          {
            navigate("/dashboard/template")
          }
        }
    }
  }
  const onAddQuantityValue = (quantity:string,rowIndex:number,columnIndex:string,inputIndex:number, sectionType:string) => {
    const payload = {quantity,rowIndex,columnIndex,inputIndex,sectionType}
      dispatch(AddQuantityValueToTemplate(payload));
  }
  const onAddDropdownOptionsValue = (inputKey:string,inputType:string, dropdownOptions:any,rowIndex:number,sectionIndex:string,inputIndex:number,sectionType:string) => { 
    if(sectionType === 'header'){
      const payload = {inputKey,inputType, dropdownOptions,headerRowIndex:rowIndex,headerSectionIndex:sectionIndex,inputIndex
      }
      dispatch(AddDropdownOptionValueToTemplate(payload));
    }else if(sectionType === 'body'){
      const payload = {inputKey,inputType, dropdownOptions,bodyRowIndex:rowIndex,bodySectionIndex:sectionIndex,inputIndex
      }
      console.log(dropdownOptions)
      dispatch(AddDropdownOptionValueToBodyTemplate(payload));
    }
  }
  const onAddInputValue = (inputKey:string,inputType:string, value:string,headerRowIndex:number,headerSectionIndex:string,inputIndex:number) => {
    console.log("Adding input value:", {inputKey,inputType, value,headerRowIndex,headerSectionIndex,inputIndex})
  }
  const onAddQuantityTextValue = (quantityText:string,rowIndex:number,columnIndex:any,inputIndex:number,sectionType:string) => {
    const payload = {quantityText,rowIndex,columnIndex,inputIndex,sectionType}
    dispatch(AddQuantityTextValueToTemplate(payload))
  }

  const handleBodyInputChange = (rowIndex: number, sectionKey: string, inputIndex: number, value: string) => {
    updateSelectedBody((body) => {
      const bodySections = body.rows?.[rowIndex]?.columns as Record<string, any> | undefined
      const targetSection = bodySections?.[sectionKey]

      if (targetSection?.inputs?.[inputIndex]) {
        targetSection.inputs[inputIndex].input_entity_id = value
      }
    })
  }

  const handleBodyQuantityToggle = (rowIndex: number, sectionKey: string, inputIndex: number, checked: boolean) => {
    updateSelectedBody((body) => {
      const bodySections = body.rows?.[rowIndex]?.columns as Record<string, any> | undefined
      const targetSection = bodySections?.[sectionKey]

      if (targetSection?.inputs?.[inputIndex]) {
        targetSection.inputs[inputIndex].show_quantity = checked
      }
    })
  }

  const handleBodyQuantityValueChange = (rowIndex: number, sectionKey: string, inputIndex: number, value: string) => {
    updateSelectedBody((body) => {
      const bodySections = body.rows?.[rowIndex]?.columns as Record<string, any> | undefined
      const targetSection = bodySections?.[sectionKey]

      if (targetSection?.inputs?.[inputIndex]) {
        targetSection.inputs[inputIndex].quantity_id = value
      }
    })
  }

  const handleBodyQuantityTextValueChange = (rowIndex: number, sectionKey: string, inputIndex: number, value: string) => {
    updateSelectedBody((body) => {
      const bodySections = body.rows?.[rowIndex]?.columns as Record<string, any> | undefined
      const targetSection = bodySections?.[sectionKey]

      if (targetSection?.inputs?.[inputIndex]) {
        targetSection.inputs[inputIndex].quantityTextValue = value
      }
    })
  }

  const handleBodyAddInput = (inputType: any, rowIndex: number, sectionKey: string) => {
    updateSelectedBody((body) => {
      const targetRow = body.rows?.[rowIndex]

      if (!targetRow) {
        return
      }

      const bodySections = targetRow.columns as Record<string, any>
      const targetSection = bodySections?.[sectionKey] || {
        width: 100,
        inputs: [],
      }

      targetSection.inputs = Array.isArray(targetSection.inputs) ? targetSection.inputs : []
      targetSection.inputs.push({
        id: `${sectionKey}-${Date.now()}`,
        type: inputType.id,
        show_quantity: false,
        quantity_id: "",
        quantityTextValue: "",
        inputEntityTypeId: inputType.id,
        input_entity_id: "",
      })

      bodySections[sectionKey] = targetSection
    })
  }
  const onDeleteInput = (rowIndex: number, sectionKey: string, inputIndex: number,sectionType: string) => {
    console.log("Deleting input:", {rowIndex, sectionKey, inputIndex,sectionType})
    dispatch(onDeleteInputFromTemplate({rowIndex, columnIndex:sectionKey, inputIndex, sectionType}));
  }

  const handleTemplateNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(SetCurrentTemplate({ ...TemplateState.CurrentTemplate, name: e.target.value }))
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-normal">
          Create Full Prescription Template
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Combine header, body, and footer to create a complete prescription template.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Template Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Template Name *</label>
            <input
              type="text"
              name="name"
              value={TemplateState.CurrentTemplate.name || template.name || ''}
              onChange={handleTemplateNameChange}
              placeholder="e.g., Standard Prescription"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/20"
            />
          </div>

          {/* Template Code */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Template Code *</label>
            <div className="flex gap-2">
              <input
                type="text"
                name="code"
                value={template.code}
                onChange={handleChange}
                placeholder="e.g., STANDARD_PRESCRIPTION"
                className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/20"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleCodeGenerate}
                className="h-9"
              >
                Generate
              </Button>
            </div>
          </div>

          <div className="md:col-span-2 grid gap-6 md:grid-cols-3">
            <section className="rounded-2xl border border-border bg-slate-50 p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Header</h4>
                  <p className="text-sm text-slate-500">Show/hide header block and add saved sections.</p>
                </div>
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    checked={TemplateState.CurrentTemplate.show_header}
                    onChange={(event) => handleToggleSectionVisibility('show_header', event.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-slate-700"
                  />
                  Show
                </label>
              </div>

              <div className="mb-4 rounded-2xl border border-border bg-white p-3 text-sm">
                <div className="text-xs uppercase tracking-[0.12em] text-slate-500">Current section</div>
                <div className="mt-2 font-medium text-slate-800">
                  {TemplateState.CurrentTemplate.header?.name || 'No section added'}
                </div>
              </div>

              <Button type="button" variant="outline" onClick={() => setHeaderPickerOpen((prev) => !prev)}>
                Add section
              </Button>

              {headerPickerOpen && (
                <div className="mt-4 rounded-2xl border border-border bg-white p-4 shadow-sm">
                  <label className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Choose saved section</label>
                  <select
                    value={selectedHeaderSectionId}
                    onChange={(event) => setSelectedHeaderSectionId(event.target.value)}
                    className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                  >
                    <option value="">Choose a section...</option>
                    {savedSectionList.map((section) => (
                      <option key={section.id} value={section.id}>
                        {section.name}
                      </option>
                    ))}
                  </select>
                  <div className="mt-3 flex gap-2">
                    <Button
                      type="button"
                      disabled={!selectedHeaderSectionId}
                      onClick={() => handleAddSection(selectedHeaderSectionId, 'header')}
                    >
                      Add
                    </Button>
                    <Button type="button" variant="ghost" onClick={() => setHeaderPickerOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </section>

            <section className="rounded-2xl border border-border bg-slate-50 p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Body</h4>
                  <p className="text-sm text-slate-500">Show/hide body block and add saved sections.</p>
                </div>
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    checked={TemplateState.CurrentTemplate.show_body}
                    onChange={(event) => handleToggleSectionVisibility('show_body', event.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-slate-700"
                  />
                  Show
                </label>
              </div>

              <div className="mb-4 rounded-2xl border border-border bg-white p-3 text-sm">
                <div className="text-xs uppercase tracking-[0.12em] text-slate-500">Current section</div>
                <div className="mt-2 font-medium text-slate-800">
                  {TemplateState.CurrentTemplate.body?.name || 'No section added'}
                </div>
              </div>

              <Button type="button" variant="outline" onClick={() => setBodyPickerOpen((prev) => !prev)}>
                Add section
              </Button>

              {bodyPickerOpen && (
                <div className="mt-4 rounded-2xl border border-border bg-white p-4 shadow-sm">
                  <label className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Choose saved section</label>
                  <select
                    value={selectedBodySectionId}
                    onChange={(event) => setSelectedBodySectionId(event.target.value)}
                    className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                  >
                    <option value="">Choose a section...</option>
                    {savedSectionList.map((section) => (
                      <option key={section.id} value={section.id}>
                        {section.name}
                      </option>
                    ))}
                  </select>
                  <div className="mt-3 flex gap-2">
                    <Button
                      type="button"
                      disabled={!selectedBodySectionId}
                      onClick={() => handleAddSection(selectedBodySectionId, 'body')}
                    >
                      Add
                    </Button>
                    <Button type="button" variant="ghost" onClick={() => setBodyPickerOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </section>

            <section className="rounded-2xl border border-border bg-slate-50 p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Footer</h4>
                  <p className="text-sm text-slate-500">Show/hide footer block and add saved sections.</p>
                </div>
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    checked={TemplateState.CurrentTemplate.show_footer}
                    onChange={(event) => handleToggleSectionVisibility('show_footer', event.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-slate-700"
                  />
                  Show
                </label>
              </div>

              <div className="mb-4 rounded-2xl border border-border bg-white p-3 text-sm">
                <div className="text-xs uppercase tracking-[0.12em] text-slate-500">Current section</div>
                <div className="mt-2 font-medium text-slate-800">
                  {TemplateState.CurrentTemplate.footer?.name || 'No section added'}
                </div>
              </div>

              <Button type="button" variant="outline" onClick={() => setFooterPickerOpen((prev) => !prev)}>
                Add section
              </Button>

              {footerPickerOpen && (
                <div className="mt-4 rounded-2xl border border-border bg-white p-4 shadow-sm">
                  <label className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Choose saved section</label>
                  <select
                    value={selectedFooterSectionId}
                    onChange={(event) => setSelectedFooterSectionId(event.target.value)}
                    className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                  >
                    <option value="">Choose a section...</option>
                    {savedSectionList.map((section) => (
                      <option key={section.id} value={section.id}>
                        {section.name}
                      </option>
                    ))}
                  </select>
                  <div className="mt-3 flex gap-2">
                    <Button
                      type="button"
                      disabled={!selectedFooterSectionId}
                      onClick={() => handleAddSection(selectedFooterSectionId, 'footer')}
                    >
                      Add
                    </Button>
                    <Button type="button" variant="ghost" onClick={() => setFooterPickerOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
        <TemplateSectionDetails
          onAddDropdownOptionsValue={onAddDropdownOptionsValue}
          onAddQuantityValue={onAddQuantityValue}
          onAddInputValue={onAddInputValue}
          onAddQuantityTextValue={onAddQuantityTextValue}
          onBodyInputChange={handleBodyInputChange}
          onBodyQuantityToggle={handleBodyQuantityToggle}
          onBodyQuantityValueChange={handleBodyQuantityValueChange}
          onBodyQuantityTextValueChange={handleBodyQuantityTextValueChange}
          onBodyAddInput={handleBodyAddInput}
          header={TemplateState.CurrentTemplate.header}
          body={TemplateState.CurrentTemplate.body}
          footer={TemplateState.CurrentTemplate.footer}
          showHeader={TemplateState.CurrentTemplate.show_header}
          showBody={TemplateState.CurrentTemplate.show_body}
          showFooter={TemplateState.CurrentTemplate.show_footer}
          onDeleteInput={onDeleteInput}
        />

        {/* Action Buttons */}
        <div className="mt-6 flex gap-3">
          <Button
            type="button"
            onClick={handleSave}
            // disabled={!template.name || !template.header || !template.body}
            className="gap-2"
          >
            Save Template
            <ArrowRight className="size-4" />
          </Button>
          <Button type="button" variant="outline" onClick={() => setIsPreviewOpen(true)}>
            Preview
          </Button>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </div>
      </div>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-[90vw] sm:max-w-[80vw] lg:max-w-[1200px] h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Template Preview</DialogTitle>
            <DialogDescription>
              Preview your current template as a prescription document.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <CreatePrescription initialTemplate={TemplateState.CurrentTemplate} />
          </div>
          <DialogFooter showCloseButton>
            <Button type="button" onClick={() => setIsPreviewOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
