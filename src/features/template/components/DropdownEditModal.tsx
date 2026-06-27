import { Button } from "../../../components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import InputEntityTypeService from "@/features/inputEntityType/services/InputEntityTypeService";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import Skeleton from "../../../components/ui/skeleton";
import { INPUT_TYPE } from "@/constant/inputType.enum";
import { Input } from "@/components/ui/input";
import DropdownEditModalComponent from "./dropdown modal management/DropdownEditComponent";

type DropdownOptionValue = {
  id: string
  value: string
}

type DropdownEntity = {
  id: string
  name?: string
  label?: string
  value?: string
  dropdown_option_values?: any[]
  dropdown_options?: any[]
  options?: any[]
}

type DropdownEditModalProps = {
  input: any
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSaved: (dropdown: {
    id: string
    name: string
  }) => void
}

const createDropdownOption = (): DropdownOptionValue => ({
  id: `new-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  value: '',
})

function DropdownEditModal({ input, isOpen, onOpenChange, onSaved }: DropdownEditModalProps) {
  const [dropdownList, setDropdownList] = useState<DropdownEntity[]>([]);
  const [selectedDropdownId, setSelectedDropdownId] = useState('');
  const [name, setName] = useState('');
  const [options, setOptions] = useState<DropdownOptionValue[]>([createDropdownOption()]);
  const [removedOptionIds, setRemovedOptionIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [isAIDropdownFlag, setIsAIDropdownFlag] = useState(false);
  const loadRequestIdRef = useRef(0);
  useEffect(() => {
    console.log(options)
  }, [options])
  useEffect(() => {
    if (!isOpen) return;

    setDropdownList([]);
    setSelectedDropdownId(input?.input_entity_id || '');
    setName(input?.input_entity_name ?? input?.label ?? '');
    setOptions(input?.dropdown_option_values
      ?? input?.dropdown_options
      ?? input?.global_dropdown_options
      ?? input?.options,);
    setRemovedOptionIds([]);
    setError('');
    setIsSaving(false);
    loadDropdownList(input?.input_entity_id);
  }, [isOpen, input]);

  function normalizeOptions(dropdownValues: any): DropdownOptionValue[] {
    if (!Array.isArray(dropdownValues) || dropdownValues.length === 0) {
      return [createDropdownOption()];
    }

    return dropdownValues.map((option: any) => ({
      id: String(option?.id ?? createDropdownOption().id),
      value: option?.value ?? '',
    }));
  }

  async function loadDropdownList(currentDropdownId?: string) {
    const requestId = ++loadRequestIdRef.current;
    setIsLoading(true);
    setError('');
    try {
      const response = await InputEntityTypeService.getInputEntityTypes(INPUT_TYPE.INPUTTYPE_2);
      if (requestId !== loadRequestIdRef.current) return;

      if (response?.success) {
        setDropdownList(Array.isArray(response.data) ? response.data : []);
      }

      if (currentDropdownId) {
        setSelectedDropdownId(currentDropdownId);
        setName('');
        setOptions([]);
        setRemovedOptionIds([]);
        await loadDropdown(currentDropdownId, requestId);
      }
    } catch {
      if (requestId === loadRequestIdRef.current) setError('Failed to load dropdowns.');
    } finally {
      if (requestId === loadRequestIdRef.current) setIsLoading(false);
    }
  }

  async function loadDropdown(dropdownId: string, requestId = ++loadRequestIdRef.current) {
    setError('');
    setSelectedDropdownId(dropdownId);
    setName('');
    setRemovedOptionIds([]);

    if (!dropdownId) return;

    try {
      const response = await InputEntityTypeService.getByAllDropdownInputInformationById(dropdownId);
      if (requestId !== loadRequestIdRef.current) return;
      if (!response?.success) {
        setError(response?.message || 'Failed to load dropdown.');
        return;
      }

      const dropdown = response.data;
      setName(dropdown?.name ?? dropdown?.label ?? '');
      setOptions(dropdown?.dropdown_option_values
        ?? dropdown?.dropdown_options
        ?? dropdown?.global_dropdown_options
        ?? dropdown?.options,);
      setIsAIDropdownFlag(false);
    } catch {
      if (requestId === loadRequestIdRef.current) setError('Failed to load dropdown.');
    }
  }

  function addOption() {
    setOptions((currentOptions) => [...currentOptions, createDropdownOption()]);
  }

  function removeOption(optionId: string) {
    setOptions((currentOptions) => {
      const optionToRemove = currentOptions.find((option) => option.id === optionId);
      if (optionToRemove && !optionToRemove.id.startsWith('new-')) {
        setRemovedOptionIds((currentIds) => [...currentIds, optionToRemove.id]);
      }

      return currentOptions.filter((option) => option.id !== optionId);
    });
  }

  function updateOption(optionId: string, value: string) {
    setOptions((currentOptions) =>
      currentOptions.map((option) =>
        option.id === optionId ? { ...option, value } : option,
      ),
    );
  }

  function getDropdownOptionsFromResponse(response: any, fallbackOptions: DropdownOptionValue[]) {
    const data = response?.data;
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.dropdown_option_values)) return data.dropdown_option_values;
    if (Array.isArray(data?.dropdown_options)) return data.dropdown_options;
    if (Array.isArray(data?.global_dropdown_options)) return data.global_dropdown_options;
    if (Array.isArray(data?.options)) return data.options;
    return fallbackOptions;
  }

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();
    const cleanedOptions = options
      .map((option) => ({ ...option, value: option.value.trim() }))
      .filter((option) => option.value);
    const existingOptions = cleanedOptions.filter((option) => !option.id.startsWith('new-'));
    const newAddedOptions = cleanedOptions.filter((option) => option.id.startsWith('new-'));

    if (!selectedDropdownId) {
      setError('Select a dropdown to edit.');
      return;
    }

    if (!trimmedName) {
      setError('Name is required.');
      return;
    }

    if (cleanedOptions.length === 0) {
      setError('Add at least one dropdown value.');
      return;
    }

    setError('');
    setIsSaving(true);
    try {
      if (isAIDropdownFlag) {
        const response = await InputEntityTypeService.createInputEntityType({ name: trimmedName, type: INPUT_TYPE.INPUTTYPE_2, value: existingOptions } as any);
        if (!response?.success) {
          setError(response?.message || 'Failed to update dropdown.');
          return;
        } else {
          setSelectedDropdownId(response?.data?.entity?.id)
        }
      } else {
        const response = await InputEntityTypeService.updateDropdownInputEntity(selectedDropdownId, {
          name: trimmedName,
          newAddedOptions,
          existingOptions,
          removedOptionIds,
        });
        if (!response?.success) {
          setError(response?.message || 'Failed to update dropdown.');
          return;
        }
      }
      const refreshedResponse = await InputEntityTypeService.getByAllDropdownInputInformationById(selectedDropdownId);
      const updatedOptions = getDropdownOptionsFromResponse(
        refreshedResponse?.success ? refreshedResponse : null,
        cleanedOptions,
      );

      onSaved({
        id: selectedDropdownId,
        name: trimmedName,
      });
      onOpenChange(false);
    } catch {
      setError('Failed to update dropdown.');
    } finally {
      setIsSaving(false);
    }
  }
  const suggestDropdown = async (value: any) => {
    try {
      const suggestedDropdown: any = await InputEntityTypeService.getDropdownContentFromAI(value, INPUT_TYPE.INPUTTYPE_2);
      if (suggestedDropdown && suggestedDropdown.success) {
        setSelectedDropdownId(suggestedDropdown?.data?.id);
        setName('');
        setRemovedOptionIds([]);
        setName(suggestedDropdown?.data?.name ?? suggestedDropdown?.label ?? '');
        setOptions(suggestedDropdown?.data?.dropdown_option_values
          ?? suggestedDropdown?.data?.dropdown_options
          ?? suggestedDropdown?.data?.global_dropdown_options
          ?? suggestedDropdown?.data?.options,);
        setIsAIDropdownFlag(suggestedDropdown?.AISearchFlag);
      }
    } catch (error) {

    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Dropdown</DialogTitle>
          <DialogDescription>
            Select a dropdown and update its selectable values.
          </DialogDescription>
        </DialogHeader>
        {/* AI SEARCH STARTS */}
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="dropdownName">
            Search Using AI <span className="text-destructive">*</span>
          </label>
          {isLoading ? (
            <Skeleton className="h-11 w-full" />
          ) : (
            <Input
              className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/20"
              disabled={isSaving}
              id="dropdownName"
              name="name"
              onBlur={(event) => suggestDropdown(event.target.value)}
              placeholder="Enter element name"
              type="text"
            // value={name}
            />
          )}
        </div>
        <DropdownEditModalComponent />
      </DialogContent>
    </Dialog>
  );
}

export default DropdownEditModal;
