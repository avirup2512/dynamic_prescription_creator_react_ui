import { ChevronDownIcon, Plus, Save, Trash2 } from "lucide-react";
import { memo, useCallback, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

import { initialDropdowns } from "./input-tab-mock-data";
import { InputPreviewPanel, PreviewField } from "./InputPreviewPanel";
import OptionList from "./OptionList";
import SelectableList from "./SelectableList";
import ValidationPanel from "./ValidationPanel";
import type { DropdownItem, DropdownOption, SelectableListItem } from "./input-tab-types";

const newOption = (): DropdownOption => ({
  id: `option-${Date.now()}`,
  label: "",
  value: "",
});

const DropdownEditor = memo(() => {
  const [items, setItems] = useState<DropdownItem[]>(initialDropdowns);
  const [selectedId, setSelectedId] = useState(initialDropdowns[0].id);
  const [markFirstDefault, setMarkFirstDefault] = useState(true);
  const [search, setSearch] = useState("");
  const selected = items.find((item) => item.id === selectedId) ?? items[0];

  const filteredItems = useMemo(
    () => items.filter((item) => item.label.toLowerCase().includes(search.toLowerCase())),
    [items, search],
  );

  const listItems = useMemo<SelectableListItem[]>(
    () =>
      filteredItems.map((item) => ({
        id: item.id,
        title: item.label,
        meta: `${item.category} - ${item.options.length} options`,
        icon: ChevronDownIcon,
        chips: [item.options.map((option) => option.value).join(", ")],
      })),
    [filteredItems],
  );

  const updateSelected = useCallback((patch: Partial<DropdownItem>) => {
    setItems((current) => current.map((item) => (item.id === selectedId ? { ...item, ...patch } : item)));
  }, [selectedId]);

  const updateOption = useCallback((optionId: string, patch: Partial<DropdownOption>) => {
    setItems((current) =>
      current.map((item) =>
        item.id === selectedId
          ? {
              ...item,
              options: item.options.map((option) => (option.id === optionId ? { ...option, ...patch } : option)),
            }
          : item,
      ),
    );
  }, [selectedId]);

  const addOption = useCallback(() => {
    setItems((current) =>
      current.map((item) => (item.id === selectedId ? { ...item, options: [...item.options, newOption()] } : item)),
    );
  }, [selectedId]);

  const deleteOption = useCallback((optionId: string) => {
    setItems((current) =>
      current.map((item) =>
        item.id === selectedId ? { ...item, options: item.options.filter((option) => option.id !== optionId) } : item,
      ),
    );
  }, [selectedId]);

  const addDropdown = useCallback(() => {
    setItems((current) => {
      const next: DropdownItem = {
        id: `dropdown-${Date.now()}`,
        label: `New dropdown ${current.length + 1}`,
        helperText: "",
        category: "User-defined",
        options: [
          { id: `option-${Date.now()}-1`, label: "Option 1", value: "option_1" },
          { id: `option-${Date.now()}-2`, label: "Option 2", value: "option_2" },
        ],
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

  const defaultOption = selected.options.find((option) => option.id === selected.defaultOptionId) ?? selected.options[0];

  return (
    <div className="grid h-full min-h-0 grid-cols-[minmax(0,1fr)_360px] gap-3 overflow-hidden">
      <section className="min-h-0 overflow-y-auto rounded-lg border border-slate-200 bg-white p-3">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-[14px] font-bold text-slate-900">Configure dropdown</h3>
          <Button type="button" size="sm" onClick={addDropdown}>
            <Plus className="h-3.5 w-3.5" />
            Add Dropdown
          </Button>
        </div>
        <div className="grid gap-3">
          <label className="grid gap-1 text-[12px] font-semibold text-slate-700">
            Existing dropdown
            <select value={selected.id} onChange={(event) => setSelectedId(event.target.value)} className="h-9 rounded-md border border-slate-200 bg-white px-3 text-[13px] font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
              {items.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
            </select>
          </label>
          <label className="grid gap-1 text-[12px] font-semibold text-slate-700">
            Dropdown Label
            <Input value={selected.label} onChange={(event) => updateSelected({ label: event.target.value })} />
          </label>
          <label className="grid gap-1 text-[12px] font-semibold text-slate-700">
            Helper text
            <Input value={selected.helperText} onChange={(event) => updateSelected({ helperText: event.target.value })} placeholder="Shown beneath the field" />
          </label>
          <OptionList options={selected.options} onAdd={addOption} onChange={updateOption} onDelete={deleteOption} />
          <label className="flex items-center gap-2 border-t border-slate-100 pt-3 text-[12px] text-slate-700">
            <Switch checked={markFirstDefault} onCheckedChange={setMarkFirstDefault} />
            Mark first option as default
          </label>
          <div className="flex items-center justify-between">
            <Button type="button" variant="destructive" size="sm" onClick={deleteSelected}>
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </Button>
            <div className="flex gap-2">
              <Button type="button" variant="outline" size="sm">Select</Button>
              <Button type="button" size="sm"><Save className="h-3.5 w-3.5" />Save dropdown</Button>
            </div>
          </div>
        </div>
      </section>

      <div className="min-h-0 space-y-3 overflow-y-auto pr-1">
        <InputPreviewPanel title="Live preview">
          <PreviewField
            label={selected.label || "Dropdown label"}
            value={defaultOption?.label || "Select an option"}
            helper={selected.helperText || "Patient: Maria Chen, 42F"}
          />
        </InputPreviewPanel>
        <ValidationPanel
          items={[
            { id: "label", label: "Dropdown label valid", valid: selected.label.trim().length > 0 },
            { id: "options", label: "At least 2 options", valid: selected.options.length >= 2 },
            { id: "helper", label: "Add helper text (recommended)", valid: selected.helperText.trim().length > 0 },
          ]}
        />
        <SelectableList
          title="All dropdowns"
          countLabel={`${items.length} items`}
          items={listItems}
          selectedId={selected.id}
          onSelect={setSelectedId}
          search={search}
          onSearchChange={setSearch}
        />
      </div>
    </div>
  );
});

DropdownEditor.displayName = "DropdownEditor";

export default DropdownEditor;
