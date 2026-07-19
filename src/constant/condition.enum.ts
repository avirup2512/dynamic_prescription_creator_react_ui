export const CONDITION_TYPE = {
    OR: "Or",
    AND: "And",
    FROM_TO: "FromTo",
    TO: "To",
    PLUS: "Plus",
    WITH: "With",
    BEFORE: "Before",
    AFTER: "After",
    FOLLOWED_BY: "FollowedBy",
    REPLACE_WITH: "ReplaceWith",
    "IF": "If",
    "AVOID": "Avoid",
} as const;

export type ConditionType =
    (typeof CONDITION_TYPE)[keyof typeof CONDITION_TYPE];