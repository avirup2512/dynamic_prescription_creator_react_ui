const IconBox: React.FC<{
    icon: React.ElementType;
    className?: string;
    size?: "sm" | "md";
}> = ({ icon: Icon, className = "", size = "md" }) => {
    const sizing = size === "sm" ? "h-6 w-6" : "h-7 w-7";
    const iconSizing = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
    return (
        <span
            className={`flex ${sizing} shrink-0 items-center justify-center rounded-md ${className}`}
        >
            <Icon className={iconSizing} strokeWidth={2} />
        </span>
    );
};
export default IconBox