import { Apple, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import InputEntityTypeService from "@/features/inputEntityType/services/InputEntityTypeService";
import { setCategories, setFetchedFood, setMultiSelect, setQuery, setSelectedCategoryId, toggleFoodSelection } from "@/features/inputs/store/FoodSlice";
import type { AppDispatch, RootState } from "@/store";

import { foodCatalog } from "./input-tab-mock-data";
import { InputPreviewPanel, TipPanel } from "./InputPreviewPanel";
import { useDebounce } from "../../utils/utilsService";
import { useNavigate, useParams } from "react-router-dom";
const FoodEditor = memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  const { inputId, inputCategoryId } = useParams();
  const { id, inputType, rowIndex, columnIndex, inputGroupIndex, sectionType, sectionId, tabType } = useParams();

  const navigate = useNavigate();
  const { query, selectedCategoryId, categories, fetchedFood, selectedIds, multiSelect } = useSelector((state: RootState) => state.food);
  const debouncedQuery = useDebounce(query, 500);
  const listContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const loadFoodCategories = async () => {
      try {
        const response = await InputEntityTypeService.getFoodCategory();
        if (response?.success) {
          const payload = Array.isArray(response.data) ? response.data : response.data?.categories ?? [];
          const nextCategories = payload.map((category: any) => ({
            id: category?.id ?? category?.categoryId ?? category?.name,
            name: category?.name ?? category?.label ?? "Category",
          }));

          dispatch(setCategories(nextCategories));

          if ((!selectedCategoryId || selectedCategoryId === "All categories") && nextCategories[0] && (!inputId || !inputCategoryId)) {
            dispatch(setSelectedCategoryId(nextCategories[0]?.id));
          } else if (inputCategoryId) {
            console.log(inputCategoryId)
            // dispatch(setSelectedCategoryId(inputCategoryId));
          }
        }
      } catch (error) {
        console.error("Failed to load food categories", error);
      }
    };
    if (inputId && inputCategoryId) {
      selectFoodCategory(inputCategoryId);
    }
    void loadFoodCategories();
  }, [inputId, inputCategoryId, selectedCategoryId]);

  useEffect(() => {
    if (!selectedCategoryId || selectedCategoryId === "All categories") {
      return;
    }

    const loadFoodsByCategory = async () => {
      try {
        const response = await InputEntityTypeService.getFoodByCategory(selectedCategoryId);
        if (response?.success) {
          const payload = Array.isArray(response.data) ? response.data?.[0]?.json_agg : response.data?.[0]?.json_agg ?? response.data?.items ?? [];
          const nextFoods = payload.map((food: any) => ({
            id: food?.id ?? food?.foodId ?? food?.name,
            name: food?.name ?? food?.label ?? "Food",
            category: food?.category && typeof food.category === "object"
              ? {
                id: food.category?.id ?? food.category?.categoryId,
                name: food.category?.name ?? food.category?.label ?? "Category",
              }
              : {
                id: food?.categoryId ?? food?.category?.id,
                name: food?.category?.name ?? food?.category ?? "Category",
              },
            serving: food?.serving ?? food?.servingSize ?? food?.unit ?? "",
            nutrients: {
              energy: food?.nutrients?.energy ?? food?.calories ?? food?.energy,
              carbohydrate: food?.nutrients?.carbohydrate ?? food?.carbs ?? food?.carbohydrate,
              protein: food?.nutrients?.protein ?? food?.protein,
              fiber: food?.nutrients?.fiber ?? food?.fiber,
            },
            note: food?.note ?? food?.description,
          }));

          dispatch(setFetchedFood(nextFoods));
          if (inputId && inputCategoryId) {
            toggleFood(inputId);
          }
        }
      } catch (error) {
        console.error("Failed to load foods by category", error);
      }
    };

    void loadFoodsByCategory();
  }, [inputId, inputCategoryId, selectedCategoryId]);

  const normalizedQuery = (debouncedQuery ?? "").trim().toLowerCase();
  const filteredFoods = useMemo(() => {
    return (fetchedFood ?? []).filter((food: any) => {
      const categoryMatches = !selectedCategoryId || selectedCategoryId === "All categories" || food?.category?.id === selectedCategoryId || food?.category?.name === selectedCategoryId;
      if (!categoryMatches) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const searchTerms = normalizedQuery.split(/\s+/).filter(Boolean);
      const searchableText = [food?.name, food?.category?.name, food?.serving, food?.note]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchTerms.every((term) => searchableText.includes(term));
    });
  }, [fetchedFood, normalizedQuery, selectedCategoryId]);

  const selectedFoods = useMemo(() => fetchedFood.filter((food) => selectedIds.includes(food.id)), [fetchedFood, selectedIds]);
  const focusedFood = selectedFoods[0] ?? filteredFoods[0] ?? fetchedFood?.[0] ?? foodCatalog[0];

  useEffect(() => {
    const container = listContainerRef.current;
    if (!container) {
      return;
    }

    const selectedItem = container.querySelector<HTMLElement>('[data-selected="true"]');
    selectedItem?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [selectedIds]);

  const toggleFood = useCallback((id: string) => {
    dispatch(toggleFoodSelection(id));
  }, [dispatch]);

  const selectFoodCategory = useCallback((categoryId: string) => {
    navigate(`../${categoryId}`, { relative: "path" })
    dispatch(setSelectedCategoryId(categoryId));
  }, [dispatch]);
  return (
    <div className="grid h-full min-h-0 grid-cols-[minmax(0,1fr)_320px] gap-3 overflow-hidden">
      <section className="min-h-0 overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className="border-b border-slate-100 p-3">
          <div className="grid grid-cols-[minmax(0,1fr)_220px] gap-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" strokeWidth={2} />
              <input value={query} onChange={(event) => dispatch(setQuery(event.target.value))} placeholder="Search foods" className="h-9 w-full rounded-md border-2 border-blue-500 pl-9 pr-3 text-[13px] outline-none ring-2 ring-blue-100" />
            </div>
            <select value={selectedCategoryId} onChange={(event) => navigate("/dashboard/input/create/" + id + "/" + rowIndex + "/" + columnIndex + "/" + inputGroupIndex + "/" + sectionType + "/" + sectionId + "/" + tabType + "/INPUT_TYPE_3/" + null + "/" + event.target.value)} className="h-9 rounded-md border border-slate-200 bg-white px-3 text-[13px] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
              {categories.map((item) => <option key={item?.id} value={item?.id}>{item?.name}</option>)}
            </select>
          </div>
          {/* <div className="mt-3 flex flex-wrap gap-1.5">
            {categories.map((pill: any) => (
              <button key={pill.id} type="button" onClick={() => setCategory(pill === "All" ? "All categories" : pill)} className="rounded-md border border-slate-200 px-2.5 py-1 text-[11px] text-slate-600 hover:bg-slate-50 data-[active=true]:border-blue-600 data-[active=true]:bg-blue-600 data-[active=true]:text-white" data-active={category === pill || (pill === "All" && category === "All categories")}>
                {pill.name}
              </button>
            ))}
          </div> */}
        </div>

        <div className="grid grid-cols-[40px_minmax(0,1fr)_280px_58px] border-b border-slate-100 px-3 py-2 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
          <span />
          <span>Food</span>
          <span>Nutrition (per 100g)</span>
          <span>Select</span>
        </div>
        <div ref={listContainerRef} className="max-h-[calc(100%-146px)] overflow-y-auto">
          {filteredFoods.map((food: any, index: number) => {
            const selected = selectedIds.includes(food.id);

            return (
              <button key={food.id} type="button" onClick={() => toggleFood(food.id)} className="grid w-full grid-cols-[40px_minmax(0,1fr)_280px_58px] items-center border-b border-slate-100 px-3 py-2 text-left hover:bg-slate-50 data-[selected=true]:bg-blue-50/60" data-selected={selected}>
                <span className="text-[12px] text-slate-500">{index + 1}</span>
                <span className="flex min-w-0 items-center gap-2">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-amber-50 text-amber-600"><Apple className="h-4 w-4" /></span>
                  <span className="min-w-0">
                    <span className="block truncate text-[12.5px] font-semibold text-slate-800">{food.name}</span>
                    <span className="text-[11px] text-slate-500"><span className="rounded bg-amber-50 px-1 text-amber-700">{food?.category?.name}</span></span>
                  </span>
                </span>
                <span className="flex gap-2 text-[11px] text-slate-600">
                  <span className="rounded border border-slate-200 px-2 py-1">{food?.nutrients?.energy ?? "-"} kcal</span>
                  <span className="rounded border border-slate-200 px-2 py-1">Carbs. {food?.nutrients?.carbohydrate ?? "-"}</span>
                  <span className="rounded border border-slate-200 px-2 py-1">Pro. {food?.nutrients?.protein ?? "-"}</span>
                </span>
                <span className="flex justify-center"><Checkbox checked={selected} /></span>
              </button>
            );
          })}
        </div>
        <div className="flex items-center justify-between px-3 py-2 text-[12px] text-slate-500">
          <span>Showing 1-{filteredFoods.length} of 1,284</span>
          <span className="flex gap-1">
            <Button type="button" variant="outline" size="icon-sm"><ChevronLeft className="h-3.5 w-3.5" /></Button>
            <Button type="button" variant="outline" size="icon-sm"><ChevronRight className="h-3.5 w-3.5" /></Button>
          </span>
        </div>
      </section>
      <div className="min-h-0 space-y-3 overflow-y-auto pr-1">
        <section className="rounded-lg border border-slate-200 bg-white p-3">
          <h3 className="mb-3 text-[14px] font-bold text-slate-900">Selection ({selectedFoods.length})</h3>
          <div className="space-y-2 border-b border-slate-100 pb-3">
            {selectedFoods.map((food: any) => (
              <div key={food.id} className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-amber-50 text-amber-600"><Apple className="h-4 w-4" /></span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[12px] font-semibold text-slate-800">{food.name}</span>
                  <span className="text-[11px] text-slate-400">{food?.category?.name} - {food.serving}</span>
                </span>
                <button type="button" onClick={() => toggleFood(food.id)} className="text-[11px] font-medium text-blue-600">Remove</button>
              </div>
            ))}
          </div>
          <label className="mt-3 flex items-center justify-between text-[12px] text-slate-700">
            Allow clinician multi-select
            <Switch checked={multiSelect} onCheckedChange={(checked) => dispatch(setMultiSelect(checked))} />
          </label>
        </section>
        <InputPreviewPanel title="Nutrition snapshot">
          <p className="mb-3 text-[12px] text-slate-500">{focusedFood.name}</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              ["Calories", `${focusedFood?.nutrients?.energy ?? "-"} kcal`],
              ["Carbs", focusedFood?.nutrients?.carbohydrate ?? "-"],
              ["Protein", focusedFood?.nutrients?.protein ?? "-"],
              ["Fiber", focusedFood?.nutrients?.fiber ?? "-"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-md border border-slate-200 p-3 text-center">
                <p className="text-[11px] text-slate-500">{label}</p>
                <p className="mt-1 text-[20px] font-semibold text-slate-900">{value}</p>
              </div>
            ))}
          </div>
          {focusedFood.note ? <p className="mt-3 text-[12px] text-amber-600">{focusedFood.note}</p> : null}
        </InputPreviewPanel>
        <TipPanel>Foods are managed by Klinik admins. Request additions from Catalog Settings.</TipPanel>
      </div>
    </div>
  );
});

FoodEditor.displayName = "FoodEditor";

export default FoodEditor;
