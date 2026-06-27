// EditorSheet.tsx

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useBuilder } from "../../context/BuilderContext";
import EditorHeader from "./EditorHeader";
import EditorContent from "./EditorContent";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
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