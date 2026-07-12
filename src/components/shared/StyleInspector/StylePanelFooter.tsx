// components/style-panel/StylePanelFooter.tsx

import * as React from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface StylePanelFooterProps {
    onReset: () => void;
    onCancel: () => void;
    onApply: () => void;
    /** Disables Apply, e.g. while a save request is in flight */
    applyDisabled?: boolean;
}

/**
 * Sticky footer: Reset (left, ghost + icon) and Cancel / Apply
 * (right, outline + primary) — matches the design's bottom bar.
 * Positioning (sticky/border) is handled by the parent StylePanel
 * layout; this component only renders the button row.
 */
export function StylePanelFooter({
    onReset,
    onCancel,
    onApply,
    applyDisabled,
}: StylePanelFooterProps): React.ReactElement {
    return (
        <div className="flex items-center justify-between gap-3 border-t border-border bg-background px-5 py-4">
            <Button
                type="button"
                variant="ghost"
                onClick={onReset}
                className="gap-2 text-sm font-normal text-muted-foreground"
            >
                <RotateCcw className="h-4 w-4" />
                Reset
            </Button>

            <div className="flex items-center gap-2">
                <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="button" onClick={onApply} disabled={applyDisabled}>
                    Apply
                </Button>
            </div>
        </div>
    );
}