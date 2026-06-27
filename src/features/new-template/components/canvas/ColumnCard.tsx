// ColumnCard.tsx

import AlternativeGroup from "./AlternativeGroup";
import { Button } from "@/components/ui/button";

export default function ColumnCard({
    column,
}: any) {
    return (
        <div
            className="
        rounded-lg
        border
        p-4
      "
        >
            {column.inputGroups.map(
                (group: any, index: number) => (
                    <AlternativeGroup
                        key={group.id}
                        group={group}
                        showOr={index > 0}
                    />
                )
            )}

            <Button
                variant="outline"
                className="mt-4 w-full"
            >
                Add Alternative
            </Button>
        </div>
    );
}