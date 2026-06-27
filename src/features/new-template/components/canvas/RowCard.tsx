// RowCard.tsx

import ColumnCard from "./ColumnCard";

export default function RowCard({
    row,
}: any) {
    return (
        <div
            className="grid gap-4"
            style={{
                gridTemplateColumns: `repeat(${row.columns.length},1fr)`,
            }}
        >
            {row.columns.map((column: any) => (
                <ColumnCard
                    key={column.id}
                    column={column}
                />
            ))}
        </div>
    );
}