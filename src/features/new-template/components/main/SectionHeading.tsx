
const SectionHeading: React.FC<{ title: string; description: string }> = ({
    title,
    description,
}) => (
    <div className="mb-4">
        <h2 className="text-[17px] font-bold text-slate-900">{title}</h2>
        <p className="mt-0.5 text-[13px] text-slate-400">{description}</p>
    </div>
);
export default SectionHeading