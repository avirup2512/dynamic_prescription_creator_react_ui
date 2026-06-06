import { useState, useEffect } from "react"
import PrescriptionColumn from "./PrescriptionColumn";

function PrescriptionHeader({headerData}:any)
{
    const [localRow, setLocalRow] = useState([]);
    useEffect(() => {
        if (headerData && Object.keys(headerData).length > 0 && headerData?.rows)
        {
            setLocalRow(headerData.rows);
        }
    },[headerData])
    return (
        <>
            {
                localRow && localRow.length && localRow.map((row: any) => {
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
export default PrescriptionHeader