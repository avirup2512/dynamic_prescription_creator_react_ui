// BuilderContext.tsx

import {
    createContext,
    useContext,
    useState,
    ReactNode,
} from "react";

export type EditorType =
    | "section"
    | "row"
    | "column"
    | "alternative"
    | "field";

interface BuilderContextType {
    editorOpen: boolean;
    editorType?: EditorType;
    selectedId?: string;

    openEditor: (
        type: EditorType,
        id: string
    ) => void;

    closeEditor: () => void;
}

const BuilderContext =
    createContext({} as BuilderContextType);

export function BuilderProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [editorOpen, setEditorOpen] =
        useState(false);

    const [editorType, setEditorType] =
        useState<EditorType>();

    const [selectedId, setSelectedId] =
        useState<string>();

    const openEditor = (
        type: EditorType,
        id: string
    ) => {
        setEditorType(type);
        setSelectedId(id);
        setEditorOpen(true);
    };

    const closeEditor = () => {
        setEditorOpen(false);
    };

    return (
        <BuilderContext.Provider
            value={{
                editorOpen,
                editorType,
                selectedId,
                openEditor,
                closeEditor,
            }}
        >
            {children}
        </BuilderContext.Provider>
    );
}

export const useBuilder = () =>
    useContext(BuilderContext);