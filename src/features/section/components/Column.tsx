import { useEffect, useState } from 'react'
import { Plus, Trash2, Type, ChevronDown, FileText } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Checkbox } from '../../../components/ui/checkbox'
import { useDispatch, useSelector } from 'react-redux'
import { INPUT_TYPE } from '../../../constant/inputType.enum'
import { InputMenuWithAddButton } from './InputMenuWithAddButton'
import { AddInputToSections, EditQuantityFieldInSection, HandleInputChange, HandleInputQuantityChange,EditShowLabelInSection, UpdateIsBoldInSection, UpdateFontSizeInSection, UpdateExtraNoteInSection } from '../store/SectionSlice'
import {SearchableListEditor} from '../../../components/ui/searchable-list-editor';
import InputEntityTypeService from '@/features/inputEntityType/services/InputEntityTypeService'
import QuantityService from '@/features/inputEntityType/services/quantityService'
import { InputUtilityOptions } from '@/components/shared/InputUtilityOptions'
const INPUT_TYPES = Object.values(INPUT_TYPE) as Array<
  typeof INPUT_TYPE[keyof typeof INPUT_TYPE]
>
const getInputTypeConfig = (inputTypeId: string) => {
  return INPUT_TYPES.find((type) => type.id === inputTypeId)
}
const fontSizeList = [12, 14, 16, 18, 20, 22, 24].map(size => ({ id: size, name: `${size}px` }));
function Column({
  columnIndex,
  rowIndex,
  inputs = { width: '', inputs: [] },
  onAddInput,
  onDeleteInput,
}: any) {
  const SectionState = useSelector((state: any) => state.section);
  const dispatch = useDispatch<any>();
  const inputEntityService = InputEntityTypeService;
  const quantityService = QuantityService;
  useEffect(() => {
    setAllInputList()
  },[])

  const [savedInputList, setSavedInputList] = useState<any>({ input:[], dropdown:[], quantity:[], textbox:[] });
  const setAllInputList = async () => {
    try {
      const [input,dropdown,textbox,quantity] = await Promise.allSettled([inputEntityService.getInputEntityTypes('INPUT_TYPE_1'),
      inputEntityService.getInputEntityTypes('INPUT_TYPE_2'),
        inputEntityService.getInputEntityTypes('INPUT_TYPE_3'), quantityService.getAllQuantity()])
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
  const handleSelectInputType = (inputType: typeof INPUT_TYPES[0]) => {
    const input_order = inputs?.inputs ? inputs.inputs.length + 1 : 1;
    const payload: any = { rowIndex, columnIndex, input: inputType, input_order }
    dispatch(AddInputToSections(payload));
  }
  const handleQuantityToggle = (inputIndex: number, checked: any) => {
    console.log(checked)
      dispatch(
        (EditQuantityFieldInSection as any)({
          rowIndex,
          columnIndex,
          inputIndex,
          show_quantity: checked ? 1 : 0,
        }),
      )
  }
  const handleLabelToggle = (inputIndex: number, checked: any) => {
    console.log(checked)
      dispatch(
        (EditShowLabelInSection as any)({
          rowIndex,
          columnIndex,
          inputIndex,
          show_label: checked ? 1 : 0,
        }),
      )
  }
   const handleBoldToggle = (inputIndex: number, checked: any) => {
    console.log(checked)
      dispatch(
        (UpdateIsBoldInSection as any)({
          rowIndex,
          columnIndex,
          inputIndex,
          is_bold: checked ? 1 : 0,
        }),
      )
  }
   const handleFontSizeToggle = (inputIndex: number, value: any) => {
      dispatch(
        (UpdateFontSizeInSection as any)({
          rowIndex,
          columnIndex,
          inputIndex,
          font_size: value,
        }),
      )
  }
   const handleExtraNoteToggle = (inputIndex: number, checked: any) => {
    console.log(checked)
      dispatch(
        (UpdateExtraNoteInSection as any)({
          rowIndex,
          columnIndex,
          inputIndex,
          extra_note: checked ? 1 : 0,
        }),
      )
  }
  const handleInputQuantityChange = (inputIndex: number, inputValue: string) => {
    dispatch(
      (HandleInputQuantityChange as any)({ 
        rowIndex,
        columnIndex,
        inputIndex,
        inputValue,
      }),
    )
  }
  const handleInputChange = (inputValue: string, rowIndex: number, columnIndex: number, inputIndex: number) => {
    console.log(SectionState?.currentSection?.rows[rowIndex]?.columns[columnIndex])
    dispatch(
      (HandleInputChange as any)({
        rowIndex,
        columnIndex,
        inputIndex,
        inputValue,
      }),
    )
  }
  return (
    <div className="min-h-20 rounded-lg border border-dashed border-border bg-muted/30 p-3">
      {inputs && inputs?.inputs && inputs.inputs.length > 0 && inputs.inputs.map((input: any, inputIndex: number) => {
        const inputList = input.type == 'inputtype_1' ? savedInputList.input : input.type == 'inputtype_2' ? savedInputList.dropdown : savedInputList.textbox;  
        const inputValue = inputList.find((e: any) => e.id == input?.input_entity_id);
        console.log(input)
        return (
          <div key={`${columnIndex}-${inputIndex}`} className="rounded-md border border-border/60 bg-background p-2 mb-2">
            <div className="flex justify-between items-start">
            <label className="text-xs font-medium text-muted-foreground">
              {input.type == 'inputtype_1' && `Input ${inputIndex + 1}`}
              {input.type == 'inputtype_2' && `Dropdown ${inputIndex + 1}`}
              {input.type == 'inputtype_3' && `Text Box ${inputIndex + 1}`}
              </label>
              <Button
                aria-label="Delete input"
                onClick={() => onDeleteInput(inputIndex, rowIndex, columnIndex)}
                size="icon"
                type="button"
                variant="ghost"
                className="h-6 w-6 hover:bg-red-100"
              >
                <Trash2 className="size-3 text-red-600" />
              </Button>
            </div>
            <div className='flex items-center gap-2 mt-1'>
              {/* <SearchableListEditor
                items={inputList}
                selectedId={input?.input_entity_id}
                onSelect={(selectedId) => handleInputChange(selectedId, rowIndex, columnIndex, inputIndex)}
                onItemsChange={(updatedItems) => {
                  setSavedInputList((prev: any) => ({
                    ...prev,
                    input: input.type == 'inputtype_1' ? updatedItems : prev.input,
                    dropdown: input.type == 'inputtype_2' ? updatedItems : prev.dropdown,
                    textbox: input.type == 'inputtype_3' ? updatedItems : prev.textbox,
                  }))
                }}
              /> */}
              <select
                value={input.input_entity_id}
                onChange={(e) => handleInputChange(e.target.value, rowIndex, columnIndex, inputIndex)}
                className="mt-1 w-full rounded-md border border-input bg-background px-2 py-1.5 text-xs outline-none transition appearance-none cursor-pointer focus:border-ring focus:ring-2 focus:ring-ring/20"
              >
                <option value="">Select an option</option>
                {(input.input_type_name || input.type) === INPUT_TYPE.INPUTTYPE_1 && savedInputList.input.map((input: any) => (
                  <option key={input.id} value={input?.id}>
                    {input?.name}
                  </option>
                ))}
                {(input.input_type_name || input.type) === INPUT_TYPE.INPUTTYPE_2 && savedInputList.dropdown.map((dropdown: any) => (
                  <option key={dropdown.id} value={dropdown?.id}>
                    {dropdown?.name}
                  </option>
                ))}
                {(input.input_type_name || input.type) === INPUT_TYPE.INPUTTYPE_3 && savedInputList.textbox.map((textbox: any) => (
                  <option key={textbox.id} value={textbox.name}>
                    {textbox.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-2">
              <label className="flex items-center gap-2 text-xs text-muted-foreground">
                Quantity </label>
                <div className="mt-2 flex flex-wrap items-center gap-3 justify-between">
                  <label className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Checkbox
                      checked={input?.show_quantity ? true : false}
                      onCheckedChange={(checked) => handleQuantityToggle(inputIndex, checked)}
                    />
                    Add Quantity
                  </label>
                  {
                    input?.show_quantity ? (
                      <select
                        value={input?.quantity_id || ""}
                        onChange={(e) => handleInputQuantityChange(inputIndex, e.target.value)}
                        className="w-32 rounded-md border border-input bg-background px-2 py-1.5 text-xs outline-none transition appearance-none cursor-pointer focus:border-ring focus:ring-2 focus:ring-ring/20"
                      >
                        <option value="">Qty</option>
                        {savedInputList.quantity.map((quantity: any) => (
                          <option key={quantity.id} value={quantity?.id}>
                            {quantity?.name}
                          </option>
                        ))}
                      </select>
                    ) : null
                  }
                </div>
            </div>
            <div className="mt-2">
              <InputUtilityOptions inputIndex={inputIndex} showLabel={ input?.show_label ? true : false} isBold={input?.is_bold ? true : false} extraNote={input?.extra_note ? true : false} fontSize={input?.font_size || 14} onShowLabelChange={handleLabelToggle} onIsBoldChange={handleBoldToggle} onExtraNoteChange={handleExtraNoteToggle} onFontSizeChange={handleFontSizeToggle} />
            </div>
            <div className="flex justify-end items-center gap-2 mt-2">
              
            </div>
          </div>
        )
      })}
      <InputMenuWithAddButton handleSelectInputType={handleSelectInputType} rowIndex={rowIndex} columnIndex={columnIndex} />
    </div>
  )
}

export default Column
