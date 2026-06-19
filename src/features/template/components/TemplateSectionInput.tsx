import { Button } from "../../../components/ui/button";
import AppObject from "../../../demoData/AllData";
import {
    ChevronsUpDown,
    Edit,
    Edit2Icon,
    Plus,
    PlusIcon,
    Trash2,
    Type,
    ChevronDown,
} from "lucide-react";
import { useState } from "react";
import InputAddModal from "./InputAddModal";
import { INPUT_TYPE } from "../../../constant/inputType.enum";
import { Checkbox } from "../../../components/ui/checkbox";
import { useDispatch } from "react-redux";
import {
    AddDropdownOptionValueToTemplate,
    AddInputValueToTemplate,
    AddQuantityFieldToTemplate,
    AddQuantityValueToTemplate,
    EditExtraNoteInTemplate,
    EditIsBoldInTemplate,
    EditShowLabelInTemplate,
    onDeleteInputFromTemplate,
    EditFontSizeInTemplate,
    EditExtraNoteValueInTemplate,
    AddInputTypeToTemplate,
    AddQuantityTextValueToTemplate,
    AddSameTypeOfInputInTemplateSection,
    AddEditDropdownTextValueToTemplate,
    UpdateDropdownOptionsInTemplate,
    UpdateQuantityOptionsInTemplate,
    AddNewDropdownEntityToTemplate,
    AddSameTypeOfInputInTemplateSectionInOrCondition,
    AddSameTypeOfInputGroupInTemplateSectionInOrCondition,
    UpdateQuantityOptionsOnlyInTemplate,
    RemoveInputGroupFromTemplate
} from "../store/TemplateSlice";
import EditableInputField from "./EditableInputField";
import { InputUtilityOptions } from "@/components/shared/InputUtilityOptions";
import { InputMenuWithAddButton } from "@/features/section/components/InputMenuWithAddButton";
import type { InputEntityType } from "@/features/inputEntityType/type/InputEntityType";
import type { ColumnInputItem } from "../type/TemplateType";
import InputEntityTypeService from "@/features/inputEntityType/services/InputEntityTypeService";
import DropdownEditModal from "./DropdownEditModal";
import QuantityEditModal from "./QuantityEditModal";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/tiptap-ui-primitive/dropdown-menu/dropdown-menu";
import QuantityService from "@/features/inputEntityType/services/quantityService";
export const INPUT_TYPES_LIST = [
    {
        type: INPUT_TYPE.INPUTTYPE_1,
        name: "Input",
        color: "bg-blue-50 border-blue-200",
        icon: Type,
    },
    {
        type: INPUT_TYPE.INPUTTYPE_2,
        name: "Dropdown",
        color: "bg-purple-50 border-purple-200",
        icon: ChevronDown,
    },
    // { type: INPUT_TYPE.INPUTTYPE_3, name: "Textbox", color: "bg-amber-50 border-amber-200", icon: FileText },
];
function SearchableOptionSelect({
    value,
    input_entity_id,
    placeholder = "Select an option",
    searchPlaceholder = "Search option...",
    emptyMessage = "No option found.",
    onChange,
}: {
    value?: string;
    input_entity_id?: string;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyMessage?: string;
    onChange: (option: any) => void;
}) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const callDropdwonApi = async (open: any) => {
        if (open && input_entity_id) {
            setIsLoading(true);
            const dropdownOptions =
                await InputEntityTypeService.getByAllDropdownInputInformationById(
                    input_entity_id,
                );
            if (dropdownOptions && dropdownOptions.success) {
                setOptions(dropdownOptions?.data?.dropdown_options);
            }
            setIsLoading(false);
        }
    };
    return (
        <Popover
            open={open}
            onOpenChange={(e) => {
                (setOptions([]), callDropdwonApi(e), setOpen(e));
            }}
        >
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="mt-1 w-full justify-between rounded-md border-input bg-background px-2 py-1.5 text-xs font-normal"
                >
                    <span className="truncate">{value || placeholder}</span>
                    <ChevronsUpDown className="ml-2 size-3 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                align="start"
                className="w-[var(--radix-popover-trigger-width)] p-0"
            >
                <Command>
                    <CommandInput placeholder={searchPlaceholder} />
                    <CommandList>
                        <CommandEmpty>
                            {!isLoading ? emptyMessage : "Please wait Loading..."}
                        </CommandEmpty>
                        <CommandGroup>
                            {options &&
                                options.map((option: any) => (
                                    <CommandItem
                                        key={option?.id}
                                        value={option?.value || String(option?.id)}
                                        onSelect={() => {
                                            onChange(option);
                                            setOpen(false);
                                        }}
                                        data-checked={option?.id == value}
                                    >
                                        <span className="truncate">{option?.value}</span>
                                    </CommandItem>
                                ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

function TemplateSectionInput({
    sectionIndex,
    sectionType,
    inputGroup,
    rowIndex,
    columnIndex,
    onAddQuantityValue,
    onAddQuantityTextValue,
    onDeleteInput,
    onAddDropdownOptionsValue,
}: any) {
    const inputEntityService = InputEntityTypeService;
    const quantityService = QuantityService;
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [currentInputType, setCurrentTemplateList] = useState("INPUT_TYPE_1");
    const [editDropdownOpen, setEditDropdownOpen] = useState(false);
    const [editingDropdownInput, setEditingDropdownInput] = useState<any>(null);
    const [editingDropdownInputIndex, setEditingDropdownInputIndex] = useState<
        number | null
    >(null);
    const [editQuantityOpen, setEditQuantityOpen] = useState(false);
    const [editingQuantityInput, setEditingQuantityInput] = useState<any>(null);
    const [editingQuantityInputIndex, setEditingQuantityInputIndex] = useState<
        number | null
    >(null);
    const [editingQuantityInputGroupIndex, setEditingQuantityInputGroupIndex] =
        useState<number | null>(null);
    const [selectedInputIndex, setSelectedInputIndex] = useState<any>(null);
    const [selectedInputGroupIndex, setSelectedInputGroupIndex] =
        useState<any>(null);
    const handleInputChange = (
        selectedOption: any,
        inputGroupIndex: number,
        inputIndex: number,
    ) => {
        if (selectedOption) {
            const payload: any = {
                dropdownOptions: selectedOption?.id,
                rowIndex,
                columnIndex,
                inputIndex,
                inputGroupIndex,
                sectionType,
                sectionIndex,
            };
            dispatch(AddDropdownOptionValueToTemplate(payload));
            payload.dropdownOptionsText = selectedOption?.value;
            dispatch(AddEditDropdownTextValueToTemplate(payload));
        }
    };
    const handleQuantityChange = (
        inputValue: any,
        rowIndex: number,
        columnIndex: number,
        inputGroupIndex: number,
        inputIndex: number,
    ) => {
        dispatch(
            AddQuantityValueToTemplate({
                rowIndex,
                columnIndex,
                inputIndex,
                inputGroupIndex,
                quantity: inputValue,
                sectionType,
                sectionIndex,
            }),
        );
    };
    const AddInputValue = (
        inputIndex: number,
        inputGroupIndex: number,
        input: any,
    ) => {
        dispatch(
            AddInputValueToTemplate({
                rowIndex,
                columnIndex,
                inputIndex,
                inputGroupIndex,
                sectionType,
                sectionIndex,
                input: { type: input.type, value: input.value, label: input.label },
            }),
        );
        console.log();
    };
    const hasInputs = () => {
        return inputGroup && inputGroup.length > 0;
    };
    const AddQuantityTextValue = (
        quantity: string,
        rowIndex: number,
        columnIndex: any,
        inputGroupIndex: number,
        inputIndex: number,
    ) => {
        const payload = {
            quantityText: quantity,
            rowIndex,
            columnIndex,
            inputGroupIndex,
            inputIndex,
            sectionType,
            sectionIndex,
        };
        dispatch(AddQuantityTextValueToTemplate(payload));
    };
    const handleLabelToggle = (
        inputIndex: number,
        inputGroupIndex: number,
        checked: any,
    ) => {
        console.log(checked);
        dispatch(
            (EditShowLabelInTemplate as any)({
                sectionIndex,
                rowIndex,
                columnIndex,
                inputIndex,
                inputGroupIndex,
                show_label: checked ? 1 : 0,
                sectionType,
            }),
        );
    };
    const handleBoldToggle = (
        inputIndex: number,
        inputGroupIndex: number,
        checked: any,
    ) => {
        console.log(checked);
        dispatch(
            (EditIsBoldInTemplate as any)({
                sectionIndex,
                rowIndex,
                columnIndex,
                inputIndex,
                inputGroupIndex,
                is_bold: checked ? 1 : 0,
                sectionType,
            }),
        );
    };
    const handleFontSizeToggle = (
        inputIndex: number,
        inputGroupIndex: number,
        value: any,
    ) => {
        dispatch(
            (EditFontSizeInTemplate as any)({
                sectionIndex,
                rowIndex,
                columnIndex,
                inputIndex,
                inputGroupIndex,
                font_size: value,
                sectionType,
            }),
        );
    };
    const handleExtraNoteToggle = (
        inputIndex: number,
        inputGroupIndex: number,
        checked: any,
    ) => {
        console.log(checked);
        dispatch(
            (EditExtraNoteInTemplate as any)({
                sectionIndex,
                rowIndex,
                columnIndex,
                inputIndex,
                inputGroupIndex,
                extra_note: checked ? 1 : 0,
                sectionType,
            }),
        );
    };
    const handleExtraNoteValueChange = (
        inputIndex: number,
        inputGroupIndex: number,
        value: any,
    ) => {
        dispatch(
            (EditExtraNoteValueInTemplate as any)({
                sectionIndex,
                rowIndex,
                columnIndex,
                inputIndex,
                inputGroupIndex,
                extra_note_value: value,
                sectionType,
            }),
        );
    };
    const handleSelectInputType = (
        data: any,
        inputIndex: number,
        inputGroupIndex: number,
    ) => {
        console.log(data);
        setCurrentTemplateList(data?.type);
        setSelectedInputGroupIndex(inputGroupIndex);
        setSelectedInputIndex(inputIndex);
        setOpen(true);
    };
    const AddMoreInputofSameType = (
        input: any,
        inputGroupIndex: number,
        inputIndex: number,
        sameGroup?: boolean,
    ) => {
        if (input) {
            const inputCopy = JSON.parse(JSON.stringify(input));
            if (inputCopy.input_order !== undefined || inputCopy.input_order !== null)
                inputCopy.input_order++;
            else inputCopy.input_order = inputGroup.length + 1;
            const payload = {
                sectionIndex,
                rowIndex,
                columnIndex,
                input: inputCopy,
                sectionType,
                index: inputIndex + 1,
                inputGroupIndex,
                sameGroup,
            };
            dispatch(AddSameTypeOfInputInTemplateSection(payload));
        }
    };
    const AddMoreInputofSameTypeInOrCondition = (
        input: any,
        inputGroupIndex: number,
        inputIndex: number,
    ) => {
        console.log(input);
        if (input) {
            const inputCopy = JSON.parse(JSON.stringify(input));
            inputCopy.or_input_id = input?.or_input_id
                ? input.or_input_id
                : input.input_id;
            delete inputCopy.input_id;
            const payload = {
                sectionIndex,
                rowIndex,
                columnIndex,
                input: inputCopy,
                sectionType,
                index: inputIndex + 1,
                inputGroupIndex,
            };
            dispatch(AddSameTypeOfInputInTemplateSectionInOrCondition(payload));
        }
    };
    const AddMoreInputGroupOfSameTypeInOrCondition = (
        inputGroup: any,
        inputGroupIndex: number,
    ) => {
        console.log(inputGroup);
        if (inputGroup) {
            const inputGroupCopy = JSON.parse(JSON.stringify(inputGroup));
            inputGroupCopy.or_input_group_id = inputGroup?.or_input_group_id
                ? inputGroup.or_input_group_id
                : inputGroup.template_input_group_id;
            delete inputGroupCopy.template_input_group_id;
            console.log(inputGroupCopy);
            const payload = {
                sectionIndex,
                rowIndex,
                columnIndex,
                inputGroup: inputGroupCopy,
                sectionType,
                inputGroupIndex,
            };
            dispatch(AddSameTypeOfInputGroupInTemplateSectionInOrCondition(payload));
        }
    };
    const DeleteInputFromTemplate = (
        inputIndex: number,
        inputGroupIndex: number,
    ) => {
        if (inputIndex !== undefined && inputIndex !== null) {
            dispatch(
                onDeleteInputFromTemplate({
                    rowIndex,
                    columnIndex,
                    inputIndex,
                    inputGroupIndex,
                    sectionType,
                    sectionIndex,
                }),
            );
        }
    };
    const EditDropdownText = async (
        id: any,
        value: string,
        inputGroupIndex: number,
        inputIndex: number,
    ) => {
        console.log(id);
        const payload: any = {
            dropdownOptionsText: value,
            rowIndex,
            columnIndex,
            inputIndex,
            inputGroupIndex,
            sectionType,
            sectionIndex,
        };
        const newlyAddedOption = await inputEntityService.addSingleDropdownEntity(
            id,
            { value },
        );
        if (newlyAddedOption && newlyAddedOption.success)
            dispatch(AddEditDropdownTextValueToTemplate(payload));
    };
    const handleOpenDropdownEditModal = (
        input: any,
        inputGroupIndex: number,
        inputIndex: number,
    ) => {
        setEditingDropdownInput(input);
        setEditingDropdownInputIndex(inputIndex);
        setEditingQuantityInputGroupIndex(inputGroupIndex);
        setEditDropdownOpen(true);
    };
    const handleDropdownSaved = ({ id, name }: any) => {
        console.log(editingDropdownInputIndex);
        if (editingDropdownInputIndex === null) return;

        dispatch(
            AddNewDropdownEntityToTemplate({
                rowIndex,
                columnIndex,
                inputIndex: editingDropdownInputIndex,
                sectionType,
                sectionIndex,
                dropdownName: name,
                input_entity_id: id,
            }),
        );
    };
    const handleOpenQuantityEditModal = (
        input: any,
        inputGroupIndex: number,
        inputIndex: number,
    ) => {
        setEditingQuantityInput(input);
        setEditingQuantityInputIndex(inputIndex);
        setEditingQuantityInputGroupIndex(inputGroupIndex);
        setEditQuantityOpen(true);
    };
    const handleQuantitySaved = ({ id, name, options }: any) => {
        if (editingQuantityInputIndex === null) return;

        const selectedOption = options.find(
            (option: any) => option?.id == editingQuantityInput?.quantity_option_id,
        );
        dispatch(
            UpdateQuantityOptionsInTemplate({
                rowIndex,
                columnIndex,
                inputGroupIndex: editingQuantityInputGroupIndex,
                inputIndex: editingQuantityInputIndex,
                sectionType,
                sectionIndex,
                quantityId: id,
                quantityName: name,
                quantityOptionValues: options,
                quantityOptionId: selectedOption
                    ? editingQuantityInput?.quantity_option_id
                    : "",
            }),
        );
    };
    const handleQuantityToggle = (
        inputIndex: number,
        inputGroupIndex: number,
        checked: any,
    ) => {
        dispatch(
            (AddQuantityFieldToTemplate as any)({
                sectionIndex,
                rowIndex,
                columnIndex,
                inputIndex,
                inputGroupIndex,
                quantity: checked ? 1 : 0,
                sectionType,
            }),
        );
    };
    const addInputToTemplate = (data: any, inputGroupIndex: number) => {
        console.log(data);
        const inputData = {
            dropdown_option_id: null,
            dropdown_option_value: null,
            dropdown_option_values: [],
            extra_note: 0,
            font_size: "",
            input_entity_id: data.input?.id,
            input_entity_name: data.input?.name,
            input_order: 1,
            input_type_id: data.input?.type_id,
            input_type_name: data.input?.type_name,
            isVisible: 1,
            is_bold: 0,
            input_id: 'input' + Date.now(),
            or_input_id: null,
            quantity_id: data?.quantity,
            quantity_name: null,
            quantity_option_value: null,
            quantity_option_values: [],
            show_label: 0,
            show_quantity: data?.show_quantity ? 1 : 0,
            template_input_extranotes: null,
            template_input_quantity_option_id: null,
            template_input_value: "",
            template_quantity_value: "",
        };
        const payload = {
            sectionIndex,
            rowIndex,
            columnIndex,
            inputGroupIndex,
            sectionType,
            sameGroup: true,
            input: inputData,
        };
        dispatch(AddInputTypeToTemplate(payload));
    };
    const quantityOptionCalled = async (input: any, inputIndex: any, inputGroupIndex: any, quantityId: string) => {
        try {
            if (
                input?.quantity_option_values &&
                input.quantity_option_values.length == 0
            ) {
                const quantityOptions =
                    await quantityService.getQuantityById(quantityId);
                if (quantityOptions && quantityOptions.success) {
                    const payload = { sectionIndex, rowIndex, columnIndex, inputIndex, inputGroupIndex, quantityOptionValues: quantityOptions?.data?.quantity_values, sectionType }
                    dispatch(UpdateQuantityOptionsOnlyInTemplate(payload))
                }
            }
        } catch (error) { }
    };
    const handleDeleteInputGroup = (inputGroupIndex: number) => {
        const payload = { sectionIndex, rowIndex, columnIndex, sectionType, inputGroupIndex };
        dispatch(RemoveInputGroupFromTemplate(payload))
    }
    return (
        <>
            {hasInputs() ? (
                inputGroup &&
                inputGroup.map((inputs: any, inputGroupIndex: number) => {
                    return (
                        <div
                            className="mb-4 border border-border bg-card p-6 relative"
                            key={`${columnIndex}-${inputGroupIndex}`}
                        >
                            {inputs?.or_input_group_id && (
                                <p className="orIndicator  bg-primary text-white px-2 py-1 text-xs">
                                    OR
                                </p>
                            )}
                            <div className="flex items-center justify-between mb-3">
                                <p className="mb-2">Input Group {inputGroupIndex + 1}</p>
                                <div className="flex items-center justify-between">
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
                                            {INPUT_TYPES_LIST.map((inputType: any) => {
                                                return (
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            handleSelectInputType(
                                                                inputType,
                                                                true,
                                                                inputGroupIndex,
                                                                inputGroupIndex,
                                                            )
                                                        }
                                                    >
                                                        <span className="font-medium">
                                                            Add {inputType.name}
                                                        </span>
                                                    </DropdownMenuItem>
                                                );
                                            })}
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
                            {inputs &&
                                inputs.inputs.map((input: any, inputIndex: number) => {
                                    const inputKey = `${columnIndex}-${input.type}`;
                                    const inputTypeName =
                                        AppObject.App.inputType.find((t) => t.id === input.type)
                                            ?.name || "Unknown Input";
                                    return (
                                        <div
                                            key={`${columnIndex}-${inputIndex}`}
                                            className="mb-4 border border-border bg-card p-6 relative"
                                        >
                                            {input?.or_input_id && (
                                                <p className="orIndicator  bg-primary text-white px-2 py-1 text-xs">OR</p>

                                            )}
                                            <div className="flex justify-between">
                                                <label className="text-lg font-large">
                                                    {input?.input_entity_name}
                                                </label>
                                                <Button
                                                    aria-label="Delete input"
                                                    onClick={() =>
                                                        DeleteInputFromTemplate(inputIndex, inputGroupIndex)
                                                    }
                                                    size="icon"
                                                    type="button"
                                                    variant="ghost"
                                                    className="h-6 w-6 hover:bg-red-100"
                                                >
                                                    <Trash2 className="size-3 text-red-600" />
                                                </Button>
                                            </div>
                                            <div className="">
                                                {input.input_type_name === INPUT_TYPE.INPUTTYPE_1 ? (
                                                    <>
                                                        <EditableInputField
                                                            input={input}
                                                            onChange={(value) =>
                                                                AddInputValue(inputIndex, inputGroupIndex, {
                                                                    ...input,
                                                                    value,
                                                                })
                                                            }
                                                        />
                                                    </>
                                                ) : input.input_type_name === INPUT_TYPE.INPUTTYPE_2 ? (
                                                    <>
                                                        <div className="flex items-center gap-2 w-full">
                                                            <div className="flex-1">
                                                                <SearchableOptionSelect
                                                                    value={input?.dropdown_option_value || ""}
                                                                    input_entity_id={input?.input_entity_id}
                                                                    onChange={(selectedOption) =>
                                                                        handleInputChange(
                                                                            selectedOption,
                                                                            inputGroupIndex,
                                                                            inputIndex,
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="flex-shrink-0">
                                                                <Button
                                                                    size="icon"
                                                                    type="button"
                                                                    variant="ghost"
                                                                    className="h-6 w-6 hover:bg-green-100"
                                                                    // disabled={!canCreateInputEntity(currentInputType)}
                                                                    onClick={() =>
                                                                        handleOpenDropdownEditModal(
                                                                            input,
                                                                            inputGroupIndex,
                                                                            inputIndex,
                                                                        )
                                                                    }
                                                                >
                                                                    <Plus className="size-4" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                        {input?.dropdown_option_text && (
                                                            <div className="mt-2 text-sm text-muted-foreground">
                                                                <EditableInputField
                                                                    input={input}
                                                                    onChange={(value: any) =>
                                                                        EditDropdownText(
                                                                            input?.input_entity_id,
                                                                            value,
                                                                            inputGroupIndex,
                                                                            inputIndex,
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        )}
                                                    </>
                                                ) : input.input_type_name === INPUT_TYPE.INPUTTYPE_3 ? (
                                                    <span className="text-sm text-green-600">
                                                        {input.input_entity_value}
                                                    </span>
                                                ) : (
                                                    <span className="text-sm text-red-600">
                                                        No value selected
                                                    </span>
                                                )}
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
                                            {input?.show_quantity == 1 ||
                                                (input?.show_quantity == true && (
                                                    <label className="flex items-center gap-2 text-xs text-muted-foreground">
                                                        Quantity
                                                    </label>
                                                ))}
                                            <div
                                                className={`flex items-center gap-2  justify-between`}
                                            >
                                                <>
                                                    {input?.show_quantity ? (
                                                        <div className="flex justify-start items-center gap-2">
                                                            <input
                                                                className="mt-1 w-24 rounded-md border border-input bg-background px-2 py-1.5 text-xs outline-none transition appearance-none cursor-pointer focus:border-ring focus:ring-2 focus:ring-ring/20"
                                                                id="name"
                                                                name="name"
                                                                placeholder="Enter Quantity"
                                                                value={input?.template_quantity_value}
                                                                // defaultValue={existingInput?.label ?? ''}
                                                                required
                                                                type="text"
                                                                onChange={(e: any) =>
                                                                    AddQuantityTextValue(
                                                                        e.currentTarget.value,
                                                                        rowIndex,
                                                                        columnIndex,
                                                                        inputGroupIndex,
                                                                        inputIndex,
                                                                    )
                                                                }
                                                            />
                                                            {input?.quantity_name && (
                                                                <span> {input?.quantity_name}</span>
                                                            )}
                                                            <select
                                                                value={
                                                                    input?.template_input_quantity_option_id || ""
                                                                }
                                                                onBlur={() => {
                                                                    quantityOptionCalled(
                                                                        input,
                                                                        inputIndex,
                                                                        inputGroupIndex,
                                                                        input?.quantity_id,
                                                                    );
                                                                }}
                                                                onChange={(e) =>
                                                                    handleQuantityChange(
                                                                        e.target.value,
                                                                        rowIndex,
                                                                        columnIndex,
                                                                        inputGroupIndex,
                                                                        inputIndex,
                                                                    )
                                                                }
                                                                className="mt-1 w-24 rounded-md border border-input bg-background px-2 py-1.5 text-xs outline-none transition appearance-none cursor-pointer focus:border-ring focus:ring-2 focus:ring-ring/20"
                                                            >
                                                                <option value="">Qty</option>
                                                                {input?.quantity_option_values &&
                                                                    input?.quantity_option_values.map(
                                                                        (input: any) => (
                                                                            <option key={input.id} value={input?.id}>
                                                                                {input?.value}
                                                                            </option>
                                                                        ),
                                                                    )}
                                                            </select>
                                                            <Button
                                                                aria-label="Edit quantity"
                                                                className="h-6 w-6 hover:bg-green-100"
                                                                onClick={() =>
                                                                    handleOpenQuantityEditModal(
                                                                        input,
                                                                        inputGroupIndex,
                                                                        inputIndex,
                                                                    )
                                                                }
                                                                size="icon"
                                                                type="button"
                                                                variant="ghost"
                                                            >
                                                                <Edit className="size-3 text-green-600" />
                                                            </Button>
                                                        </div>
                                                    ) : null}
                                                    {
                                                        <div className="flex justify-end items-center gap-2 mt-3">
                                                            <Checkbox
                                                                checked={Boolean(input.show_quantity)}
                                                                onCheckedChange={(checked) =>
                                                                    handleQuantityToggle(
                                                                        inputIndex,
                                                                        inputGroupIndex,
                                                                        checked,
                                                                    )
                                                                }
                                                            />
                                                            <span className="text-sm font-medium leading-none">
                                                                Add Quantity
                                                            </span>
                                                        </div>
                                                    }
                                                </>
                                            </div>
                                            {!input?.or_input_id && !input?.and_input_id && (
                                                <>
                                                    <InputUtilityOptions
                                                        inputIndex={inputIndex}
                                                        inputGroupIndex={inputGroupIndex}
                                                        showLabel={input?.show_label ? true : false}
                                                        isBold={input?.is_bold ? true : false}
                                                        extraNote={input?.extra_note ? true : false}
                                                        fontSize={input?.font_size || "medium"}
                                                        extraNoteValue={
                                                            input?.extra_note_value ||
                                                            input?.template_input_extranotes
                                                        }
                                                        onShowLabelChange={handleLabelToggle}
                                                        onIsBoldChange={handleBoldToggle}
                                                        onExtraNoteChange={handleExtraNoteToggle}
                                                        onFontSizeChange={handleFontSizeToggle}
                                                        onExtraNoteValueChange={handleExtraNoteValueChange}
                                                        showExtraNoteTextBox={true}
                                                    />
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button
                                                                type="button"
                                                                // disabled={!template.name || !template.header || !template.body}
                                                                className="gap-2 mt-2"
                                                            >
                                                                Add same input
                                                                <Plus className="size-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent>
                                                            <DropdownMenuLabel>
                                                                Input options
                                                            </DropdownMenuLabel>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem
                                                                onClick={() => {
                                                                    AddMoreInputofSameType(
                                                                        input,
                                                                        inputGroupIndex,
                                                                        inputIndex,
                                                                        true,
                                                                    );
                                                                }}
                                                            >
                                                                <span className="font-medium">
                                                                    Add input in this group
                                                                </span>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() => {
                                                                    AddMoreInputofSameType(
                                                                        input,
                                                                        inputGroupIndex,
                                                                        inputIndex,
                                                                        false,
                                                                    );
                                                                }}
                                                            >
                                                                <span className="font-medium">
                                                                    Add input in a new group
                                                                </span>
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                    <Button
                                                        type="button"
                                                        onClick={() => {
                                                            AddMoreInputofSameTypeInOrCondition(
                                                                input,
                                                                inputGroupIndex,
                                                                inputIndex,
                                                            );
                                                        }}
                                                        // disabled={!template.name || !template.header || !template.body}
                                                        className="gap-2"
                                                    >
                                                        Or
                                                    </Button>
                                                    {/* <Button
                                                    type="button"
                                                onClick={()=>{AddMoreInputofSameTypeInOrCondition(input, "and", inputIndex)}}
                                                // disabled={!template.name || !template.header || !template.body}
                                                className="gap-2"
                                                >
                                                And
                                                </Button> */}
                                                </>
                                            )}
                                        </div>
                                    );
                                })}
                            {!inputs.or_input_group_id && (
                                <Button
                                    type="button"
                                    onClick={() => {
                                        AddMoreInputGroupOfSameTypeInOrCondition(
                                            inputs,
                                            inputGroupIndex,
                                        );
                                    }}
                                    className="gap-2"
                                >
                                    Or
                                </Button>
                            )}
                        </div>
                    );
                })
            ) : (
                <p className="text-xs text-muted-foreground">
                    No inputs in this section
                </p>
            )}
            <DropdownEditModal
                input={editingDropdownInput}
                isOpen={editDropdownOpen}
                onOpenChange={(nextOpen: boolean) => {
                    setEditDropdownOpen(nextOpen);
                    if (!nextOpen) {
                        setEditingDropdownInput(null);
                        setEditingDropdownInputIndex(null);
                    }
                }}
                onSaved={handleDropdownSaved}
            />
            <QuantityEditModal
                input={editingQuantityInput}
                isOpen={editQuantityOpen}
                onOpenChange={(nextOpen: boolean) => {
                    setEditQuantityOpen(nextOpen);
                    if (!nextOpen) {
                        setEditingQuantityInput(null);
                        setEditingQuantityInputIndex(null);
                    }
                }}
                onSaved={handleQuantitySaved}
            />
            {
                /* <InputMenuWithAddButton rowIndex={rowIndex} columnIndex={columnIndex} handleSelectInputType={handleSelectInputType} />
                 */
                <InputAddModal
                    inputType={currentInputType}
                    sectionType={sectionType}
                    isOpen={open}
                    onOpenChange={(nextOpen: boolean) => {
                        setOpen(nextOpen);
                        if (!nextOpen) {
                            setSelectedInputGroupIndex(null);
                            setSelectedInputIndex(null);
                        }
                    }}
                    rowIndex={rowIndex}
                    columnIndex={columnIndex}
                    inputGroupIndex={selectedInputGroupIndex}
                    addInputToTemplate={addInputToTemplate}
                />
            }
        </>
    );
}
export default TemplateSectionInput;
