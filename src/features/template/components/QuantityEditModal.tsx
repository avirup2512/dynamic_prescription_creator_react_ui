import { Plus, Trash2 } from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";

import { Button } from "../../../components/ui/button";
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
import QuantityService from "@/features/inputEntityType/services/quantityService";
import { INPUT_TYPE } from "@/constant/inputType.enum";

type QuantityOptionValue = {
    id: string
    value: string
}

type QuantityEditModalProps = {
    input: any
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    onSaved: (quantity: {
        id: string
        name: string
        options: QuantityOptionValue[]
    }) => void
}

const createQuantityOption = (): QuantityOptionValue => ({
    id: `options${Date.now()}-${Math.random().toString(16).slice(2)}`,
    value: "",
});

function QuantityEditModal({ input, isOpen, onOpenChange, onSaved }: QuantityEditModalProps) {
    const [quantityList, setQuantityList] = useState<any[]>([]);
    const [selectedQuantityId, setSelectedQuantityId] = useState("");
    const [isCreatingNew, setIsCreatingNew] = useState(false);
    const [name, setName] = useState("");
    const [options, setOptions] = useState<QuantityOptionValue[]>([createQuantityOption()]);
    const [removedOptionIds, setRemovedOptionIds] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!isOpen) return;

        setQuantityList([]);
        setSelectedQuantityId(input?.quantity_id || "");
        setIsCreatingNew(!input?.quantity_id);
        setName(input?.quantity_name || "");
        setOptions(normalizeOptions(input?.quantity_option_values));
        setRemovedOptionIds([]);
        setError("");
        setIsSaving(false);
        loadQuantityList(input?.quantity_id);
    }, [isOpen, input]);

    function normalizeOptions(quantityValues: any): QuantityOptionValue[] {
        if (!Array.isArray(quantityValues) || quantityValues.length === 0) {
            return [createQuantityOption()];
        }

        return quantityValues.map((option: any) => ({
            id: String(option?.id ?? createQuantityOption().id),
            value: option?.value ?? "",
        }));
    }

    async function loadQuantityList(currentQuantityId?: string) {
        setIsLoading(true);
        try {
            const response = await QuantityService.getAllQuantity();
            if (response?.success) {
                setQuantityList(response.data || []);
            }

            if (currentQuantityId) {
                await loadQuantity(currentQuantityId);
            }
        } catch (error) {
            setError("Failed to load quantities.");
        } finally {
            setIsLoading(false);
        }
    }

    async function loadQuantity(quantityId: string) {
        setError("");
        setSelectedQuantityId(quantityId);
        setIsCreatingNew(false);
        setRemovedOptionIds([]);

        if (!quantityId) {
            setName("");
            setOptions([createQuantityOption()]);
            return;
        }

        try {
            const response = await QuantityService.getQuantityById(quantityId);
            if (!response?.success) {
                setError(response?.message || "Failed to load quantity.");
                return;
            }

            setName(response.data?.name || "");
            setOptions(normalizeOptions(response.data?.quantity_values));
        } catch (error) {
            setError("Failed to load quantity.");
        }
    }

    function addOption() {
        setOptions((currentOptions) => [...currentOptions, createQuantityOption()]);
    }

    function removeOption(optionId: string) {
        setOptions((currentOptions) => {
            const optionToRemove = currentOptions.find((option) => option.id === optionId);
            if (optionToRemove && !optionToRemove.id.startsWith("options")) {
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

    function getQuantityOptionsFromResponse(response: any, fallbackOptions: QuantityOptionValue[]) {
        const data = response?.data;
        if (Array.isArray(data?.quantity_values)) return data.quantity_values;
        if (Array.isArray(data?.quantity_option_values)) return data.quantity_option_values;
        if (Array.isArray(data?.values)) return data.values;
        if (Array.isArray(data?.quantity?.quantity_values)) return data.quantity.quantity_values;
        if (Array.isArray(data?.createdQuantity?.quantity_values)) return data.createdQuantity.quantity_values;
        return fallbackOptions;
    }

    function getQuantityIdFromResponse(response: any) {
        return response?.data?.id
            || response?.data?._id
            || response?.data?.quantity?.id
            || response?.data?.quantity?._id
            || response?.data?.createdQuantity?.id
            || response?.data?.createdQuantity?._id
            || response?.id
            || response?._id
            || response?.entity.id
            || "";
    }

    function getQuantityNameFromResponse(response: any, fallbackName: string) {
        return response?.data?.name
            || response?.data?.quantity?.name
            || response?.data?.createdQuantity?.name
            || fallbackName;
    }

    function startCreateQuantity() {
        setSelectedQuantityId("");
        setIsCreatingNew(true);
        setName("");
        setOptions([createQuantityOption()]);
        setRemovedOptionIds([]);
        setError("");
    }

    async function handleSave(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const trimmedName = name.trim();
        const cleanedOptions = options
            .map((option) => ({ ...option, value: option.value.trim() }))
            .filter((option) => option.value);
        if (!isCreatingNew && !selectedQuantityId) {
            setError("Select a quantity to edit.");
            return;
        }

        if (!trimmedName) {
            setError("Name is required.");
            return;
        }

        if (cleanedOptions.length === 0) {
            setError("Add at least one quantity value.");
            return;
        }

        setError("");
        setIsSaving(true);
        try {
            if (isCreatingNew) {
                const response = await QuantityService.createQuantity({
                    name: trimmedName,
                    value: cleanedOptions,
                    type: INPUT_TYPE.INPUTTYPE_2,
                } as any);

                if (!response?.success) {
                    setError(response?.message || "Failed to create quantity.");
                    return;
                }

                const createdQuantityId = getQuantityIdFromResponse(response);
                if (!createdQuantityId) {
                    setError("Quantity created, but the server did not return its id.");
                    return;
                }

                const refreshedResponse = await QuantityService.getQuantityById(createdQuantityId);
                const createdOptions = getQuantityOptionsFromResponse(
                    refreshedResponse?.success ? refreshedResponse : response,
                    cleanedOptions,
                );

                onSaved({
                    id: createdQuantityId,
                    name: getQuantityNameFromResponse(
                        refreshedResponse?.success ? refreshedResponse : response,
                        trimmedName,
                    ),
                    options: createdOptions,
                });
                onOpenChange(false);
                return;
            }

            const existingOptions = cleanedOptions.filter((option) => !option.id.startsWith("options"));
            const newAddedOptions = cleanedOptions.filter((option) => option.id.startsWith("options"));
            const response = await QuantityService.updateQuantity(selectedQuantityId, {
                name: trimmedName,
                newAddedOptions,
                existingOptions,
                removedOptionIds,
            } as any);

            if (!response?.success) {
                setError(response?.message || "Failed to update quantity.");
                return;
            }

            const refreshedResponse = await QuantityService.getQuantityById(selectedQuantityId);
            const updatedOptions = getQuantityOptionsFromResponse(
                refreshedResponse?.success ? refreshedResponse : response,
                cleanedOptions,
            );

            onSaved({
                id: selectedQuantityId,
                name: trimmedName,
                options: updatedOptions,
            });
            onOpenChange(false);
        } catch (error) {
            setError(isCreatingNew ? "Failed to create quantity." : "Failed to update quantity.");
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{isCreatingNew ? "Create Quantity" : "Edit Quantity"}</DialogTitle>
                    <DialogDescription>
                        {isCreatingNew
                            ? "Create a quantity and define its selectable values."
                            : "Select a quantity and update its selectable values."}
                    </DialogDescription>
                </DialogHeader>

                <form className="space-y-5" onSubmit={handleSave}>
                    <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="quantitySelect">
                            Quantity <span className="text-destructive">*</span>
                        </label>
                        <div className="flex gap-2">
                            <select
                                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition appearance-none focus:border-ring focus:ring-2 focus:ring-ring/20"
                                disabled={isLoading || isSaving}
                                id="quantitySelect"
                                onChange={(event) => loadQuantity(event.target.value)}
                                value={selectedQuantityId}
                            >
                                <option value="">Select quantity</option>
                                {quantityList.map((quantity: any) => (
                                    <option key={quantity.id} value={quantity.id}>
                                        {quantity.name || quantity.label || quantity.value || quantity.id}
                                    </option>
                                ))}
                            </select>
                            <Button
                                className="mt-1 h-10 shrink-0 gap-2"
                                disabled={isLoading || isSaving}
                                onClick={startCreateQuantity}
                                type="button"
                                variant={isCreatingNew ? "default" : "outline"}
                            >
                                <Plus className="size-4" />
                                Create new
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="quantityName">
                            Name <span className="text-destructive">*</span>
                        </label>
                        {isLoading ? (
                            <Skeleton className="h-11 w-full" />
                        ) : (
                            <input
                                className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/20"
                                disabled={isSaving}
                                id="quantityName"
                                name="name"
                                onChange={(event) => setName(event.target.value)}
                                placeholder="Enter quantity name"
                                required
                                type="text"
                                value={name}
                            />
                        )}
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between gap-3">
                            <label className="text-sm font-medium">Values</label>
                            <Button
                                className="h-8 gap-2"
                                disabled={isSaving}
                                onClick={addOption}
                                type="button"
                                variant="outline"
                            >
                                <Plus className="size-4" />
                                Add value
                            </Button>
                        </div>

                        <div className="space-y-3">
                            {isLoading ? (
                                <>
                                    <Skeleton className="h-11 w-full" />
                                    <Skeleton className="h-11 w-full" />
                                    <Skeleton className="h-11 w-full" />
                                </>
                            ) : (
                                options.map((option, index) => (
                                    <div className="flex items-center gap-2" key={option.id}>
                                        <input
                                            className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/20"
                                            disabled={isSaving}
                                            name="values"
                                            onChange={(event) => updateOption(option.id, event.target.value)}
                                            placeholder={`Value ${index + 1}`}
                                            value={option.value}
                                        />
                                        <Button
                                            aria-label="Delete value"
                                            disabled={options.length === 1 || isSaving}
                                            onClick={() => removeOption(option.id)}
                                            size="icon"
                                            type="button"
                                            variant="ghost"
                                        >
                                            <Trash2 className="size-4" />
                                        </Button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {error ? <p className="text-sm text-destructive">{error}</p> : null}

                    <DialogFooter>
                        <Button className="h-9 px-4" disabled={isLoading || isSaving} type="submit">
                            {isSaving ? "Saving..." : isCreatingNew ? "Create" : "Save"}
                        </Button>
                        <DialogClose asChild>
                            <Button className="h-9 px-4" disabled={isSaving} type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default QuantityEditModal;
