import { CheckSquare, Plus, Save, Trash2 } from "lucide-react";
import { memo, useCallback, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

import { initialCheckboxes } from "./input-tab-mock-data";
import { InputPreviewPanel, SuccessLine } from "./InputPreviewPanel";
import SelectableList from "./SelectableList";
import type { CheckboxItem, SelectableListItem } from "./input-tab-types";

const CheckboxEditor = memo(() => {
  const [items, setItems] = useState<CheckboxItem[]>(initialCheckboxes);
  const [selectedId, setSelectedId] = useState(initialCheckboxes[0].id);
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
    setItems((current) => current.map((item) => (item.id === selectedId ? { ...item, ...patch } : item)));
  }, [selectedId]);

  const addCheckbox = useCallback(() => {
    setItems((current) => {
      const next: CheckboxItem = {
        id: `checkbox-${Date.now()}`,
        label: `New Checkbox ${current.length + 1}`,
        checkedValue: "checked",
        defaultChecked: false,
      };
      setSelectedId(next.id);
      return [next, ...current];
    });
  }, []);

  const deleteSelected = useCallback(() => {
    setItems((current) => {
      const remaining = current.filter((item) => item.id !== selectedId);
      setSelectedId(remaining[0]?.id ?? "");
      return remaining;
    });
  }, [selectedId]);

  if (!selected) return null;

  return (
    <div className="grid h-full min-h-0 grid-cols-[minmax(0,1fr)_300px] gap-3 overflow-hidden">
      <section className="min-h-0 overflow-y-auto rounded-lg border border-slate-200 bg-white p-3">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-[14px] font-bold text-slate-900">Configure checkbox</h3>
          <Button type="button" size="sm" onClick={addCheckbox}>
            <Plus className="h-3.5 w-3.5" />
            Add Checkbox
          </Button>
        </div>
        <div className="grid gap-3">
          <label className="grid gap-1 text-[12px] font-semibold text-slate-700">
            Existing Checkbox
            <select value={selected.id} onChange={(event) => setSelectedId(event.target.value)} className="h-9 rounded-md border border-slate-200 bg-white px-3 text-[13px] font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
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
        <SelectableList title="All checkboxes" countLabel={`${items.length} items`} items={listItems} selectedId={selected.id} onSelect={setSelectedId} />
      </div>
    </div>
  );
});

CheckboxEditor.displayName = "CheckboxEditor";

export default CheckboxEditor;
