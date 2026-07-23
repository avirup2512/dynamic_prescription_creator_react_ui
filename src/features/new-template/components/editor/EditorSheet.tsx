import { useNavigate } from "react-router-dom";
import SectionEditor from "./section/SectionEditor";
import InputEditor from "./input/InputEditor";
import AddNewInputEditor from "./input/AddNewInputEditor";
import InputGroupEditor from "./inputGroup/InputGroupEditor";

export default function EditorSheet({ editorType }: { editorType: string }) {
    const navigate = useNavigate();
    const closeEditor = () => {
        navigate("..", { relative: "route" });
    };

    return (
        <>
            {editorType === "section" && <SectionEditor closeEditor={closeEditor} />}
            {editorType === "input" && <InputEditor closeEditor={closeEditor} />}
            {editorType === "inputGroup" && <InputGroupEditor closeEditor={closeEditor} />}
            {editorType === "addInput" && <AddNewInputEditor closeEditor={closeEditor} />}
        </>
    );
}
