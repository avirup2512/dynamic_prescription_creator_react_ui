import { Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Button } from '../../../components/ui/button'
import {
    addInputEntity,
    getInputEntity,
    updateInputEntity,
} from '../../../demoData/globalStore'
import { useDispatch, useSelector } from 'react-redux'
import { AddDropdown } from '../store/InputEntityTypeSlice'
import { INPUT_TYPE } from '../../../constant/inputType.enum';
import type { InputEntityType } from '../type/InputEntityType'
import InputEntityTypeService from '../services/InputEntityTypeService'

function CreateDropdown()
{
    type DropdownOption = {
        id: string
        value: string
    }

    const inputEntityService = InputEntityTypeService;
    const InputEnitytState = useSelector((state:any)=> state.inputEntityType);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { id } = useParams();
    const isEditMode = Boolean(id);
    const [existingDropdown,setExistingDropdown] = useState<any>(null);
    const [editedId,setEditedId] = useState<string | undefined>();
    const [options, setOptions] = useState<DropdownOption[]>([]);
    const [removedOptionIds, setRemovedOptionIds] = useState<any>();

    useEffect(() => {
        if (id) {
            setEditedId(id);
            getDropdownEntityById(id);
        }
    
    }, [id]);
    const getDropdownEntityById = async (id:string) => {
        const response = await inputEntityService.getByAllDropdownInputInformationById(id);
        console.log(response.data);
        if (response.success) {
          const dropdownData = response.data;
          setExistingDropdown(dropdownData);
          setOptions(dropdownData?.dropdown_options.map((option:any, index:number) => ({ id: option?.id, value: option?.value })));
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
        setOptions((currentOptions) =>
            currentOptions.filter((option) => option.id !== optionId),
        )
    }

    function updateOption(optionId: number, value: string) {
        setOptions((currentOptions:any) =>
            currentOptions.map((option:any) =>
                option.id === optionId ? { ...option, value } : option,
            ),
        )
    }
    async function saveDropdown(event:any)
    {
        event.preventDefault();

        // dispatch(AddDropdown(payload));
        if (isEditMode && editedId)
        {
            const newAddedOptions = options.filter((option:any) => option.id.includes('options'));
            const existingOptions = options.filter((option:any) => !option.id.includes('options'));
            const updatedDropdown = await inputEntityService.updateDropdownInputEntity(editedId, { name: existingDropdown?.name, newAddedOptions,existingOptions,removedOptionIds } as any);
            if(updatedDropdown && updatedDropdown.success)
            {
                // Handle success case
                navigate('/dashboard/inputEntity/dropdown')
            }else{
                // Handle error case
                console.error('Failed to update dropdown');
            }
        } else {
            const createdDropdown: any = inputEntityService.createInputEntityType({ name: existingDropdown?.name, value: options, type: 'INPUT_TYPE_2' } as any);
            if(createdDropdown && createdDropdown.success)
            {
                // Handle success case
                navigate('/dashboard/inputEntity/dropdown')
            }else{
                // Handle error case
                console.error('Failed to create dropdown');
            }
        }
        
    }
    return(
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold tracking-normal">
                    {editedId ? 'Edit Dropdown' : 'Create Dropdown'}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Add a dropdown name and define multiple selectable values.
                </p>
            </div>

            <form
                className="rounded-xl border border-border bg-card p-6 shadow-sm"
                onSubmit={saveDropdown}
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
                            placeholder="Enter dropdown name"
                            defaultValue={existingDropdown?.name ?? ''}
                            required
                            type="text"
                            onChange={(e:any)=> setExistingDropdown({...existingDropdown, name: e?.currentTarget?.value})}
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
                                    <textarea
                                        className="min-h-24 w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/20"
                                        name="values"
                                        onChange={(event) =>
                                            updateOption(option.id, event.target.value)
                                        }
                                        placeholder={`Value ${index + 1}`}
                                        value={option.value}
                                    ></textarea>
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
                    <Button className="h-9 px-4" type="submit" onClick={saveDropdown}>
                        Save
                    </Button>
                </div>
            </form>
        </div>
    )
}
export default CreateDropdown;
