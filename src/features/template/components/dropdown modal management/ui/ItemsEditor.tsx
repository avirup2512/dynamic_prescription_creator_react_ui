
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
    Search,
    Plus,
    Trash2,
    Loader2,
    PackageOpen,
    Layers,
} from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import DeleteIconButton from "./DeleteIconButton";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
interface Item { id: string; name: string }
interface SubCategory { id: string; name: string; items: Item[] }
interface Category { id: string; name: string; subCategories: SubCategory[] }
const uid = () => Math.random().toString(36).slice(2, 10);
function ItemsEditor({
    subCategory,
    subCategories,
    categoryName,
    searchQuery,
    onSave,
    onDeleteSub,
    saving,
    deleting,
}: {
    subCategory: SubCategory;
    subCategories: SubCategory[];
    categoryName: string;
    searchQuery: string;
    onSave: (items: Item[]) => void;
    onDeleteSub: () => void;
    saving: boolean;
    deleting: boolean;
}) {
    const [items, setItems] = useState<Item[]>(subCategories);

    useEffect(() => {
        console.log(subCategory)
        setItems(subCategories);
    }, [subCategories]);

    const visible = searchQuery
        ? items.filter((i) => i.name.toLowerCase().includes(searchQuery.toLowerCase()))
        : items;

    const update = (id: string, name: string) => setItems((p) => p.map((i) => i.id === id ? { ...i, name } : i));
    const remove = (id: string) => setItems((p) => p.filter((i) => i.id !== id));
    const add = () => setItems((p) => [...p, { id: uid(), name: "" }]);

    const save = () => {
        const cleaned = items.map((i) => ({ ...i, name: i.name.trim() }));
        if (cleaned.some((i) => !i.name)) { toast.error("Item names cannot be empty."); return; }
        const names = cleaned.map((i) => i.name.toLowerCase());
        if (names.length !== new Set(names).size) { toast.error("Duplicate item names."); return; }
        onSave(cleaned);
    };

    return (
        <div className="flex flex-col gap-2">
            {/* Sub-header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Layers className="h-3 w-3" />
                    <span className="font-medium text-foreground">{subCategory?.name}</span>
                    <span>·</span>
                    <span>{categoryName}</span>
                    <span>·</span>
                    <span>{items.length} item{items.length !== 1 ? "s" : ""}</span>
                </div>
                <ConfirmDeleteDialog
                    trigger={
                        <button
                            type="button"
                            className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-destructive transition-colors"
                        >
                            <Trash2 className="h-3 w-3" />
                            Delete sub
                        </button>
                    }
                    title="Delete subcategory?"
                    description={<><span className="font-medium text-foreground">{subCategory?.name}</span> and its items will be removed.</>}
                    onConfirm={onDeleteSub}
                    loading={deleting}
                />
            </div>

            {/* Item list */}
            <div className="rounded-lg border border-border bg-background overflow-hidden">
                {visible.length === 0 && searchQuery ? (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                        <Search className="h-5 w-5 text-muted-foreground/40 mb-1" />
                        <p className="text-xs text-muted-foreground">No items match your search</p>
                    </div>
                ) : items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                        <PackageOpen className="h-5 w-5 text-muted-foreground/40 mb-1" />
                        <p className="text-xs text-muted-foreground">No items — add one below</p>
                    </div>
                ) : (
                    <div className="divide-y divide-border max-h-52 overflow-y-auto">
                        {(searchQuery ? visible : items).map((item, idx) => (
                            <div key={item.id} className="flex items-center gap-2 px-2.5 py-1.5">
                                <span className="text-[10px] text-muted-foreground w-4 shrink-0 text-right tabular-nums">{idx + 1}</span>
                                <input
                                    value={item.name || item?.value}
                                    onChange={(e) => update(item.id, e.target.value)}
                                    placeholder="Item name"
                                    className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
                                    aria-label="Item name"
                                />
                                <DeleteIconButton onDelete={() => remove(item.id)} />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer actions */}
            <div className="flex items-center justify-between pt-0.5">
                <button
                    type="button"
                    onClick={add}
                    disabled={!!searchQuery}
                    className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-primary transition-colors disabled:opacity-40"
                >
                    <Plus className="h-3 w-3" />
                    Add item
                </button>
                <Button size="sm" className="h-7 px-3 text-xs" onClick={save} disabled={saving}>
                    {saving && <Loader2 className="h-3 w-3 animate-spin" />}
                    Save
                </Button>
            </div>
        </div>
    );
}

export default ItemsEditor;