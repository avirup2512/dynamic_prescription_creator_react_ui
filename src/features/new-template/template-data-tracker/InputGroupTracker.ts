import { AggregateHelper } from "./AggregateHelper";
import { TrackerHelper } from "./TrackerHelper";
import { TEMPLATE_OPERATION } from "@/constant/template-operation.enum";

export class InputGroupTracker {

    //#region Add

    static add(
        updatedTemplate: any,
        sectionId: string,
        rowId: string,
        columnId: string,
        inputGroup: any
    ) {

        AggregateHelper.executeOnAggregate(

            updatedTemplate,

            sectionId,

            (section) => {

                const row = section.rows.find(
                    (r: any) => r.template_row_id === rowId
                );

                if (!row)
                    return;

                const column = row.columns.find(
                    (c: any) => c.template_column_id === columnId
                );

                if (!column)
                    return;

                column.inputGroup.push(inputGroup);

            },

            () => {

                TrackerHelper.upsert({

                    list: updatedTemplate.UpdatedInputGroups,

                    payload: {

                        type: TEMPLATE_OPERATION.GROUP_ADD,

                        template_column_id: columnId,
                        template_row_id: rowId,
                        template_section_id: sectionId,

                        inputGroup

                    },

                    nestedKey: "inputGroup",

                    idKey: "template_input_group_id"

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
        inputGroup: any
    ) {

        AggregateHelper.executeOnAggregate(

            updatedTemplate,

            sectionId,

            (section) => {

                const row = section.rows.find(
                    (r: any) => r.template_row_id === rowId
                );

                if (!row)
                    return;

                const column = row.columns.find(
                    (c: any) => c.template_column_id === columnId
                );

                if (!column)
                    return;

                const existing = column.inputGroup.find(
                    (g: any) =>
                        g.template_input_group_id ===
                        inputGroup.template_input_group_id
                );

                if (!existing)
                    return;

                Object.assign(existing, inputGroup);

            },

            () => {

                TrackerHelper.upsert({

                    list: updatedTemplate.UpdatedInputGroups,

                    payload: {

                        type: TEMPLATE_OPERATION.GROUP_UPDATE,

                        template_column_id: columnId,
                        template_row_id: rowId,
                        template_section_id: sectionId,

                        inputGroup

                    },

                    nestedKey: "inputGroup",

                    idKey: "template_input_group_id"

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
        inputGroupId: string
    ) {
        // Remove all operations related to this row from the changelog
        for (let x in updatedTemplate) {
            updatedTemplate[x] = updatedTemplate[x].filter((module: any) => module.template_input_group_id !== inputGroupId);
        }
        AggregateHelper.executeOnAggregate(

            updatedTemplate,

            sectionId,

            (section) => {

                const row = section.rows.find(
                    (r: any) => r.template_row_id === rowId
                );

                if (!row)
                    return;

                const column = row.columns.find(
                    (c: any) => c.template_column_id === columnId
                );

                if (!column)
                    return;

                column.inputGroup = column.inputGroup.filter(
                    (g: any) =>
                        g.template_input_group_id !== inputGroupId
                );

            },

            () => {

                TrackerHelper.upsert({

                    list: updatedTemplate.UpdatedInputGroups,

                    payload: {

                        type: TEMPLATE_OPERATION.GROUP_REMOVE,

                        template_input_group_id: inputGroupId

                    },

                    nestedKey: "template_input_group_id",

                    idKey: "template_input_group_id"

                });

            }

        );

    }

    //#endregion

}