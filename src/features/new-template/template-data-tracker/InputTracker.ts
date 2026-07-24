import { AggregateHelper } from "./AggregateHelper";
import { TrackerHelper } from "./TrackerHelper";
import { TreeHelper } from "./TreeHelper";
import { TEMPLATE_OPERATION } from "@/constant/template-operation.enum";

export class InputTracker {

    //#region Add

    static add(
        updatedTemplate: any,
        sectionId: string,
        rowId: string,
        columnId: string,
        groupId: string,
        input: any
    ) {

        AggregateHelper.executeOnAggregate(

            updatedTemplate,

            sectionId,

            (section) => {

                const row = TreeHelper.findRow(section, rowId);
                if (!row) return;

                const column = TreeHelper.findColumn(row, columnId);
                if (!column) return;

                const group = TreeHelper.findInputGroup(column, groupId);
                if (!group) return;

                group.inputs.push(input);

            },

            () => {

                TrackerHelper.upsert({

                    list: updatedTemplate.UpdatedInputs,

                    payload: {

                        type: TEMPLATE_OPERATION.INPUT_ADD,

                        template_input_group_id: groupId,
                        template_column_id: columnId,
                        template_row_id: rowId,
                        template_section_id: sectionId,

                        input

                    },

                    nestedKey: "input",

                    idKey: "template_input_id"

                });

            }

        );

    }

    //#endregion

    //#region Update

    static update(
        updatedTemplate: any,
        sectionId: string,
        rowId: string,
        columnId: string,
        groupId: string,
        input: any
    ) {
        console.log("CALLED====================")
        AggregateHelper.executeOnAggregate(

            updatedTemplate,

            sectionId,

            (section) => {

                const row = TreeHelper.findRow(section, rowId);
                if (!row) return;

                const column = TreeHelper.findColumn(row, columnId);
                if (!column) return;

                const group = TreeHelper.findInputGroup(column, groupId);
                if (!group) return;

                const existing = TreeHelper.findInput(
                    group,
                    input.template_input_id
                );

                if (!existing) return;

                Object.assign(existing, input);

            },

            () => {

                TrackerHelper.upsert({

                    list: updatedTemplate.UpdatedInputs,

                    payload: {

                        type: TEMPLATE_OPERATION.INPUT_UPDATE,

                        template_input_group_id: groupId,
                        template_column_id: columnId,
                        template_row_id: rowId,
                        template_section_id: sectionId,

                        input

                    },

                    nestedKey: "input",

                    idKey: "template_input_id"

                });

            }

        );

    }

    //#endregion

    //#region Remove

    static remove(
        updatedTemplate: any,
        sectionId: string,
        rowId: string,
        columnId: string,
        groupId: string,
        inputId: string
    ) {

        AggregateHelper.executeOnAggregate(

            updatedTemplate,

            sectionId,

            (section) => {

                const row = TreeHelper.findRow(section, rowId);
                if (!row) return;

                const column = TreeHelper.findColumn(row, columnId);
                if (!column) return;

                const group = TreeHelper.findInputGroup(column, groupId);
                if (!group) return;

                group.inputs = group.inputs.filter(
                    (input: any) =>
                        input.template_input_id !== inputId
                );

            },

            () => {

                TrackerHelper.upsert({

                    list: updatedTemplate.UpdatedInputs,

                    payload: {

                        type: TEMPLATE_OPERATION.INPUT_REMOVE,

                        template_input_id: inputId

                    },

                    nestedKey: "template_input_id",

                    idKey: "template_input_id"

                });

            }

        );

    }

    //#endregion

}