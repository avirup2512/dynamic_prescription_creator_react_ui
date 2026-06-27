import { Heart } from "lucide-react";

const Tag: React.FC<{ label: string; variant?: "specialty" | "default" }> = ({
    label,
    variant = "default",
}) => {
    if (variant === "specialty") {
        return (
            <span className="inline-flex items-center gap-1 rounded-md border border-violet-200 bg-violet-50 px-2 py-1 text-[11px] font-medium text-violet-600">
                <Heart className="h-3 w-3" strokeWidth={2} />
                {label}
            </span>
        );
    }
    return (
        <span className="inline-flex items-center rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] font-medium text-slate-600">
            {label}
        </span>
    );
};
export default Tag;
