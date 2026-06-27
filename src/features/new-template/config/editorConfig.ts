export const editorConfig = {
    field: {
        general: [
            {
                type: "input",
                label: "Label",
            },

            {
                type: "input",
                label: "Placeholder",
            },

            {
                type: "switch",
                label: "Required",
            },

            {
                type: "switch",
                label: "Readonly",
            },

            {
                type: "switch",
                label: "Hidden",
            },
        ],

        style: [
            {
                type: "select",
                label: "Width",

                options: [
                    "Auto",
                    "Full",
                    "25%",
                    "50%",
                    "75%",
                    "100%",
                ],
            },

            {
                type: "select",
                label: "Label Position",

                options: [
                    "Top",
                    "Left",
                    "Hidden",
                ],
            },
        ],

        logic: [],
    },

    section: {
        general: [
            {
                type: "input",
                label: "Section Name",
            },
        ],

        style: [],
    },

    column: {
        general: [
            {
                type: "select",
                label: "Width",

                options: [
                    "25%",
                    "50%",
                    "75%",
                    "100%",
                ],
            },
        ],
    },

    alternative: {
        general: [
            {
                type: "input",
                label: "Alternative Name",
            },
        ],
    },
};