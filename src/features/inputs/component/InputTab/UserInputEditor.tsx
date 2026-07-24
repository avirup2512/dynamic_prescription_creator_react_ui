import { Plus, Save, Trash2, TypeIcon } from "lucide-react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { initialUserInputs } from "./input-tab-mock-data";
import { InputPreviewPanel, PreviewField, SuccessLine } from "./InputPreviewPanel";
import SelectableList from "./SelectableList";
import type { SelectableListItem, UserInputItem } from "./input-tab-types";
import InputEntityTypeService from "@/features/inputEntityType/services/InputEntityTypeService";
import { INPUT_TYPE } from "@/constant/inputType.enum";
import type { InputEntityType } from "@/features/inputEntityType/type/InputEntityType";
import { isValidUUID } from "../../utils/utilsService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AddInputTypeToTemplate } from "@/features/new-template/store/TemplateSlice";
import { addNewInput, deleteInput, setAllInputs, setSelectedInput, updateInput, setSearchItems, updateInputAfterSaveAPICall } from "../../store/InputSlice";

const createInput = (index: number): InputEntityType => ({
  id: `custom-input-${Date.now()}`,
  name: `New Input ${index}`,
  value: "",
  category: "User-defined",
});

const UserInputEditor = memo(() => {
  const inputEntityservice = InputEntityTypeService;
  const InputState = useSelector((state: any) => state.inputs);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { rowIndex, columnIndex, inputGroupIndex, sectionType, sectionId, inputId } = useParams();
  useEffect(() => {
    getAllExisitngInput();
    setDisableButton(true);
    if (inputId) {
      selectInput(inputId)
    }
  }, [inputId])
  const [selectedId, setSelectedId] = useState(initialUserInputs[0].id);
  const [selected, setSelected] = useState<any>({});
  const [searchText, setSearchText] = useState<string>('');
  const [disableButton, setDisableButton] = useState<boolean>(true);
  const getAllExisitngInput = async () => {
    try {
      const fetchedInputList = await inputEntityservice.getInputEntityTypes(INPUT_TYPE.INPUTTYPE_1);
      if (fetchedInputList && fetchedInputList.success) {
        dispatch(setAllInputs(fetchedInputList?.data));
        if (!inputId) {
          setSelectedId(fetchedInputList?.data[0].id);
          const getDefaultSelectionValue = await inputEntityservice.getInputEntityTypeById(fetchedInputList?.data[0].id, INPUT_TYPE.INPUTTYPE_1);
          if (getDefaultSelectionValue && getDefaultSelectionValue.success) {
            setSelected(getDefaultSelectionValue?.data?.[0]);
            dispatch(setSelectedInput(getDefaultSelectionValue?.data?.[0]));
          }
        }
      }
    } catch (error) {

    }
  }
  const updateSelected = useCallback((id: number, patch: Partial<InputEntityType>) => {
    setSelected((current: any) => ({ ...current, ...patch }));
    const payload = { selectedId: id, patch };
    dispatch(updateInput(payload as any));
    setDisableButton(false);
  }, [selectedId]);

  const addInput = useCallback(() => {
    const next = createInput(InputState?.allInputs.length + 1);
    setSelectedId(next.id);
    setSelected(next)
    dispatch(addNewInput(next as any));
    setDisableButton(false);
  }, []);

  const deleteSelected = useCallback(async () => {
    try {
      const deletedItem = await inputEntityservice.deleteInputEntityType(selectedId);
      if (deletedItem && deletedItem.success) {
        dispatch(deleteInput(selectedId as any));
        if (InputState?.allInputs?.length > 0) {
          selectInput(InputState?.allInputs[0]?.id)
        }
        setDisableButton(true);
      }
    } catch (error) {

    }
  }, [selectedId]);
  const selectInput = async (id: string) => {
    try {
      if (id) {
        setSelectedId(id);
        const fetchedInputDetails = await inputEntityservice.getInputEntityTypeById(id, INPUT_TYPE.INPUTTYPE_1);
        if (fetchedInputDetails && fetchedInputDetails.success) {
          setSelectedId(fetchedInputDetails?.data?.[0]?.id);
          setSelected(fetchedInputDetails?.data?.[0]);
          dispatch(setSelectedInput(fetchedInputDetails?.data?.[0]));
          setDisableButton(true);
        }
      }
    } catch (error) {

    }
  }
  const saveInput = async () => {
    try {
      const payload = {
        name: selected?.name,
        value: selected?.value ? selected?.value : "-",
        type: INPUT_TYPE.INPUTTYPE_1
      }
      if (selected?.id && isValidUUID(selected?.id)) {
        const updateResponse = await inputEntityservice.updateInputEntityType(selected?.id, payload);
        if (updateResponse && updateResponse.success) {
          dispatch(updateInputAfterSaveAPICall({ patch: payload } as any));
          // getAllExisitngInput();
          setDisableButton(true);
        }
      } else {
        const createResponse = await inputEntityservice.createInputEntityType(payload);
        if (createResponse && createResponse.success) {
          // getAllExisitngInput();
          setDisableButton(true);
        }
      }
    } catch (error) {

    }
  }
  const onSearchChange = (value: string) => {
    setSearchText(value);
    const filteredItems = InputState?.allInputs.filter((item: any) => item.name?.toLowerCase().includes(value.toLowerCase()));
    dispatch(setSearchItems(filteredItems as any));
  }
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
  const addInputToSection = async () => {
    const payload = { sectionId, rowIndex: parseInt((rowIndex ? rowIndex : '')), columnIndex: parseInt((columnIndex ? columnIndex : '')), input: selected, inputGroupIndex: parseInt((inputGroupIndex ? inputGroupIndex : '')), sameGroup: true, sectionType: sectionType ? sectionType : '' }
    dispatch(AddInputTypeToTemplate(payload));
    navigate(-1);
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
              value={selectedId}
              onChange={(event) => {
                selectInput(event.target.value);
              }}
              className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[13px] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {InputState?.allInputs.map((item: any) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-[12px] font-semibold text-slate-700">Input Label</label>
            <Input value={selected?.name} onChange={(event) => updateSelected(selected?.id, { name: event.target.value })} />
          </div>
          <div>
            <label className="mb-1 block text-[12px] font-semibold text-slate-700">Input Value</label>
            <Input value={selected?.value} onChange={(event) => updateSelected(selected?.id, { value: event.target.value })} />
          </div>
          <div className="flex items-center justify-between border-t border-slate-100 pt-3">
            <Button type="button" variant="destructive" size="sm" onClick={deleteSelected}>
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </Button>
            <div className="flex gap-2">
              {/* <Button type="button" variant="outline" size="sm">
                Select
              </Button> */}
              <Button disabled={disableButton} type="button" size="sm" onClick={() => { saveInput() }}>
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
        // footer={<SuccessLine label={selected.name ? "Input label valid" : "Add an input label"} addInput={addInputToSection} />}
        >
          <PreviewField label={selected.name || "Input label"} value={selected.value || "Value appears here"} />
        </InputPreviewPanel>
        <SelectableList
          title="All inputs"
          countLabel={`${InputState?.searchItems.length} items`}
          items={InputState?.searchItems}
          selectedId={selected.id}
          onSelect={selectInput}
          search={searchText}
          onSearchChange={onSearchChange}
        />
      </div>
    </div >
  );
});

UserInputEditor.displayName = "UserInputEditor";

export default UserInputEditor;
