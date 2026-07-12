import * as Popover from "@radix-ui/react-popover";
import Row from "./Row";
import Num from "./Num";
import Unit from "./Unit";

const ColorRow = function ({
    label,
    hex,
    opacity,
    onHex,
    onOpacity,
}: {
    label: string;
    hex: string;
    opacity: number;
    onHex: (h: string) => void;
    onOpacity: (o: number) => void;
}) {
    return (
        <Row label={label}>
            <Popover.Root>
                <Popover.Trigger asChild>
                    <button className="flex items-center gap-1.5 bg-slate-100 rounded-md h-[24px] px-1.5 flex-1 min-w-0 hover:bg-slate-50 border border-slate-200 transition-colors">
                        <span
                            className="w-3 h-3 rounded-sm border border-slate-300 shrink-0"
                            style={{ background: `#${hex}` }}
                        />
                        <span className="text-xs font-mono text-slate-900 uppercase truncate">
                            #{hex}
                        </span>
                    </button>
                </Popover.Trigger>
                <Popover.Portal>
                    <Popover.Content
                        className="bg-white rounded-lg shadow-lg border border-slate-200 p-3 z-50 w-52"
                        sideOffset={6}
                        align="start"
                    >
                        <input
                            type="color"
                            value={`#${hex}`}
                            onChange={(e) => onHex(e.target.value.slice(1))}
                            className="w-full h-28 cursor-pointer rounded-lg"
                        />
                        <div className="mt-2 flex items-center gap-1.5">
                            <span className="text-xs text-slate-500">HEX</span>
                            <input
                                type="text"
                                maxLength={6}
                                value={hex.toUpperCase()}
                                onChange={(e) => onHex(e.target.value.replace("#", ""))}
                                className="flex-1 bg-slate-100 rounded-md text-xs px-2 h-6 outline-none font-mono uppercase border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
                            />
                        </div>
                    </Popover.Content>
                </Popover.Portal>
            </Popover.Root>

            <Num value={opacity} onChange={(v) => onOpacity(Number(v))} w="w-8" />
            <Unit>%</Unit>
        </Row>
    );
}

export default ColorRow;
