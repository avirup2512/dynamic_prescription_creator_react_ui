import { TEMPLATE_OPERATION } from "@/constant/template-operation.enum";
import { AggregateHelper } from "./AggregateHelper";
import { TrackerHelper } from "./TrackerHelper";

export class SectionTracker {

    //#region Add

    static add(
        updatedTemplate: any,
        section: any,
        sectionType: "header" | "body" | "footer"
    ) {

        TrackerHelper.upsert({

            list: updatedTemplate.UpdatedSections,
            payload: {
                type: TEMPLATE_OPERATION.SECTION_ADD,
                sectionType,
                section
            },
            nestedKey: "section",
            idKey: "template_section_id"
        });
    }

    //#endregion

    //#region Update

    static update(
        updatedTemplate: any,
        section: any,
        sectionType: "header" | "body" | "footer"
    ) {

        AggregateHelper.executeOnAggregate(
            updatedTemplate,
            section.template_section_id,
            (existingSection) => {
                Object.assign(existingSection, section);
            },
            () => {
                TrackerHelper.upsert({
                    list: updatedTemplate.UpdatedSections,
                    payload: {
                        type: TEMPLATE_OPERATION.SECTION_UPDATE,
                        sectionType,
                        section
                    },
                    nestedKey: "section",
                    idKey: "template_section_id"
                });
            }
        );
    }

    //#endregion

    //#region Remove

    static remove(
        updatedTemplate: any,
        sectionId: string
    ) {
        // Remove all operations related to this section from the changelog
        for (let x in updatedTemplate) {
            updatedTemplate[x] = updatedTemplate[x].filter((module: any) => module.template_section_id !== sectionId);
        }
        // Check if the section is new or existing
        const sectionAdd = AggregateHelper.getNewSection(
            updatedTemplate,
            sectionId
        );

        /**
         * Section was never saved.
         * Remove SectionAdd completely.
         */
        if (sectionAdd) {
            TrackerHelper.remove({
                list: updatedTemplate.UpdatedSections,
                nestedKey: "section",
                idKey: "template_section_id",
                id: sectionId
            });

            return;
        }

        /**
         * Existing section. 
         */
        TrackerHelper.upsert({

            list: updatedTemplate.UpdatedSections,
            payload: {
                type: TEMPLATE_OPERATION.SECTION_REMOVE,
                template_section_id: sectionId
            },
            nestedKey: "template_section_id",
            idKey: "template_section_id"
        });

    }
    //#endregion

}