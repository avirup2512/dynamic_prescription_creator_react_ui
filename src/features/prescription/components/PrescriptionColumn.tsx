import { INPUT_TYPE } from "@/constant/inputType.enum";

function PrescriptionColumn({columnData}:any)
{
    return (
        <>
            <section className="border rounded-lg p-4">
                <ul className="mt-4 space-y-2">
                    {
                        
                        columnData && columnData?.inputs && columnData.inputs.map((input: any) => {
                            return (
                                <li>
                                    {
                                        input?.input_type_name === INPUT_TYPE.INPUTTYPE_1 ?
                                        <span>{input?.input_entity_value || '—'} </span>
                                        : input?.input_type_name === INPUT_TYPE.INPUTTYPE_2 ? 
                                        <span> {input?.dropdown_option_value || '—'} </span>
                                        :'-'
                                    }
                                    {
                                        input?.extra_note == 1 || input?.extra_note == true && input?.template_input_extranotes &&
                                        <p className="mt-2 text-xs italic text-muted-foreground">
                                            {input.template_input_extranotes}
                                        </p>
                                    }
                                    {
                                        input?.show_quantity == 1 || input?.show_quantity == true && input?.template_quantity_value &&
                                        <span>
                                            {input.template_quantity_value} {input?.quantity_option_value}
                                        </span>
                                    }
                                </li>
                            )
                        })
                    }
                    </ul>
                {/* <h2 className="text-xl font-semibold">Header 1</h2>

                <p className="mt-2 text-sm text-muted-foreground">
                    This is a simple paragraph describing the content of this section.
                </p> */}
            </section>
        </>
    )
}
export default PrescriptionColumn;