
import { useState } from "react";

import { toast } from "sonner";
import {
    Search,
    X,
    FolderOpen,
    Tag,
    Layers,
    ChevronRight,
} from "lucide-react";
import { Input } from "../../../../../components/ui/input";
import Skeleton from "../../../../../components/ui/skeleton";
import Combobox from "./Combobox";
import ItemsEditor from "./ItemsEditor";
import InputEntityTypeService from "@/features/inputEntityType/services/InputEntityTypeService";
import { cn } from "@/lib/utils";
import { INPUT_TYPE } from "@/constant/inputType.enum";

// ─── Types ─────────────────────────────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2, 10);
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
interface Item { id: string; name: string }
interface SubCategory { id: string; name: string; items: Item[] }
interface Category { id: string; name: string; subCategories: SubCategory[] }
function ItemManagement({
    categories,
    setCategories,
}: {
    categories: Category[];
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}) {
    const inputEntityService = InputEntityTypeService;
    const [catId, setCatId] = useState<string | null>(null);
    const [subId, setSubId] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [loadingSubs, setLoadingSubs] = useState(false);
    const [loadingItems, setLoadingItems] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [firstLevelItems, setFirstLevelItems] = useState([]);
    const [secondLevelItems, setSecondLevelItems] = useState([]);
    const [finalItems, setFinalItems] = useState([]);
    const [subSubCategoryItems, setSubSubCategoryItems] = useState([]);
    const cat = categories.find((c) => c.id === catId) ?? null;
    const sub = firstLevelItems.find((s) => s.id === subId) ?? null;
    console.log(sub)
    const selectCat = async (id: string) => {
        console.log(id)
        if (id === catId) return;
        try {
            if (id === "c1") {
                const foodCaegory = await inputEntityService.getFoodCategory();
                if (foodCaegory && foodCaegory.success) {
                    setFirstLevelItems(foodCaegory.data);
                }
            } else if (id === "c2") {
                const recipesTagCategory = await inputEntityService.getAllRecipesTagCategory();
                if (recipesTagCategory && recipesTagCategory.success) {
                    setFirstLevelItems(recipesTagCategory?.data)
                }
            } else if (id === "c5") {
                const customDropdown = await inputEntityService.getInputEntityTypes(INPUT_TYPE.INPUTTYPE_2);
                if (customDropdown && customDropdown.success) {
                    setFirstLevelItems(customDropdown.data);
                }
            }
            setCatId(id);
        } catch (error) {

        }

        // setSearch(""); setSubId(null);
        // setLoadingSubs(true); setCatId(id);
        // await wait(350); setLoadingSubs(false);
    };

    const selectFirstLevelItem = async (id: string) => {
        if (id === subId) return;
        console.log(catId);
        try {
            setFinalItems([]);
            if (catId === "c1") {
                const foodListByCategory = await inputEntityService.getFoodByCategory(id);
                if (foodListByCategory && foodListByCategory.success) {
                    setSearch("");
                    setSecondLevelItems([]);
                    setFinalItems(foodListByCategory?.data);
                    setLoadingItems(true);
                    setSubId(id);
                    await wait(300); setLoadingItems(false);
                }
            } else if (catId === "c2") {
                const recipeTagsByCategory = await inputEntityService.getRecipeTagByCategoryId(id);
                if (recipeTagsByCategory && recipeTagsByCategory.success) {
                    setSearch("");
                    setSecondLevelItems(recipeTagsByCategory?.data);
                    // setFinalItems(recipeTagsByCategory?.data);
                    setLoadingItems(true);
                    setSubId(id);
                    await wait(300); setLoadingItems(false);
                }
            } else if (catId === "c5") {
                const customDropdownItem = await inputEntityService.getByAllDropdownInputInformationById(id);
                if (customDropdownItem && customDropdownItem.success) {
                    setSearch("");
                    setSecondLevelItems([]);
                    setFinalItems(customDropdownItem?.data?.dropdown_options ?? []);
                    setLoadingItems(true);
                    setSubId(id);
                    await wait(300); setLoadingItems(false);
                }
            }

        } catch (error) {

        }
    };
    const selectSecondLevelItem = async (id: string) => {
        // if (id === subId) return;
        try {
            setFinalItems([]);
            if (catId === "c2") {
                const recipeByTag = await inputEntityService.getRecipeByTag(id);
                if (recipeByTag && recipeByTag.success) {
                    setSearch("");
                    setFinalItems(recipeByTag?.data);
                    setLoadingItems(true);
                    // setSubId(id);
                    await wait(300); setLoadingItems(false);
                }
            }

        } catch (error) {

        }
    };

    const saveItems = async (items: Item[]) => {
        setSaving(true); await wait(500);
        setCategories((prev) => prev.map((c) =>
            c.id === catId ? { ...c, subCategories: c.subCategories.map((s) => s.id === subId ? { ...s, items } : s) } : c
        ));
        setSaving(false);
        toast.success("Saved.");
    };

    const deleteSub = async () => {
        setDeleting(true);
        const name = sub?.name ?? "";
        await wait(500);
        setCategories((prev) => prev.map((c) =>
            c.id === catId ? { ...c, subCategories: c.subCategories.filter((s) => s.id !== subId) } : c
        ));
        setSubId(null); setDeleting(false);
        toast.success(`"${name}" deleted.`);
    };

    return (
        <div className="flex flex-col gap-3">
            {/* Search */}
            <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                <Input
                    placeholder="Search items..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-8 pl-8 pr-8 text-xs"
                    aria-label="Search items"
                />
                {search && (
                    <button
                        type="button"
                        onClick={() => setSearch("")}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Clear"
                    >
                        <X className="h-3 w-3" />
                    </button>
                )}
            </div>

            {/* Category + Subcategory selectors */}
            <div className="grid grid-cols-1 gap-2">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Category</span>
                    <Combobox
                        options={categories.map((c) => ({ id: c.id, name: c.name }))}
                        selected={catId}
                        onSelect={selectCat}
                        placeholder="Select category"
                        searchPlaceholder="Search..."
                        emptyLabel="No categories"
                        icon={Tag}
                        getBadge={(id) => {
                            const c = categories.find((x) => x.id === id);
                            return c ? null : null;
                        }}
                    />
                </div>
                {/* <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Subcategory</span>
                    {loadingSubs ? (
                        <Skeleton className="h-8 w-full rounded-md" />
                    ) : (
                        <Combobox
                            options={subCategories.map((c: any) => ({ id: c.id, name: c.name })) ?? []}
                            selected={subId}
                            onSelect={selectSub}
                            placeholder={cat ? "Select subcategory" : "—"}
                            searchPlaceholder="Search..."
                            emptyLabel="No subcategories"
                            icon={Layers}
                            disabled={!cat}
                            getBadge={(id) => {
                                return `${subCategories.length}`
                            }}
                        />
                    )}
                </div> */}
            </div>

            {/* Breadcrumb */}
            {cat && (
                <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Tag className="h-2.5 w-2.5" />
                    <span className="font-medium text-foreground">{cat.name}</span>
                    {sub && <><ChevronRight className="h-2.5 w-2.5" /><span className="font-medium text-foreground">{sub.name}</span></>}
                </div>
            )}

            {/* Divider */}
            <div className="h-px bg-border -mx-1" />
            {
                loadingItems ? (
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-36 w-full rounded-lg" />
                    </div>
                ) :
                    cat ? (
                        <div className="flex flex-col items-center justify-center py-6 text-center">
                            {/* <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted mb-2">
                                <Layers className="h-4 w-4 text-muted-foreground/50" />
                            </div> */}
                            <p className="text-xs font-medium text-foreground mb-0.5">Pick a subcategory</p>
                            <p className="text-[11px] text-muted-foreground mb-3">
                                {cat.name} has {firstLevelItems.length} subcategory{firstLevelItems.length !== 1 ? "ies" : "y"}
                            </p>
                            <div className="flex flex-wrap justify-center gap-1.5">
                                {firstLevelItems.map((s: any) => (
                                    <button
                                        key={s.id}
                                        type="button"
                                        onClick={() => selectFirstLevelItem(s.id)}
                                        className={cn(
                                            s.active && "active",
                                            "inline-flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-0.5 text-[11px] font-medium text-foreground hover:bg-accent transition-colors"
                                        )}
                                    >
                                        {s.name}
                                        {/* <span className="text-muted-foreground">·{s.items.length}</span> */}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-6 text-center">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted mb-2">
                                <FolderOpen className="h-4 w-4 text-muted-foreground/50" />
                            </div>
                            <p className="text-xs font-medium text-foreground mb-0.5">No category selected</p>
                            <p className="text-[11px] text-muted-foreground">Choose a category above to get started.</p>
                        </div>
                    )
            }
            {
                loadingItems ? (
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-36 w-full rounded-lg" />
                    </div>
                ) :
                    cat && secondLevelItems.length ? (
                        <div className="flex flex-col items-center justify-center py-6 text-center">
                            {/* <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted mb-2">
                                <Layers className="h-4 w-4 text-muted-foreground/50" />
                            </div> */}
                            <p className="text-xs font-medium text-foreground mb-0.5">Pick a subcategory</p>
                            <p className="text-[11px] text-muted-foreground mb-3">
                                {cat.name} has {secondLevelItems.length} subcategor{secondLevelItems.length !== 1 ? "ies" : "y"}
                            </p>
                            <div className="flex flex-wrap justify-center gap-1.5">
                                {secondLevelItems.map((s: any) => (
                                    <button
                                        key={s.id}
                                        type="button"
                                        onClick={() => selectSecondLevelItem(s.id)}
                                        className={cn(
                                            s.active && "active",
                                            "inline-flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-0.5 text-[11px] font-medium text-foreground hover:bg-accent transition-colors"
                                        )}
                                    >
                                        {s.name}
                                        {/* <span className="text-muted-foreground">·{s.items.length}</span> */}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        ''
                    )
            }
            {/* Editor area */}
            {loadingItems ? (
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-36 w-full rounded-lg" />
                </div>
            ) : finalItems.length ? (
                <ItemsEditor
                    key={sub?.id}
                    subCategory={sub}
                    subCategories={finalItems ?? []}
                    categoryName={cat?.name ?? ""}
                    searchQuery={search}
                    onSave={saveItems}
                    onDeleteSub={deleteSub}
                    saving={saving}
                    deleting={deleting}
                />
            ) : ''}
        </div>
    );
}

export default ItemManagement