import { Shield } from "lucide-react";
import * as Switch from "@radix-ui/react-switch";
import { useState } from "react";

interface InputHeaderProps {
    inputName: string;
    setInputName: (value: string) => void;
    description: string;
    setDescription: (value: string) => void;
    extraNote: boolean;
    setExtraNote: (value: boolean) => void;
    quantity: boolean;
    setQuantity: (value: boolean) => void;
    visibility: boolean;
    setVisibility: (value: boolean) => void;
}

export default function InputHeader({ inputName, setInputName, description, setDescription, extraNote, setExtraNote, quantity, setQuantity, visibility, setVisibility }: InputHeaderProps) {
    const [on, setOn] = useState(true);

    return (
        <div className="space-y-3 bg-white p-3">
            <div>
                <label className="mb-1.5 block text-[11px] font-semibold tracking-wide text-slate-600">
                    Input Name
                </label>
                <div className="relative">
                    <input
                        type="text"
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                        className="h-8 w-full rounded-md border border-slate-200 bg-white px-2.5 pr-8 text-[12px] text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    />
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400">
                        <Shield size={14} />
                    </div>
                </div>
            </div>

            <div>
                <label className="mb-1.5 block text-[11px] font-semibold tracking-wide text-slate-600">
                    Description
                </label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                    className="w-full resize-none rounded-md border border-slate-200 bg-white px-2.5 py-2 text-[12px] text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
            </div>
            <div className="group flex w-full items-center justify-between gap-1.5 px-2  hover:bg-slate-50 transition-colors">
                <label className="mb-1.5 block text-[11px] font-semibold tracking-wide text-slate-600">
                    Add Extranotes
                </label>
                <Switch.Root
                    checked={extraNote}
                    onCheckedChange={setExtraNote}
                    className="relative inline-flex h-[18px] w-8 items-center rounded-full outline-none transition-colors bg-slate-300 data-[state=checked]:bg-blue-600"
                >
                    <Switch.Thumb className="block h-[13px] w-[13px] rounded-full bg-white shadow-sm transition-transform translate-x-[2px] data-[state=checked]:translate-x-[15px]" />
                </Switch.Root>
            </div>
            <div className="group flex w-full items-center justify-between gap-1.5 px-2  hover:bg-slate-50 transition-colors">
                <label className="mb-1.5 block text-[11px] font-semibold tracking-wide text-slate-600">
                    Add Quantity
                </label>
                <Switch.Root
                    checked={quantity}
                    onCheckedChange={setQuantity}
                    className="relative inline-flex h-[18px] w-8 items-center rounded-full outline-none transition-colors bg-slate-300 data-[state=checked]:bg-blue-600"
                >
                    <Switch.Thumb className="block h-[13px] w-[13px] rounded-full bg-white shadow-sm transition-transform translate-x-[2px] data-[state=checked]:translate-x-[15px]" />
                </Switch.Root>
            </div>
            <div className="group flex w-full items-center justify-between gap-1.5 px-2  hover:bg-slate-50 transition-colors">
                <label className="mb-1.5 block text-[11px] font-semibold tracking-wide text-slate-600">
                    Visibility
                </label>
                <Switch.Root
                    checked={visibility}
                    onCheckedChange={setVisibility}
                    className="relative inline-flex h-[18px] w-8 items-center rounded-full outline-none transition-colors bg-slate-300 data-[state=checked]:bg-blue-600"
                >
                    <Switch.Thumb className="block h-[13px] w-[13px] rounded-full bg-white shadow-sm transition-transform translate-x-[2px] data-[state=checked]:translate-x-[15px]" />
                </Switch.Root>
            </div>
        </div>
    );
}
