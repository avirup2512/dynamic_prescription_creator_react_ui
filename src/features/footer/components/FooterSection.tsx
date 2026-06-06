import { useState } from 'react'
import { Plus, Trash2, Type, ChevronDown, FileText } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import type { InputTypeItem } from '../type/FooterSectionType'
import { INPUT_TYPE } from '../../../constant/inputType.enum'

const INPUT_TYPES = [
  { id: INPUT_TYPE.INPUTTYPE_1, name: 'Input', color: 'bg-blue-50 border-blue-200', icon: Type },
  { id: INPUT_TYPE.INPUTTYPE_2, name: 'Dropdown', color: 'bg-purple-50 border-purple-200', icon: ChevronDown },
  { id: INPUT_TYPE.INPUTTYPE_3, name: 'Textbox', color: 'bg-amber-50 border-amber-200', icon: FileText },
]

const getInputTypeConfig = (inputTypeId: string) => {
  return INPUT_TYPES.find((type) => type.id === inputTypeId)
}

interface FooterSectionProps {
  sectionId: string
  inputs?: InputTypeItem[]
  onAddInput?: (sectionId: string, inputType: typeof INPUT_TYPES[0]) => void
  onDeleteInput?: (sectionId: string, inputId: string) => void
}

function FooterSection({
  sectionId,
  inputs = [],
  onAddInput,
  onDeleteInput,
}: FooterSectionProps) {
  const [showMenu, setShowMenu] = useState(false)

  const handleSelectInputType = (inputType: typeof INPUT_TYPES[0]) => {
    onAddInput?.(sectionId, inputType)
    setShowMenu(false)
  }

  return (
    <div className="min-h-20 rounded-lg border border-dashed border-border bg-muted/30 p-3">
      {inputs && inputs.length > 0 && (
        <div className="mb-3 space-y-2">
          {inputs.map((input) => {
            const config = getInputTypeConfig(input.inputTypeId)
            const Icon = config?.icon || Type
            
            return (
              <div
                key={input.id}
                className={`flex items-center justify-between rounded-md border-2 ${config?.color} p-3 text-sm transition-all hover:shadow-md`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="size-4 flex-shrink-0" />
                  <span className="font-semibold text-gray-700">{input.name}</span>
                </div>
                <Button
                  aria-label="Delete input"
                  onClick={() => onDeleteInput?.(sectionId, input.id)}
                  size="icon"
                  type="button"
                  variant="ghost"
                  className="h-6 w-6 hover:bg-red-100"
                >
                  <Trash2 className="size-3 text-red-600" />
                </Button>
              </div>
            )
          })}
        </div>
      )}

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
            {INPUT_TYPES.map((inputType) => {
              const Icon = inputType.icon
              return (
                <button
                  key={inputType.id}
                  className={`w-full px-3 py-3 text-left text-sm hover:${inputType.color} transition-colors first:rounded-t-md last:rounded-b-md flex items-center gap-2 border-l-4 border-transparent hover:border-gray-300`}
                  onClick={() => handleSelectInputType(inputType)}
                >
                  <Icon className="size-4" />
                  <span className="font-medium">{inputType.name}</span>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default FooterSection
