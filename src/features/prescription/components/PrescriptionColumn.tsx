import { INPUT_TYPE } from "@/constant/inputType.enum";
import { useEffect } from "react";

function PrescriptionColumn({ columnData }: any) {

  const getInputValue = (input: any): string => {
    let inputParentValue = '';
    if (input?.input_type_name === INPUT_TYPE.INPUTTYPE_1) {
      inputParentValue = input?.template_input_value || input?.input_entity_value || '—';
    } else if (input?.input_type_name === INPUT_TYPE.INPUTTYPE_2) {
      if (input?.dropdown_option_value && input?.dropdown_option_value.length) {
        inputParentValue = input.dropdown_option_value;
      }
    }
    return inputParentValue;
  }
  // Derives the display value for a single input object
  const getOrInputValue = (inputParent: any): string[] => {
    return inputParent.or_child.map((input: any) => {
      if (input?.input_type_name === INPUT_TYPE.INPUTTYPE_1) {
        return input?.template_input_value || input?.input_entity_value || '—';
      } else if (input?.input_type_name === INPUT_TYPE.INPUTTYPE_2) {
        if (input?.dropdown_option_value && input?.dropdown_option_value.length) {
          return input.dropdown_option_value;
        }
        const dropdownOption = input?.dropdown_option_values?.find(
          (option: any) => option.id === input?.dropdown_option_id
        );
        return dropdownOption?.value || '—';
      }
      return '—';
    })
  };
  // Derives the quantity option display value for a single input
  const getQuantityValue = (input: any): string => {
    if (!input?.show_quantity) return '-';
    const quantityOption = input?.quantity_option_values?.find(
      (option: any) => option.id === input?.template_input_quantity_option_id
    );
    console.log('Quantity Option:', quantityOption);
    return quantityOption?.value || '-';
  };

  const inputGroups: any[] = columnData?.inputGroup ?? [];
  const inputs: any[] = inputGroups.flatMap((group) => group.inputs ?? []);

  function buildOrTree(inputGroups: any[]) {
    // Clone groups and add or_child to groups and inputs
    const groups = inputGroups.map(group => ({
      ...group,
      or_child: [],
      inputs: group.inputs.map((input: any) => ({
        ...input,
        or_child: []
      }))
    }));

    // Group lookup map
    const groupMap = new Map(
      groups.map(group => [group.template_input_group_id, group])
    );

    // Process inputs inside each group
    groups.forEach(group => {
      const inputMap = new Map(
        group.inputs.map((input: any) => [input.input_id, input])
      );

      const rootInputs: any[] = [];

      group.inputs.forEach((input: any) => {
        if (input.or_input_id) {
          const parent = inputMap.get(input.or_input_id);

          if (parent) {
            parent.or_child.push(input);
          }
        } else {
          rootInputs.push(input);
        }
      });

      group.inputs = rootInputs;
    });

    // Process groups
    const rootGroups: any[] = [];

    groups.forEach(group => {
      if (group.or_input_group_id) {
        const parent = groupMap.get(group.or_input_group_id);

        if (parent) {
          parent.or_child.push(group);
        }
      } else {
        rootGroups.push(group);
      }
    });

    return rootGroups;
  }
  function processInputGroups(inputGroups: any[]) {
    // Sort groups
    const groupChildrenMap = new Map();

    inputGroups.forEach(group => {
      if (group.or_linked_input_group_id) {
        if (!groupChildrenMap.has(group.or_linked_input_group_id)) {
          groupChildrenMap.set(group.or_linked_input_group_id, []);
        }
        groupChildrenMap.get(group.or_linked_input_group_id).push(group);
      }
    });

    const sortedGroups: any[] = [];

    inputGroups.forEach(group => {
      if (!group.or_linked_input_group_id) {
        sortedGroups.push(group);

        const children = groupChildrenMap.get(group.template_group_id);
        if (children) {
          sortedGroups.push(...children);
        }
      }
    });

    // Process inputs of each group
    sortedGroups.forEach(group => {
      const inputMap = new Map(
        group.inputs.map((input: any) => [
          input.input_id,
          { ...input, or_child: [] }
        ])
      );

      const rootInputs: any[] = [];

      group.inputs.forEach((input: any) => {
        const currentInput = inputMap.get(input.input_id);

        if (input.or_input_id) {
          const parent = inputMap.get(input.or_input_id);

          if (parent) {
            parent.or_child.push(currentInput);
          }
        } else {
          rootInputs.push(currentInput);
        }
      });

      group.inputs = rootInputs;
    });

    return sortedGroups;
  }
  const modifiedInputGroups = processInputGroups(JSON.parse(JSON.stringify(inputGroups)));
  console.log(modifiedInputGroups);

  return (
    <div className="space-y-4 text-slate-900">
      {modifiedInputGroups.map((group, groupIndex) => {
        return (
          <>
            {
              group?.or_input_group_id && <p className="mt-4"><b>OR </b></p>
            }
            {
              group.inputs.map((input: any, inputIndex: number) => {
                // All inputs in a group share the same label, bold, font_size, show_label,
                // extra_note, and show_quantity — read from the first (parent) input
                // const primary = input;
                const isBold = input?.is_bold === 1 || input?.is_bold === true;
                const showLabel = input?.show_label === 1 || input?.show_label === true;
                const showQuantity = input?.show_quantity === 1 || input?.show_quantity === true;
                const textStyle = {
                  fontSize: input?.font_size ? `${input.font_size}px` : undefined,
                  fontWeight: isBold ? '700' : '400',
                };

                // Build slash-separated value string across all inputs in the group
                const inputParentValue = getInputValue(input);
                const combinedValue = getOrInputValue(input).join(" / ");

                // Quantity: show only from parent input (all OR'd inputs share same quantity context)
                const quantityOptionValue = getQuantityValue(input);

                // Extra note: show if any input in the group has one
                let extraNote = input.or_child.find(
                  (inp) =>
                    (inp?.extra_note === 1 || inp?.extra_note === true) &&
                    (inp?.template_input_extranotes || inp?.extra_note_value)
                );

                return (
                  <div key={input?.input_id || groupIndex} className="space-y-1 mb-0">
                    <div className="leading-7 flex justify-start items-center gap-3" style={textStyle}>
                      {showLabel && input?.input_entity_name && (
                        <span
                          className="font-semibold mr-1 text-slate-800"
                          style={{ fontWeight: '700' }}
                        >
                          {input.input_entity_name}:
                        </span>
                      )}

                      {/* Slash-separated values for OR-grouped inputs */}
                      <span>{inputParentValue}{combinedValue.length > 0 && " / " + combinedValue}</span>

                      {showQuantity && input?.template_quantity_value && (
                        <span className="text-sm leading-6 text-slate-600">
                          {input.template_quantity_value} {quantityOptionValue}
                        </span>
                      )}
                    </div>

                    {input?.extra_note == 1 && (
                      <p className="text-sm italic leading-6 text-slate-600">
                        {input.template_input_extranotes || input.extra_note_value}
                      </p>
                    )}
                  </div>
                );
              })
            }
            {
              group?.or_child && group.or_child.length > 0 && group.or_child.map
            }
          </>
        )
      })}
    </div>
  );
}

export default PrescriptionColumn;
