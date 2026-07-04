import { ChevronDownIcon, Plus, Save, Trash2 } from "lucide-react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { INPUT_TYPE } from "@/constant/inputType.enum";
import InputEntityTypeService from "@/features/inputEntityType/services/InputEntityTypeService";
import type { InputEntityType } from "@/features/inputEntityType/type/InputEntityType";
import type { AppDispatch, RootState } from "@/store";
import { isValidUUID } from "../../utils/utilsService";
import { InputPreviewPanel, PreviewField, SuccessLine } from "./InputPreviewPanel";
import OptionList from "./OptionList";
import SelectableList from "./SelectableList";
import ValidationPanel from "./ValidationPanel";
import type { DropdownItem, DropdownOption } from "./input-tab-types";
import {
  addDropdownOption,
  clearRemovedOptionIds,
  createDropdown,
  deleteDropdown,
  deleteDropdownOption,
  setAllDropdowns,
  setSearchItems,
  setSelectedDropdown,
  setSelectedDropdownId,
  updateDropdown,
  updateDropdownOption,
} from "@/features/inputs/store/DropdownSlice";
import { useParams } from "react-router-dom";

const newOption = (): DropdownOption => ({
  id: `new-option-${Date.now()}`,
  label: "",
  value: "",
});

const DropdownEditor = memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  const inputEntityservice = InputEntityTypeService;
  const { rowIndex, columnIndex, inputGroupIndex, sectionType, sectionId, inputId } = useParams();

  const { selectedDropdownId, selectedDropdown, allDropdowns, searchItems, removedOptionIds } = useSelector(
    (state: RootState) => state.dropdown,
  );
  const [search, setSearch] = useState("");
  const [markFirstDefault, setMarkFirstDefault] = useState(true);
  const [disableButton, setDisableButton] = useState(true);
  const getAllExistingDropdowns = useCallback(async () => {
    try {
      const fetchedDropdownList = await inputEntityservice.getInputEntityTypes(INPUT_TYPE.INPUTTYPE_2);
      if (fetchedDropdownList?.success) {
        const dropdowns = fetchedDropdownList.data ?? [];
        dispatch(setAllDropdowns(dropdowns));

        if (dropdowns[0]?.id && !inputId) {
          const fetchedDefaultSelectionValue = await inputEntityservice.getByAllDropdownInputInformationById(dropdowns[0].id);
          if (fetchedDefaultSelectionValue?.success) {
            dispatch(setSelectedDropdown(fetchedDefaultSelectionValue.data));
            dispatch(clearRemovedOptionIds());
          }
        } else if (!inputId) {
          dispatch(setSelectedDropdown(null));
        }
      }
    } catch {
      // keep the current UI state unchanged if the request fails
    }
  }, [dispatch, inputEntityservice]);

  useEffect(() => {
    void getAllExistingDropdowns();
    if (inputId) {
      selectDropdown(inputId)
    }
  }, [inputId]);
  useEffect(() => {
    return () => {
      dispatch(setSelectedDropdown({} as any))
    }
  }, [])
  const listItems = useMemo<InputEntityType[]>(
    () =>
      searchItems.map((item) => ({
        id: item.id,
        name: item.name || item.label || "Dropdown",
        icon: ChevronDownIcon,
      })),
    [searchItems],
  );

  const updateSelected = useCallback(
    (patch: Partial<DropdownItem>) => {
      if (!selectedDropdownId) {
        return;
      }

      dispatch(updateDropdown({ id: selectedDropdownId, patch }));
      setDisableButton(false);
    },
    [dispatch, selectedDropdownId],
  );

  const updateOption = useCallback(
    (optionId: string, patch: Partial<DropdownOption>) => {
      dispatch(updateDropdownOption({ optionId, patch }));
      setDisableButton(false);
    },
    [dispatch],
  );

  const addOption = useCallback(() => {
    dispatch(addDropdownOption(newOption()));
    setDisableButton(false);
  }, [dispatch]);

  const deleteOption = useCallback(
    (optionId: string) => {
      dispatch(deleteDropdownOption(optionId));
      setDisableButton(false);
    },
    [dispatch],
  );

  const addDropdown = useCallback(() => {
    const next: DropdownItem = {
      id: `dropdown-${Date.now()}`,
      name: `New dropdown ${allDropdowns.length + 1}`,
      helperText: "",
      category: "User-defined",
      dropdown_options: [
        { id: `option-${Date.now()}-1`, label: "Option 1", value: "option_1" },
        { id: `option-${Date.now()}-2`, label: "Option 2", value: "option_2" },
      ],
    };

    dispatch(createDropdown(next));
    setMarkFirstDefault(true);
  }, [allDropdowns.length, dispatch]);

  const deleteSelected = useCallback(() => {
    if (!selectedDropdownId) {
      return;
    }

    dispatch(deleteDropdown(selectedDropdownId));
    setMarkFirstDefault(true);
  }, [dispatch, selectedDropdownId]);

  const selectDropdown = useCallback(
    async (id: string) => {
      try {
        dispatch(setSelectedDropdownId(id));
        const fetchedDefaultSelectionValue = await inputEntityservice.getByAllDropdownInputInformationById(id);
        if (fetchedDefaultSelectionValue?.success) {
          dispatch(setSelectedDropdown(fetchedDefaultSelectionValue.data));
          dispatch(clearRemovedOptionIds());
          setDisableButton(true);
        }
      } catch {
        // keep the current selection unchanged if the request fails
      }
    },
    [dispatch, inputEntityservice],
  );

  const onSearchChange = useCallback(
    (value: string) => {
      setSearch(value);
      const filteredItems = allDropdowns.filter((item) =>
        (item.name || item.label || "")
          .toLowerCase()
          .includes(value.toLowerCase()),
      );
      dispatch(setSearchItems(filteredItems));
    },
    [allDropdowns, dispatch],
  );

  const saveDropdown = useCallback(async () => {
    if (!selectedDropdown) {
      return;
    }

    const existingOptions = (selectedDropdown.dropdown_options ?? []).filter((option) => !option.id.startsWith("new-"));
    const newAddedOptions = (selectedDropdown.dropdown_options ?? []).filter((option) => option.id.startsWith("new-"));
    const payload = {
      name: selectedDropdown.name || selectedDropdown.label || "",
      helperText: selectedDropdown.helperText || "",
      type: INPUT_TYPE.INPUTTYPE_2,
      value: existingOptions,
      existingOptions,
      newAddedOptions,
      removedOptionIds,
    };

    try {
      if (selectedDropdown.id && isValidUUID(selectedDropdown.id)) {
        const updateResponse = await inputEntityservice.updateDropdownInputEntity(selectedDropdown.id, payload);
        if (updateResponse?.success) {
          void getAllExistingDropdowns();
          setDisableButton(true);
        }
      } else {
        const createResponse = await inputEntityservice.createInputEntityType(payload);
        if (createResponse?.success) {
          void getAllExistingDropdowns();
          setDisableButton(true);
        }
      }
    } catch {
      // keep the UI state unchanged if the request fails
    }
  }, [dispatch, getAllExistingDropdowns, inputEntityservice, removedOptionIds, selectedDropdown]);

  if (!selectedDropdown) {
    return null;
  }

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
            <select
              value={selectedDropdownId}
              onChange={(event) => {
                void selectDropdown(event.target.value);
              }}
              className="h-9 rounded-md border border-slate-200 bg-white px-3 text-[13px] font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {allDropdowns.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name || item.label || "Dropdown"}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-1 text-[12px] font-semibold text-slate-700">
            Dropdown Label
            <Input
              value={selectedDropdown.name || selectedDropdown.label || ""}
              onChange={(event) => updateSelected({ name: event.target.value })}
            />
          </label>
          <label className="grid gap-1 text-[12px] font-semibold text-slate-700">
            Helper text
            <Input
              value={selectedDropdown.helperText || ""}
              onChange={(event) => updateSelected({ helperText: event.target.value })}
              placeholder="Shown beneath the field"
            />
          </label>
          <OptionList
            options={selectedDropdown.dropdown_options ?? []}
            onAdd={addOption}
            onChange={updateOption}
            onDelete={deleteOption}
          />
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
              {/* <Button type="button" variant="outline" size="sm">
                Select
              </Button> */}
              <Button disabled={disableButton} type="button" size="sm" onClick={() => { void saveDropdown(); }}>
                <Save className="h-3.5 w-3.5" />
                Save dropdown
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="min-h-0 space-y-3 overflow-y-auto pr-1">
        <InputPreviewPanel
          title="Live preview"
        // footer={<SuccessLine label={selectedDropdown.name ? "Input label valid" : "Add an input label"} addInput={() => { }} />}
        >
          <PreviewField
            label={selectedDropdown.name || selectedDropdown.label || "Dropdown label"}
            value={selectedDropdown.name || selectedDropdown.label || "Select an option"}
            helper={selectedDropdown.helperText || "Patient: Maria Chen, 42F"}
          />
        </InputPreviewPanel>
        <ValidationPanel
          items={[
            { id: "label", label: "Dropdown label valid", valid: (selectedDropdown.name || selectedDropdown.label || "").trim().length > 0 },
            { id: "options", label: "At least 2 options", valid: (selectedDropdown.dropdown_options ?? []).length >= 2 },
            { id: "helper", label: "Add helper text (recommended)", valid: (selectedDropdown.helperText || "").trim().length > 0 },
          ]}
        />
        <SelectableList
          title="All dropdowns"
          countLabel={`${searchItems.length} items`}
          items={listItems}
          selectedId={selectedDropdown.id}
          onSelect={(id) => {
            void selectDropdown(id);
          }}
          search={search}
          onSearchChange={onSearchChange}
        />
      </div>
    </div>
  );
});

DropdownEditor.displayName = "DropdownEditor";

export default DropdownEditor;
