import type { UpdateTemplateType } from "../type/TemplateType";

export class AggregateHelper {

    /**
     * Returns the SectionAdd object if the section is NEW.
     */
    static getNewSection(
        updatedTemplate: UpdateTemplateType,
        sectionId: string
    ) {

        return updatedTemplate.UpdatedSections?.find(
            item =>
                item.type === "SectionAdd" &&
                item.section.template_section_id === sectionId
        );
    }

    /**
     * Is this section newly created?
     */
    static isNewSection(
        updatedTemplate: UpdateTemplateType,
        sectionId: string
    ): boolean {

        return !!this.getNewSection(
            updatedTemplate,
            sectionId
        );
    }

    /**
     * Execute proper action depending on whether
     * the parent section is NEW or already persisted.
     */
    static executeOnAggregate(
        updatedTemplate: UpdateTemplateType,
        sectionId: string,
        aggregateAction: (section: any) => void,
        trackerAction: () => void
    ) {

        const sectionAdd = this.getNewSection(
            updatedTemplate,
            sectionId
        );

        if (sectionAdd) {

            aggregateAction(sectionAdd.section);

            return;
        }

        trackerAction();
    }

}