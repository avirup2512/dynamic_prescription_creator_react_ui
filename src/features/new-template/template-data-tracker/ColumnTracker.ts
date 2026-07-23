import { AggregateHelper } from "./AggregateHelper";
import { TrackerHelper } from "./TrackerHelper";
import { TEMPLATE_OPERATION } from "@/constant/template-operation.enum";

export class ColumnTracker {

    //#region Add

    static add(
        updatedTemplate: any,
        sectionId: string,
        rowId: string,
        column: any
    ) {

        AggregateHelper.executeOnAggregate(

            updatedTemplate,

            sectionId,

            (section) => {

                const row = section.rows.find(
                    (r: any) =>
                        r.template_row_id === rowId
                );

                if (!row)
                    return;

                row.columns.push(column);

            },

            () => {

                TrackerHelper.upsert({

                    list: updatedTemplate.UpdatedColumns,

                    payload: {

                        type: TEMPLATE_OPERATION.COLUMN_ADD,

                        template_row_id: rowId,
                        template_section_id: sectionId,

                        column

                    },

                    nestedKey: "column",

                    idKey: "template_column_id"

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
        column: any
    ) {

        AggregateHelper.executeOnAggregate(

            updatedTemplate,

            sectionId,

            (section) => {

                const row = section.rows.find(
                    (r: any) =>
                        r.template_row_id === rowId
                );

                if (!row)
                    return;

                const existing = row.columns.find(
                    (c: any) =>
                        c.template_column_id === column.template_column_id
                );

                if (!existing)
                    return;

                Object.assign(existing, column);

            },

            () => {

                TrackerHelper.upsert({

                    list: updatedTemplate.UpdatedColumns,

                    payload: {

                        type: TEMPLATE_OPERATION.COLUMN_UPDATE,

                        template_row_id: rowId,
                        template_section_id: sectionId,

                        column

                    },

                    nestedKey: "column",

                    idKey: "template_column_id"

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
        columnId: string
    ) {
        // Remove all operations related to this row from the changelog
        for (let x in updatedTemplate) {
            updatedTemplate[x] = updatedTemplate[x].filter((module: any) => module.template_column_id !== columnId);
        }
        AggregateHelper.executeOnAggregate(

            updatedTemplate,

            sectionId,

            (section) => {

                const row = section.rows.find(
                    (r: any) =>
                        r.template_row_id === rowId
                );

                if (!row)
                    return;

                row.columns = row.columns.filter(
                    (c: any) =>
                        c.template_column_id !== columnId
                );

            },

            () => {

                TrackerHelper.upsert({

                    list: updatedTemplate.UpdatedColumns,

                    payload: {

                        type: TEMPLATE_OPERATION.COLUMN_REMOVE,

                        template_row_id: rowId,
                        template_section_id: sectionId

                    },

                    nestedKey: "template_column_id",

                    idKey: "template_column_id"

                });

            }

        );

    }

    //#endregion

}