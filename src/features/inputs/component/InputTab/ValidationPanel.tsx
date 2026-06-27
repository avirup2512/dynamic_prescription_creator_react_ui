import { Circle, CheckCircle2 } from "lucide-react";
import { memo } from "react";

interface ValidationPanelProps {
  items: Array<{ id: string; label: string; valid: boolean }>;
}

const ValidationPanel = memo(({ items }: ValidationPanelProps) => (
  <section className="rounded-lg border border-slate-200 bg-white p-3">
    <h3 className="mb-2 text-[14px] font-bold text-slate-900">Validation summary</h3>
    <div className="divide-y divide-slate-100">
      {items.map((item) => {
        const Icon = item.valid ? CheckCircle2 : Circle;

        return (
          <div key={item.id} className="flex items-center gap-2 py-2">
            <Icon
              className={item.valid ? "h-4 w-4 text-emerald-500" : "h-4 w-4 text-amber-500"}
              strokeWidth={2}
            />
            <span className="text-[12px] text-slate-600">{item.label}</span>
          </div>
        );
      })}
    </div>
  </section>
));

ValidationPanel.displayName = "ValidationPanel";

export default ValidationPanel;
