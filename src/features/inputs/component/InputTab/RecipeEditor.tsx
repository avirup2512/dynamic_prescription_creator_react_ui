import { ChefHat, Plus, Search } from "lucide-react";
import { memo, useCallback, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { recipeCatalog } from "./input-tab-mock-data";
import { InputPreviewPanel, TipPanel } from "./InputPreviewPanel";

const RecipeEditor = memo(() => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");
  const [selectedIds, setSelectedIds] = useState<string[]>(["diabetic-breakfast-bowl"]);

  const categories = useMemo(() => ["All categories", ...Array.from(new Set(recipeCatalog.map((recipe) => recipe.category)))], []);
  const filteredRecipes = useMemo(
    () =>
      recipeCatalog.filter((recipe) => {
        const matchesQuery = recipe.name.toLowerCase().includes(query.toLowerCase());
        const matchesCategory = category === "All categories" || recipe.category === category;
        return matchesQuery && matchesCategory;
      }),
    [category, query],
  );
  const selectedRecipes = useMemo(() => recipeCatalog.filter((recipe) => selectedIds.includes(recipe.id)), [selectedIds]);

  const toggleRecipe = useCallback((id: string) => {
    setSelectedIds((current) => current.includes(id) ? current.filter((itemId) => itemId !== id) : [...current, id]);
  }, []);

  return (
    <div className="grid h-full min-h-0 grid-cols-[minmax(0,1fr)_320px] gap-3 overflow-hidden">
      <section className="min-h-0 overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className="border-b border-slate-100 p-3">
          <div className="grid grid-cols-[minmax(0,1fr)_220px] gap-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" strokeWidth={2} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search recipes" className="h-9 w-full rounded-md border border-slate-200 pl-9 pr-3 text-[13px] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
            </div>
            <select value={category} onChange={(event) => setCategory(event.target.value)} className="h-9 rounded-md border border-slate-200 bg-white px-3 text-[13px] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
              {categories.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_110px_110px_58px] border-b border-slate-100 px-3 py-2 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
          <span>Recipe</span>
          <span>Ingredients</span>
          <span>Calories</span>
          <span>Select</span>
        </div>
        <div className="max-h-[calc(100%-98px)] overflow-y-auto">
          {filteredRecipes.map((recipe) => {
            const selected = selectedIds.includes(recipe.id);

            return (
              <button key={recipe.id} type="button" onClick={() => toggleRecipe(recipe.id)} className="grid w-full grid-cols-[minmax(0,1fr)_110px_110px_58px] items-center border-b border-slate-100 px-3 py-2 text-left hover:bg-slate-50 data-[selected=true]:bg-blue-50/60" data-selected={selected}>
                <span className="flex min-w-0 items-center gap-2">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-rose-50 text-rose-500"><ChefHat className="h-4 w-4" /></span>
                  <span className="min-w-0">
                    <span className="block truncate text-[12.5px] font-semibold text-slate-800">{recipe.name}</span>
                    <span className="text-[11px] text-slate-500">{recipe.category} - {recipe.tags.join(", ")}</span>
                  </span>
                </span>
                <span className="text-[12px] text-slate-600">{recipe.ingredientCount}</span>
                <span className="text-[12px] text-slate-600">{recipe.calories ?? "-"} kcal</span>
                <span className="flex justify-center"><Checkbox checked={selected} /></span>
              </button>
            );
          })}
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
          {(selectedRecipes[0] ? [selectedRecipes[0]] : filteredRecipes.slice(0, 1)).map((recipe) => (
            <div key={recipe.id}>
              <p className="text-[13px] font-semibold text-slate-900">{recipe.name}</p>
              <p className="mt-1 text-[12px] text-slate-500">{recipe.category} - {recipe.ingredientCount} ingredients - {recipe.calories ?? "-"} kcal</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {recipe.tags.map((tag) => <span key={tag} className="rounded border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] text-slate-500">{tag}</span>)}
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
