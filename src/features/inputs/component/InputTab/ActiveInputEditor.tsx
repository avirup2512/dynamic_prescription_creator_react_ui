import { memo, type ComponentType } from "react";

import type { InputTypeId } from "./input-tab-types";
import CheckboxEditor from "./CheckboxEditor";
import DropdownEditor from "./DropdownEditor";
import FoodEditor from "./FoodEditor";
import RecipeEditor from "./RecipeEditor";
import ToggleEditor from "./ToggleEditor";
import UserInputEditor from "./UserInputEditor";

const editorByType: Record<InputTypeId, ComponentType> = {
  INPUT_TYPE_1: UserInputEditor,
  INPUT_TYPE_2: DropdownEditor,
  INPUT_TYPE_3: FoodEditor,
  INPUT_TYPE_4: RecipeEditor,
  INPUT_TYPE_5: ToggleEditor,
  INPUT_TYPE_6: CheckboxEditor,
};

interface ActiveInputEditorProps {
  type: InputTypeId;
}

const ActiveInputEditor = memo(({ type }: ActiveInputEditorProps) => {
  const Editor = editorByType[type];

  return (
    <div className="h-full min-h-0 overflow-hidden">
      <Editor />
    </div>
  );
});

ActiveInputEditor.displayName = "ActiveInputEditor";

export default ActiveInputEditor;
