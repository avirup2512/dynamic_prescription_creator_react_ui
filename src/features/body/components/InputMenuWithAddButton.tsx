import { Plus } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useState } from "react";
import { useSelector } from "react-redux";

export function InputMenuWithAddButton({handleSelectInputType,rowIndex,sectionKey}:{handleSelectInputType:any,rowIndex:any,sectionKey:any}){
    const BodyState = useSelector((state:any)=>state.body);
    const INPUT_TYPES = BodyState.INPUT_TYPES;
    const [showMenu, setShowMenu] = useState(false)
    return(
        <>
            <div className="relative">
                <Button
                    className="h-8 gap-2 w-full"
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowMenu(!showMenu)}
                >
                    <Plus className="size-3" />
                    Add Input
                </Button>
                {showMenu && (
                <div className="absolute z-10 mt-1 w-full rounded-lg border border-border bg-background shadow-lg">
                    {INPUT_TYPES && INPUT_TYPES.length && INPUT_TYPES.map((inputType:any) => {
                    const Icon = inputType.icon
                    return (
                        <button
                        key={inputType.id}
                        className={`w-full px-3 py-3 text-left text-sm hover:${inputType.color} transition-colors first:rounded-t-md last:rounded-b-md flex items-center gap-2 border-l-4 border-transparent hover:border-gray-300`}
                        onClick={() => {handleSelectInputType(inputType,rowIndex,sectionKey); setShowMenu(false)
                        }}
                        >
                        <Icon className="size-4" />
                        <span className="font-medium">{inputType.name}</span>
                        </button>
                    )
                    })}
                </div>
                )}
            </div>
        </>
    )
}