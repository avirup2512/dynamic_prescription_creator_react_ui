import { useNavigate } from "react-router-dom";
import SectionEditor from "./section/SectionEditor";
import InputEditor from "./input/InputEditor";

export default function EditorSheet({ editorType }: { editorType: string }) {
    const navigate = useNavigate();
    const closeEditor = () => {
        navigate("..", { relative: "route" });
    };

    return (
        <>
            {editorType === "section" && <SectionEditor closeEditor={closeEditor} />}
            {editorType === "input" && <InputEditor closeEditor={closeEditor} />}
        </>
    );
}
