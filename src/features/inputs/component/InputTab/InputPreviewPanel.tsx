import { CheckCircle2, Info, ListChecks } from "lucide-react";
import { memo, type ReactNode } from "react";

interface InputPreviewPanelProps {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export const InputPreviewPanel = memo(({ title, children, footer }: InputPreviewPanelProps) => (
  <section className="rounded-lg border border-slate-200 bg-white p-3">
    <h3 className="mb-3 text-[14px] font-bold text-slate-900">{title}</h3>
    {children}
    {footer ? <div className="mt-3 border-t border-slate-100 pt-3">{footer}</div> : null}
  </section>
));

InputPreviewPanel.displayName = "InputPreviewPanel";

export const PreviewField = memo(
  ({ label, value, helper }: { label: string; value: string; helper?: string }) => (
    <div>
      <label className="mb-1 block text-[12px] font-semibold text-slate-800">{label}</label>
      <div className="flex h-9 items-center justify-between rounded-md border border-slate-200 bg-white px-3 text-[13px] text-slate-700">
        <span className="truncate">{value}</span>
        <ListChecks className="h-3.5 w-3.5 text-slate-400" strokeWidth={2} />
      </div>
      {helper ? <p className="mt-1 text-[11px] text-slate-400">{helper}</p> : null}
    </div>
  ),
);

PreviewField.displayName = "PreviewField";

export const TipPanel = memo(({ children }: { children: ReactNode }) => (
  <section className="rounded-lg border border-slate-200 bg-white p-3">
    <div className="flex gap-2">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" strokeWidth={2} />
      <div>
        <p className="text-[13px] font-semibold text-slate-800">Tips</p>
        <div className="mt-1 text-[12px] leading-5 text-slate-500">{children}</div>
      </div>
    </div>
  </section>
));

TipPanel.displayName = "TipPanel";

export const SuccessLine = memo(({ label }: { label: string }) => (
  <div className="flex items-center gap-2 border-t border-slate-100 py-2 first:border-t-0">
    <CheckCircle2 className="h-4 w-4 text-emerald-500" strokeWidth={2} />
    <span className="text-[12px] text-slate-600">{label}</span>
  </div>
));

SuccessLine.displayName = "SuccessLine";
