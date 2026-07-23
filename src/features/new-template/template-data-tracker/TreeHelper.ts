export class TreeHelper {

    /**
     * Finds an entity by its ID from any array.
     */
    static findById<T extends Record<string, any>>(
        array: T[] | undefined,
        idKey: keyof T,
        id: string
    ): T | null {

        if (!array?.length)
            return null;

        return (
            array.find(item => item[idKey] === id) ?? null
        );
    }

    static findSection(template: any, sectionId: string) {

        const sections = [
            ...(template.header ?? []),
            ...(template.body ?? []),
            ...(template.footer ?? [])
        ];

        return this.findById(
            sections,
            "template_section_id",
            sectionId
        );
    }

    static findRow(section: any, rowId: string) {

        return this.findById(
            section?.rows,
            "template_row_id",
            rowId
        );
    }

    static findColumn(row: any, columnId: string) {

        return this.findById(
            row?.columns,
            "template_column_id",
            columnId
        );
    }

    static findInputGroup(column: any, groupId: string) {

        return this.findById(
            column?.inputGroup,
            "template_input_group_id",
            groupId
        );
    }

    static findInput(group: any, inputId: string) {

        return this.findById(
            group?.inputs,
            "template_input_id",
            inputId
        );
    }

}