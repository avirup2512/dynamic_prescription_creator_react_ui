import type { ReactNode } from "react";
import { Pencil, Settings, Trash2 } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { CanvasMode } from "./prescriptionCanvasTypes";

interface QuickAction {
    label: string;
    icon: ReactNode;
    onClick: () => void;
}

interface HoverToolbarProps {
    mode: CanvasMode;
    label: string;
    onSettings?: () => void;
    onDelete?: () => void;
    quickActions?: QuickAction[];
    showDeleteIcon?: boolean;
    visible?: boolean;
    className?: string;
}

export default function HoverToolbar({ mode, label, onSettings, onDelete, quickActions, showDeleteIcon = true, visible = false, className }: HoverToolbarProps) {
    if (mode === "preview") return null;

    return (
        <div
            className={cn(
                "pointer-events-none ml-auto flex items-center gap-1 text-slate-400 transition",
                visible ? "flex opacity-100" : "hidden opacity-0",
                className
            )}
        >
            <button
                type="button"
                aria-label={`Settings for ${label}`}
                onClick={(event) => {
                    event.stopPropagation();
                    onSettings?.();
                }}
                className="pointer-events-auto flex h-6 w-6 items-center justify-center text-slate-400 hover:text-slate-700"
            >
                <Settings className="h-3.5 w-3.5" onClick={onSettings} />
            </button>
            {quickActions && quickActions.length > 0 ? (
                <Popover>
                    <PopoverTrigger asChild>
                        <button
                            type="button"
                            aria-label={`Quick edit ${label}`}
                            onClick={(event) => event.stopPropagation()}
                            className="pointer-events-auto flex h-6 w-6 items-center justify-center text-slate-500 hover:text-slate-700"
                        >
                            <Pencil className="h-3.5 w-3.5" />
                        </button>
                    </PopoverTrigger>
                    <PopoverContent align="end" side="bottom" className="w-auto border-none bg-transparent p-0 shadow-none">
                        <div className="flex items-center gap-1 rounded-md border border-slate-200 bg-white p-1.5 shadow-sm">
                            {quickActions.map((action) => (
                                <button
                                    key={action.label}
                                    type="button"
                                    aria-label={action.label}
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        action.onClick();
                                    }}
                                    className="flex h-7 w-7 items-center justify-center text-slate-500 hover:text-slate-700"
                                >
                                    {action.icon}
                                </button>
                            ))}
                        </div>
                    </PopoverContent>
                </Popover>
            ) : null}
            {showDeleteIcon && onDelete ? (
                <button
                    type="button"
                    aria-label={`Remove ${label}`}
                    onClick={(event) => {
                        event.stopPropagation();
                        onDelete();
                    }}
                    className="pointer-events-auto flex h-6 w-6 items-center justify-center text-slate-500 hover:text-rose-500"
                >
                    <Trash2 className="h-3.5 w-3.5" />
                </button>
            ) : null}
        </div>
    );
}
