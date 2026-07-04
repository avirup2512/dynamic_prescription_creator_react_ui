export const redefineTemplate = (template: any) => {
    for (let x = 0; x < template?.header?.length; x++) {
        const sectionChild = template?.header[x];
        sectionChild.kind = "section"
        sectionChild.label = template?.header[x].name
        template?.header[x].rows.forEach((row: any) => {
            row.kind = "row"
            row.label = row.row_name;
            row.columns.forEach((col: any) => {
                col.kind = "column"
                col.label = col.column_name
            })
        });
    }
    for (let x = 0; x < template?.body?.length; x++) {
        const sectionChild = template?.body[x];
        sectionChild.kind = "section"
        sectionChild.label = template?.body[x].name
        template?.body[x].rows.forEach((row: any) => {
            row.kind = "row"
            row.label = row.row_name;
            row.columns.forEach((col: any) => {
                col.kind = "column"
                col.label = col.column_name
            })
        });
    }
    return template;
}