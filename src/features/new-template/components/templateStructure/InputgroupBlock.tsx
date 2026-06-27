import { useState } from "react";
import type { ColumnData, InputGroupData } from "../../type/TemplateStructure";
import ChevronToggle from "./ChevronToggle";
import PlainIcon from "./PlainIcon";
import LeafFieldRow from "./LeafFieldRow";

const InputGroupBlock: React.FC<{ inputGroup: InputGroupData; indent: number }> = ({
    inputGroup,
    indent,
}) => {
    return (
        <div>
            {inputGroup.inputs.map((input: any, index: number) => (
                <LeafFieldRow key={index + Date.now()} input={input} indent={indent + 1} />
            ))}
        </div>
    );
};
export default InputGroupBlock;
