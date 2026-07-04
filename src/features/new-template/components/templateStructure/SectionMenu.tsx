import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Copy, Ellipsis, Eye, EyeOff, Settings, Trash2 } from "lucide-react";
import { useState } from "react";
interface SectionMenuProps {
    onShowHide: () => void;
    OnEditSection: () => void;
}

const SectionMenu = ({ onShowHide, OnEditSection }: SectionMenuProps) => {
    const [isVisible, setIsVisible] = useState(true);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    size="icon-xs"
                    type="button"
                    variant="ghost"
                    className="flex items-center justify-center border-none text-slate-400 opacity-0 hover:bg-slate-100 hover:text-slate-700 group-hover:opacity-100"
                >
                    <Ellipsis className="h-3.5 w-3.5" strokeWidth={2} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 text-[12px]" align="start">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Section activities</DropdownMenuLabel>
                    <DropdownMenuItem onClick={OnEditSection}>
                        Edit Section
                        <DropdownMenuShortcut>
                            <Settings className="size-4" />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => { setIsVisible((visible) => !visible); onShowHide(); }}>
                        Show/Hide
                        <DropdownMenuShortcut>
                            {isVisible ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Copy Section
                        <DropdownMenuShortcut>
                            <Copy className="size-4 " />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem className=" text-red-600">
                        Remove Section
                        <DropdownMenuShortcut>
                            <Trash2 className="size-4 text-red-600" />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export default SectionMenu;
