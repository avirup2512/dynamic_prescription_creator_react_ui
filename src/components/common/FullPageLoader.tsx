import { memo } from "react";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { selectLoader } from "../../store/loader/loaderSelectors";

const FullPageLoader = memo(function FullPageLoader() {
    const loader = useSelector(selectLoader);

    if (!loader.open) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/70 backdrop-blur-md"
            role="status"
            aria-live="polite"
            aria-busy="true"
        >
            <div className="pointer-events-none absolute inset-0" />
            <div className="relative z-10 flex w-[min(92vw,28rem)] flex-col items-center rounded-3xl border border-white/10 bg-white/95 px-8 py-10 text-center shadow-2xl shadow-slate-950/20 backdrop-blur-xl dark:bg-slate-900/95">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
                <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50">
                    {loader.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {loader.description}
                </p>
                {loader.showProgress && typeof loader.progress === "number" ? (
                    <div className="mt-6 w-full">
                        <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                            <div
                                className="h-full rounded-full bg-slate-900 transition-all duration-300 dark:bg-slate-100"
                                style={{ width: `${Math.min(100, Math.max(0, loader.progress))}%` }}
                            />
                        </div>
                        <p className="mt-2 text-xs font-medium uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                            {loader.progress}%
                        </p>
                    </div>
                ) : null}
            </div>
        </div>
    );
});

export default FullPageLoader;
