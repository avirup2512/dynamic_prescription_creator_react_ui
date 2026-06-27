import type { LucideIcon } from "lucide-react";

export type InputTypeId =
  | "INPUT_TYPE_1"
  | "INPUT_TYPE_2"
  | "INPUT_TYPE_3"
  | "INPUT_TYPE_4"
  | "INPUT_TYPE_5"
  | "INPUT_TYPE_6";

export interface InputTypeOption {
  id: InputTypeId;
  label: string;
  description: string;
}

export interface UserInputItem {
  id: string;
  label: string;
  value: string;
  category: string;
}

export interface DropdownOption {
  id: string;
  label: string;
  value: string;
}

export interface DropdownItem {
  id: string;
  label: string;
  helperText: string;
  category: string;
  options: DropdownOption[];
  defaultOptionId?: string;
}

export interface FoodItem {
  id: string;
  name: string;
  category: string;
  serving: string;
  calories?: number;
  carbs?: string;
  protein?: string;
  fiber?: string;
  note?: string;
}

export interface RecipeItem {
  id: string;
  name: string;
  category: string;
  ingredientCount: number;
  calories?: number;
  tags: string[];
}

export interface ToggleItem {
  id: string;
  label: string;
  offValue: string;
  onValue: string;
  defaultOn: boolean;
}

export interface CheckboxItem {
  id: string;
  label: string;
  checkedValue: string;
  defaultChecked: boolean;
}

export interface SelectableListItem {
  id: string;
  title: string;
  meta: string;
  icon?: LucideIcon;
  chips?: string[];
}
