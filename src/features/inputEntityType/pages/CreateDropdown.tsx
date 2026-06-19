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
        a();
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
    const data = [
  {
    "name": "Fruits",
    "type": "INPUT_TYPE_2",
    "value": [
      { "value": "Apple" },
      { "value": "Banana" },
      { "value": "Mango" },
      { "value": "Papaya" },
      { "value": "Orange" },
      { "value": "Sweet Lime" },
      { "value": "Guava" },
      { "value": "Pomegranate" },
      { "value": "Watermelon" },
      { "value": "Muskmelon" },
      { "value": "Pineapple" },
      { "value": "Pear" },
      { "value": "Peach" },
      { "value": "Plum" },
      { "value": "Kiwi" },
      { "value": "Dragon Fruit" },
      { "value": "Grapes" },
      { "value": "Strawberry" },
      { "value": "Blueberry" },
      { "value": "Raspberry" },
      { "value": "Avocado" },
      { "value": "Coconut" },
      { "value": "Litchi" },
      { "value": "Jackfruit" },
      { "value": "Dates" },
      { "value": "Fig" }
    ]
  },
  {
    "name": "Vegetables",
    "type": "INPUT_TYPE_2",
    "value": [
      { "value": "Spinach" },
      { "value": "Fenugreek Leaves" },
      { "value": "Amaranth Leaves" },
      { "value": "Lettuce" },
      { "value": "Cabbage" },
      { "value": "Cauliflower" },
      { "value": "Broccoli" },
      { "value": "Carrot" },
      { "value": "Beetroot" },
      { "value": "Radish" },
      { "value": "Cucumber" },
      { "value": "Tomato" },
      { "value": "Capsicum" },
      { "value": "Bell Pepper" },
      { "value": "Pumpkin" },
      { "value": "Bottle Gourd" },
      { "value": "Bitter Gourd" },
      { "value": "Ridge Gourd" },
      { "value": "Snake Gourd" },
      { "value": "Brinjal" },
      { "value": "Okra" },
      { "value": "Green Beans" },
      { "value": "Peas" },
      { "value": "Sweet Potato" },
      { "value": "Potato" },
      { "value": "Onion" },
      { "value": "Garlic" },
      { "value": "Mushroom" },
      { "value": "Zucchini" }
    ]
  },
  {
    "name": "Seeds",
    "type": "INPUT_TYPE_2",
    "value": [
      { "value": "Chia Seeds" },
      { "value": "Flax Seeds" },
      { "value": "Sunflower Seeds" },
      { "value": "Pumpkin Seeds" },
      { "value": "Sesame Seeds" },
      { "value": "Watermelon Seeds" },
      { "value": "Basil Seeds" },
      { "value": "Hemp Seeds" }
    ]
  },
  {
    "name": "Nuts",
    "type": "INPUT_TYPE_2",
    "value": [
      { "value": "Almonds" },
      { "value": "Walnuts" },
      { "value": "Cashews" },
      { "value": "Pistachios" },
      { "value": "Peanuts" },
      { "value": "Hazelnuts" },
      { "value": "Pecans" },
      { "value": "Macadamia Nuts" },
      { "value": "Brazil Nuts" }
    ]
  },
  {
    "name": "Whole Grains",
    "type": "INPUT_TYPE_2",
    "value": [
      { "value": "Brown Rice" },
      { "value": "Red Rice" },
      { "value": "Black Rice" },
      { "value": "Oats" },
      { "value": "Quinoa" },
      { "value": "Barley" },
      { "value": "Millet" },
      { "value": "Jowar" },
      { "value": "Bajra" },
      { "value": "Ragi" },
      { "value": "Whole Wheat" },
      { "value": "Buckwheat" },
      { "value": "Corn" }
    ]
  },
  {
    "name": "Pulses & Lentils",
    "type": "INPUT_TYPE_2",
    "value": [
      { "value": "Moong Dal" },
      { "value": "Masoor Dal" },
      { "value": "Toor Dal" },
      { "value": "Urad Dal" },
      { "value": "Chana Dal" },
      { "value": "Rajma" },
      { "value": "Chickpeas" },
      { "value": "Black Chickpeas" },
      { "value": "Green Gram" },
      { "value": "Soybean" },
      { "value": "Horse Gram" },
      { "value": "Lobia" }
    ]
  },
  {
    "name": "Dairy Products",
    "type": "INPUT_TYPE_2",
    "value": [
      { "value": "Milk" },
      { "value": "Toned Milk" },
      { "value": "Skimmed Milk" },
      { "value": "Curd" },
      { "value": "Greek Yogurt" },
      { "value": "Buttermilk" },
      { "value": "Paneer" },
      { "value": "Cottage Cheese" },
      { "value": "Cheese" },
      { "value": "Ghee" },
      { "value": "Butter" }
    ]
  },
  {
    "name": "Protein Sources",
    "type": "INPUT_TYPE_2",
    "value": [
      { "value": "Egg White" },
      { "value": "Whole Egg" },
      { "value": "Chicken Breast" },
      { "value": "Fish" },
      { "value": "Prawns" },
      { "value": "Turkey" },
      { "value": "Lean Mutton" },
      { "value": "Tofu" },
      { "value": "Tempeh" },
      { "value": "Paneer" },
      { "value": "Soy Chunks" },
      { "value": "Whey Protein" }
    ]
  },
  {
    "name": "Cooking Oils",
    "type": "INPUT_TYPE_2",
    "value": [
      { "value": "Mustard Oil" },
      { "value": "Olive Oil" },
      { "value": "Coconut Oil" },
      { "value": "Groundnut Oil" },
      { "value": "Rice Bran Oil" },
      { "value": "Sesame Oil" },
      { "value": "Sunflower Oil" },
      { "value": "Avocado Oil" }
    ]
  },
  {
    "name": "Herbs & Spices",
    "type": "INPUT_TYPE_2",
    "value": [
      { "value": "Turmeric" },
      { "value": "Ginger" },
      { "value": "Garlic" },
      { "value": "Cinnamon" },
      { "value": "Black Pepper" },
      { "value": "Clove" },
      { "value": "Cardamom" },
      { "value": "Cumin" },
      { "value": "Coriander" },
      { "value": "Fennel" },
      { "value": "Ajwain" },
      { "value": "Mint" },
      { "value": "Basil" },
      { "value": "Curry Leaves" }
    ]
  },
  {
    "name": "Beverages",
    "type": "INPUT_TYPE_2",
    "value": [
      { "value": "Water" },
      { "value": "Lemon Water" },
      { "value": "Coconut Water" },
      { "value": "Green Tea" },
      { "value": "Black Tea" },
      { "value": "Herbal Tea" },
      { "value": "Black Coffee" },
      { "value": "Milk Coffee" },
      { "value": "Fresh Juice" },
      { "value": "Vegetable Juice" }
    ]
  },
  {
    "name": "Meal Timing",
    "type": "INPUT_TYPE_2",
    "value": [
      { "value": "Early Morning" },
      { "value": "Breakfast" },
      { "value": "Mid Morning" },
      { "value": "Lunch" },
      { "value": "Evening Snack" },
      { "value": "Pre Workout" },
      { "value": "Post Workout" },
      { "value": "Dinner" },
      { "value": "Bedtime" }
    ]
  },
  {
    "name": "Dietary Restrictions",
    "type": "INPUT_TYPE_2",
    "value": [
      { "value": "Vegetarian" },
      { "value": "Vegan" },
      { "value": "Eggetarian" },
      { "value": "Jain Diet" },
      { "value": "Gluten Free" },
      { "value": "Lactose Free" },
      { "value": "Keto" },
      { "value": "Low Carb" },
      { "value": "Low Fat" },
      { "value": "Low Sodium" },
      { "value": "Diabetic Friendly" },
      { "value": "High Protein" }
    ]
  },
  {
    "name": "Medical Conditions",
    "type": "INPUT_TYPE_2",
    "value": [
      { "value": "Diabetes" },
      { "value": "Prediabetes" },
      { "value": "Hypertension" },
      { "value": "Obesity" },
      { "value": "PCOS" },
      { "value": "Hypothyroidism" },
      { "value": "Hyperthyroidism" },
      { "value": "Fatty Liver" },
      { "value": "Kidney Disease" },
      { "value": "Gout" },
      { "value": "IBS" },
      { "value": "GERD" },
      { "value": "Constipation" },
      { "value": "High Cholesterol" },
      { "value": "Heart Disease" }
    ]
  },
  {
    "name": "Prescription Instructions",
    "type": "INPUT_TYPE_2",
    "value": [
      { "value": "Consume Daily" },
      { "value": "Consume Alternate Days" },
      { "value": "Avoid" },
      { "value": "Limit Intake" },
      { "value": "Soak Overnight" },
      { "value": "Boiled" },
      { "value": "Steamed" },
      { "value": "Grilled" },
      { "value": "Raw" },
      { "value": "Without Sugar" },
      { "value": "Without Salt" },
      { "value": "Before Meal" },
      { "value": "After Meal" },
      { "value": "Empty Stomach" },
      { "value": "With Water" },
      { "value": "With Milk" }
    ]
  }
]
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
    const a = async() => {
        data.forEach(async (d: any) => {
            await inputEntityService.createInputEntityType({ name: d?.name, value: d.value, type: d.type } as any);
        })
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
