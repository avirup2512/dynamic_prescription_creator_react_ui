import { TEMPLATE_OPERATION } from "@/constant/template-operation.enum";
import type { UpdateTemplateType } from "../type/TemplateType";

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
type UpdateTrackerOptions = {
    listKey: keyof UpdateTemplateType;
    nestedKey: string;
    idKey: string;
    payload: Record<string, any>;
};

export const UpdateTracker = (
    template: UpdateTemplateType,
    {
        listKey,
        nestedKey,
        idKey,
        payload,
    }: UpdateTrackerOptions
) => {
    const list = (template[listKey] ??= []) as Record<string, any>[];

    const id = payload[nestedKey][idKey];

    const index = list.findIndex(
        entry => entry?.[nestedKey]?.[idKey] === id
    );

    if (index !== -1) {
        list[index] = payload;      // Replace the whole payload
    } else {
        list.push(payload);
    }
};

export interface AggregateContext {
    updatedTemplate: UpdateTemplateType;
}

export function updateAggregateOrTrack<T>({
    context,
    entityId,
    entityType,
    parentSectionId,
    callback,
    tracker,
}: {
    context: AggregateContext;
    entityId: string;
    entityType: "section" | "row" | "column" | "group" | "input";
    parentSectionId: string;
    callback: (section: any) => void;
    tracker: () => void;
}) {

    const addedSection = context.updatedTemplate.UpdatedSections?.find(
        x =>
            x.type === TEMPLATE_OPERATION.SECTION_ADD &&
            x.section.template_section_id === parentSectionId
    );

    if (addedSection) {

        callback(addedSection.section);

        return;
    }

    tracker();
}