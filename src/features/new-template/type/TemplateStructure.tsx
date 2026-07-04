export type StatusColor = "blue" | "green" | "amber" | "none";

export interface LeafFieldData {
    kind: "field";
    id: string;
    label: string;
    icon: React.ElementType;
}
export interface InputGroupData {
    kind: "column";
    id: string;
    label: string;
    icon: React.ElementType;
    groupLabel: string;
    groupIcon: React.ElementType;
    inputs: string[];
}
export interface ColumnData {
    kind: "column";
    id: string;
    label: string;
    icon: React.ElementType;
    groupLabel: string;
    groupIcon: React.ElementType;
    inputGroup: string[];
}

export interface RowData {
    kind: "row";
    id: string;
    label: string;
    columns: ColumnData[];
}

export interface SectionItem {
    kind: "section";
    id: string;
    label: string;
    icon: React.ElementType;
    iconBg: string;
    iconColor: string;
    fieldsCount?: number;
    section_id?: string,
    template_section_id?: string,
    status?: StatusColor;
    isVisible?: boolean;
    selected?: boolean;
    rows?: RowData[];
}

export interface SimpleField {
    kind: "simpleField";
    id: string;
    label: string;
}

export interface FolderGroup {
    kind: "folder";
    id: string;
    label: string;
    count: number;
    children: (SimpleField | SectionItem)[];
}