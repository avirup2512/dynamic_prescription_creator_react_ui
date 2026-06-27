import { useBuilder } from "../../context/BuilderContext";
import SectionEditor from "./section/SectionEditor";

export default function EditorSheet() {
    const {
        editorOpen,
        closeEditor,
        editorType,
    } = useBuilder();
    return (
        //     <aside
        //         className={`
        //     border-l
        //     bg-background
        //     transition-all
        //     duration-300
        //     overflow-hidden
        //     ${editorOpen ? "w-[420px]" : "w-0"}
        //   `}
        //     >
        <>            {editorOpen && (
            <>
                {
                    editorType === "section" && <SectionEditor closeEditor={closeEditor} />
                }

            </>
        )}
        </>

        // </aside>
    );
}
