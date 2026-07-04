import { useEffect, useState } from "react";
import ModalHeader from "../component/ModalHeader";
import SidebarNav from "../component/SidebarNav";
import SearchField from "../component/SearchField";
import ResultsMeta from "../component/ResultsMeta";
import FilterBar from "../component/FilterBar";
import ResultsList from "../component/ResultsList";
import PreviewPanel from "../component/PreviewPanel";
import ModalFooter from "../component/ModalFooter";
import InputTab from "../component/InputTab/InputTab";
import StylePanel from "../component/StylePanel";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedInput } from "../store/InputSlice";
import { AddInputTypeToTemplate, SetCurrentTemplate, toggleCallTemplateAPI } from "@/features/new-template/store/TemplateSlice";
import TemplateService from "@/features/new-template/service/TemplateService";
import { redefineTemplate } from "@/features/new-template/utils/TemplateUtilsService";
import InputEntityTypeService from "@/features/inputEntityType/services/InputEntityTypeService";
import { INPUT_TYPE } from "@/constant/inputType.enum";

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
const ParentWrapperContent: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
    const dispatch = useDispatch();
    const { templateId: routeTemplateId, id, inputType, inputId, rowIndex, columnIndex, inputGroupIndex, sectionType, sectionId, tabType } = useParams();
    const templateId = routeTemplateId ?? id;
    const navigate = useNavigate();
    const templateService = TemplateService;
    const inputEntityservice = InputEntityTypeService;
    const InputState = useSelector((state: any) => state.inputs);
    const dropdownState = useSelector((state: any) => state.dropdown);
    const TemplateState = useSelector((state: any) => state.template);
    const RecipeState = useSelector((state: any) => state.recipe);
    const FoodState = useSelector((state: any) => state.food);
    // const { inputType, inputEntityId, optionId } = useParams();
    const [resultGroup, setResultGroup] = useState([]);

    useEffect(() => {
        return () => {
            dispatch(setSelectedInput({} as any));
        }
    }, [])
    useEffect(() => {
        if (inputType) {
            setActiveNav("inputs")
        }
    }, [inputType, inputId])
    useEffect(() => {
        if (tabType) {
            setActiveNav(tabType)
        }
    }, [tabType])
    const [activeNav, setActiveNav] = useState("search");
    const [query, setQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState<FilterId>("all");
    const [selectedId, setSelectedId] = useState("");
    const [debounceQuery, setDebounceQuery] = useState('');
    const allItems = resultGroup.flatMap((g: any) => g.items);
    const selectedItem = allItems.find((i) => i.id === selectedId) ?? allItems[0];
    useEffect(() => {
        const timeout = setTimeout(() => {
            search(debounceQuery);
        }, 500); // or 300–500ms
        return () => clearTimeout(timeout);
    }, [debounceQuery])
    const search = async (keyword: string) => {
        try {
            const searchResult: any = await inputEntityservice.search(keyword);
            if (searchResult && searchResult?.success) {
                const resultGroups: any = [];
                for (let x in searchResult?.data) {
                    const heading = x === "dropdowns" ? "Dropdowns" : x === "foods" ? "Foods" : x === "recipes" ? "Recipes" : x === "toggle" ? "Toggles" : x === "checkbox" ? "Checkboxes" : x === "input_entities" ? "Text Fields" : "";
                    console.log(searchResult?.data[x])
                    if (searchResult?.data[x]?.length) {
                        resultGroups.push({
                            heading: heading,
                            count: searchResult?.data[x]?.length,
                            items: searchResult?.data[x]
                        })
                    }
                }
                console.log(resultGroups)
                setResultGroup(resultGroups);
            }
        } catch (error) {

        }
    }
    const AddInput = () => {
        console.log(inputType);
        // console.log(InputState)
        // console.log(RecipeState)
        console.log(dropdownState.selectedDropdown)
        let payload: any = {};
        switch (inputType) {
            case INPUT_TYPE.INPUTTYPE_1:
                payload = { sectionId, rowIndex: parseInt((rowIndex ? rowIndex : '')), columnIndex: parseInt((columnIndex ? columnIndex : '')), input: InputState.selectedInput, inputGroupIndex: parseInt((inputGroupIndex ? inputGroupIndex : '')), sameGroup: true, sectionType: sectionType ? sectionType : '' }
                dispatch(AddInputTypeToTemplate(payload));
                break;
            case INPUT_TYPE.INPUTTYPE_2:
                payload = { sectionId, rowIndex: parseInt((rowIndex ? rowIndex : '')), columnIndex: parseInt((columnIndex ? columnIndex : '')), input: dropdownState.selectedDropdown, inputGroupIndex: parseInt((inputGroupIndex ? inputGroupIndex : '')), sameGroup: true, sectionType: sectionType ? sectionType : '' }
                dispatch(AddInputTypeToTemplate(payload));
                break;
            case INPUT_TYPE.INPUTTYPE_3:
                dispatch(setSelectedInput(selectedItem));
                break;
            case INPUT_TYPE.INPUTTYPE_4:
                dispatch(setSelectedInput(selectedItem));
                break;
            default:
                dispatch(setSelectedInput(selectedItem));
                break;
        }
        onClose?.()
        // const payload = { sectionId, rowIndex: parseInt((rowIndex ? rowIndex : '')), columnIndex: parseInt((columnIndex ? columnIndex : '')), input: InputState.selectedInput, inputGroupIndex: parseInt((inputGroupIndex ? inputGroupIndex : '')), sameGroup: true, sectionType: sectionType ? sectionType : '' }
        // dispatch(AddInputTypeToTemplate(payload));
        // dispatch(toggleCallTemplateAPI(false));
        // onClose?.()
    }
    const openSelectedInputInEditor = () => {
        console.log(selectedItem)
        if (selectedItem && selectedItem?.type_name) {
            const inputCategorytId = (selectedItem.type_name == INPUT_TYPE.INPUTTYPE_3) ? selectedItem?.category_id : (selectedItem.type_name == INPUT_TYPE.INPUTTYPE_4) ? selectedItem?.recipe_tag_category_ids?.[1] : null;
            const inputId = selectedItem?.id;
            navigate("/dashboard/input/create/" + templateId + "/" + rowIndex + "/" + columnIndex + "/" + inputGroupIndex + "/" + sectionType + "/" + sectionId + "/inputs/" + selectedItem?.type_name + "/" + inputId + "/" + inputCategorytId);
        }
    }
    const navigateUrl = (id: any) => {
        if (id === "inputs") {
            navigate("/dashboard/input/create/" + templateId + "/" + rowIndex + "/" + columnIndex + "/" + inputGroupIndex + "/" + sectionType + "/" + sectionId + "/" + id + "/" + INPUT_TYPE.INPUTTYPE_1);
        } else {
            navigate("/dashboard/input/create/" + templateId + "/" + rowIndex + "/" + columnIndex + "/" + inputGroupIndex + "/" + sectionType + "/" + sectionId + "/" + id);
        }
    }
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
                    <SidebarNav activeId={activeNav} onSelect={navigateUrl} />

                    {activeNav === "inputs" ? (
                        <InputTab />
                    ) : (
                        <>
                            <div className="flex min-w-0 flex-1 flex-col overflow-hidden px-4 py-3">
                                <SearchField value={query} onChange={(e) => { setQuery(e), setDebounceQuery(e) }} />
                                <FilterBar activeFilter={activeFilter} onSelect={setActiveFilter} />
                                <ResultsMeta count={23} query={query} seconds={0.04} />
                                <ResultsList
                                    groups={resultGroup}
                                    selectedId={selectedId}
                                    onSelect={setSelectedId}
                                />
                            </div>

                            <PreviewPanel item={selectedItem} onInsert={() => { openSelectedInputInEditor() }} />
                        </>
                    )}
                </div>

                <ModalFooter onCancel={() => onClose?.()} onInsert={() => { AddInput() }} />
            </div>
        </div>
    );
};

export default ParentWrapperContent;
