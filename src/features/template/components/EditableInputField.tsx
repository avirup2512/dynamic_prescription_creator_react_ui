import { Check, Edit2Icon, PlusIcon, X } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useEffect, useState } from "react";
function EditableInputField({ input, onChange }: any) {
    const [inputValue, setInputValue] = useState(input?.value || '');
    const [isEditMode, setIsEditMode] = useState(false);
    useEffect(() => {
        setInputValue(input?.input_entity_value || '');
    }, [input])
    const handleInputChange = () => {
        onChange(inputValue);
        setIsEditMode(false);
    }
    return (
    <>
        {
        isEditMode ?(
        <div className="flex justify-between items-center gap-2">
            <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-2 py-1.5 text-xs outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
            />
            <Button
               onClick={handleInputChange}
               size="icon-lg"
               type="button"
               variant="outline"
              className="h-6 w-6 hover:bg-none-100"
            ><Check  className="size-3 text-danger-600"/></Button>
            <Button
               onClick={() => setIsEditMode(false)}
               size="icon-lg"
               type="button"
               variant="outline"
              className="h-6 w-6 hover:bg-none-100"
                        >
           
                <X  className="size-3 text-success-600"/>
            </Button>
            
        </div>
        ): (
            <div className="flex items-center justify-between">
                <span className="text-sm text-green-600">{input.input_entity_value}</span>
                <Button
                    onClick={() => setIsEditMode(true)}
                    size="icon-lg"
                    type="button"
                    variant="outline"
                    className="h-6 w-6 hover:bg-none-100"
                    >
                { input?.input_entity_value ? <Edit2Icon className="size-3 text-success-600" /> : <PlusIcon className="size-3 text-success-600" />}
                </Button>
            </div>
        )
            }
        </>
    )
}
export default EditableInputField;