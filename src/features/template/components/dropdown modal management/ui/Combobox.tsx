import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList,
} from "../../../../../components/ui/command";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { useState } from "react";
import {
    ChevronDown,
    Check
} from "lucide-react";
import { cn } from "@/lib/utils";

function Combobox({
    options, selected, onSelect, placeholder, searchPlaceholder, emptyLabel,
    icon: Icon, disabled, getBadge,
}: {
    options: { id: string; name: string }[];
    selected: string | null;
    onSelect: (id: string) => void;
    placeholder: string;
    searchPlaceholder: string;
    emptyLabel: string;
    icon: React.ElementType;
    disabled?: boolean;
    getBadge?: (id: string) => string | null;
}) {
    const [open, setOpen] = useState(false);
    const sel = options.find((o) => o.id === selected);

    return (
        <PopoverPrimitive.Root open={open} onOpenChange={disabled ? undefined : setOpen}>
            <PopoverPrimitive.Trigger asChild>
                <button
                    type="button"
                    disabled={disabled}
                    className={cn(
                        "flex h-8 w-full items-center justify-between gap-1.5 rounded-md border border-input bg-background px-2.5 text-xs transition-colors hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed",
                        !sel && "text-muted-foreground"
                    )}
                >
                    <span className="flex items-center gap-1.5 truncate">
                        <Icon className="h-3 w-3 shrink-0 text-muted-foreground" />
                        <span className="truncate">{sel ? sel.name : placeholder}</span>
                    </span>
                    <ChevronDown className={cn("h-3 w-3 shrink-0 text-muted-foreground transition-transform duration-150", open && "rotate-180")} />
                </button>
            </PopoverPrimitive.Trigger>
            <PopoverPrimitive.Portal>
                <PopoverPrimitive.Content onWheel={(e) => e.stopPropagation()}
                    className="z-[200] w-[var(--radix-popover-trigger-width)] min-w-[180px] rounded-lg border border-border bg-popover p-1 shadow-lg outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
                    sideOffset={5}
                    align="start"
                >
                    <Command>
                        <CommandInput placeholder={searchPlaceholder} className="h-8 text-xs" />
                        <CommandList>
                            <CommandEmpty className="py-3 text-xs">{emptyLabel}</CommandEmpty>
                            {options.map((opt) => {
                                const badge = getBadge?.(opt.id);
                                return (
                                    <CommandItem
                                        key={opt.id}
                                        value={opt.name}
                                        onSelect={() => { onSelect(opt.id); setOpen(false); }}
                                        className="cursor-pointer gap-1.5 rounded px-2 py-1.5 text-xs"
                                    >
                                        <Check className={cn("h-3 w-3 shrink-0", selected === opt.id ? "opacity-100 text-primary" : "opacity-0")} />
                                        <span>{opt.name}</span>
                                        {badge && <span className="ml-auto text-[10px] text-muted-foreground">{badge}</span>}
                                    </CommandItem>
                                );
                            })}
                        </CommandList>
                    </Command>
                </PopoverPrimitive.Content>
            </PopoverPrimitive.Portal>
        </PopoverPrimitive.Root>
    );
}
export default Combobox