import { INPUT_TYPE } from "@/constant/inputType.enum";
import { useEffect } from "react";

function PrescriptionColumn({columnData}:any)
{
    useEffect(() => {
        console.log('columnData', columnData);
    }, [columnData])
    return (
        <div className="space-y-4 text-slate-900">
            {columnData && columnData?.inputs && columnData.inputs.map((input: any, inputIndex:number) => {
                const isBold = input?.is_bold === 1 || input?.is_bold === true
                const showLabel = input?.show_label === 1 || input?.show_label === true
                const textStyle = {
                    fontSize: input?.font_size ? `${input.font_size}px` : undefined,
                    fontWeight: isBold ? '700' : '400',
                }
                const value = input?.input_type_name === INPUT_TYPE.INPUTTYPE_1
                    ? input?.template_input_value || input?.input_entity_value || '—'
                    : input?.input_type_name === INPUT_TYPE.INPUTTYPE_2
                        ? input?.dropdown_option_value || '—'
                        : '—'

                return (
                    <div key={input.id || inputIndex} className="space-y-1 mb-0">
                        <div className="leading-7" style={textStyle}>
                            {showLabel && input?.input_entity_name && (
                                <span className="font-semibold mr-1 text-slate-800">{input.input_entity_name}:</span>
                            )}
                            <span>{value}</span>
                        </div>
                        {(input?.extra_note === 1 || input?.extra_note === true) && input?.template_input_extranotes && (
                            <p className="text-sm italic leading-6 text-slate-600">
                                {input.template_input_extranotes}
                            </p>
                        )}
                        {(input?.show_quantity === 1 || input?.show_quantity === true) && input?.template_quantity_value && (
                            <p className="text-sm leading-6 text-slate-600">
                                {input.template_quantity_value} {input?.quantity_option_value}
                            </p>
                        )}
                    </div>
                )
            })}
        </div>
    )
}
export default PrescriptionColumn;