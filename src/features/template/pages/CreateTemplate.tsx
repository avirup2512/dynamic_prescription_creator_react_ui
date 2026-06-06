import { useEffect, useState } from 'react'
import { Button } from '../../../components/ui/button'
import { ArrowRight } from 'lucide-react'
import TemplateSectionDetails from '../components/TemplateSectionDetails'
import { useSelector,useDispatch } from 'react-redux';
import { AddQuantityTextValueToTemplate, AddQuantityValueToTemplate, SelectBodyTemplate, SelectHeaderTemplate, saveTemplate, AddDropdownOptionValueToTemplate, AddDropdownOptionValueToBodyTemplate, onDeleteInputFromTemplate, SetCurrentTemplate } from '../store/TemplateSlice';
import type { Section } from '../type/TemplateType';
import { INPUT_TYPE } from '../../../constant/inputType.enum';
import TemplateService from "../service/TemplateService";
import SectionService from '@/features/section/service/SectionService';
import InputEntityTypeService from '@/features/inputEntityType/services/InputEntityTypeService';
import QuantityService from '@/features/inputEntityType/services/quantityService';
import { useNavigate, useParams } from 'react-router-dom';
const cloneTemplateObject = <T,>(value: T): T => JSON.parse(JSON.stringify(value))

const availableFooters = [
  { id: 'footer_1', name: 'Footer1', code: 'FOOTER_1', description: 'Standard footer section' },
  { id: 'footer_2', name: 'Footer2', code: 'FOOTER_2', description: 'Additional notes footer' },
]

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


  const [savedInputList,setSavedInputList] = useState<any>({ input:[], dropdown:[], quantity:[], textbox:[]});
  

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

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const selectedSection:Section = savedSectionList.find((section: Section) => section.id == value) as Section;
    console.log(selectedSection.id);
    if (selectedSection.id)
    {
      const getSelectedSectionDetails:any = await sectionService.getSectionById(selectedSection.id);
      if (getSelectedSectionDetails && getSelectedSectionDetails.success)
      {
        if(name === 'header'){
            dispatch(SelectHeaderTemplate(getSelectedSectionDetails.data));
        }else if(name === 'body'){
            dispatch(SelectBodyTemplate(getSelectedSectionDetails.data));
        }
      }
    }
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
              onChange={()=>{dispatch(SetCurrentTemplate({...TemplateState.CurrentTemplate, name: event?.target?.value}))}}
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

          {/* Header Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Header *</label>
            <select
              name="header"
              value={template.header}
              onChange={handleChange}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/20"
            >
              <option value="">Choose a header template</option>
              {savedSectionList.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.name}
                </option>
              ))}
            </select>
          </div>

          {/* Body Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Body *</label>
            <select
              name="body"
              value={template.body}
              onChange={handleChange}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/20"
            >
              <option value="">Choose a body template</option>
              {savedSectionList.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.name}
                </option>
              ))}
            </select>
          </div>

          {/* Footer Selection */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Select Footer (optional)</label>
            <select
              name="footer"
              value={template.footer}
              onChange={handleChange}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/20"
            >
              <option value="">Choose a footer template</option>
              {availableFooters.map((footer) => (
                <option key={footer.id} value={footer.id}>
                  {footer.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Template Preview */}
        {template.header && template.body && (
          <div className="mt-8 border-t border-border pt-6">
            <h3 className="mb-4 text-sm font-semibold">Template Preview</h3>
            <div className="space-y-3 rounded-lg bg-muted/30 p-4">
              <div className="rounded bg-blue-50 p-3 text-sm">
                <span className="font-medium text-blue-700">Header:</span>
                {' '}
                {TemplateState?.CurrentTemplate?.header?.name || 'No header selected'}
              </div>
              <div className="rounded bg-amber-50 p-3 text-sm">
                <span className="font-medium text-amber-700">Body:</span>
                {' '}
                {TemplateState?.CurrentTemplate?.body?.name || 'No body selected'}
              </div>
              {template.footer ? (
                <div className="rounded bg-purple-50 p-3 text-sm">
                  <span className="font-medium text-purple-700">Footer:</span>
                  {' '}
                  {availableFooters.find((f) => f.id === template.footer)?.name}
                </div>
              ) : (
                <div className="rounded bg-slate-50 p-3 text-sm text-slate-600">
                  Footer is optional and will be included if selected.
                </div>
              )}
            </div>
          </div>
        )}

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
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}
