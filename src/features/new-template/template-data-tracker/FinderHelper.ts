export interface FindResult<
    TSection = any,
    TRow = any,
    TColumn = any,
    TGroup = any,
    TInput = any
> {
    section?: TSection;
    row?: TRow;
    column?: TColumn;
    inputGroup?: TGroup;
    input?: TInput;
}
export class FinderHelper {

    //#region Section

    static findSection(template: any, sectionId: string): FindResult {

        const sections = [
            ...(template.header ?? []),
            ...(template.body ?? []),
            ...(template.footer ?? [])
        ];
        const section = sections.find(
            (s) => s.template_section_id === sectionId
        );
        return {
            section
        };
    }
    //#endregion

    //#region Row

    static findRow(template: any, rowId: string): FindResult {

        const sections = [
            ...(template.header ?? []),
            ...(template.body ?? []),
            ...(template.footer ?? [])
        ];
        for (const section of sections) {

            const row = section.rows?.find(
                (r: any) => r.template_row_id === rowId
            );
            if (row) {
                return {
                    section,
                    row
                };
            }
        }
        return {};
    }

    //#endregion

    //#region Column

    static findColumn(template: any, columnId: string): FindResult {
        const sections = [
            ...(template.header ?? []),
            ...(template.body ?? []),
            ...(template.footer ?? [])
        ];
        for (const section of sections) {
            for (const row of section.rows ?? []) {
                const column = row.columns?.find(
                    (c: any) =>
                        c.template_column_id === columnId
                );
                if (column) {
                    return {
                        section, row, column
                    };
                }
            }
        }
        return {};
    }

    //#endregion

    //#region Group

    static findGroup(template: any, groupId: string): FindResult {
        const sections = [
            ...(template.header ?? []),
            ...(template.body ?? []),
            ...(template.footer ?? [])
        ];
        for (const section of sections) {
            for (const row of section.rows ?? []) {
                for (const column of row.columns ?? []) {
                    const group = column.inputGroup?.find(
                        (g: any) =>
                            g.template_input_group_id === groupId
                    );
                    if (group) {
                        return {
                            section, row, column, inputGroup: group
                        };
                    }
                }
            }
        }
        return {};
    }

    //#endregion

    //#region Input

    static findInput(template: any, inputId: string): FindResult {

        const sections = [
            ...(template.header ?? []),
            ...(template.body ?? []),
            ...(template.footer ?? [])
        ];
        for (const section of sections) {
            for (const row of section.rows ?? []) {
                for (const column of row.columns ?? []) {
                    for (const group of column.inputGroup ?? []) {
                        const input = group.inputs?.find(
                            (i: any) =>
                                i.template_input_id === inputId
                        );
                        if (input) {
                            return {
                                section, row, column, inputGroup: group, input
                            };
                        }
                    }
                }
            }
        }
        return {};
    }
    //#endregion
}