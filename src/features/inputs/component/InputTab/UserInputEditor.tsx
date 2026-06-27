import { Plus, Save, Trash2, TypeIcon } from "lucide-react";
import { memo, useCallback, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { initialUserInputs } from "./input-tab-mock-data";
import { InputPreviewPanel, PreviewField, SuccessLine } from "./InputPreviewPanel";
import SelectableList from "./SelectableList";
import type { SelectableListItem, UserInputItem } from "./input-tab-types";

const createInput = (index: number): UserInputItem => ({
  id: `custom-input-${Date.now()}`,
  label: `New Input ${index}`,
  value: "",
  category: "User-defined",
});

const UserInputEditor = memo(() => {
  const [items, setItems] = useState<UserInputItem[]>(initialUserInputs);
  const [selectedId, setSelectedId] = useState(initialUserInputs[0].id);

  const selected = items.find((item) => item.id === selectedId) ?? items[0];
  const listItems = useMemo<SelectableListItem[]>(
    () =>
      items.map((item) => ({
        id: item.id,
        title: item.label,
        meta: `Input - ${item.category}`,
        icon: TypeIcon,
        chips: item.value ? [item.value] : undefined,
      })),
    [items],
  );

  const updateSelected = useCallback((patch: Partial<UserInputItem>) => {
    setItems((current) => current.map((item) => (item.id === selectedId ? { ...item, ...patch } : item)));
  }, [selectedId]);

  const addInput = useCallback(() => {
    setItems((current) => {
      const next = createInput(current.length + 1);
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

  if (!selected) {
    return (
      <div className="grid h-full min-h-0 grid-cols-[minmax(0,1fr)_280px] gap-3">
        <section className="rounded-lg border border-slate-200 bg-white p-3">
          <Button type="button" size="sm" onClick={addInput}>
            <Plus className="h-3.5 w-3.5" />
            Add New Input
          </Button>
        </section>
      </div>
    );
  }

  return (
    <div className="grid h-full min-h-0 grid-cols-[minmax(0,1fr)_300px] gap-3 overflow-hidden">
      <section className="min-h-0 overflow-y-auto rounded-lg border border-slate-200 bg-white p-3">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-[14px] font-bold text-slate-900">Configure input</h3>
          <Button type="button" size="sm" onClick={addInput}>
            <Plus className="h-3.5 w-3.5" />
            Add New Input
          </Button>
        </div>

        <div className="grid gap-3">
          <div>
            <label className="mb-1 block text-[12px] font-semibold text-slate-700">Existing Input</label>
            <select
              value={selected.id}
              onChange={(event) => setSelectedId(event.target.value)}
              className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[13px] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-[12px] font-semibold text-slate-700">Input Label</label>
            <Input value={selected.label} onChange={(event) => updateSelected({ label: event.target.value })} />
          </div>
          <div>
            <label className="mb-1 block text-[12px] font-semibold text-slate-700">Input Value</label>
            <Input value={selected.value} onChange={(event) => updateSelected({ value: event.target.value })} />
          </div>
          <div className="flex items-center justify-between border-t border-slate-100 pt-3">
            <Button type="button" variant="destructive" size="sm" onClick={deleteSelected}>
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </Button>
            <div className="flex gap-2">
              <Button type="button" variant="outline" size="sm">
                Select
              </Button>
              <Button type="button" size="sm">
                <Save className="h-3.5 w-3.5" />
                Save input
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="min-h-0 space-y-3 overflow-y-auto pr-1">
        <InputPreviewPanel
          title="Live preview"
          footer={<SuccessLine label={selected.label ? "Input label valid" : "Add an input label"} />}
        >
          <PreviewField label={selected.label || "Input label"} value={selected.value || "Value appears here"} />
        </InputPreviewPanel>
        <SelectableList
          title="All inputs"
          countLabel={`${items.length} items`}
          items={listItems}
          selectedId={selected.id}
          onSelect={setSelectedId}
        />
      </div>
    </div>
  );
});

UserInputEditor.displayName = "UserInputEditor";

export default UserInputEditor;
