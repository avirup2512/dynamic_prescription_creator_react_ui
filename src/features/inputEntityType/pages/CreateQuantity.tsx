import { Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Button } from '../../../components/ui/button'
import {
    addInputEntity,
    updateInputEntity,
} from '../../../demoData/globalStore'
import { useDispatch, useSelector } from 'react-redux'
import QuantityService from '../services/quantityService'

function CreateQuantity()
{
    const InputEnitytState = useSelector((state: any) => state.inputEntityType);
    const quantityService = QuantityService;
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { id } = useParams();
    const isEditMode = Boolean(id);
    const [existingQuantity,setExistingQuantity] = useState<any>([]);
    const [editedId,setEditedId] = useState<any>();
    const [options, setOptions] = useState<any>([]);
    const [removedOptionIds, setRemovedOptionIds] = useState<any>();
    useEffect(()=>{
        if(id)
        {
            setEditedId(id);
            getQuantityById(id);
        }
    }, [id])
    async function getQuantityById(id: any)
    {
        try {
            const quantityEntity:any = await quantityService.getQuantityById(id);
            if (quantityEntity && quantityEntity.success)
            {
                setExistingQuantity(quantityEntity.data);
                setOptions(quantityEntity?.data.quantity_values.map((option:any, index:number) => ({ id: option?.id, value: option?.value })));
            }
        } catch (error) {
            console.log(error);
        }
    }
    function addOption() {
        setOptions((currentOptions:any) => [
            ...currentOptions,
            { id: 'options'+Date.now(), value: '' },
        ])
    }

    function removeOption(optionId: number) {
        setRemovedOptionIds((prev:any)=> prev ? [prev,optionId] : [optionId]);
        setOptions((currentOptions:any) =>
            currentOptions.filter((option:any) => option.id !== optionId),
        )
    }

    function updateOption(optionId: number, value: string) {
        setOptions((currentOptions:any) =>
            currentOptions.map((option:any) =>
                option.id === optionId ? { ...option, value } : option,
            ),
        )
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const payload = {
            name: String(formData.get('name') ?? ''),
            values: options
                .map((option) => option.value.trim())
                .filter((value) => value.length > 0),
        }

        if (editId) {
            updateInputEntity('quantity', editId, payload)
        } else {
            addInputEntity('quantity', payload)
        }

        navigate('/dashboard/inputEntity/quantity')
    }
    async function saveQuantity(event:any)
    {
        event.preventDefault();
        // dispatch(AddQuantity(payload));
        if (isEditMode && editedId)
        {
            const newAddedOptions = options.filter((option:any) => option.id.includes('options'));
            const existingOptions = options.filter((option:any) => !option.id.includes('options'));
            const updatedQuantity = await quantityService.updateQuantity(editedId, { name: existingQuantity?.name, newAddedOptions,existingOptions,removedOptionIds } as any);
            if(updatedQuantity && updatedQuantity.success)
            {
                // Handle success case
                navigate('/dashboard/inputEntity/quantity')
            }else{
                // Handle error case
                console.error('Failed to update quantity');
            }
        } else {
            const createdQuantity: any = quantityService.createQuantity({ name: existingQuantity?.name, value: options, type: 'INPUT_TYPE_2' } as any);
            if(createdQuantity && createdQuantity.success)
            {
                // Handle success case
                navigate('/dashboard/inputEntity/quantity')
            }else{
                // Handle error case
                console.error('Failed to create quantity');
            }
        }
    }
    
    return(
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold tracking-normal">
                    {editedId ? 'Edit Quantity' : 'Create Quantity'}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Add a quantity name and define multiple selectable values.
                </p>
            </div>

            <form
                className="rounded-xl border border-border bg-card p-6 shadow-sm"
                onSubmit={handleSubmit}
            >
                <div className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="name">
                            Name <span className="text-destructive">*</span>
                        </label>
                        <input
                            className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/20"
                            id="name"
                            name="name"
                            placeholder="Enter quantity name"
                            defaultValue={existingQuantity?.name ?? ''}
                            required
                            type="text"
                            onChange={(e:any)=> setExistingQuantity({...existingQuantity, name: e?.currentTarget?.value})}
                        />
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between gap-3">
                            <label className="text-sm font-medium">
                                Values
                            </label>
                            <Button
                                className="h-8 gap-2"
                                onClick={addOption}
                                type="button"
                                variant="outline"
                            >
                                <Plus className="size-4" />
                                Add value
                            </Button>
                        </div>

                        <div className="space-y-3">
                            {options.map((option:any, index) => (
                                <div
                                    className="flex items-center gap-2"
                                    key={option.id}
                                >
                                    <input
                                        className="min-h-24 w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/20"
                                        name="values"
                                        onChange={(event) =>
                                            updateOption(option.id, event.target.value)
                                        }
                                        placeholder={`Value ${index + 1}`}
                                        value={option.value}
                                    ></input>
                                    <Button
                                        aria-label="Delete value"
                                        disabled={options.length === 1}
                                        onClick={() => removeOption(option.id)}
                                        size="icon"
                                        type="button"
                                        variant="ghost"
                                    >
                                        <Trash2 className="size-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <Button className="h-9 px-4" type="submit" onClick={saveQuantity}>
                        Save
                    </Button>
                </div>
            </form>
        </div>
    )
}
export default CreateQuantity;
