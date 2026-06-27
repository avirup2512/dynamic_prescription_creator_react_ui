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

interface InputModalContextType {
    editorOpen: boolean;
    editorType?: EditorType;
    selectedId?: string;

    openEditor: (
    ) => void;

    closeEditor: () => void;
}

const InputModalContext =
    createContext({} as InputModalContextType);

export function InputModalProvider({
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
    ) => {
        // setEditorType(type);
        // setSelectedId(id);
        setEditorOpen(true);
    };

    const closeEditor = () => {
        setEditorOpen(false);
    };

    return (
        <InputModalContext.Provider
            value={{
                editorOpen,
                editorType,
                selectedId,
                openEditor,
                closeEditor,
            }}
        >
            {children}
        </InputModalContext.Provider>
    );
}

export const useInputModal = () =>
    useContext(InputModalContext);