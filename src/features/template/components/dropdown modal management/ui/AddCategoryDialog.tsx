import { useState, useEffect } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { toast } from "sonner";
import {
    X,
    Plus,
    Loader2,
} from "lucide-react";
import { Button } from "../../../../../components/ui/button";

import { Input } from "../../../../../components/ui/input";
interface Item { id: string; name: string }
interface SubCategory { id: string; name: string; items: Item[] }
interface Category { id: string; name: string; subCategories: SubCategory[] }
const uid = () => Math.random().toString(36).slice(2, 10);
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
function AddCategoryDialog({
    existingNames,
    onCreate,
}: {
    existingNames: string[];
    onCreate: (cat: Category) => void;
}) {
    const [open, setOpen] = useState(false);
    const [catName, setCatName] = useState("");
    const [items, setItems] = useState([{ id: uid(), value: "" }]);
    const [creating, setCreating] = useState(false);

    const reset = () => { setCatName(""); setItems([{ id: uid(), value: "" }]); };

    const addItem = () => setItems((p) => [...p, { id: uid(), value: "" }]);
    const updateItem = (id: string, v: string) => setItems((p) => p.map((i) => i.id === id ? { ...i, value: v } : i));
    const removeItem = (id: string) => setItems((p) => p.filter((i) => i.id !== id));

    const handleCreate = async () => {
        const name = catName.trim();
        if (!name) { toast.error("Category name is required."); return; }
        if (existingNames.map((n) => n.toLowerCase()).includes(name.toLowerCase())) {
            toast.error("Category already exists.", { description: `"${name}" is taken.` });
            return;
        }
        const itemNames = items.map((i) => i.value.trim()).filter(Boolean);
        if (!itemNames.length) { toast.error("Add at least one item."); return; }
        if (items.some((i) => !i.value.trim())) { toast.error("Remove empty item rows."); return; }
        if (itemNames.length !== new Set(itemNames.map((n) => n.toLowerCase())).size) {
            toast.error("Duplicate item names."); return;
        }
        setCreating(true);
        await wait(600);
        onCreate({ id: uid(), name, subCategories: [{ id: uid(), name: "General", items: itemNames.map((n) => ({ id: uid(), name: n })) }] });
        reset();
        setCreating(false);
        setOpen(false);
        toast.success(`"${name}" created.`);
    };

    return (
        <DialogPrimitive.Root open={open} onOpenChange={(v) => { setOpen(v); if (!v) reset(); }}>
            <DialogPrimitive.Trigger asChild>
                <Button size="sm" className="h-7 gap-1 px-2.5 text-xs">
                    <Plus className="h-3 w-3" />
                    New Category
                </Button>
            </DialogPrimitive.Trigger>
            <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay className="fixed inset-0 z-[300] bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-[300] w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-card shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 focus:outline-none">
                    {/* Dialog header */}
                    <div className="flex items-center justify-between border-b border-border px-4 py-3">
                        <div>
                            <DialogPrimitive.Title className="text-sm font-semibold text-foreground">New Category</DialogPrimitive.Title>
                            <DialogPrimitive.Description className="text-[11px] text-muted-foreground mt-0.5">Add a name and at least one item.</DialogPrimitive.Description>
                        </div>
                        <DialogPrimitive.Close asChild>
                            <button type="button" className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground hover:text-foreground transition-colors">
                                <X className="h-3.5 w-3.5" />
                            </button>
                        </DialogPrimitive.Close>
                    </div>

                    {/* Dialog body */}
                    <div className="flex flex-col gap-3 p-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide" htmlFor="new-cat-name">Category Name</label>
                            <Input
                                id="new-cat-name"
                                placeholder="e.g. Infrastructure"
                                value={catName}
                                onChange={(e) => setCatName(e.target.value)}
                                className="h-8 text-sm"
                                autoFocus
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">Items</label>
                            <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto pr-0.5">
                                {items.map((item) => (
                                    <div key={item.id} className="flex items-center gap-1.5">
                                        <Input
                                            value={item.value}
                                            onChange={(e) => updateItem(item.id, e.target.value)}
                                            placeholder="Item name"
                                            className="h-8 flex-1 text-sm"
                                        />
                                        {items.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeItem(item.id)}
                                                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                                                aria-label="Remove item"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <button
                                type="button"
                                onClick={addItem}
                                className="mt-0.5 self-start flex items-center gap-1 text-[11px] text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Plus className="h-3 w-3" />
                                Add item
                            </button>
                        </div>
                    </div>

                    {/* Dialog footer */}
                    <div className="flex items-center justify-end gap-2 border-t border-border px-4 py-3">
                        <DialogPrimitive.Close asChild>
                            <Button variant="outline" size="sm" className="h-7 px-3 text-xs">Cancel</Button>
                        </DialogPrimitive.Close>
                        <Button size="sm" className="h-7 px-3 text-xs" disabled={creating} onClick={handleCreate}>
                            {creating && <Loader2 className="h-3 w-3 animate-spin" />}
                            Create
                        </Button>
                    </div>
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    );
}

export default AddCategoryDialog;