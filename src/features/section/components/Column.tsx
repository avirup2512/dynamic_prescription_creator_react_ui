import { useEffect, useState } from 'react'
import { ChevronDown, ChevronsUpDown, FileText, Plus, Trash2, Type } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Checkbox } from '../../../components/ui/checkbox'
import { useDispatch, useSelector } from 'react-redux'
import { INPUT_TYPE } from '../../../constant/inputType.enum'
import { InputMenuWithAddButton } from './InputMenuWithAddButton'
import { AddInputToSections, EditQuantityFieldInSection, HandleInputChange, HandleInputQuantityChange,EditShowLabelInSection, UpdateIsBoldInSection, UpdateFontSizeInSection, UpdateExtraNoteInSection, AddSameInputInColumn,RemoveInputGroupFromSections,RemoveInputFromSections } from '../store/SectionSlice'
import InputEntityTypeService from '@/features/inputEntityType/services/InputEntityTypeService'
import QuantityService from '@/features/inputEntityType/services/quantityService'
import { InputUtilityOptions } from '@/components/shared/InputUtilityOptions'
import InputEntityCreateModal from './InputEntityCreateModal'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/tiptap-ui-primitive/dropdown-menu/dropdown-menu";

const INPUT_TYPES = Object.values(INPUT_TYPE) as Array<
  typeof INPUT_TYPE[keyof typeof INPUT_TYPE]
>
export const INPUT_TYPES_LIST = [
  { type: INPUT_TYPE.INPUTTYPE_1, name: "Input", color: "bg-blue-50 border-blue-200", icon: Type },
  { type: INPUT_TYPE.INPUTTYPE_2, name: "Dropdown", color: "bg-purple-50 border-purple-200", icon: ChevronDown },
  // { type: INPUT_TYPE.INPUTTYPE_3, name: "Textbox", color: "bg-amber-50 border-amber-200", icon: FileText },
];
function SearchableEntitySelect({
  inputType = INPUT_TYPE.INPUTTYPE_1,
  value,
  placeholder = 'Select an option',
  searchPlaceholder = 'Search option...',
  emptyMessage = 'No option found.',
  onChange,
}: {
  inputType?: string
  value?: string
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  onChange: (value: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<any>([])
  const [currentValue, setCurrentValue] = useState(value)
  useEffect(() => {
    getAllOptions()
  }, [inputType,open])

  const inputEntityService = InputEntityTypeService;
  const quantityService = QuantityService;
  const getAllOptions = async () => {
    try {
      let fetchedOptions = [];
      const response = await inputEntityService.getInputEntityTypes(inputType);
      fetchedOptions = response?.data || [];
      setOptions(fetchedOptions);
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen} modal={false}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="mt-1 w-full justify-between rounded-md border-input bg-background px-2 py-1.5 text-xs font-normal"
        >
          <span className="truncate">{currentValue ||placeholder}</span>
          <ChevronsUpDown className="ml-2 size-3 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
  align="start"
  className="w-[var(--radix-popover-trigger-width)] p-0"
>
  <Command>
    <CommandInput placeholder={searchPlaceholder} />
    <CommandList className="max-h-64 overflow-y-auto" onWheel={(e) => e.stopPropagation()}>
      <CommandEmpty>{emptyMessage}</CommandEmpty>
      <CommandGroup>
        {options.map((option: any) => {
          const optionValue = option?.id || option?.name || "";
          return (
            <CommandItem
              key={optionValue}
              value={option?.name || String(optionValue)}
              onSelect={() => {
                setCurrentValue(option?.name || String(optionValue));
                onChange(optionValue);
                setOpen(false);
              }}
              data-checked={optionValue == value || option?.name == value}
            >
              <span className="truncate">{option?.name}</span>
            </CommandItem>
          );
        })}
      </CommandGroup>
    </CommandList>
  </Command>
</PopoverContent>
    </Popover>
  )
}

function Column({
  columnIndex,
  rowIndex,
  inputGroup,
  onDeleteInput,
}: any) {
  const SectionState = useSelector((state: any) => state.section);
  const dispatch = useDispatch<any>();
  const inputEntityService = InputEntityTypeService;
  const quantityService = QuantityService;
  const [createModalState, setCreateModalState] = useState<{
    inputIndex: number
    inputType: string
  } | null>(null)
  useEffect(() => {
    setAllInputList()
  }, [])
   useEffect(() => {
    console.log(SectionState)
  },[SectionState])

  const [savedInputList, setSavedInputList] = useState<any>({ input:[], dropdown:[], quantity:[], textbox:[] });
  const setAllInputList = async () => {
    try {
      const [input,dropdown,textbox,quantity] = await Promise.allSettled([inputEntityService.getInputEntityTypes('INPUT_TYPE_1'),
      inputEntityService.getInputEntityTypes('INPUT_TYPE_2'),
        inputEntityService.getInputEntityTypes('INPUT_TYPE_3'), quantityService.getAllQuantity()])
      if (input.status === "fulfilled")
        setSavedInputList((prev: any) => ({ ...prev, input: input.value?.data || [] }))
      if (dropdown.status === "fulfilled")
        setSavedInputList((prev: any) => ({ ...prev, dropdown: dropdown.value?.data || [] }))
      if (textbox.status === "fulfilled")
        setSavedInputList((prev: any) => ({ ...prev, textbox: textbox.value?.data || [] }))
      if (quantity.status === "fulfilled")
          setSavedInputList((prev:any)=> ({...prev,quantity:quantity.value?.data || []}))
    } catch (error) {
      
    }
  }
  const handleSelectInputType = (inputType: any, sameGroup:boolean,inputGroupIndex?:number) => {
    const input_order = inputGroup?.inputs ? inputGroup.inputs.length + 1 : 1;
    const inputCopy = JSON.parse(JSON.stringify(inputType));
    inputCopy.input_order = input_order;
    const payload: any = { rowIndex, columnIndex, input: inputCopy, input_order, inputGroupIndex,sameGroup }
    dispatch(AddInputToSections(payload));
  }
  const handleQuantityToggle = (inputIndex: number,inputGroupIndex: number, checked: any) => {
      dispatch(
        (EditQuantityFieldInSection as any)({
          rowIndex,
          columnIndex,
          inputIndex,
          inputGroupIndex,
          show_quantity: checked ? 1 : 0,
        }),
      )
  }
  const handleLabelToggle = (inputIndex: number,inputGroupIndex:number, checked: any) => {
      dispatch(
        (EditShowLabelInSection as any)({
          rowIndex,
          columnIndex,
          inputIndex,
          inputGroupIndex,
          show_label: checked ? 1 : 0,
        }),
      )
  }
   const handleBoldToggle = (inputIndex: number,inputGroupIndex:number, checked: any) => {
      dispatch(
        (UpdateIsBoldInSection as any)({
          rowIndex,
          columnIndex,
          inputIndex,
          inputGroupIndex,
          is_bold: checked ? 1 : 0,
        }),
      )
  }
   const handleFontSizeToggle = (inputIndex: number,inputGroupIndex:number, value: any) => {
      dispatch(
        (UpdateFontSizeInSection as any)({
          rowIndex,
          columnIndex,
          inputIndex,
          inputGroupIndex,
          font_size: value,
        }),
      )
  }
   const handleExtraNoteToggle = (inputIndex: number,inputGroupIndex:number, checked: any) => {
      dispatch(
        (UpdateExtraNoteInSection as any)({
          rowIndex,
          columnIndex,
          inputIndex,
          inputGroupIndex,
          extra_note: checked ? 1 : 0,
        }),
      )
  }
  const handleInputQuantityChange = (inputIndex: number, inputGroupIndex: number, inputValue: string) => {
    dispatch(
      (HandleInputQuantityChange as any)({ 
        rowIndex,
        columnIndex,
        inputGroupIndex,
        inputIndex,
        inputValue,
      }),
    )
  }
  const handleInputChange = (inputValue: string, rowIndex: number, columnIndex: number, inputGroupIndex: number, inputIndex: number) => {
    dispatch(
      (HandleInputChange as any)({
        rowIndex,
        columnIndex,
        inputGroupIndex,
        inputIndex,
        inputValue,
      }),
    )
  }
  const getNormalizedInputType = (input: any) => {
    console.log(input)
    const inputType = input?.input_type_name || input?.type
    if (inputType === 'inputtype_1') return INPUT_TYPE.INPUTTYPE_1
    if (inputType === 'inputtype_2') return INPUT_TYPE.INPUTTYPE_2
    if (inputType === 'inputtype_3') return INPUT_TYPE.INPUTTYPE_3
    return inputType
  }

  const canCreateInputEntity = (inputType: string) =>
    inputType === INPUT_TYPE.INPUTTYPE_1 || inputType === INPUT_TYPE.INPUTTYPE_2

  const handleOpenCreateModal = (inputIndex: number, input: any) => {
    const inputType = getNormalizedInputType(input)
    if (!canCreateInputEntity(inputType)) return

    setCreateModalState({ inputIndex, inputType })
  }

  const handleCreatedInputEntity = async (createdInputId?: string) => {
    const activeModalState = createModalState
    await setAllInputList()

    if (createdInputId && activeModalState) {
      handleInputChange(
        createdInputId,
        rowIndex,
        columnIndex,
        0,
        activeModalState.inputIndex,
      )
    }
  }
  const AddMoreInputofSameType = (input:any, inputGroupIndex:number, sameGroup:boolean) => {
    const inputCopy = JSON.parse(JSON.stringify(input));
    const payload = { rowIndex, columnIndex, inputGroupIndex, input:inputCopy,sameGroup }
    dispatch(AddSameInputInColumn(payload));
  }
  function handleDeleteInputGroup(inputGroupIndex: number) {
    dispatch(RemoveInputGroupFromSections({rowIndex,columnIndex,inputGroupIndex}as any));
  }
  function handleDeleteInput(inputGroupIndex: number, inputIndex:number) {
    dispatch(RemoveInputFromSections({rowIndex,columnIndex,inputGroupIndex, inputIndex}));
  }
  return (
    <div className="min-h-20 rounded-lg border border-dashed border-border bg-muted/30 p-3">
      {
        inputGroup && inputGroup.map((group: any, inputGroupIndex: number) => {
          return <>
            <div className='mb-4 border border-border bg-card p-6 relative'>
              <div className='flex items-center justify-between mb-3'>
                <p className='mb-2'>Input Group {inputGroupIndex + 1}</p>
                <div className='flex items-center justify-between'>
                  <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                              size="icon"
                              type="button"
                              variant="ghost"
                            className="gap-2 mt-2"
                              >
                            <Plus className="size-4" />
                          </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                              <DropdownMenuLabel>Input options</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {
                        INPUT_TYPES_LIST.map((inputType: any) => {
                          return (
                            <DropdownMenuItem onClick={() => handleSelectInputType(inputType, true,inputGroupIndex)}>
                              <span className="font-medium">Add { inputType.name }</span>
                            </DropdownMenuItem>
                          )
                        })
                      }
                          </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  aria-label="Delete input"
                  onClick={() => handleDeleteInputGroup(inputGroupIndex)}
                  size="icon"
                  type="button"
                  variant="ghost"
                  className="h-6 w-6 hover:bg-red-100"
                >
                <Trash2 className="size-3 text-red-600" />
                </Button>
                </div>
              </div>
              {
                group && group?.inputs && group.inputs.length > 0 && group.inputs.map((input: any, inputIndex: number) => {
                  const currentInputType = getNormalizedInputType(input)
                  return (
                    <div key={`${columnIndex}-${inputIndex}`} className="rounded-md border border-border/60 bg-background p-2 mb-2">
                      <div className="flex justify-between items-start">
                        <label className="text-xs font-medium text-muted-foreground">
                          {currentInputType === INPUT_TYPE.INPUTTYPE_1 && `Input ${inputIndex + 1}`}
                          {currentInputType === INPUT_TYPE.INPUTTYPE_2 && `Dropdown ${inputIndex + 1}`}
                          {currentInputType === INPUT_TYPE.INPUTTYPE_3 && `Text Box ${inputIndex + 1}`}
                        </label>
                        <Button
                          aria-label="Delete input"
                          onClick={() => handleDeleteInput(inputGroupIndex, inputIndex)}
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
                        <SearchableEntitySelect
                          value={input.input_entity_name}
                          inputType={currentInputType}
                          onChange={(value) => handleInputChange(value, rowIndex, columnIndex, inputGroupIndex, inputIndex)}
                        />
                        <Button size="icon"
                          type="button"
                          variant="ghost"
                          className="h-6 w-6 hover:bg-green-100"
                          disabled={!canCreateInputEntity(currentInputType)}
                          onClick={() => handleOpenCreateModal(inputIndex, input)}
                        >
                          <Plus className="size-4" />
                        </Button>
                      </div>
                      <div className="mt-2">
                        <label className="flex items-center gap-2 text-xs text-muted-foreground">
                          Quantity </label>
                        <div className="mt-2 flex flex-wrap items-center gap-3 justify-between">
                          <label className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Checkbox
                              checked={input?.show_quantity ? true : false}
                              onCheckedChange={(checked) => handleQuantityToggle(inputIndex, inputGroupIndex, checked)}
                            />
                            Add Quantity
                          </label>
                          {
                            input?.show_quantity ? (
                              <select
                                value={input?.quantity_id || ""}
                                onChange={(e) => handleInputQuantityChange(inputIndex, inputGroupIndex, e.target.value)}
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
                        <InputUtilityOptions inputIndex={inputIndex} inputGroupIndex={inputGroupIndex} showLabel={input?.show_label ? true : false} isBold={input?.is_bold ? true : false} extraNote={input?.extra_note ? true : false} fontSize={input?.font_size || 14} onShowLabelChange={handleLabelToggle} onIsBoldChange={handleBoldToggle} onExtraNoteChange={handleExtraNoteToggle} onFontSizeChange={handleFontSizeToggle} />
                      </div>
                      <div className="flex justify-start items-center gap-2 mt-2">
                        {/* <Button
                          type="button"
                          onClick={() => { AddMoreInputofSameType(input, inputGroupIndex) }}
                          className="gap-2">
                          Add same input
                          <Plus className="size-4" />
                        </Button> */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                          <Button
                              type="button"
                            className="gap-2 mt-2"
                              >
                            Add same input
                            <Plus className="size-4" />
                          </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                              <DropdownMenuLabel>Input options</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={ ()=> {AddMoreInputofSameType(input, inputGroupIndex,true)}}>
                                  <span className="font-medium">Add input in this group</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={ ()=> {AddMoreInputofSameType(input, inputGroupIndex,false)}}>
                                  <span className="font-medium">Add input in a new group</span>
                              </DropdownMenuItem>
                          </DropdownMenuContent>
                          </DropdownMenu>
                      </div>
                    </div>
                  )
          
                })
              }
              </div>
            </>
        })
      }
        <div className='flex items-center justify-end gap-2 mt-2'>
      {
      INPUT_TYPES_LIST.map((inputType:any) => {
                            const Icon = inputType.icon
                                return (
                                    <Button
                                    onClick={() => handleSelectInputType(inputType,false)}
                                      type="button"
                                    size="sm"
                                    className="gap-2 m-auto mt-2"
                                    >
                                    <Icon className="size-4" />
                                    Add {inputType.name}
                                    </Button>
                        )
                      })
      }
      </div>
      
      {/* <InputMenuWithAddButton handleSelectInputType={handleSelectInputType} rowIndex={rowIndex} columnIndex={columnIndex} /> */}
      <InputEntityCreateModal
        inputType={createModalState?.inputType || ''}
        isOpen={Boolean(createModalState)}
        onCreated={handleCreatedInputEntity}
        onOpenChange={(open) => {
          if (!open) setCreateModalState(null)
        }}
      />
    </div>
  )
}

export default Column
