import { Check, Edit2Icon, PlusIcon, X } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useEffect, useState } from "react";
function EditableInputField({ input, onChange }: any) {
  const [inputValue, setInputValue] = useState(input?.value || "");
  const [isEditMode, setIsEditMode] = useState(false);
  useEffect(() => {
    setInputValue(getInputValue(input));
  }, [input]);
  const handleInputChange = () => {
    onChange(inputValue);
    setIsEditMode(false);
  };
  const getInputValue = (input: any) => {
    const inputValue =
      input?.template_input_value && input.template_input_value.length
        ? input.template_input_value
        : input?.input_entity_value && input?.input_entity_value.length
          ? input?.input_entity_value
          : "";
    if (inputValue && inputValue.trim() !== "''") {
      return inputValue;
    } else if (input?.dropdown_option_value &&
      input.dropdown_option_value.trim() !== "''") {
      return input.dropdown_option_value;
    }
    return "";
  };
  return (
    <>
      {isEditMode ? (
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
          >
            <Check className="size-3 text-danger-600" />
          </Button>
          <Button
            onClick={() => setIsEditMode(false)}
            size="icon-lg"
            type="button"
            variant="outline"
            className="h-6 w-6 hover:bg-none-100"
          >
            <X className="size-3 text-success-600" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <span className="text-sm text-green-600">{getInputValue(input)}</span>
          <Button
            onClick={() => setIsEditMode(true)}
            size="icon-lg"
            type="button"
            variant="outline"
            className="h-6 w-6 hover:bg-none-100"
          >
            {getInputValue(input) ? (
              <Edit2Icon className="size-3 text-success-600" />
            ) : (
              <PlusIcon className="size-3 text-success-600" />
            )}
          </Button>
        </div>
      )}
    </>
  );
}
export default EditableInputField;
