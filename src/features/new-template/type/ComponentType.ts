export type ColumnCount = 1 | 2 | 3;

export interface Field {
    id: number;
    name: string;
    type: 'Text' | 'Date' | 'Dropdown' | 'Tel' | 'Email';
    required: boolean;
}

export interface Row {
    id: number;
    name: string;
}

export interface TabNavigationProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export interface SectionHeaderProps {
    sectionName: string;
    setSectionName: (name: string) => void;
    description: string;
    setDescription: (desc: string) => void;
}

export interface FieldItemProps {
    field: Field;
    onDelete: (fieldId: number) => void;
}

export interface FieldsListProps {
    fields: Field[];
    onDeleteField: (fieldId: number) => void;
}

export interface RowItemProps {
    row: Row;
    onDelete: (rowId: number) => void;
    onAddColumn: (rowId: number) => void;
}

export interface RowsColumnsSectionProps {
    rows: Row[];
    onDeleteRow: (rowId: number) => void;
    onAddColumn: (rowId: number) => void;
}

export interface ActionButtonsProps {
    onCancel: () => void;
    onSave: () => void;
}

export interface ShieldProps {
    size?: number;
}