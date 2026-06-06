export const INPUT_TYPE= {
    INPUTTYPE_1 : "INPUT_TYPE_1",
    INPUTTYPE_2 : "INPUT_TYPE_2",
    INPUTTYPE_3 : "INPUT_TYPE_3",
} as const;

export type InputType =
  (typeof INPUT_TYPE)[keyof typeof INPUT_TYPE];