import { ChevronDown, FileText, Plus, Type } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuItem } from "../../../components/ui/dropdown-menu";
import { INPUT_TYPE } from '../../../constant/inputType.enum'
const INPUT_TYPES = Object.values(INPUT_TYPE) as Array<
  typeof INPUT_TYPE[keyof typeof INPUT_TYPE]
    >
export const INPUT_TYPES_LIST = [
  { type: INPUT_TYPE.INPUTTYPE_1, name: "Input", color: "bg-blue-50 border-blue-200", icon: Type },
  { type: INPUT_TYPE.INPUTTYPE_2, name: "Dropdown", color: "bg-purple-50 border-purple-200", icon: ChevronDown },
  { type: INPUT_TYPE.INPUTTYPE_3, name: "Textbox", color: "bg-amber-50 border-amber-200", icon: FileText },
];
export function InputMenuWithAddButton({handleSelectInputType,rowIndex,columnIndex}:{handleSelectInputType:any,rowIndex:any,columnIndex:any}){
    return(
        <>
            <div className="relative">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="h-8 gap-2 w-full"
                    type="button"
                    variant="outline"
                    size="sm">
                            <Plus className="size-3" />
                            Add Input
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Input options</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {INPUT_TYPES_LIST && INPUT_TYPES_LIST.length && INPUT_TYPES_LIST.map((inputType:any) => {
                            const Icon = inputType.icon
                                return (
                                <DropdownMenuItem onClick={() => {handleSelectInputType(inputType,rowIndex,columnIndex)
                                }}>
                                <Icon className="size-4" />
                                <span className="font-medium">{inputType.name}</span>
                                </DropdownMenuItem>
                        )
                        })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    )
}