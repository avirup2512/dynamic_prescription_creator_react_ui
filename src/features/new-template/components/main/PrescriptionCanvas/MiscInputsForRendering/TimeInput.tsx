import * as React from "react";
import { Clock3 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { ColumnInputItem } from "@/features/new-template/type/TemplateType";

const hours = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0")
);

const minutes = Array.from({ length: 60 }, (_, i) =>
    String(i).padStart(2, "0")
);

export function TimeInput({ input, mode, onChange }: { input: any, mode: string, onChange?: (value: string) => void }) {
    const [hour, setHour] = React.useState("09");
    const [minute, setMinute] = React.useState("00");
    const [period, setPeriod] = React.useState("AM");

    React.useEffect(() => {
        const [time, p] = input.template_input_value?.split(" ") ?? ["09:00", "AM"];
        const [h, m] = time.split(":");

        setHour(h);
        setMinute(m);
        setPeriod(p);
    }, [input.template_input_value]);

    const update = (
        h = hour,
        m = minute,
        p = period
    ) => {
        onChange?.(`${h}:${m} ${p}`);
    };

    return (
        <>
            {
                mode == "edit" ?
                    <Popover>
                        <div className="min-w-0 flex-1 mb-2">
                            <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                                {input.name || input.input_name || "Untitled"}
                            </div>
                        </div>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-44 justify-start font-normal"
                            >
                                <Clock3 className="mr-2 h-4 w-4" />
                                {`${hour}:${minute} ${period}`}
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent
                            align="start"
                            className="w-auto p-4"
                        >
                            <div className="flex gap-2">
                                <Select
                                    value={hour}
                                    onValueChange={(v) => {
                                        setHour(v);
                                        update(v, minute, period);
                                    }}
                                >
                                    <SelectTrigger className="w-20">
                                        <SelectValue />
                                    </SelectTrigger>

                                    <SelectContent className="max-h-64">
                                        {hours.map((h) => (
                                            <SelectItem key={h} value={h}>
                                                {h}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <span className="flex items-center text-lg font-semibold">
                                    :
                                </span>

                                <Select
                                    value={minute}
                                    onValueChange={(v) => {
                                        setMinute(v);
                                        update(hour, v, period);
                                    }}
                                >
                                    <SelectTrigger className="w-20">
                                        <SelectValue />
                                    </SelectTrigger>

                                    <SelectContent className="max-h-64">
                                        {minutes.map((m) => (
                                            <SelectItem key={m} value={m}>
                                                {m}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select
                                    value={period}
                                    onValueChange={(v) => {
                                        setPeriod(v);
                                        update(hour, minute, v);
                                    }}
                                >
                                    <SelectTrigger className="w-20">
                                        <SelectValue />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="AM">AM</SelectItem>
                                        <SelectItem value="PM">PM</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </PopoverContent>
                    </Popover> : <div className="flex items-center gap-2 w-44 justify-start"><Clock3 size={16} />{`${hour}:${minute} ${period}`}</div>
            }
        </>
    );
}