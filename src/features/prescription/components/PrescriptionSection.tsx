import PrescriptionColumn from "./PrescriptionColumn";
import type { Section } from "@/features/template/type/TemplateType";

function PrescriptionSection({section}:{section:Section})
{
    console.log(section)
    return (
        <>
            {
               section.rows && section.rows.map((row: any) => {
                            return (
                        <>
                            <div className="container mx-auto p-6">
                                        <div className="grid gap-6" style={{
                                            gridTemplateColumns: `repeat(${row?.columns.length}, minmax(0, 1fr))`,
                                        }}>
                                            {
                                                row && row.columns && row?.columns.map((col: any) => {
                                                    return (
                                                        <PrescriptionColumn columnData={col}/>
                                                    )
                                                })
                                            }
                                </div>
                            </div>
                            <hr></hr>
                        </>
                            )
                        })
            }
        </>
    )
}
export default PrescriptionSection