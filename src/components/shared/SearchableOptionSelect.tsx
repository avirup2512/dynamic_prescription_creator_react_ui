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

const SearchableOptionSelect = function ({
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