import { useState, useEffect } from 'react'
import { Button } from '../../../components/ui/button'
import { ArrowRight, ChevronDown, Plus, Trash2 } from 'lucide-react'
import AppObject from '../../../demoData/AllData'
import { useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox } from '../../../components/ui/checkbox'
import type { HeaderTemplates, SavedHeader, SavedHeaderInputEntity } from '../type/HeaderSectionType'
import { AddInputToHeaderSectionsForSavedData, AddRows, AddSavedHeader, EditSavedHeader, EditSavedQuantityFieldInHeader, HandleInputChange, HandleInputQuantityChange, RemoveInputFromHeaderSectionsForSavedData, SetCurrentHeader, SetCurrentSavedHeader } from '../store/HeaderSlice'
import { InputMenuWithAddButton } from '../../body/components/InputMenuWithAddButton'
import HeaderUtilsService from '../utils/utilsService'
import { INPUT_TYPE } from '../../../constant/inputType.enum'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu"
export default function CreateSavedHeader() {
  const HeaderState = useSelector((state:any)=> state.header);
  console.log(HeaderState);  
  useEffect(()=>{
    dispatch(SetCurrentHeader(HeaderState?.defaultHeader))
  },[])
  const InputEnitytState = useSelector((state:any)=> state.inputEntityType);
  const dispatch = useDispatch();
  const headerTemplates = JSON.parse(localStorage.getItem("savedTemplateList")) || HeaderState?.allTemplates;
  const savedHeaderId = useParams();
  const location = useLocation();
  
  const isEditMode = location.pathname.includes("/edit");

  const [selectedTemplateId, setselectedTemplateId] = useState<string>('');
  const [selectedTemplate, setselectedTemplate] = useState<HeaderTemplates>({})
  const [name, setName] = useState<string>('')

  const input = JSON.parse(localStorage.getItem("savedInputList")) || [];  
  const dropdown = JSON.parse(localStorage.getItem("savedDropdownList")) || [];
  const quantity = JSON.parse(localStorage.getItem("savedQuantityList")) || [];
  const textbox = JSON.parse(localStorage.getItem("savedTextBoxList")) || [];
  const [inputValues, setInputValues] = useState<Record<string, string>>({})
  const [savedInputList, setSavedInputList] = useState<any>({input,dropdown,quantity,textbox:[]});
  const [savedHeaderInputEntity,setSavedHeaderInputEntity] = useState<Array<SavedHeaderInputEntity>>([{}]);

  // Initialize with edit data if available
  useEffect(() => {
    const isEditPage = location.pathname.includes("/edit");
     const savedDataList = JSON.parse(localStorage.getItem("savedHeaderList")) || [];
    if (isEditPage && savedDataList && savedHeaderId) {      
      const savedHeaderData = savedDataList.find((e:any) => e.id == savedHeaderId?.id);      
      // Load the edit data
      setselectedTemplateId(savedHeaderData.templateId || '')
      setName(savedHeaderData.name || '')
      dispatch(SetCurrentSavedHeader(savedHeaderData));
      setselectedTemplate(savedHeaderData);
    }
  }, []);
  useEffect(()=>{
    console.log(HeaderState?.currentSavedHeader);
    
  },[HeaderState])
  const handleTemplateChange = (templateId: string) => {
    setselectedTemplateId(templateId);
    const savedTemplate = headerTemplates.find((t:any) => t.id == templateId);
    dispatch(SetCurrentSavedHeader(savedTemplate));
    setselectedTemplate(savedTemplate);
    
    // setHeaderRows(savedTemplate?.headerRows);
  }

  

  const handleInputChange = (
    key: string,
    inputType:string,
    value: string,
    rowIndex:any,
    sectionKey:any,
    inputIndex:number
  ) => {
    setSavedHeaderInputEntity((prev:SavedHeaderInputEntity[])=> [...prev,{inputEntityDataId:value,inputEntityTypeId:inputType}])
    const payload:any = {headerRowIndex:rowIndex,headerSectionIndex:sectionKey,inputValue:value,inputIndex}      
    console.log(payload);
    dispatch(HandleInputChange(payload))
    setInputValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  }
  const handleInputQuantityChange = (
    key: string,
    inputType:string,
    value: string,
    rowIndex:any,
    sectionKey:any,
    inputIndex:number
  ) => {
    setSavedHeaderInputEntity((prev:SavedHeaderInputEntity[])=> [...prev,{inputEntityDataId:value,inputEntityTypeId:inputType}])
    const payload:any = {headerRowIndex:rowIndex,headerSectionIndex:sectionKey,inputValue:value,inputIndex}      
    console.log(payload);
    dispatch(HandleInputQuantityChange(payload))
    setInputValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  const handleQuantityToggle = (rowIndex: number, sectionKey: string, inputIndex: number, checked: boolean) => {
    dispatch(
      EditSavedQuantityFieldInHeader({
        headerRowIndex: rowIndex,
        headerSectionIndex: sectionKey,
        inputSectionIndex: inputIndex,
        quantityField: checked,
      }),
    )
  }
  

  const handleSave = () => {
    if (!name.trim()) {
      alert('Please enter a name for the header')
      return
    }

    if (!selectedTemplateId) {
      alert('Please select a template first')
      return
    }
    if(isEditMode && savedHeaderId?.id)
    {
      const savedHeaderData:SavedHeader = {
        name,
        id:savedHeaderId?.id,
        templateId:HeaderState?.currentSavedHeader?.templateId,
        headerRows:HeaderState?.currentSavedHeader?.headerRows
      };
      dispatch(EditSavedHeader({editedSavedHeader:savedHeaderData,savedHeaderId:savedHeaderId?.id}))
    }else{
      const savedHeaderData:SavedHeader = {
        name,
        id:"saved_header"+Date.now().toString(),
        templateId:selectedTemplateId,
        headerRows:HeaderState?.currentSavedHeader?.headerRows
      };
      dispatch(AddSavedHeader(savedHeaderData));
    }
    
    console.log('Saving header data:');
    // TODO: Implement API call to save data
    alert('Header data saved successfully!')
  }
   const handleSelectInputType = (inputType: any,rowIndex:any,sectionKey:any) => { 
      const payload:any = {headerRowIndex:rowIndex,headerSectionIndex:sectionKey,inputType:{type:inputType?.id,inputEntityTypeId:inputType?.id, inputEntityDataId:"", quantityField:false, quantityDataId:""}}      
      dispatch(AddInputToHeaderSectionsForSavedData(payload));
    }
    const  onDeleteInput = (inputIndex: any,rowIndex:any,sectionKey:any) => { 
      const payload:any = {headerRowIndex:rowIndex,headerSectionIndex:sectionKey,inputIndex}      
      dispatch(RemoveInputFromHeaderSectionsForSavedData(payload));
    }
    function addRows() {
      dispatch(AddRows())
    }
  const addHeaderSection = (width: number, rowIndex: number) => {
    const section = HeaderState?.currentSavedHeader?.headerRows[rowIndex];
    const headerSectionWidth:any = Object.values(section.headerSections).reduce(
      (total:any, headerSection:any) => {
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
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-normal">
          {isEditMode ? 'Edit Saved Header' : 'Create Saved Header'}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {isEditMode 
            ? 'Update the header data below.'
            : 'Select a header template and fill in the data to create a saved instance.'}
        </p>
      </div>
            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-normal">
            Create Header
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Add header sections and reorder them inside the container.
          </p>
        </div>

        <div className="flex gap-2">
          <Button className="h-9 gap-2" type="button" onClick={addRows}>
          <Plus className="size-4" />
          Add row
        </Button>
        </div>
      </div>
      <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
        {/* Name Input */}
        <div className="mb-8">
          <label className="text-sm font-medium">Header Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a name for this saved header"
            className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-3 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/20"
          />
        </div>

        {/* Template Selection */}
        {/* <div className="mb-8">
          <label className="text-sm font-medium">Select Header Template *</label>
          <div className="relative mt-2">
            <select
              value={selectedTemplateId}
              onChange={(e) => handleTemplateChange(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-3 text-sm outline-none transition appearance-none cursor-pointer focus:border-ring focus:ring-3 focus:ring-ring/20"
            >
              <option value="">Choose a header template</option>
              {headerTemplates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div> */}

        {/* Template Content */}
        {HeaderState?.currentHeader && (
          <div className="space-y-6">
            <div className="border-t border-border pt-6">
              <h2 className="mb-4 text-lg font-semibold">Fill Template Data</h2>

              {
              HeaderState?.currentHeader.headerRows.map((row:any, rowIndex:number) => (
                <div key={rowIndex} className="mb-8 rounded-lg border border-border bg-muted/20 p-4">
                  <h3 className="mb-4 text-sm font-semibold text-muted-foreground">
                    Row {rowIndex + 1}
                  </h3>
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
                  <div className="grid grid-cols-12 gap-3">
                    {Object.keys(row.headerSections).map((sectionKey) => {
                      const sectionNum = parseInt(sectionKey)
                      const inputs = row.headerSections[sectionNum as keyof typeof row.headerSections]
                      return (
                        <div
                          key={`section-${sectionNum}`}
                          className={`rounded-lg border border-dashed border-border bg-background p-3 ${HeaderUtilsService.getWidthClass(inputs.width)}`}
                        >
                          <p className="mb-3 text-xs font-semibold text-muted-foreground">
                            Section {sectionNum}
                          </p>

                          <div className="space-y-3">
                            {inputs && inputs?.inputs && inputs.inputs.length > 0 ? (
                              inputs.inputs.map((input:any, inputIndex:number) => {
                                const inputKey = `${sectionNum}-${input.type}`
                                const inputTypeName = AppObject.App.inputType.find(
                                  (t) => t.id === input.type,
                                )?.name
                                console.log(input)
                                const inputValue = savedInputList.input.find((e:any)=> e.id == input?.inputEntityDataId);
                                console.log(inputValue);
                                
                                return (
                                  <div key={`${sectionNum}-${inputIndex}`} className="rounded-md border border-border/60 bg-background p-2">
                                    <label className="text-xs font-medium text-muted-foreground">
                                      {inputTypeName} {inputIndex + 1} {inputValue?.label}
                                    </label>
                                      <div className='flex'>
                                        <select
                                        value={inputValue?.id}
                                        onChange={(e) => handleInputChange(inputKey,input.type, e.target.value,rowIndex,sectionKey,inputIndex)}
                                        className="mt-1 w-full rounded-md border border-input bg-background px-2 py-1.5 text-xs outline-none transition appearance-none cursor-pointer focus:border-ring focus:ring-2 focus:ring-ring/20"
                                      >
                                        <option value="">Select an option</option>
                                        {input.type === INPUT_TYPE.INPUTTYPE_1 && savedInputList.input.map((input:any) => (
                                          <option key={input.id} value={input?.id}>
                                                {input?.label}
                                          </option>
                                        ))}
                                        {input.type === INPUT_TYPE.INPUTTYPE_2 && savedInputList.dropdown.map((dropdown:any) => (
                                            <option key={dropdown.id} value={dropdown?.id}>
                                                {dropdown?.label}
                                          </option>
                                        ))}
                                        {input.type === INPUT_TYPE.INPUTTYPE_3 && savedInputList.textbox.map((textbox:any) => (
                                            <option key={textbox.id} value={textbox.name}>
                                                {textbox.name}
                                            </option>
                                        ))}
                                        </select>
                                       </div>
                                      <div className="mt-2 flex flex-wrap items-center gap-3">
                                        <label className="flex items-center gap-2 text-xs text-muted-foreground">
                                          <Checkbox
                                            checked={Boolean(input?.quantityField)}
                                            onCheckedChange={(checked) => handleQuantityToggle(rowIndex, sectionKey, inputIndex, checked === true)}
                                          />
                                          Add Quantity
                                        </label>
                                        {
                                          input?.quantityField ? (
                                            <select
                                                value={input?.quantityDataId || ""}
                                                onChange={(e) => handleInputQuantityChange(inputKey,`${input.type}_quantity`, e.target.value,rowIndex,sectionKey,inputIndex)}
                                                className="w-32 rounded-md border border-input bg-background px-2 py-1.5 text-xs outline-none transition appearance-none cursor-pointer focus:border-ring focus:ring-2 focus:ring-ring/20"
                                            >
                                                <option value="">Qty</option>
                                                {savedInputList.quantity.map((quantity:any) => (
                                                  <option key={quantity.id} value={quantity?.id}>
                                                        {quantity?.label}
                                                  </option>
                                                ))}
                                            </select>
                                          ) : null
                                        }
                                      </div>
                                      <div className="flex justify-end items-center gap-2 mt-2">
                                      <Button
                                        aria-label="Delete input"
                                        onClick={() => onDeleteInput(inputIndex,rowIndex,sectionKey)}
                                        size="icon"
                                        type="button"
                                        variant="ghost"
                                        className="h-6 w-6 hover:bg-red-100"
                                      >
                                        <Trash2 className="size-3 text-red-600" />
                                      </Button>
                                      </div>
                                  </div>
                                )
                              })
                            ) : (
                              <p className="text-xs text-muted-foreground">No inputs in this section</p>
                            )}
                            <InputMenuWithAddButton handleSelectInputType={handleSelectInputType}
                                rowIndex={rowIndex} sectionKey={sectionKey}
                            />
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
                {isEditMode ? 'Update Header' : 'Save Header'}
                <ArrowRight className="size-4" />
              </Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </div>
        )}

        {!selectedTemplateId && (
          <div className="flex min-h-96 items-center justify-center rounded-lg border border-dashed border-border">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Select a header template to get started
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
