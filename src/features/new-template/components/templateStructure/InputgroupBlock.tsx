import LeafFieldRow from "./LeafFieldRow";

interface TemplateInputGroup {
    id?: string;
    template_input_group_id?: string;
    inputs: unknown[];
}

const InputGroupBlock: React.FC<{ inputGroup: TemplateInputGroup; indent: number }> = ({
    inputGroup,
    indent,
}) => {
    return (
        <div>
            {inputGroup.inputs.map((input, index) => (
                <LeafFieldRow
                    key={(input as { input_id?: string; id?: string }).input_id ?? (input as { id?: string }).id ?? index}
                    input={input}
                    indent={indent + 1}
                />
            ))}
        </div>
    );
};
export default InputGroupBlock;
