import { Button } from "@/components/ui/button";
import {
    ChevronsUpDown,
} from "lucide-react";
import { useState } from "react";
import InputEntityTypeService from "@/features/inputEntityType/services/InputEntityTypeService";
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
import { CONDITION_TYPE } from "@/constant/condition.enum";
import QuantityService from "@/features/inputEntityType/services/quantityService";

const SearchableOptionSelect = function ({
    value,
    input_entity_id,
    placeholder = "Select an option",
    searchPlaceholder = "Search option...",
    emptyMessage = "No option found.",
    entityType = "INPUT",
    isConnector = false,
    onChange,
}: {
    value?: string;
    input_entity_id?: string;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyMessage?: string;
    entityType?: string;
    isConnector?: boolean;
    onChange: (option: any) => void;
}) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const callDropdwonApi = async (open: any) => {
        if (open) {
            setIsLoading(true);
            switch (entityType) {
                case "INPUT":
                    if (input_entity_id) {
                        const dropdownOptions =
                            await InputEntityTypeService.getByAllDropdownInputInformationById(
                                input_entity_id,
                            );
                        if (dropdownOptions && dropdownOptions.success) {
                            setOptions(dropdownOptions?.data?.dropdown_options);
                        }
                    }
                    break;
                case "RELATIONSHIP":
                    const options = Object.keys(CONDITION_TYPE).map((rel: any) => ({ value: rel, id: rel }));
                    setOptions(options);
                    break;
                case "QUANTITY":
                    if (input_entity_id) {
                        const quantityOptions = await QuantityService.getQuantityById(input_entity_id);
                        if (quantityOptions && quantityOptions.success) {
                            setOptions(quantityOptions?.data?.quantity_values);
                        }
                    }
                    break;
                default:
                    return []
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
            {!isConnector ? <PopoverTrigger asChild>
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
            </PopoverTrigger> :
                <PopoverTrigger asChild>
                    <button
                        type="button"
                        className="
group
relative
mx-auto
flex
h-8
min-w-[90px]
items-center
justify-center
rounded-full
border
border-dashed
border-emerald-200
bg-emerald-50
px-4
text-[11px]
font-semibold
uppercase
tracking-wide
text-emerald-700
transition-all
hover:border-emerald-500
hover:bg-emerald-100
hover:text-emerald-800
focus:outline-none
focus:ring-2
focus:ring-emerald-200
"
                    >
                        <span>{value || placeholder}</span>

                        <ChevronsUpDown
                            className="
                ml-1
                h-3
                w-3
                opacity-50
                transition-opacity
                group-hover:opacity-100
            "
                        />
                    </button>
                </PopoverTrigger>}
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
                                        value={option?.id}
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
export default SearchableOptionSelect;