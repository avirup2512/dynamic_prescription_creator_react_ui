const PreviewMetaRow: React.FC<{
    icon: React.ElementType;
    label: string;
    value: string;
}> = ({ icon: Icon, label, value }) => (
    <div className="flex items-center justify-between py-1.5">
        <span className="flex items-center gap-1.5 text-[12px] text-slate-500">
            <Icon className="h-3 w-3 text-slate-400" strokeWidth={2} />
            {label}
        </span>
        <span className="text-[12px] font-medium text-slate-700">{value}</span>
    </div>
);

export const PreviewOptionChip: React.FC<{ label: string }> = ({ label }) => (
    <div className="rounded-md border border-blue-100 bg-blue-50/60 px-2.5 py-1.5 text-[12px] text-slate-700">
        {label}
    </div>
);
export default PreviewMetaRow;
