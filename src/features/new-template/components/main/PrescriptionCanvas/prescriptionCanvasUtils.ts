import type { CanvasColumn, CanvasInput, CanvasInputGroup, CanvasPage, CanvasRow, CanvasSection, TemplateArea } from "./prescriptionCanvasTypes";

type UnknownRecord = Record<string, unknown>;

const areaOrder: TemplateArea[] = ["header", "body", "footer"];

function isRecord(value: unknown): value is UnknownRecord {
    return typeof value === "object" && value !== null;
}

function getString(value: unknown, fallback = "") {
    return typeof value === "string" && value.trim().length > 0 ? value : fallback;
}

function getArray(value: unknown): unknown[] {
    return Array.isArray(value) ? value : [];
}

function stableId(prefix: string, value: unknown, index: number) {
    if (isRecord(value)) {
        return getString(value.id, getString(value.section_id, getString(value.template_row_id, getString(value.input_id, `${prefix}-${index}`))));
    }

    return `${prefix}-${index}`;
}

function normalizeInput(input: unknown, inputIndex: number): CanvasInput {
    if (!isRecord(input)) {
        return {
            id: `input-${inputIndex}`,
            label: `Field ${inputIndex + 1}`,
            value: "",
            showLabel: true,
        };
    }

    const label = getString(input.input_entity_name, getString(input.label, getString(input.name, `Field ${inputIndex + 1}`)));
    const value = getString(
        input.template_input_value,
        getString(input.input_entity_value, getString(input.dropdown_option_value, getString(input.quantityTextValue, getString(input.value, ""))))
    );

    return {
        id: stableId("input", input, inputIndex),
        label,
        value,
        note: getString(input.template_input_extranotes, getString(input.extra_note_value, getString(input.quantity_name, ""))),
        type: getString(input.input_type_name, getString(input.type, "")),
        showLabel: input.show_label !== false,
        isBold: input.is_bold === true,
        fontSize: getString(input.font_size, ""),
    };
}

function normalizeInputGroup(group: unknown, groupIndex: number): CanvasInputGroup {
    if (!isRecord(group)) {
        return { id: `group-${groupIndex}`, inputs: [] };
    }

    return {
        id: stableId("group", group, groupIndex),
        relation: group.relation === "or" ? "or" : undefined,
        inputs: getArray(group.inputs).map(normalizeInput),
    };
}

function normalizeColumn(column: unknown, columnIndex: number): CanvasColumn {
    if (!isRecord(column)) {
        return { id: `column-${columnIndex}`, inputGroups: [] };
    }

    const inputGroups = getArray(column.inputGroup ?? column.inputGroups).map(normalizeInputGroup);

    return {
        id: stableId("column", column, columnIndex),
        width: getString(column.width, ""),
        inputGroups,
    };
}

function normalizeRow(row: unknown, rowIndex: number): CanvasRow {
    if (!isRecord(row)) {
        return { id: `row-${rowIndex}`, columns: [] };
    }

    return {
        id: stableId("row", row, rowIndex),
        columns: getArray(row.columns).slice(0, 3).map(normalizeColumn),
    };
}

function normalizeSection(section: unknown, area: TemplateArea, sectionIndex: number): CanvasSection {
    if (!isRecord(section)) {
        return {
            id: `${area}-section-${sectionIndex}`,
            area,
            name: `Section ${sectionIndex + 1}`,
            rows: [],
        };
    }

    const rows = getArray(section.rows ?? section.children).map(normalizeRow);

    return {
        id: stableId(`${area}-section`, section, sectionIndex),
        area,
        name: getString(section.name, getString(section.label, `Section ${sectionIndex + 1}`)),
        isVisible: section.isVisible !== false,
        rows,
    };
}

function extractSections(areaValue: unknown, area: TemplateArea): CanvasSection[] {
    if (Array.isArray(areaValue)) {
        return areaValue.map((section, index) => normalizeSection(section, area, index));
    }

    if (isRecord(areaValue)) {
        return getArray(areaValue.children).map((section, index) => normalizeSection(section, area, index));
    }

    return [];
}

function createInput(input: CanvasInput): CanvasInput {
    return input;
}

function group(id: string, inputs: CanvasInput[], relation?: "or"): CanvasInputGroup {
    return { id, relation, inputs };
}

function column(id: string, inputGroups: CanvasInputGroup[]): CanvasColumn {
    return { id, inputGroups };
}

function row(id: string, columns: CanvasColumn[]): CanvasRow {
    return { id, columns };
}

const demoSections: CanvasSection[] = [
    {
        id: "demo-clinic-header",
        name: "Clinic Header",
        area: "header",
        rows: [
            row("header-row", [
                column("clinic", [
                    group("clinic-group", [
                        createInput({
                            id: "clinic-name",
                            label: "Clinic",
                            value: "ST. JUDE MEDICAL CENTER",
                            note: "CARDIOLOGY & DIAGNOSTICS",
                            variant: "clinic",
                        }),
                    ]),
                ]),
                column("clinic-address", [
                    group("address-group", [
                        createInput({
                            id: "address",
                            label: "Address",
                            value: "42nd Ave, Block 7, Sector B\nNew Delhi, 110001\n+91 11 4050 3000",
                            variant: "address",
                        }),
                    ]),
                ]),
            ]),
        ],
    },
    {
        id: "demo-visit-details",
        name: "Visit Details",
        area: "body",
        rows: [
            row("visit-row", [
                column("doctor", [
                    group("doctor-group", [
                        createInput({
                            id: "doctor",
                            label: "Practitioner",
                            value: "Dr. Julian V. Sterling, MD, PhD",
                            note: "Senior Consultant - Interventional Cardiologist",
                        }),
                    ]),
                ]),
                column("patient-date", [
                    group("patient-group", [
                        createInput({ id: "patient-id", label: "Patient ID", value: "#RX-99201", isBold: true }),
                        createInput({ id: "date", label: "Date", value: "October 24, 2024" }),
                    ]),
                ]),
            ]),
        ],
    },
    {
        id: "demo-vitals",
        name: "Vitals",
        area: "body",
        rows: [
            row("vitals-row", [
                column("bp", [group("bp-group", [createInput({ id: "bp", label: "BP (mmHg)", value: "120 / 80", variant: "metric" })])]),
                column("hr", [group("hr-group", [createInput({ id: "hr", label: "HR (bpm)", value: "72", variant: "metric" })])]),
                column("spo2", [group("spo2-group", [createInput({ id: "spo2", label: "SpO2 (%)", value: "99", variant: "metric" })])]),
            ]),
        ],
    },
    {
        id: "demo-assessment",
        name: "Assessment",
        area: "body",
        rows: [
            row("complaint-row", [
                column("complaint", [
                    group("complaint-group", [
                        createInput({
                            id: "chief-complaint",
                            label: "Chief complaint",
                            value: "Episodic chest tightness on exertion, radiating to the left shoulder.",
                        }),
                    ]),
                ]),
            ]),
            row("diagnosis-row", [
                column("diagnosis", [
                    group("diagnosis-group", [
                        createInput({
                            id: "clinical-diagnosis",
                            label: "Clinical diagnosis",
                            value: "Stage II Essential Hypertension with intermittent secondary palpitations and increased nocturnal dyspnea over the last 14 days.",
                        }),
                    ]),
                ]),
            ]),
        ],
    },
    {
        id: "demo-medicines",
        name: "Rx - Medications",
        area: "body",
        rows: [
            row("medicines-row", [
                column("medicines", [
                    group("medicines-group", [
                        createInput({
                            id: "medicine-list",
                            label: "RX - Medications",
                            variant: "medicines",
                            items: [
                                { name: "Amlodipine Besylate (5mg)", type: "Oral Tablet", dose: "1-0-0 (Morning)", duration: "15 Days", tag: "AFTER MEAL" },
                                { name: "Telmisartan (40mg)", type: "Oral Tablet", dose: "0-0-1 (Night)", duration: "30 Days", tag: "EMPTY STOMACH" },
                                { name: "Atorvastatin (10mg)", type: "Oral Tablet", dose: "0-0-1 (Night)", duration: "90 Days", tag: "AFTER MEAL" },
                            ],
                        }),
                    ]),
                ]),
            ]),
        ],
    },
    {
        id: "demo-instructions",
        name: "Instructions",
        area: "body",
        rows: [
            row("instructions-row", [
                column("instructions", [
                    group("instructions-group", [
                        createInput({
                            id: "instructions",
                            label: "Instructions",
                            variant: "list",
                            items: [
                                { text: "Daily home BP monitoring, morning and evening. Maintain log." },
                                { text: "30 minutes brisk walking, five days a week." },
                                { text: "Avoid NSAIDs without consultation." },
                            ],
                        }),
                    ]),
                ]),
            ]),
        ],
    },
    {
        id: "demo-signature",
        name: "Signature",
        area: "footer",
        rows: [
            row("signature-row", [
                column("legal-note", [
                    group("legal-note-group", [
                        createInput({
                            id: "legal-note",
                            label: "Registry note",
                            value: "Electronically signed via Beacon Health Central\nRegistry. Validity 30 days from date of issue.",
                            variant: "address",
                        }),
                    ]),
                ]),
                column("signature", [
                    group("signature-group", [
                        createInput({
                            id: "signature",
                            label: "Signature",
                            value: "Dr. Julian Sterling",
                            note: "Lic. No. MED/2011/5820",
                            variant: "signature",
                        }),
                    ]),
                ]),
            ]),
        ],
    },
    {
        id: "demo-labs",
        name: "Laboratory Tests",
        area: "body",
        rows: [
            row("labs-row", [
                column("labs", [
                    group("labs-group", [
                        createInput({
                            id: "labs",
                            label: "Laboratory Tests",
                            variant: "tests",
                            items: [
                                { code: "CBC", name: "Complete Blood Count" },
                                { code: "LIPID", name: "Fasting Lipid Profile" },
                                { code: "HBA1C", name: "Glycated Hemoglobin" },
                                { code: "ECG", name: "Resting 12-lead ECG" },
                            ],
                        }),
                    ]),
                ]),
            ]),
        ],
    },
    {
        id: "demo-follow-up",
        name: "Follow-up",
        area: "body",
        rows: [
            row("advice-row", [
                column("diet", [
                    group("diet-group", [
                        createInput({
                            id: "diet",
                            label: "Diet advice",
                            value: "Low sodium (< 2g/day).\nMediterranean-style diet with leafy greens, whole grains and lean protein.\nHydration: 2-2.5 L water daily.",
                        }),
                    ]),
                ]),
                column("follow-up", [
                    group("follow-up-group", [
                        createInput({
                            id: "follow-up",
                            label: "Follow-up",
                            value: "In 14 days with fresh lipid profile and ECG.",
                            isBold: true,
                        }),
                    ]),
                ]),
            ]),
        ],
    },
];

export function normalizePrescriptionAreas(header: unknown, body: unknown, footer: unknown): CanvasSection[] {
    const sections = [
        ...extractSections(header, "header"),
        ...extractSections(body, "body"),
        ...extractSections(footer, "footer"),
    ].filter((section) => section.isVisible !== false);

    if (sections.length > 0) {
        return sections;
    }

    return [];
}

export function paginateSections(sections: CanvasSection[]): CanvasPage[] {
    const pages: CanvasPage[] = [];
    const firstPageSections = sections.slice(0, 7);
    const remainingSections = sections.slice(7);

    if (firstPageSections.length > 0) {
        pages.push({ id: "page-1", sections: firstPageSections });
    }

    for (let index = 0; index < remainingSections.length; index += 3) {
        pages.push({
            id: `page-${pages.length + 1}`,
            sections: remainingSections.slice(index, index + 3),
        });
    }

    return pages.length > 0 ? pages : [{ id: "page-1", sections: [] }];
}

export function getColumnGridClass(columnCount: number) {
    if (columnCount >= 3) return "grid-cols-1 md:grid-cols-3";
    if (columnCount === 2) return "grid-cols-1 md:grid-cols-2";
    return "grid-cols-1";
}

export function getAreaSections(sections: CanvasSection[], area: TemplateArea) {
    return sections.filter((section) => section.area === area);
}

export function getOrderedSections(sections: CanvasSection[]) {
    return areaOrder.flatMap((area) => getAreaSections(sections, area));
}
