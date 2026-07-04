import { CheckSquare, Plus, Save, Trash2 } from "lucide-react";
import { memo, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import type { AppDispatch, RootState } from "@/store";

import { InputPreviewPanel, SuccessLine } from "./InputPreviewPanel";
import SelectableList from "./SelectableList";
import type { CheckboxItem, SelectableListItem } from "./input-tab-types";
import { addCheckbox, deleteCheckbox, setSelectedId, updateCheckbox } from "@/features/inputs/store/CheckboxSlice";

const CheckboxEditor = memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, selectedId } = useSelector((state: RootState) => state.checkbox);
  const selected = items.find((item) => item.id === selectedId) ?? items[0];

  const listItems = useMemo<SelectableListItem[]>(
    () =>
      items.map((item) => ({
        id: item.id,
        title: item.label,
        meta: `Checkbox - value: ${item.checkedValue}`,
        icon: CheckSquare,
      })),
    [items],
  );

  const updateSelected = useCallback((patch: Partial<CheckboxItem>) => {
    if (!selectedId) {
      return;
    }
    dispatch(updateCheckbox({ id: selectedId, patch }));
  }, [dispatch, selectedId]);

  const addCheckboxItem = useCallback(() => {
    dispatch(addCheckbox());
  }, [dispatch]);

  const deleteSelected = useCallback(() => {
    if (!selectedId) {
      return;
    }
    dispatch(deleteCheckbox(selectedId));
  }, [dispatch, selectedId]);

  if (!selected) return null;

  return (
    <div className="grid h-full min-h-0 grid-cols-[minmax(0,1fr)_300px] gap-3 overflow-hidden">
      <section className="min-h-0 overflow-y-auto rounded-lg border border-slate-200 bg-white p-3">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-[14px] font-bold text-slate-900">Configure checkbox</h3>
          <Button type="button" size="sm" onClick={addCheckboxItem}>
            <Plus className="h-3.5 w-3.5" />
            Add Checkbox
          </Button>
        </div>
        <div className="grid gap-3">
          <label className="grid gap-1 text-[12px] font-semibold text-slate-700">
            Existing Checkbox
            <select value={selected.id} onChange={(event) => dispatch(setSelectedId(event.target.value))} className="h-9 rounded-md border border-slate-200 bg-white px-3 text-[13px] font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
              {items.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
            </select>
          </label>
          <label className="grid gap-1 text-[12px] font-semibold text-slate-700">
            Checkbox Label
            <Input value={selected.label} onChange={(event) => updateSelected({ label: event.target.value })} />
          </label>
          <label className="grid gap-1 text-[12px] font-semibold text-slate-700">
            Checked Value
            <Input value={selected.checkedValue} onChange={(event) => updateSelected({ checkedValue: event.target.value })} />
          </label>
          <label className="flex items-center justify-between border-t border-slate-100 pt-3 text-[12px] text-slate-700">
            Checked by default
            <Checkbox checked={selected.defaultChecked} onCheckedChange={(checked) => updateSelected({ defaultChecked: checked === true })} />
          </label>
          <div className="flex items-center justify-between">
            <Button type="button" variant="destructive" size="sm" onClick={deleteSelected}>
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </Button>
            <div className="flex gap-2">
              <Button type="button" variant="outline" size="sm">Select</Button>
              <Button type="button" size="sm"><Save className="h-3.5 w-3.5" />Save checkbox</Button>
            </div>
          </div>
        </div>
      </section>
      <div className="min-h-0 space-y-3 overflow-y-auto pr-1">
        <InputPreviewPanel title="Live preview" footer={<SuccessLine label="Checkbox value valid" />}>
          <label className="flex items-center gap-2 rounded-md border border-slate-200 p-3">
            <Checkbox checked={selected.defaultChecked} onCheckedChange={(checked) => updateSelected({ defaultChecked: checked === true })} />
            <span>
              <span className="block text-[12px] font-semibold text-slate-800">{selected.label}</span>
              <span className="text-[11px] text-slate-400">Value: {selected.checkedValue}</span>
            </span>
          </label>
        </InputPreviewPanel>
        <SelectableList title="All checkboxes" countLabel={`${items.length} items`} items={listItems} selectedId={selected.id} onSelect={(value) => dispatch(setSelectedId(value))} />
      </div>
    </div>
  );
});

CheckboxEditor.displayName = "CheckboxEditor";

export default CheckboxEditor;
