import { Link2, Unlink2 } from "lucide-react";
import Num from "../reUsableComponents/Num";

interface Sides {
    top: number | "auto";
    right: number | "auto";
    bottom: number | "auto";
    left: number | "auto";
    linked: boolean;
}
const SpacingCross = function ({
    label,
    values,
    onChange,
}: {
    label: string;
    values: Sides;
    onChange: (v: Sides) => void;
}) {
    const set = (k: keyof Omit<Sides, "linked">, v: number | "auto") => {
        onChange(
            values.linked && v !== "auto"
                ? { ...values, top: v, right: v, bottom: v, left: v }
                : { ...values, [k]: v },
        );
    };

    const N = ({ k }: { k: keyof Omit<Sides, "linked"> }) => (
        <Num value={values[k]} onChange={(v) => set(k, v)} w="w-9" />
    );

    return (
        <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-slate-600">{label}</span>
            <div className="grid grid-cols-3 gap-[3px] items-center justify-items-center">
                {/* row 1 */}
                <div />
                <N k="top" />
                <div />
                {/* row 2 */}
                <N k="left" />
                <button
                    onClick={() => onChange({ ...values, linked: !values.linked })}
                    className="w-5 h-5 flex items-center justify-center rounded-md bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 border border-slate-200 transition-colors"
                >
                    {values.linked ? <Link2 size={8} /> : <Unlink2 size={8} />}
                </button>
                <N k="right" />
                {/* row 3 */}
                <div />
                <N k="bottom" />
                <div />
            </div>
        </div>
    );
}
export default SpacingCross;