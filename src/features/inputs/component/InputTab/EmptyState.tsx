import { Inbox } from "lucide-react";
import { memo } from "react";

interface EmptyStateProps {
  title: string;
  description: string;
}

const EmptyState = memo(({ title, description }: EmptyStateProps) => (
  <div className="flex h-48 flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50/70 text-center">
    <Inbox className="mb-2 h-5 w-5 text-slate-400" strokeWidth={2} />
    <p className="text-[13px] font-semibold text-slate-700">{title}</p>
    <p className="mt-1 max-w-[260px] text-[12px] text-slate-400">{description}</p>
  </div>
));

EmptyState.displayName = "EmptyState";

export default EmptyState;
