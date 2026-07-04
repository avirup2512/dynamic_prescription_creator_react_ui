import { Plus, Save, ToggleRight, Trash2 } from "lucide-react";
import { memo, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import type { AppDispatch, RootState } from "@/store";

import { InputPreviewPanel, SuccessLine } from "./InputPreviewPanel";
import SelectableList from "./SelectableList";
import type { SelectableListItem, ToggleItem } from "./input-tab-types";
import { addToggle, deleteToggle, setSelectedId, updateToggle } from "@/features/inputs/store/ToggleSlice";

const ToggleEditor = memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, selectedId } = useSelector((state: RootState) => state.toggle);
  const selected = items.find((item) => item.id === selectedId) ?? items[0];

  const listItems = useMemo<SelectableListItem[]>(
    () =>
      items.map((item) => ({
        id: item.id,
        title: item.label,
        meta: `Toggle - OFF: ${item.offValue} / ON: ${item.onValue}`,
        icon: ToggleRight,
      })),
    [items],
  );

  const updateSelected = useCallback((patch: Partial<ToggleItem>) => {
    if (!selectedId) {
      return;
    }
    dispatch(updateToggle({ id: selectedId, patch }));
  }, [dispatch, selectedId]);

  const addToggleItem = useCallback(() => {
    dispatch(addToggle());
  }, [dispatch]);

  const deleteSelected = useCallback(() => {
    if (!selectedId) {
      return;
    }
    dispatch(deleteToggle(selectedId));
  }, [dispatch, selectedId]);

  if (!selected) return null;

  return (
    <div className="grid h-full min-h-0 grid-cols-[minmax(0,1fr)_300px] gap-3 overflow-hidden">
      <section className="min-h-0 overflow-y-auto rounded-lg border border-slate-200 bg-white p-3">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-[14px] font-bold text-slate-900">Configure toggle</h3>
          <Button type="button" size="sm" onClick={addToggleItem}>
            <Plus className="h-3.5 w-3.5" />
            Add Toggle
          </Button>
        </div>
        <div className="grid gap-3">
          <label className="grid gap-1 text-[12px] font-semibold text-slate-700">
            Existing Toggle
            <select value={selected.id} onChange={(event) => dispatch(setSelectedId(event.target.value))} className="h-9 rounded-md border border-slate-200 bg-white px-3 text-[13px] font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
              {items.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
            </select>
          </label>
          <label className="grid gap-1 text-[12px] font-semibold text-slate-700">
            Toggle Label
            <Input value={selected.label} onChange={(event) => updateSelected({ label: event.target.value })} />
          </label>
          <div className="grid grid-cols-2 gap-2">
            <label className="grid gap-1 text-[12px] font-semibold text-slate-700">
              OFF Value
              <Input value={selected.offValue} onChange={(event) => updateSelected({ offValue: event.target.value })} />
            </label>
            <label className="grid gap-1 text-[12px] font-semibold text-slate-700">
              ON Value
              <Input value={selected.onValue} onChange={(event) => updateSelected({ onValue: event.target.value })} />
            </label>
          </div>
          <label className="flex items-center justify-between border-t border-slate-100 pt-3 text-[12px] text-slate-700">
            Default to ON
            <Switch checked={selected.defaultOn} onCheckedChange={(checked) => updateSelected({ defaultOn: checked })} />
          </label>
          <div className="flex items-center justify-between">
            <Button type="button" variant="destructive" size="sm" onClick={deleteSelected}>
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </Button>
            <div className="flex gap-2">
              <Button type="button" variant="outline" size="sm">Select</Button>
              <Button type="button" size="sm"><Save className="h-3.5 w-3.5" />Save toggle</Button>
            </div>
          </div>
        </div>
      </section>
      <div className="min-h-0 space-y-3 overflow-y-auto pr-1">
        <InputPreviewPanel title="Live preview" footer={<SuccessLine label="Toggle values valid" />}>
          <div className="flex items-center justify-between rounded-md border border-slate-200 p-3">
            <span>
              <span className="block text-[12px] font-semibold text-slate-800">{selected.label}</span>
              <span className="text-[11px] text-slate-400">{selected.defaultOn ? selected.onValue : selected.offValue}</span>
            </span>
            <Switch checked={selected.defaultOn} onCheckedChange={(checked) => updateSelected({ defaultOn: checked })} />
          </div>
        </InputPreviewPanel>
        <SelectableList title="All toggles" countLabel={`${items.length} items`} items={listItems} selectedId={selected.id} onSelect={(value) => dispatch(setSelectedId(value))} />
      </div>
    </div>
  );
});

ToggleEditor.displayName = "ToggleEditor";

export default ToggleEditor;
