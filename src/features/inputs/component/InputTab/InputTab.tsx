import { Lock, Plus, Trash2 } from "lucide-react";
import { memo, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";

import ActiveInputEditor from "./ActiveInputEditor";
import InputTypeSelector from "./InputTypeSelector";
import { inputTypeOptions } from "./input-tab-mock-data";
import type { InputTypeId } from "./input-tab-types";

const readOnlyTypes: InputTypeId[] = ["INPUT_TYPE_3", "INPUT_TYPE_4"];

const InputTab = memo(() => {
  const [selectedType, setSelectedType] = useState<InputTypeId>("INPUT_TYPE_2");

  const selectedOption = useMemo(
    () => inputTypeOptions.find((option) => option.id === selectedType) ?? inputTypeOptions[0],
    [selectedType],
  );
  const isReadOnly = readOnlyTypes.includes(selectedType);

  return (
    <div className="flex min-w-0 flex-1 flex-col overflow-hidden px-4 py-3">
      <div className="mb-3 flex shrink-0 items-start justify-between gap-3">
        <InputTypeSelector value={selectedType} onChange={setSelectedType} />
        <div className="flex items-center gap-2 pt-5">
          {isReadOnly ? (
            <>
              <span className="inline-flex h-8 items-center gap-1.5 rounded-md border border-slate-200 bg-slate-100 px-3 text-[12px] font-medium text-slate-600">
                <Lock className="h-3.5 w-3.5" strokeWidth={2} />
                Read only
              </span>
              <Button type="button" variant="outline" size="sm">
                View catalog
              </Button>
            </>
          ) : (
            <>
              {/* <Button type="button" size="sm">
                <Plus className="h-3.5 w-3.5" />
                Add {selectedOption.label.replace("User-defined ", "")}
              </Button>
              <Button type="button" variant="outline" size="sm">
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </Button> */}
            </>
          )}
        </div>
      </div>

      <div className="mb-3 shrink-0 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-[12px] text-slate-500">
        {isReadOnly
          ? "Catalog items are synced and read-only. Select one or more items to add them to this section."
          : "Create, edit, delete, or select a configured field. Changes are local to this modal preview."}
      </div>

      <div className="min-h-0 flex-1 overflow-hidden">
        <ActiveInputEditor type={selectedType} />
      </div>
    </div>
  );
});

InputTab.displayName = "InputTab";

export default InputTab;
