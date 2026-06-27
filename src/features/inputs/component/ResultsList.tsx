import GroupHeading from "./GroupHeading";
import ResultRow from "./ResultRow";

const ResultsList: React.FC<{
    groups: any[];
    selectedId: string;
    onSelect: (id: string) => void;
}> = ({ groups, selectedId, onSelect }) => (
    <div className="mt-1 min-h-0 flex-1 overflow-y-auto pr-1">
        {groups.map((group) => (
            <div key={group.id}>
                <GroupHeading heading={group.heading} count={group.count} />
                <div className="space-y-0.5">
                    {group.items.map((item: any) => (
                        <ResultRow
                            key={item.id}
                            item={{ ...item, selected: item.id === selectedId }}
                            onSelect={() => onSelect(item.id)}
                        />
                    ))}
                </div>
            </div>
        ))}
        <div className="py-2 text-center">
            <button
                type="button"
                className="text-[12px] font-medium text-blue-600 hover:text-blue-700"
            >
                Show 13 more results...
            </button>
        </div>
    </div>
);
export default ResultsList;
