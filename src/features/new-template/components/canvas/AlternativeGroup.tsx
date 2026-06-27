// AlternativeGroup.tsx

import FieldCard from "./FieldCard";
import { Separator } from "@/components/ui/separator";

export default function AlternativeGroup({
    group,
    showOr,
}: any) {
    return (
        <>
            {showOr && (
                <div className="py-4">
                    <Separator />

                    <div
                        className="
              py-2
              text-center
              text-xs
              font-semibold
              text-muted-foreground
            "
                    >
                        OR
                    </div>

                    <Separator />
                </div>
            )}

            <div
                className="
          rounded-lg
          border
          p-4
          space-y-2
        "
            >
                {group.inputs.map((field: any) => (
                    <FieldCard
                        key={field.id}
                        field={field}
                    />
                ))}
            </div>
        </>
    );
}