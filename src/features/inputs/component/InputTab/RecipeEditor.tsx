import { ChefHat, Plus, Search } from "lucide-react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import InputEntityTypeService from "@/features/inputEntityType/services/InputEntityTypeService";
import { setCategories, setFetchedRecipes, setQuery, setSelectedCategoryId, toggleRecipeSelection } from "@/features/inputs/store/RecipeSlice";
import type { AppDispatch, RootState } from "@/store";

import { recipeCatalog } from "./input-tab-mock-data";
import { InputPreviewPanel, TipPanel } from "./InputPreviewPanel";
import GroupHeading from "../GroupHeading";
import { useParams } from "react-router-dom";

const RecipeEditor = memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  const { inputId, inputCategoryId } = useParams();

  const { query, selectedCategoryId, categories, fetchedRecipes, selectedIds } = useSelector((state: RootState) => state.recipe);
  const [searchText, setSearchText] = useState(query);
  const listContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadRecipeCategories = async () => {
      try {
        const response = await InputEntityTypeService.getAllRecipesTagCategory();
        if (response?.success) {
          const payload = Array.isArray(response.data) ? response.data : response.data?.tags ?? [];
          const nextCategories = payload.map((category: any) => ({
            id: category?.id ?? category?.categoryId ?? category?.name,
            name: category?.name ?? category?.label ?? "Category",
          }));

          dispatch(setCategories(nextCategories));

          if ((!selectedCategoryId || selectedCategoryId === "All categories") && nextCategories[0] && (!inputId || !inputCategoryId)) {
            dispatch(setSelectedCategoryId(nextCategories[0].id));
          } else if (inputCategoryId) {
            dispatch(setSelectedCategoryId(inputCategoryId));
          }
        }
      } catch (error) {
        console.error("Failed to load recipe categories", error);
      }
    };

    void loadRecipeCategories();
  }, [inputId, inputCategoryId]);

  useEffect(() => {
    if (!selectedCategoryId || selectedCategoryId === "All categories") {
      return;
    }

    const loadRecipeTags = async () => {
      try {
        const response = await InputEntityTypeService.getRecipeTagByCategoryId(selectedCategoryId);
        if (response?.success) {
          const payload = Array.isArray(response.data) ? response.data[0]?.result?.tags : response.data?.tags ?? [];
          const nextTags = payload.map((tag: any) => ({
            name: tag?.name ?? tag?.label ?? "Recipes",
            recipes: Array.isArray(tag?.recipes) ? tag.recipes : [],
          }));

          dispatch(setFetchedRecipes({ tags: nextTags }));
          if (inputId && inputCategoryId) {
            toggleRecipe(inputId);
          }
        }
      } catch (error) {
        console.error("Failed to load recipe tags", error);
      }
    };

    void loadRecipeTags();
  }, [inputId, inputCategoryId, selectedCategoryId]);

  useEffect(() => {
    setSearchText(query);
  }, [query]);

  const normalizedQuery = (searchText ?? "").trim().toLowerCase();
  const flatRecipes = useMemo(() => {
    return (fetchedRecipes?.tags ?? []).flatMap((tagGroup: any) => (tagGroup?.recipes ?? []).map((recipe: any) => ({
      ...recipe,
      groupName: tagGroup?.name,
    })));
  }, [fetchedRecipes?.tags]);

  const visibleRecipes = useMemo(() => {
    if (!normalizedQuery) {
      return flatRecipes;
    }

    const searchTerms = normalizedQuery.split(/\s+/).filter(Boolean);
    return flatRecipes.filter((recipe: any) => {
      const searchableText = [
        recipe?.name,
        recipe?.groupName,
        recipe?.category,
        recipe?.ingredients?.map((ingredient: any) => ingredient?.name).filter(Boolean).join(" "),
        recipe?.tags?.join(" "),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchTerms.every((term) => searchableText.includes(term));
    });
  }, [flatRecipes, normalizedQuery]);

  const selectedIdSet = useMemo(() => new Set(selectedIds), [selectedIds]);
  const selectedRecipes = useMemo(() => {
    return (fetchedRecipes?.tags ?? []).flatMap((tag: any) => (tag?.recipes ?? []).filter((recipe: any) => selectedIdSet.has(recipe.id)));
  }, [fetchedRecipes?.tags, selectedIdSet]);

  useEffect(() => {
    const container = listContainerRef.current;
    if (!container) {
      return;
    }

    const selectedItem = container.querySelector<HTMLElement>('[data-selected="true"]');
    selectedItem?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [selectedIds, visibleRecipes.length]);

  const toggleRecipe = useCallback((recipe: any) => {
    dispatch(toggleRecipeSelection({ recipe }));
  }, [dispatch]);

  const selectRecipeTag = useCallback((tagId: string) => {
    dispatch(setSelectedCategoryId(tagId));
  }, [dispatch]);
  return (
    <div className="grid h-full min-h-0 grid-cols-[minmax(0,1fr)_320px] gap-3 overflow-hidden">
      <section className="min-h-0 overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className="border-b border-slate-100 p-3">
          <div className="grid grid-cols-[minmax(0,1fr)_220px] gap-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" strokeWidth={2} />
              <input value={searchText} onChange={(event) => {
                const nextValue = event.target.value;
                setSearchText(nextValue);
                dispatch(setQuery(nextValue));
              }} placeholder="Search recipes" className="h-9 w-full rounded-md border border-slate-200 pl-9 pr-3 text-[13px] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
            </div>
            <select value={selectedCategoryId} onChange={(event) => selectRecipeTag(event.target.value)} className="h-9 rounded-md border border-slate-200 bg-white px-3 text-[13px] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
              {categories.map((item) => <option key={item?.id} value={item?.id}>{item?.name}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_110px_110px_58px] border-b border-slate-100 px-3 py-2 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
          <span>Recipe</span>
          <span>Ingredients</span>
          <span>Calories</span>
          <span>Select</span>
        </div>
        <div ref={listContainerRef} className="max-h-[calc(100%-98px)] overflow-y-auto">
          {!visibleRecipes.length ? (
            <p className="px-3 py-4 text-center text-[12px] text-slate-500">No recipes found for this search.</p>
          ) : (
            (() => {
              const grouped = visibleRecipes.reduce((acc: any, recipe: any) => {
                const key = recipe.groupName ?? "Recipes";
                if (!acc[key]) {
                  acc[key] = [];
                }
                acc[key].push(recipe);
                return acc;
              }, {});

              return Object.entries(grouped).map(([groupName, recipes]: [string, any]) => (
                <div key={groupName}>
                  <GroupHeading heading={groupName} count={recipes.length} />
                  {recipes.map((recipe: any) => {
                    const selected = selectedIdSet.has(recipe.id);
                    return (
                      <button key={recipe.id} type="button" onClick={() => toggleRecipe(recipe.id)} className="grid w-full grid-cols-[minmax(0,1fr)_110px_110px_58px] items-center border-b border-slate-100 px-3 py-2 text-left hover:bg-slate-50 data-[selected=true]:bg-blue-50/60" data-selected={selected}>
                        <span className="flex min-w-0 items-center gap-2">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-rose-50 text-rose-500"><ChefHat className="h-4 w-4" /></span>
                          <span className="min-w-0">
                            <span className="block truncate text-[12.5px] font-semibold text-slate-800">{recipe.name}</span>
                            <span className="text-[11px] text-slate-500">{recipe.category}</span>
                          </span>
                        </span>
                        <span className="text-[12px] text-slate-600">{recipe?.ingredients?.length}</span>
                        <span className="text-[12px] text-slate-600">{recipe?.nutrients?.energy ?? "-"} kcal</span>
                        <span className="flex justify-center" onClick={(event) => event.stopPropagation()}>
                          <Checkbox checked={selected} onCheckedChange={() => toggleRecipe(recipe)} />
                        </span>
                      </button>
                    );
                  })}
                </div>
              ));
            })()
          )}
        </div>
      </section>
      <div className="min-h-0 space-y-3 overflow-y-auto pr-1">
        <section className="rounded-lg border border-slate-200 bg-white p-3">
          <h3 className="mb-3 text-[14px] font-bold text-slate-900">Selection ({selectedRecipes.length})</h3>
          <div className="space-y-2">
            {selectedRecipes.map((recipe) => (
              <div key={recipe.id} className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-rose-50 text-rose-500"><ChefHat className="h-4 w-4" /></span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[12px] font-semibold text-slate-800">{recipe.name}</span>
                  <span className="text-[11px] text-slate-400">{recipe.ingredientCount} ingredients - {recipe.calories ?? "-"} kcal</span>
                </span>
                <button type="button" onClick={() => toggleRecipe(recipe.id)} className="text-[11px] font-medium text-blue-600">Remove</button>
              </div>
            ))}
          </div>
          <Button type="button" className="mt-3 w-full" size="sm">
            <Plus className="h-3.5 w-3.5" />
            Add {selectedRecipes.length} recipes
          </Button>
        </section>
        <InputPreviewPanel title="Recipe snapshot">
          {(selectedRecipes[0] ? [selectedRecipes[0]] : selectedRecipes.slice(0, 1)).map((recipe) => (
            <div key={recipe.id}>
              <p className="text-[13px] font-semibold text-slate-900">{recipe.name}</p>
              <p className="mt-1 text-[12px] text-slate-500">{recipe.category} - {recipe.ingredientCount} ingredients - {recipe.calories ?? "-"} kcal</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {recipe?.tags?.map((tag) => <span key={tag} className="rounded border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] text-slate-500">{tag}</span>)}
              </div>
            </div>
          ))}
        </InputPreviewPanel>
        <TipPanel>Recipes are read-only catalog items. Select one or more configured recipes to insert them.</TipPanel>
      </div>
    </div>
  );
});

RecipeEditor.displayName = "RecipeEditor";

export default RecipeEditor;
