import {
  Apple,
  CheckSquare,
  ChevronDownIcon,
  ChefHat,
  ToggleRight,
  TypeIcon,
} from "lucide-react";

import type {
  CheckboxItem,
  DropdownItem,
  FoodItem,
  InputTypeOption,
  RecipeItem,
  SelectableListItem,
  ToggleItem,
  UserInputItem,
} from "./input-tab-types";

export const inputTypeOptions: InputTypeOption[] = [
  { id: "INPUT_TYPE_1", label: "User-defined Input", description: "INPUT_TYPE_1" },
  { id: "INPUT_TYPE_2", label: "User-defined Dropdown", description: "INPUT_TYPE_2" },
  { id: "INPUT_TYPE_3", label: "Global Food List", description: "INPUT_TYPE_3" },
  { id: "INPUT_TYPE_4", label: "Global Recipe List", description: "INPUT_TYPE_4" },
  { id: "INPUT_TYPE_5", label: "User-defined Toggle", description: "INPUT_TYPE_5" },
  { id: "INPUT_TYPE_6", label: "User-defined Checkbox", description: "INPUT_TYPE_6" },
];

export const initialUserInputs: UserInputItem[] = [
  { id: "patient-weight", label: "Patient Weight", value: "72 kg", category: "Vitals" },
  { id: "vitamin-d3", label: "Vitamin D3 daily dose", value: "1000 IU", category: "Medication" },
  { id: "duration", label: "Treatment duration", value: "14 days", category: "Scheduling" },
];

export const initialDropdowns: DropdownItem[] = [
  {
    id: "dosage-frequency",
    label: "How often should the patient take it?",
    helperText: "Shown beneath the field",
    category: "Medication",
    defaultOptionId: "bid",
    options: [
      { id: "qd", label: "Once daily", value: "qd" },
      { id: "bid", label: "Twice daily", value: "bid" },
      { id: "tid", label: "Three times daily", value: "tid" },
      { id: "q6h", label: "Every 6 hours", value: "q6h" },
      { id: "prn", label: "As needed", value: "prn" },
    ],
  },
  {
    id: "route",
    label: "Route of Administration",
    helperText: "Choose the prescribed route",
    category: "Medication",
    defaultOptionId: "po",
    options: [
      { id: "po", label: "By mouth", value: "PO" },
      { id: "iv", label: "Intravenous", value: "IV" },
      { id: "im", label: "Intramuscular", value: "IM" },
      { id: "sc", label: "Subcutaneous", value: "SC" },
    ],
  },
  {
    id: "refill",
    label: "Refill Count",
    helperText: "",
    category: "Pharmacy",
    defaultOptionId: "0",
    options: ["0", "1", "2", "3", "5"].map((value) => ({ id: value, label: value, value })),
  },
];

export const foodCatalog: FoodItem[] = [
  { id: "rolled-oats", name: "Rolled Oats", category: "Grains", serving: "per 100g", calories: 379, carbs: "67g C", protein: "13g P", fiber: "10g", note: "Whole grain" },
  { id: "steel-cut-oatmeal", name: "Steel-Cut Oatmeal (cooked)", category: "Grains", serving: "per 100g", calories: 71, carbs: "12g C", protein: "2.5g P", fiber: "1.7g", note: "Contains: gluten" },
  { id: "oat-milk", name: "Oat Milk, Unsweetened", category: "Dairy Alt", serving: "per 100g", calories: 43, carbs: "6g C", protein: "1g P", fiber: "0.8g" },
  { id: "oat-bran", name: "Oat Bran", category: "Grains", serving: "per 100g", calories: 246, carbs: "66g C", protein: "17g P", fiber: "15g" },
  { id: "overnight-oats", name: "Overnight Oats with Berries", category: "Recipe-derived", serving: "per 100g", calories: 198, carbs: "32g C", protein: "6g P", fiber: "4g" },
  { id: "oat-bread", name: "Whole Grain Oat Bread", category: "Bakery", serving: "per 100g", calories: 247, carbs: "41g C", protein: "10g P", fiber: "6g" },
  { id: "quinoa", name: "Quinoa, cooked", category: "Grains", serving: "per 100g", calories: 120, carbs: "21g C", protein: "4g P", fiber: "2.8g" },
  { id: "brown-rice", name: "Brown Rice, cooked", category: "Grains", serving: "per 100g", calories: 112, carbs: "24g C", protein: "2.6g P", fiber: "1.8g" },
  { id: "greek-yogurt", name: "Greek Yogurt, plain 2%", category: "Dairy", serving: "per 100g", calories: 73, carbs: "4g C", protein: "10g P", fiber: "0g" },
  { id: "almond-butter", name: "Almond Butter", category: "Nuts", serving: "per 100g", calories: 614, carbs: "19g C", protein: "21g P", fiber: "11g" },
];

export const recipeCatalog: RecipeItem[] = [
  { id: "diabetic-breakfast-bowl", name: "Diabetic Breakfast Bowl", category: "Breakfast", ingredientCount: 7, calories: 310, tags: ["Oats", "Low sugar"] },
  { id: "low-sodium-dal", name: "Low-Sodium Dal", category: "Lunch", ingredientCount: 9, calories: 260, tags: ["Protein", "Vegetarian"] },
  { id: "vitamin-boost-smoothie", name: "Vitamin Boost Smoothie", category: "Beverage", ingredientCount: 6, calories: 240, tags: ["Vitamin C", "Snack"] },
  { id: "iron-vit-c-bowl", name: "Iron + Vitamin C Salad Bowl", category: "Lunch", ingredientCount: 8, calories: 320, tags: ["Iron", "Diabetic-friendly"] },
  { id: "renal-friendly-khichdi", name: "Renal-Friendly Khichdi", category: "Dinner", ingredientCount: 10, calories: 285, tags: ["Low sodium", "Comfort"] },
];

export const initialToggles: ToggleItem[] = [
  { id: "vitamin-reminder", label: "Vitamin reminder enabled", offValue: "No", onValue: "Yes", defaultOn: true },
  { id: "fasting-required", label: "Fasting required", offValue: "Not required", onValue: "Required", defaultOn: false },
  { id: "follow-up-needed", label: "Follow-up needed", offValue: "No follow-up", onValue: "Schedule follow-up", defaultOn: true },
];

export const initialCheckboxes: CheckboxItem[] = [
  { id: "prenatal-vitamins", label: "Patient takes prenatal vitamins", checkedValue: "prenatal_yes", defaultChecked: false },
  { id: "allergy-reviewed", label: "Allergy status reviewed", checkedValue: "allergy_reviewed", defaultChecked: true },
  { id: "diet-counseling", label: "Diet counseling completed", checkedValue: "diet_counseling_done", defaultChecked: false },
];

export const recentInputItems: SelectableListItem[] = [
  { id: "patient-weight", title: "Patient Weight", meta: "Input - Vitals", icon: TypeIcon },
  { id: "frequency", title: "Frequency", meta: "Dropdown - Medication", icon: ChevronDownIcon },
  { id: "vitamin-d3", title: "Vitamin D3", meta: "Input - Medication", icon: TypeIcon },
];

export const editorIconByType = {
  INPUT_TYPE_1: TypeIcon,
  INPUT_TYPE_2: ChevronDownIcon,
  INPUT_TYPE_3: Apple,
  INPUT_TYPE_4: ChefHat,
  INPUT_TYPE_5: ToggleRight,
  INPUT_TYPE_6: CheckSquare,
} as const;
