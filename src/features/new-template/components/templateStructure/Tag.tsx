import { Heart } from "lucide-react";

const Tag: React.FC<{ label: string; variant?: "specialty" | "default" }> = ({
    label,
    variant = "default",
}) => {
    if (variant === "specialty") {
        return (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-sm font-medium text-violet-600">
                <Heart className="h-3.5 w-3.5" strokeWidth={2} />
                {label}
            </span>
        );
    }
    return (
        <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600">
            {label}
        </span>
    );
};
export default Tag;