// components/style-panel/StylePanelHeader.tsx

import * as React from "react";
import { Search, RotateCcw, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import type { StylePanelEntity } from "./types";

export interface StylePanelHeaderProps {
    entity: StylePanelEntity;
    onSearch?: () => void;
    onReset?: () => void;
    onDuplicate?: () => void;
    onRename?: () => void;
    onDelete?: () => void;
}

/**
 * Fixed header: entity name + type on the left, Search / Reset /
 * More-menu icon buttons on the right. Wraps its own TooltipProvider
 * so this component works standalone without requiring the consuming
 * app to add one at the root — cheap no-op if a provider already
 * exists further up the tree (Radix providers nest safely).
 */
export function StylePanelHeader({
    entity,
    onSearch,
    onReset,
    onDuplicate,
    onRename,
    onDelete,
}: StylePanelHeaderProps): React.ReactElement {
    return (
        <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
            <div className="flex min-w-0 flex-col">
                <h2 className="truncate text-base font-semibold text-foreground">
                    {entity.name}
                </h2>
                <span className="truncate text-sm text-muted-foreground">
                    {entity.type}
                </span>
            </div>

            <TooltipProvider delayDuration={200}>
                <div className="flex shrink-0 items-center gap-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={onSearch}
                                aria-label="Search properties"
                                className="h-9 w-9 rounded-md"
                            >
                                <Search className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Search properties</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={onReset}
                                aria-label="Reset all properties"
                                className="h-9 w-9 rounded-md"
                            >
                                <RotateCcw className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Reset all</TooltipContent>
                    </Tooltip>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                aria-label="More options"
                                className="h-9 w-9 rounded-md"
                            >
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                            <DropdownMenuItem onClick={onRename}>Rename</DropdownMenuItem>
                            <DropdownMenuItem onClick={onDuplicate}>Duplicate</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={onDelete} className="text-destructive focus:text-destructive">
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </TooltipProvider>
        </div>
    );
}