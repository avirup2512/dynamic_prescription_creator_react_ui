import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Checkbox } from "../../../components/ui/checkbox";
import { useEffect, useState } from "react";
import type { InputEntityType } from "@/features/inputEntityType/type/InputEntityType";
import { INPUT_TYPE } from "../../../constant/inputType.enum";
import { useDispatch } from "react-redux";
import {
  AddDropdownValueToTemplate,
  AddInputValueToTemplate,
  AddQuantityFieldToTemplate,
  AddQuantityValueToTemplate,
} from "../store/TemplateSlice";
import InputEntityTypeService from "@/features/inputEntityType/services/InputEntityTypeService";
import QuantityService from "@/features/inputEntityType/services/quantityService";

function InputAddModal({
  sectionType,
  isOpen,
  rowIndex,
  columnIndex,
  inputGroupIndex,
  inputType,
  onOpenChange,
  addInputToTemplate,
}: any) {
  const inputEntityService = InputEntityTypeService;
  const quantityService = QuantityService;
  const dispatch = useDispatch();
  const [savedOptions, setSavedOptions] = useState<any[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState("");
  const [selectedInput, setSelectedInput] = useState<any>({});
  const [count, setCount] = useState(1);
  const [showQuantity, setShowQuantity] = useState(false);
  const [quantityOptions, setQuantityOptions] = useState<any[]>([]);
  const [selectedQuantityId, setSelectedQuantityId] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    setSavedOptions([]);
    setSelectedOptionId("");
    setQuantityOptions([]);
    setSelectedQuantityId("");
    setShowQuantity(false);
    if (inputType) {
      setAllInputList(inputType);
    }
  }, [isOpen]);
  const setAllInputList = async (type: string) => {
    try {
      const inputList = await inputEntityService.getInputEntityTypes(type);
      const quantityList = await quantityService.getAllQuantity();
      if (inputList && inputList.success) {
        setSavedOptions(inputList?.data);
      }
      if (quantityList && quantityList.success) {
        setQuantityOptions(quantityList?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getOptionLabel = (option: any) =>
    option?.name || option?.label || option?.value || option?.id || "Option";

  const getDropdownLabel = () => {
    if (inputType === INPUT_TYPE.INPUTTYPE_1) return "Input dropdown";
    if (inputType === INPUT_TYPE.INPUTTYPE_2) return "Dropdown dropdown";
    if (inputType === INPUT_TYPE.INPUTTYPE_3) return "Textbox dropdown";
    return "Select option";
  };

  const handleSave = () => {
    addInputToTemplate(
      {
        input: selectedInput,
        count,
        show_quantity: showQuantity,
        quantity: selectedQuantityId,
      },
      inputGroupIndex,
    );
    onOpenChange(false);
  };

  const handleCountChange = (value: number) => {
    const safeValue = Number.isNaN(value) ? 1 : value;
    setCount(Math.max(1, Math.min(10, safeValue)));
  };
  const selectInput = (inputId: any) => {
    setSelectedOptionId(inputId);
    const input = savedOptions.filter((input) => input?.id === inputId);
    if (input && Array.isArray(input) && input.length > 0)
      setSelectedInput(input[0]);
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange} size="lg">
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="selectedOption">
              {getDropdownLabel()} <span className="text-destructive">*</span>
            </label>
            <select
              id="selectedOption"
              value={selectedOptionId}
              onChange={(e) => selectInput(e.target.value)}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition appearance-none focus:border-ring focus:ring-2 focus:ring-ring/20"
            >
              <option value="">Select an option</option>
              {savedOptions.map((option: any) => (
                <option
                  key={option.id || option.value}
                  value={option.id || option.value}
                >
                  {getOptionLabel(option)}
                </option>
              ))}
            </select>
          </div>

          {/* <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="count">
                            How many
                        </label>
                        <input
                            id="count"
                            name="count"
                            type="number"
                            min={1}
                            max={10}
                            value={count}
                            onChange={(e:any) => handleCountChange(Number(e.target.value))}
                            className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
                        />
                        {error ? <p className="text-xs text-destructive">{error}</p> : null}
                    </div> */}

          <div className="flex items-center gap-2">
            <Checkbox
              checked={showQuantity}
              onCheckedChange={(checked) => setShowQuantity(Boolean(checked))}
            />
            <span className="text-sm font-medium leading-none">
              Add Quantity
            </span>
          </div>

          {showQuantity && (
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="quantityOption">
                Quantity option
              </label>
              <select
                id="quantityOption"
                value={selectedQuantityId}
                onChange={(e) => setSelectedQuantityId(e.target.value)}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition appearance-none focus:border-ring focus:ring-2 focus:ring-ring/20"
              >
                <option value="">Select quantity</option>
                {quantityOptions.map((option: any) => (
                  <option
                    key={option.id || option.value}
                    value={option.id || option.value}
                  >
                    {option?.value ||
                      option?.label ||
                      option?.name ||
                      option?.id}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button onClick={handleSave} className="h-9 px-4" type="button">
            Add
          </Button>
          <DialogClose asChild>
            <Button variant="outline" className="h-9 px-4" type="button">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default InputAddModal;
