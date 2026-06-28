export default function PageBreak({ pageNumber }: { pageNumber: number }) {
    return (
        <div className="flex items-center gap-3 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-300">
            <span className="h-px flex-1 bg-slate-200" />
            Page {pageNumber}
            <span className="h-px flex-1 bg-slate-200" />
        </div>
    );
}
