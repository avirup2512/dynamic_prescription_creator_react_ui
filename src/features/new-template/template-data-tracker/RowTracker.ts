import { TEMPLATE_OPERATION } from "@/constant/template-operation.enum";
import { AggregateHelper } from "./AggregateHelper";
import { TrackerHelper } from "./TrackerHelper";

export class RowTracker {

    //#region Add

    static add(
        updatedTemplate: any,
        sectionId: string,
        row: any
    ) {

        AggregateHelper.executeOnAggregate(

            updatedTemplate,

            sectionId,

            (section) => {

                section.rows.push(row);

            },

            () => {

                TrackerHelper.upsert({

                    list: updatedTemplate.UpdatedRows,

                    payload: {

                        type: TEMPLATE_OPERATION.ROW_ADD,

                        template_section_id: sectionId,

                        row

                    },

                    nestedKey: "row",

                    idKey: "template_row_id"

                });

            }

        );

    }

    //#endregion

    //#region Update

    static update(
        updatedTemplate: any,
        sectionId: string,
        row: any
    ) {

        AggregateHelper.executeOnAggregate(

            updatedTemplate,

            sectionId,

            (section) => {

                const existing = section.rows.find(
                    (r: any) =>
                        r.template_row_id === row.template_row_id
                );

                if (!existing)
                    return;

                Object.assign(existing, row);

            },

            () => {

                TrackerHelper.upsert({

                    list: updatedTemplate.UpdatedRows,

                    payload: {

                        type: TEMPLATE_OPERATION.ROW_UPDATE,

                        template_section_id: sectionId,

                        row

                    },

                    nestedKey: "row",

                    idKey: "template_row_id"

                });

            }

        );

    }

    //#endregion

    //#region Remove

    static remove(
        updatedTemplate: any,
        sectionId: string,
        rowId: string
    ) {
        // Remove all operations related to this row from the changelog
        for (let x in updatedTemplate) {
            updatedTemplate[x] = updatedTemplate[x].filter((module: any) => module.template_row_id !== rowId);
        }
        AggregateHelper.executeOnAggregate(

            updatedTemplate,

            sectionId,

            (section) => {

                section.rows = section.rows.filter(
                    (r: any) =>
                        r.template_row_id !== rowId
                );

            },

            () => {

                TrackerHelper.upsert({

                    list: updatedTemplate.UpdatedRows,

                    payload: {

                        type: TEMPLATE_OPERATION.ROW_REMOVE,

                        template_row_id: rowId

                    },

                    nestedKey: "template_row_id",

                    idKey: "template_row_id"

                });

            }

        );

    }

    //#endregion

}