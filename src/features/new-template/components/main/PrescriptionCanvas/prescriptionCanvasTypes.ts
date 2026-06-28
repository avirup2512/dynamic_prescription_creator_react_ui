export type CanvasMode = "edit" | "preview";
export type TemplateArea = "header" | "body" | "footer";

export interface CanvasInput {
    id: string;
    label: string;
    value?: string;
    note?: string;
    type?: string;
    showLabel?: boolean;
    isBold?: boolean;
    fontSize?: string;
    variant?: "field" | "clinic" | "address" | "metric" | "medicines" | "tests" | "list" | "signature";
    meta?: string;
    items?: Array<Record<string, string>>;
}

export interface CanvasInputGroup {
    id: string;
    relation?: "or";
    inputs: CanvasInput[];
}

export interface CanvasColumn {
    id: string;
    isVisible?: boolean;
    width?: string;
    inputGroups: CanvasInputGroup[];
}

export interface CanvasRow {
    id: string;
    isVisible?: boolean;
    columns: CanvasColumn[];
}

export interface CanvasSection {
    id: string;
    name: string;
    area: TemplateArea;
    isVisible?: boolean;
    rows: CanvasRow[];
}

export interface CanvasPage {
    id: string;
    sections: CanvasSection[];
}

export interface CanvasSelection {
    sectionId?: string;
    rowId?: string;
    columnId?: string;
    inputId?: string;
}
