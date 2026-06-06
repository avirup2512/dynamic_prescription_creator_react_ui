import { Button } from "../../../components/ui/button";
import AppObject from "../../../demoData/AllData";
import { Edit, Edit2Icon, Plus, PlusIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import InputAddModal from "./InputAddModal";
import { INPUT_TYPE } from "../../../constant/inputType.enum";
import { Checkbox } from "../../../components/ui/checkbox";
import { useDispatch } from "react-redux";
import { AddDropdownOptionValueToTemplate, AddInputValueToTemplate, AddQuantityFieldToTemplate, AddQuantityValueToTemplate, EditExtraNoteInTemplate, EditIsBoldInTemplate, EditShowLabelInTemplate, onDeleteInputFromTemplate,EditFontSizeInTemplate, EditExtraNoteValueInTemplate, AddInputTypeToTemplate } from "../store/TemplateSlice";
import EditableInputField from "./EditableInputField";
import { InputUtilityOptions } from "@/components/shared/InputUtilityOptions";
import { InputMenuWithAddButton } from "@/features/section/components/InputMenuWithAddButton";
import type { InputEntityType } from "@/features/inputEntityType/type/InputEntityType";
import type { ColumnInputItem } from "../type/TemplateType";
import InputEntityTypeService from "@/features/inputEntityType/services/InputEntityTypeService";

function TemplateSectionInput({sectionType,inputs,rowIndex,columnIndex,onAddQuantityValue,onAddQuantityTextValue,onDeleteInput,onAddDropdownOptionsValue}:any){
    const inputEntityService = InputEntityTypeService;
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [selectedInputIndex, setSelectedInputIndex] = useState<number | null>(null);
    const [currentInputType, setCurrentTemplateList] = useState("INPUT_TYPE_1");
    const handleInputChange = (value:string,inputIndex:number) => {
        const payload = { dropdownOptions: value, rowIndex, columnIndex, inputIndex, sectionType };
        dispatch(AddDropdownOptionValueToTemplate(payload));
    }
    const handleDeleteInput = (inputIndex: number) => {
        dispatch(onDeleteInputFromTemplate({ rowIndex, columnIndex, inputIndex, sectionType }))
    }
    const handleQuantityChange = (inputValue:any, rowIndex:number,columnIndex:number,inputIndex:number) => {
        dispatch(AddQuantityValueToTemplate({ rowIndex, columnIndex, inputIndex, quantity: inputValue, sectionType }));
    }
    const handleQuantityText = ( quantity:string,rowIndex:number,columnIndex:any,inputIndex:number) => {
        // Handle quantity text change logic here
        onAddQuantityTextValue(quantity,rowIndex,columnIndex,inputIndex,sectionType);
    }
    const AddInputValue = (inputIndex:number,input:any) => {
        dispatch(AddInputValueToTemplate({rowIndex, columnIndex, inputIndex,sectionType, input: {type: input.type, value: input.value, label: input.label}}))
    }
    const handleOpenModal = (inputIndex:number, input:any) => {
        setSelectedInputIndex(inputIndex);
        setOpen(true);
    }
    const handleQuantityToggle = (inputIndex: number, checked: any) => {
        console.log(checked)
        dispatch(AddQuantityFieldToTemplate({rowIndex, columnIndex, inputIndex, quantity: checked,sectionType}))
    }
    const hasInputs = () => {
        return inputs && inputs.length > 0;
    }

      const handleLabelToggle = (inputIndex: number, checked: any) => {
        console.log(checked)
          dispatch(
            (EditShowLabelInTemplate as any)({
              rowIndex,
              columnIndex,
              inputIndex,
              show_label: checked ? 1 : 0,
              sectionType
            }),
          )
      }
       const handleBoldToggle = (inputIndex: number, checked: any) => {
        console.log(checked)
          dispatch(
            (EditIsBoldInTemplate as any)({
              rowIndex,
              columnIndex,
              inputIndex,
              is_bold: checked ? 1 : 0,
              sectionType
            }),
          )
      }
       const handleFontSizeToggle = (inputIndex: number, value: any) => {
          dispatch(
            (EditFontSizeInTemplate as any)({
              rowIndex,
              columnIndex,
              inputIndex,
              font_size: value,
              sectionType
            }),
          )
      }
       const handleExtraNoteToggle = (inputIndex: number, checked: any) => {
        console.log(checked)
          dispatch(
            (EditExtraNoteInTemplate as any)({
              rowIndex,
              columnIndex,
              inputIndex,
              extra_note: checked ? 1 : 0,
              sectionType
            }),
          )
      }
    const handleExtraNoteValueChange = (inputIndex: number, value: any) => {
        dispatch(
            (EditExtraNoteValueInTemplate as any)({
                rowIndex,
                columnIndex,
                inputIndex,
                extra_note_value: value,
                sectionType
            }),
        )
    }
    const handleSelectInputType = (data:any) => {
        console.log(data);
        setCurrentTemplateList(data?.type);
        setOpen(true);
    }
    const addInputToTemplate = async (data:any) => {
        console.log(currentInputType);
        console.log(data);
        const selectedInput = data?.input;
        const fetchedInput = await inputEntityService.getByAllDropdownInputInformationById(data?.input?.id);
        console.log(fetchedInput);
        const payload = fetchedInput.data;
        payload.input_entity_id = data?.input?.id;
        payload.input_type_name = payload.type_name
        if (payload.input_type_name && payload.input_type_name == INPUT_TYPE.INPUTTYPE_2)
        {
            payload.dropdown_option_values = payload.dropdown_options
        } else
        {
            // payload
        }
        dispatch(AddInputTypeToTemplate({rowIndex,columnIndex,sectionType,input:payload}))
    }
    return(
        <>
            { hasInputs() ? (
                inputs.map((input:any, inputIndex:number) => {
                    const inputKey = `${columnIndex}-${input.type}`
                    const inputTypeName = AppObject.App.inputType.find(
                        (t) => t.id === input.type,
                    )?.name || "Unknown Input";          
                    return (
                        <div key={`${columnIndex}-${inputIndex}`}>
                        <label className="text-xs font-medium text-muted-foreground">
                            {inputTypeName} {inputIndex + 1} {input?.label}
                        </label>
                            <div className='flex justify-between items-center gap-2'>
                                {
                                    input?.show_label === 1 && <span className="label">{input?.input_entity_name}</span>
                                }
                                {
                                    input.input_type_name === INPUT_TYPE.INPUTTYPE_1  ? (
                                        <>
                                            <EditableInputField input={input} onChange={(value) => AddInputValue(inputIndex, {...input, value})} />
                                        </>
                                    ) : input.input_type_name === INPUT_TYPE.INPUTTYPE_2 ? (
                                        <>
                                        <select
                                                value={input?.dropdownValue}
                                                onChange={(e) => handleInputChange(e.target.value, inputIndex)}
                                                className="mt-1 w-full rounded-md border border-input bg-background px-2 py-1.5 text-xs outline-none transition appearance-none cursor-pointer focus:border-ring focus:ring-2 focus:ring-ring/20"
                                            >
                                                <option value="">Select an option</option>
                                                {input?.dropdown_option_values && input?.dropdown_option_values.map((option: any) => (
                                                    <option key={option.id} value={option?.id}>
                                                        {option?.value}
                                                    </option>
                                                ))}
                                                {/* <option value="Add"> <Plus className="size-4" /> Add New</option> */}
                                        </select>
                                        </>
                                    ) : input.input_type_name === INPUT_TYPE.INPUTTYPE_3  ? (
                                        <span className="text-sm text-green-600">{input.input_entity_value}</span>
                                    ) : (
                                        <span className="text-sm text-red-600">No value selected</span>
                                    )
                                }
                                <div className="flex items-center gap-2">
                                    {/* {input?.input_type_name === INPUT_TYPE.INPUTTYPE_2 &&
                                        <Button
                                            onClick={() => handleOpenModal(inputIndex,input)}
                                            size="icon-lg"
                                            type="button"
                                            variant="outline"
                                            className="h-6 w-6 hover:bg-none-100"
                                        >
                                        { input?.value ? <Edit2Icon className="size-3 text-success-600" /> : <PlusIcon className="size-3 text-success-600" />}
                                        </Button>} */}
                                        {/* <Button
                                            aria-label="Delete input"
                                            onClick={() => handleDeleteInput(inputIndex)}
                                            size="icon"
                                            type="button"
                                            variant="ghost"
                                            className="h-6 w-6 hover:bg-red-100"
                                        >
                                        <Trash2 className="size-3 text-red-600" />
                                        </Button> */}
                                </div>
                            </div>
                            <label className="flex items-center gap-2 text-xs text-muted-foreground">
                                Quantity
                            </label>
                            <div className={`flex items-center gap-2  ${input?.show_quantity ? 'justify-between' : 'justify-end'}` }>
                                 <>
                            {
                                    input?.show_quantity ? (
                                <div className="flex justify-start items-center gap-2">
                                            <input
                                                className="mt-1 w-24 rounded-md border border-input bg-background px-2 py-1.5 text-xs outline-none transition appearance-none cursor-pointer focus:border-ring focus:ring-2 focus:ring-ring/20"
                                                id="name"
                                                name="name"
                                                placeholder="Enter Quantity"
                                                // defaultValue={existingInput?.label ?? ''}
                                                required
                                                type="text"
                                                onBlur={(e: any) => handleQuantityText(e.currentTarget.value, rowIndex,columnIndex,inputIndex)}
                                                />
                                                {
                                                    input?.quantity_name && 
                                                    <span> {input?.quantity_name}</span>
                                                }
                                                <select
                                                value={input?.quantity_option_id || ''}
                                                onChange={(e) => handleQuantityChange( e.target.value, rowIndex, columnIndex, inputIndex)}
                                                className="mt-1 w-24 rounded-md border border-input bg-background px-2 py-1.5 text-xs outline-none transition appearance-none cursor-pointer focus:border-ring focus:ring-2 focus:ring-ring/20"
                                            >
                                                <option value="">Qty</option>
                                                {input?.quantity_option_values && input?.quantity_option_values.map((input: any) => (
                                                    <option key={input.id} value={input?.id}>
                                                        {input?.value}
                                                    </option>
                                                ))}
                                            </select>
                                </div>
                                ) : null
                                }
                                {/* <div className="flex justify-end items-center gap-2">
                                        <Checkbox
                                            checked={Boolean(input.show_quantity)}
                                            onCheckedChange={(checked) => handleQuantityToggle(inputIndex, checked)}
                                        />
                                        <span className="text-sm font-medium leading-none">Add Quantity</span>
                                </div> */}
                                        </>
                                
                            </div>
                        <InputUtilityOptions inputIndex={inputIndex} showLabel={input?.show_label ? true : false} isBold={input?.is_bold ? true : false} extraNote={input?.extra_note ? true : false} fontSize={input?.font_size || "medium"} extraNoteValue={input?.extra_note_value || ""} onShowLabelChange={handleLabelToggle} onIsBoldChange={handleBoldToggle} onExtraNoteChange={handleExtraNoteToggle} onFontSizeChange={handleFontSizeToggle} onExtraNoteValueChange={handleExtraNoteValueChange} showExtraNoteTextBox = {true} />
                        </div>
                    )
                })
            ) : (
                <p className="text-xs text-muted-foreground">No inputs in this section</p>
            )}
            <InputMenuWithAddButton rowIndex={rowIndex} columnIndex={columnIndex} handleSelectInputType={handleSelectInputType} />
            <InputAddModal
                inputType={currentInputType}
                sectionType={sectionType}
                isOpen={open}
                onOpenChange={(nextOpen:boolean) => {
                    setOpen(nextOpen)
                    if (!nextOpen) {
                        setSelectedInputIndex(null)
                    }
                }}
                rowIndex={rowIndex}
                columnIndex={columnIndex}
                inputIndex={selectedInputIndex}
                addInputToTemplate = {addInputToTemplate}
            />
        </>
    )
}
export default TemplateSectionInput;