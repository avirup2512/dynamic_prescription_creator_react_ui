import type { StatusColor } from "../../type/TemplateStructure";

const StatusDot: React.FC<{ color: StatusColor }> = ({ color }) => {
    if (color === "none") return null;
    const map: Record<StatusColor, string> = {
        blue: "bg-blue-500",
        green: "bg-emerald-500",
        amber: "bg-amber-500",
        none: "",
    };
    return <span className={`inline-block h-2 w-2 rounded-full ${map[color]}`} />;
};
export default StatusDot;