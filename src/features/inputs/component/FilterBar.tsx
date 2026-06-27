import FilterPill from "./FilterPill";
import SortDropdown from "./SortDropdown";
const filters: { id: FilterId; label: string }[] = [
    { id: "all", label: "All types" },
    { id: "user-inputs", label: "User inputs" },
    { id: "dropdowns", label: "Dropdowns" },
    { id: "foods", label: "Foods" },
    { id: "recipes", label: "Recipes" },
    { id: "toggles", label: "Toggles" },
    { id: "checkboxes", label: "Checkboxes" },
];
type FilterId =
    | "all"
    | "user-inputs"
    | "dropdowns"
    | "foods"
    | "recipes"
    | "toggles"
    | "checkboxes";

const FilterBar: React.FC<{
    activeFilter: FilterId;
    onSelect: (id: FilterId) => void;
}> = ({ activeFilter, onSelect }) => (
    <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {filters.map((f) => (
            <FilterPill
                key={f.id}
                label={f.label}
                active={activeFilter === f.id}
                onClick={() => onSelect(f.id)}
            />
        ))}
        <SortDropdown />
    </div>
);
export default FilterBar
