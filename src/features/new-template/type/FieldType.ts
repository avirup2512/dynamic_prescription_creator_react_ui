export interface FieldGeneralConfig {
    required?: boolean;
    readonly?: boolean;
    hidden?: boolean;
}

export interface FieldStyleConfig {
    width?: "auto" | "full";
    labelPosition?: "top" | "left";
    printable?: boolean;
}

export interface FieldLogicConfig {
    orConditions?: OrCondition[];
}

export interface OrCondition {
    id: string;

    fieldId: string;

    operator:
    | "equals"
    | "not_equals"
    | "contains";

    value: string;
}