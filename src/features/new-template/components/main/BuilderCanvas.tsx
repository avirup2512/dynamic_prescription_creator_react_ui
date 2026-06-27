// BuilderCanvas.tsx

import { useState } from "react";
import type { ColumnData } from "../../type/TemplateStructure";
import type { ColumnCount } from "../../type/ComponentType";
import SectionToolbar from "./SectionToolbar";
import SectionHeading from "./SectionHeading";
import RowBlock from "./RowBlock";
import AddRowButton from "./AddRowButton";
import ColumnCountSelector from "./ColumnCountSelector";
export const sampleSection = {
    id: "body-1",
    name: "Early Morning",

    rows: [
        {
            id: "row-1",

            columns: [
                {
                    id: "column-1",

                    inputGroups: [
                        {
                            id: "group-1",

                            inputs: [
                                {
                                    id: "1",
                                    label: "Jeera Water",
                                    type: "text",
                                },

                                {
                                    id: "2",
                                    label: "Chia Seed",
                                    type: "text",
                                },

                                {
                                    id: "3",
                                    label: "Oats",
                                    type: "text",
                                },

                                {
                                    id: "4",
                                    label: "Curd / Milk",
                                    type: "text",
                                },
                            ],
                        },

                        {
                            id: "group-2",

                            relation: "or",

                            inputs: [
                                {
                                    id: "5",
                                    label: "Jeera Water",
                                    type: "text",
                                },

                                {
                                    id: "6",
                                    label: "Chia Seed",
                                    type: "text",
                                },

                                {
                                    id: "7",
                                    label: "Chhattu",
                                    type: "text",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
};
export default function BuilderCanvas({ header, body, footer }: any) {
    const [userHover, setUserHover] = useState(false);
    const [columns, setColumns] = useState<ColumnData[]>([
        { id: "col-1", label: "Column 1", field: null },
    ]);
    const makeColumns = (count: ColumnCount, existing: ColumnData[]): ColumnData[] => {
        const labels = ["Column 1", "Column 2", "Column 3"];
        return Array.from({ length: count }, (_, i) => {
            const found = existing[i];
            return found ?? { id: `col-${i + 1}`, label: labels[i], field: null };
        });
    };


    const handleAddField = (columnId: string) => {
        setColumns((prev) =>
            prev.map((c) =>
                c.id === columnId
                    ? {
                        ...c,
                        field: {
                            id: `field-${columnId}`,
                            label: "Patient Name",
                            placeholder: "Enter patient name",
                        },
                    }
                    : c
            )
        );
    };

    const handleRemoveField = (columnId: string) => {
        setColumns((prev) =>
            prev.map((c) => (c.id === columnId ? { ...c, field: null } : c))
        );
    };

    return (
        <div className="min-h-screen w-full bg-slate-50 px-4 py-10 bg-white shadow-xl" onMouseOver={(e: any) => { setUserHover(true) }} onMouseOut={(e: any) => { setUserHover(false) }}>
            <div className="min-h-screen mx-auto w-full max-w-[100%] shadow-xl">
                {/* <SectionToolbar /> */}
                {
                    header && header.children && header.children.map((section: any, index: number) => {
                        return (
                            <div className="bg-white p-6 mb-4" key={index + Date.now()}>
                                <SectionHeading title="Section 1" description="Section Description (optional)" />
                                {
                                    section.rows && section.rows.map((row: any, rowIndex: number) => {
                                        return (
                                            <RowBlock
                                                key={rowIndex + Date.now()}
                                                userHover={userHover}
                                                rowIndex={rowIndex}
                                                sectionIndex={index}
                                                rowLabel="Row 1"
                                                columns={row?.columns ?? []}
                                                onAddField={handleAddField}
                                                onRemoveField={handleRemoveField}
                                            />
                                        )
                                    })
                                }
                                <AddRowButton onClick={() => { }} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}