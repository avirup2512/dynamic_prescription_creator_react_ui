import { useState } from "react";
import ModalHeader from "../component/ModalHeader";
import SidebarNav from "../component/SidebarNav";
import SearchField from "../component/SearchField";
import ResultsMeta from "../component/ResultsMeta";
import FilterBar from "../component/FilterBar";
import ResultsList from "../component/ResultsList";
import PreviewPanel from "../component/PreviewPanel";
import ModalFooter from "../component/ModalFooter";
import InputTab from "../component/InputTab/InputTab";

type ResultKind = "TEXT" | "DROPDOWN" | "TOGGLE" | "FOOD" | "RECIPE" | "CHECKBOX";

type FilterId =
    | "all"
    | "user-inputs"
    | "dropdowns"
    | "foods"
    | "recipes"
    | "toggles"
    | "checkboxes";

interface ResultItem {
    id: string;
    kind: ResultKind;
    title: string;
    meta: string;
    selected?: boolean;
}

interface ResultGroup {
    id: string;
    heading: string;
    count: number;
    items: ResultItem[];
}
const resultGroups: ResultGroup[] = [
    {
        id: "user-defined",
        heading: "USER-DEFINED INPUTS",
        count: 3,
        items: [
            {
                id: "vit-d3-dose",
                kind: "TEXT",
                title: "Vitamin D3 daily dose",
                meta: "Text Input  •  mg  •  last used in Diabetes Follow-up",
            },
            {
                id: "vit-freq",
                kind: "DROPDOWN",
                title: "Vitamin supplement frequency",
                meta: "Dropdown  •  5 options: qd, bid, tid…",
                selected: true,
            },
            {
                id: "vit-reminder",
                kind: "TOGGLE",
                title: "Vitamin reminder enabled",
                meta: "Toggle  •  OFF: No / ON: Yes",
            },
        ],
    },
    {
        id: "global-food",
        heading: "GLOBAL FOOD LIST",
        count: 4,
        items: [
            {
                id: "vital-wheat-gluten",
                kind: "FOOD",
                title: "Vital Wheat Gluten",
                meta: "Food  •  Grains  •  370 kcal / 100g",
            },
            {
                id: "vitamin-oj",
                kind: "FOOD",
                title: "Vitamin-Enriched Orange Juice",
                meta: "Food  •  Beverages  •  45 kcal / 100g",
            },
            {
                id: "multivitamin-gummies",
                kind: "FOOD",
                title: "Multivitamin Gummies (Adult)",
                meta: "Food  •  Supplements  •  15 kcal each",
            },
            {
                id: "vitamin-water-zero",
                kind: "FOOD",
                title: "Vitamin Water Zero",
                meta: "Food  •  Beverages  •  0 kcal / 240ml",
            },
        ],
    },
    {
        id: "global-recipe",
        heading: "GLOBAL RECIPE LIST",
        count: 2,
        items: [
            {
                id: "vit-boost-smoothie",
                kind: "RECIPE",
                title: "Vitamin Boost Smoothie",
                meta: "Recipe  •  Breakfast  •  6 ingredients  •  240 kcal",
            },
            {
                id: "iron-vit-c-bowl",
                kind: "RECIPE",
                title: "Iron + Vitamin C Salad Bowl",
                meta: "Recipe  •  Lunch  •  8 ingredients  •  320 kcal",
            },
        ],
    },
    {
        id: "checkboxes",
        heading: "CHECKBOXES",
        count: 1,
        items: [
            {
                id: "prenatal-vitamins",
                kind: "CHECKBOX",
                title: "Patient takes prenatal vitamins",
                meta: "Checkbox  •  value: prenatal_yes",
            },
        ],
    },
];
const ParentWrapperContent: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
    const [activeNav, setActiveNav] = useState("search");
    const [query, setQuery] = useState("vit");
    const [activeFilter, setActiveFilter] = useState<FilterId>("all");
    const [selectedId, setSelectedId] = useState("vit-freq");

    const allItems = resultGroups.flatMap((g) => g.items);
    const selectedItem = allItems.find((i) => i.id === selectedId) ?? allItems[0];

    return (
        <div className="flex h-[760px] max-h-[calc(100vh-1.5rem)] w-full">
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="add-input-title"
                className="flex h-full w-full flex-col overflow-hidden bg-white"
            >
                <ModalHeader
                    title="Add Input"
                    subtitle="Search across every input, food and recipe in your workspace"
                    onClose={() => onClose?.()}
                />
                <h1 id="add-input-title" className="sr-only">
                    Add Input
                </h1>

                <div className="flex min-h-0 flex-1">
                    <SidebarNav activeId={activeNav} onSelect={setActiveNav} />

                    {activeNav === "inputs" ? (
                        <InputTab />
                    ) : (
                        <>
                            <div className="flex min-w-0 flex-1 flex-col overflow-hidden px-4 py-3">
                                <SearchField value={query} onChange={setQuery} />
                                <FilterBar activeFilter={activeFilter} onSelect={setActiveFilter} />
                                <ResultsMeta count={23} query={query} seconds={0.04} />
                                <ResultsList
                                    groups={resultGroups}
                                    selectedId={selectedId}
                                    onSelect={setSelectedId}
                                />
                            </div>

                            <PreviewPanel item={selectedItem} />
                        </>
                    )}
                </div>

                <ModalFooter onCancel={() => onClose?.()} onInsert={() => onClose?.()} />
            </div>
        </div>
    );
};

export default ParentWrapperContent;
