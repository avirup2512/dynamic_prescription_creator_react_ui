

const ResultsMeta: React.FC<{ count: number; query: string; seconds: number }> = ({
    count,
    query,
    seconds,
}) => (
    <p className="mt-2 text-[12px] text-slate-400">
        {count} results for '{query}'  •  {seconds.toFixed(2)}s
    </p>
);

export default ResultsMeta
