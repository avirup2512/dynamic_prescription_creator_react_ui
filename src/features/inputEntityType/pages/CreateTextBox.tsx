import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../../components/ui/button'
import InputEntityTypeService from '../services/InputEntityTypeService'
import { SimpleEditor } from '../../../components/tiptap-templates/simple/simple-editor'
function CreateTextBox()
{
    const inputEntityService = InputEntityTypeService;

    const navigate = useNavigate()
    const { id } = useParams();
    const isEditMode = Boolean(id);
    const editId = id ? Number(id) : null
    const [existingTextBox, setExistingTextBox] = useState<any>([]);
    const editorRef = useRef<any>(null);
    useEffect(()=>{
        if(id)
        {
            getTextBoxEntityById(id);
        }

    },[id])
    const getTextBoxEntityById = async (id:string) => {
        const response = await inputEntityService.getInputEntityTypeById(id,'INPUT_TYPE_3');
        if (response.success) {
          setExistingTextBox(response.data[0]);
        }
    }
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const htmlContent = editorRef.current?.getHTML() ?? '';
        const payload = {
            name: String(existingTextBox.name ?? ''),
            value:htmlContent,
        }
        if (isEditMode && id) {
            const textBoxEntity:any = await inputEntityService.updateInputEntityType(id, payload as any);
            if (textBoxEntity && textBoxEntity.success)
            {
                navigate('/dashboard/inputEntity/textbox')
            }
        } else {
            const textBoxEntity:any = await inputEntityService.createInputEntityType({ ...payload, type: 'INPUT_TYPE_3' } as any);
            if (textBoxEntity && textBoxEntity.success)
            {
                navigate('/dashboard/inputEntity/textbox')
            }
        }
    }


    return(
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold tracking-normal">
                    {editId ? 'Edit Textbox' : 'Create Textbox'}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Add a textbox name and write rich text content.
                </p>
            </div>

            <form
                className="max-w-4xl rounded-xl border border-border bg-card p-6 shadow-sm"
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
                            placeholder="Enter textbox name"
                            defaultValue={existingTextBox?.name ?? ''}
                            onChange={(e:any)=> setExistingTextBox({...existingTextBox, name: e?.currentTarget?.value})}
                            required
                            type="text"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Content
                        </label>
                        <div className="overflow-hidden rounded-lg border border-input bg-background">
                            <div className="h-96 overflow-auto">
                                <SimpleEditor content={existingTextBox?.value ?? ''} minimal={true} onEditorReady={(editor) => { editorRef.current = editor }}/>
                            </div>
                        </div>
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
export default CreateTextBox;
