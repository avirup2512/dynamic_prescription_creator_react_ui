import { Button } from "@/components/ui/button";
import {
    ChevronsUpDown,
} from "lucide-react";
import { useEffect, useState } from "react";
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
import QuantityService from "@/features/inputEntityType/services/quantityService";
import type { ColumnInputItem } from "@/features/new-template/type/TemplateType";

const SearchableOptionSelectForQuantity = function ({
    quantity_id,
    quantity_name,
    placeholder = "Select an option",
    searchPlaceholder = "Search option...",
    emptyMessage = "No option found.",
    onChange,
}: {
    quantity_id?: string;
    quantity_name?: string;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyMessage?: string;
    onChange?: (option: { id?: string; name?: string }) => void;
}) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [quantityValue, setQuantityValue] = useState(quantity_id);
    const [quantityName, setQuantityName] = useState(quantity_name);
    const [isLoading, setIsLoading] = useState(false);
    const callDropdwonApi = async (open: any) => {
        if (open) {
            setIsLoading(true);
            const quantityOptions = await QuantityService.getAllQuantity();
            if (quantityOptions && quantityOptions.success) {
                setOptions(quantityOptions?.data);
            }
            setIsLoading(false);
        }
    };
    useEffect(() => {
        if (quantity_id !== undefined) {
            setQuantityValue(quantity_id);
        }
        if (quantity_name !== undefined) {
            setQuantityName(quantity_name);
        }
    }, [quantity_id, quantity_name])

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
                    <span className="truncate">{quantityName || placeholder}</span>
                    <ChevronsUpDown className="ml-2 size-3 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                align="start"
                sideOffset={6}
                collisionPadding={8}
                className="z-[1000] w-[var(--radix-popover-trigger-width)] p-0"
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
                                        value={quantityValue}
                                        onSelect={() => {
                                            const selectedOption = { id: option?.id, name: option?.name };
                                            setQuantityValue(option?.id);
                                            setQuantityName(option?.name);
                                            onChange?.(selectedOption);
                                            setOpen(false);
                                        }}
                                        data-checked={option?.id == quantityValue}
                                    >
                                        <span className="truncate">{option?.name}</span>
                                    </CommandItem>
                                ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
export default SearchableOptionSelectForQuantity;