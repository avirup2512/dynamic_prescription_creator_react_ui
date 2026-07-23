import { SectionTracker } from "./SectionTracker";
import { RowTracker } from "./RowTracker";
import { ColumnTracker } from "./ColumnTracker";
import { InputGroupTracker } from "./InputGroupTracker";
import { InputTracker } from "./InputTracker";

export class TemplateChangeTracker {

    //#region Section

    static addSection(
        updatedTemplate: any,
        section: any,
        sectionType: string
    ) {
        SectionTracker.add(
            updatedTemplate,
            section,
            sectionType
        );
    }

    static updateSection(
        updatedTemplate: any,
        section: any,
        sectionType: string
    ) {
        SectionTracker.update(
            updatedTemplate,
            section,
            sectionType
        );
    }

    static removeSection(
        updatedTemplate: any,
        sectionId: string
    ) {
        SectionTracker.remove(
            updatedTemplate,
            sectionId
        );
    }

    //#endregion

    //#region Row

    static addRow(
        updatedTemplate: any,
        sectionId: string,
        row: any
    ) {
        RowTracker.add(
            updatedTemplate,
            sectionId,
            row
        );
    }

    static updateRow(
        updatedTemplate: any,
        sectionId: string,
        row: any
    ) {
        RowTracker.update(
            updatedTemplate,
            sectionId,
            row
        );
    }

    static removeRow(
        updatedTemplate: any,
        sectionId: string,
        rowId: string
    ) {
        RowTracker.remove(
            updatedTemplate,
            sectionId,
            rowId
        );
    }

    //#endregion

    //#region Column

    static addColumn(
        updatedTemplate: any,
        sectionId: string,
        rowId: string,
        column: any
    ) {
        ColumnTracker.add(
            updatedTemplate,
            sectionId,
            rowId,
            column
        );
    }

    static updateColumn(
        updatedTemplate: any,
        sectionId: string,
        rowId: string,
        column: any
    ) {
        ColumnTracker.update(
            updatedTemplate,
            sectionId,
            rowId,
            column
        );
    }

    static removeColumn(
        updatedTemplate: any,
        sectionId: string,
        rowId: string,
        columnId: string
    ) {
        ColumnTracker.remove(
            updatedTemplate,
            sectionId,
            rowId,
            columnId
        );
    }

    //#endregion

    //#region Input Group

    static addGroup(
        updatedTemplate: any,
        sectionId: string,
        rowId: string,
        columnId: string,
        group: any
    ) {
        InputGroupTracker.add(
            updatedTemplate,
            sectionId,
            rowId,
            columnId,
            group
        );
    }

    static updateGroup(
        updatedTemplate: any,
        sectionId: string,
        rowId: string,
        columnId: string,
        group: any
    ) {
        InputGroupTracker.update(
            updatedTemplate,
            sectionId,
            rowId,
            columnId,
            group
        );
    }

    static removeGroup(
        updatedTemplate: any,
        sectionId: string,
        rowId: string,
        columnId: string,
        groupId: string
    ) {
        InputGroupTracker.remove(
            updatedTemplate,
            sectionId,
            rowId,
            columnId,
            groupId
        );
    }

    //#endregion

    //#region Input

    static addInput(
        updatedTemplate: any,
        sectionId: string,
        rowId: string,
        columnId: string,
        groupId: string,
        input: any
    ) {
        InputTracker.add(
            updatedTemplate,
            sectionId,
            rowId,
            columnId,
            groupId,
            input
        );
    }

    static updateInput(
        updatedTemplate: any,
        sectionId: string,
        rowId: string,
        columnId: string,
        groupId: string,
        input: any
    ) {
        InputTracker.update(
            updatedTemplate,
            sectionId,
            rowId,
            columnId,
            groupId,
            input
        );
    }

    static removeInput(
        updatedTemplate: any,
        sectionId: string,
        rowId: string,
        columnId: string,
        groupId: string,
        inputId: string
    ) {
        InputTracker.remove(
            updatedTemplate,
            sectionId,
            rowId,
            columnId,
            groupId,
            inputId
        );
    }
    //#endregion
}