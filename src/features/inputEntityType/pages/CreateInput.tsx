import { useNavigate, useParams } from 'react-router-dom'

import { Button } from '../../../components/ui/button'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import type { InputEntityType } from '../type/InputEntityType';
import { AddInput } from '../store/InputEntityTypeSlice';
import { INPUT_TYPE } from '../../../constant/inputType.enum';
import InputEntityTypeService from '../services/InputEntityTypeService';

function CreateInput()
{
    const InputEnitytState = useSelector((state: any) => state.inputEntityType);
    const inputEntityTypeService = InputEntityTypeService;
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);
    const [existingInput,setExistingInput] = useState([]);
    const [editedId,setEditedId] = useState<any>();
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if(isEditMode && id)
        {
            const editedInput = await inputEntityTypeService.updateInputEntityType(id, { name: existingInput?.name, value: existingInput?.value } as any);
            console.log(editedInput);
            //dispatch(AddInput(payload));
        } else {
            const createdInput = await inputEntityTypeService.createInputEntityType( { name: existingInput?.name, value: existingInput?.value, type: 'INPUT_TYPE_1' } as any);
            console.log(createdInput);
        }
        //dispatch(AddInput(payload));
        navigate('/dashboard/inputEntity/input')
    };
    useEffect(()=>{
        if(id)
        {
            setEditedId(id);
            getInputEntityById(id);
        }

    },[id])
    const getInputEntityById = async (id:string) => {
        const response = await inputEntityTypeService.getInputEntityTypeById(id,'INPUT_TYPE_1');
        console.log(response.data);
        if (response.success) {
          setExistingInput(response.data[0]);
        }
    }
    
    return(
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold tracking-normal">
                    {editedId ? 'Edit Input' : 'Create Input'}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Add a new input entity with a name and value.
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
                            placeholder="Enter name"
                            defaultValue={existingInput?.name ?? ''}
                            required
                            type="text"
                            onChange={(e:any)=> setExistingInput({...existingInput, name: e?.currentTarget?.value})}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="value">
                            Value
                        </label>
                        <input
                            className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/20"
                            id="value"
                            name="value"
                            placeholder="Enter value"
                            defaultValue={existingInput?.value ?? ''}
                            type="text"
                            onChange={(e:any)=> setExistingInput({...existingInput, value: e?.currentTarget?.value})}
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <Button className="h-9 px-4" type="submit">
                        Save
                    </Button>
                </div>
            </form>
        </div>
    )
}
export default CreateInput;
