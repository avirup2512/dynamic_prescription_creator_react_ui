import { useNavigate } from "react-router-dom";
import { useBuilder } from "../../context/BuilderContext";
import SectionEditor from "./section/SectionEditor";

export default function EditorSheet({ editorType }: { editorType: string }) {
    const navigate = useNavigate();
    const closeEditor = () => {
        navigate("..", { relative: "route" });
    }
    return (
        <>
            {
                editorType === "section" && <SectionEditor closeEditor={closeEditor} />
            }
        </>
    );
}
