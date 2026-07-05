import { useSelector } from "react-redux";
import type { CanvasSection, CanvasSelection } from "./prescriptionCanvasTypes";
import SectionRenderer from "./SectionRenderer";

interface EditLayerProps {
    sections: CanvasSection[];
    selection: CanvasSelection;
    onSelect: (selection: CanvasSelection) => void;
    onOpenSectionEditor: (sectionId: string) => void;
    onCopySection: (sectionId: string) => void;
    onDeleteSection: (sectionId: string) => void;
    onHideSection: (sectionId: string) => void;
    onAddRow: (sectionId: string) => void;
    onDeleteRow: (sectionId: string, rowId: string) => void;
    onHideRow: (sectionId: string, rowId: string) => void;
    onAddColumn: (sectionId: string, rowId: string) => void;
    onDeleteColumn: (sectionId: string, rowId: string, columnId: string) => void;
    onHideColumn: (sectionId: string, rowId: string, columnId: string) => void;
    onQuickStyleInput: (sectionId: string, rowId: string, columnId: string, inputId: string) => void;
    onOpenFieldEditor: (inputId: string) => void;
}

export default function EditLayer({ sections, selection, onSelect, onOpenSectionEditor, onCopySection, onDeleteSection, onHideSection, onAddRow, onDeleteRow, onHideRow, onAddColumn, onDeleteColumn, onHideColumn, onQuickStyleInput, onOpenFieldEditor }: EditLayerProps) {
    const TemplateState = useSelector((state: any) => state.template);

    return (
        <div>
            {
                TemplateState?.CurrentTemplate?.header?.map((sections: any) => {
                    return (
                        <SectionRenderer
                            key={sections.id}
                            section={sections}
                            sectionType="header"
                            mode="edit"
                            selection={selection}
                            onSelect={onSelect}
                            onOpenSectionEditor={onOpenSectionEditor}
                            onCopySection={onCopySection}
                            onDeleteSection={onDeleteSection}
                            onHideSection={onHideSection}
                            onAddRow={onAddRow}
                            onDeleteRow={onDeleteRow}
                            onHideRow={onHideRow}
                            onAddColumn={onAddColumn}
                            onDeleteColumn={onDeleteColumn}
                            onHideColumn={onHideColumn}
                            onQuickStyleInput={onQuickStyleInput}
                            onOpenFieldEditor={onOpenFieldEditor}
                        />
                    )
                })
            }
        </div>
    );
}
