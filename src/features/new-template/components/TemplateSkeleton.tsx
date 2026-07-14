/**
 * TemplateSkeleton - Loading skeleton matching the TemplateCard size
 * Prevents layout shifting during data loading
 */

export function TemplateSkeleton() {
    return (
        <div className="group relative h-full w-full">
            {/* Outer container with border and shadow */}
            <div className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all duration-300">
                {/* Preview Section (70% height) - Skeleton */}
                <div className="flex flex-1 items-center justify-center overflow-hidden bg-slate-50 p-4">
                    <div className="aspect-[210/297] w-full max-w-full animate-pulse rounded bg-slate-200" />
                </div>

                {/* Bottom Section (30% height) - Skeleton */}
                <div className="flex flex-col gap-3 border-t border-slate-100 p-4">
                    {/* Template Name Skeleton */}
                    <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />

                    {/* Hospital Name Skeleton */}
                    <div className="h-4 w-1/2 animate-pulse rounded bg-slate-100" />

                    {/* Last Updated and Status Row Skeleton */}
                    <div className="flex items-center justify-between pt-2">
                        <div className="h-4 w-24 animate-pulse rounded bg-slate-100" />
                        <div className="h-5 w-16 animate-pulse rounded bg-slate-100" />
                    </div>

                    {/* Action Buttons Skeleton */}
                    <div className="flex gap-2 border-t border-slate-100 pt-3">
                        <div className="h-8 flex-1 animate-pulse rounded bg-slate-100" />
                        <div className="h-8 flex-1 animate-pulse rounded bg-slate-100" />
                        <div className="h-8 flex-1 animate-pulse rounded bg-slate-100" />
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * TemplateGridSkeleton - Grid of skeleton cards
 */
export function TemplateGridSkeleton({ count = 8 }: { count?: number }) {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: count }).map((_, index) => (
                <TemplateSkeleton key={index} />
            ))}
        </div>
    );
}
