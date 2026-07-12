import NumberInput from "./NumberInput";

interface Props {

    title: string;

    top: number;

    right: number;

    bottom: number;

    left: number;

    onTopChange: (value: number) => void;

    onRightChange: (value: number) => void;

    onBottomChange: (value: number) => void;

    onLeftChange: (value: number) => void;

}

export default function FourSideInput({

    title,

    top,

    right,

    bottom,

    left,

    onTopChange,

    onRightChange,

    onBottomChange,

    onLeftChange,

}: Props) {

    return (

        <div className="space-y-4">

            <h4 className="text-sm font-semibold">
                {title}
            </h4>

            <div className="grid grid-cols-3 gap-3 items-center">

                <div />

                <NumberInput
                    value={top}
                    onChange={(v) => onTopChange(v ?? 0)}
                />

                <div />

                <NumberInput
                    value={left}
                    onChange={(v) => onLeftChange(v ?? 0)}
                />

                <div className="rounded-lg border h-14 flex items-center justify-center text-xs text-muted-foreground">
                    {title}
                </div>

                <NumberInput
                    value={right}
                    onChange={(v) => onRightChange(v ?? 0)}
                />

                <div />

                <NumberInput
                    value={bottom}
                    onChange={(v) => onBottomChange(v ?? 0)}
                />

                <div />

            </div>

        </div>

    );

}