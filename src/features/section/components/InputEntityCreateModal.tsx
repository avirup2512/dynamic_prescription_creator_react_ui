import { useEffect, useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'

import { INPUT_TYPE } from '../../../constant/inputType.enum'
import { Button } from '../../../components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog'
import InputEntityTypeService from '@/features/inputEntityType/services/InputEntityTypeService'

type DropdownOption = {
  id: string
  value: string
}

type InputEntityCreateModalProps = {
  inputType: string
  isOpen: boolean
  onCreated: (createdInputId?: string) => void
  onOpenChange: (open: boolean) => void
}

const createOption = (): DropdownOption => ({
  id: `option-${Date.now()}`,
  value: '',
})

function InputEntityCreateModal({
  inputType,
  isOpen,
  onCreated,
  onOpenChange,
}: InputEntityCreateModalProps) {
  const [name, setName] = useState('')
  const [value, setValue] = useState('')
  const [options, setOptions] = useState<DropdownOption[]>([createOption()])
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  const isDropdown = inputType === INPUT_TYPE.INPUTTYPE_2
  const isInput = inputType === INPUT_TYPE.INPUTTYPE_1

  useEffect(() => {
    if (!isOpen) return

    setName('')
    setValue('')
    setOptions([createOption()])
    setError('')
    setIsSaving(false)
  }, [isOpen, inputType])

  function addOption() {
    setOptions((currentOptions) => [...currentOptions, createOption()])
  }

  function removeOption(optionId: string) {
    setOptions((currentOptions) =>
      currentOptions.filter((option) => option.id !== optionId),
    )
  }

  function updateOption(optionId: string, nextValue: string) {
    setOptions((currentOptions) =>
      currentOptions.map((option) =>
        option.id === optionId ? { ...option, value: nextValue } : option,
      ),
    )
  }

  function getCreatedId(response: any) {
    const data = response?.data
    if (Array.isArray(data)) return data[0]?.id
    return data?.id || response?.id
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    const trimmedName = name.trim()
    const dropdownOptions = options
      .map((option) => ({ ...option, value: option.value.trim() }))
      .filter((option) => option.value)

    if (!trimmedName) {
      setError('Name is required.')
      return
    }

    if (isDropdown && dropdownOptions.length === 0) {
      setError('Add at least one dropdown value.')
      return
    }

    if (!isInput && !isDropdown) {
      setError('Create is available for Input and Dropdown types.')
      return
    }

    setIsSaving(true)
    try {
      const response = await InputEntityTypeService.createInputEntityType({
        name: trimmedName,
        type: inputType,
        value: isDropdown ? (dropdownOptions as any) : value,
      } as any)

      if (!response?.success) {
        setError(response?.message || 'Failed to create input entity.')
        return
      }

      onCreated(getCreatedId(response))
      onOpenChange(false)
    } catch (error) {
      setError('Failed to create input entity.')
    } finally {
      setIsSaving(false)
    }
  }

  const title = isDropdown ? 'Create Dropdown' : 'Create Input'

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {isDropdown
              ? 'Add a dropdown name and define selectable values.'
              : 'Add a new input entity with a name and value.'}
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="inputEntityName">
              Name <span className="text-destructive">*</span>
            </label>
            <input
              className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/20"
              id="inputEntityName"
              name="name"
              onChange={(event) => setName(event.target.value)}
              placeholder={isDropdown ? 'Enter dropdown name' : 'Enter name'}
              required
              type="text"
              value={name}
            />
          </div>

          {isDropdown ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <label className="text-sm font-medium">Values</label>
                <Button
                  className="h-8 gap-2"
                  onClick={addOption}
                  type="button"
                  variant="outline"
                >
                  <Plus className="size-4" />
                  Add value
                </Button>
              </div>

              <div className="space-y-3">
                {options.map((option, index) => (
                  <div className="flex items-center gap-2" key={option.id}>
                    <textarea
                      className="min-h-20 w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/20"
                      name="values"
                      onChange={(event) =>
                        updateOption(option.id, event.target.value)
                      }
                      placeholder={`Value ${index + 1}`}
                      value={option.value}
                    />
                    <Button
                      aria-label="Delete value"
                      disabled={options.length === 1}
                      onClick={() => removeOption(option.id)}
                      size="icon"
                      type="button"
                      variant="ghost"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="inputEntityValue">
                Value
              </label>
              <input
                className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/20"
                id="inputEntityValue"
                name="value"
                onChange={(event) => setValue(event.target.value)}
                placeholder="Enter value"
                type="text"
                value={value}
              />
            </div>
          )}

          {error ? <p className="text-sm text-destructive">{error}</p> : null}

          <DialogFooter>
            <Button className="h-9 px-4" disabled={isSaving} type="submit">
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
            <DialogClose asChild>
              <Button
                className="h-9 px-4"
                disabled={isSaving}
                type="button"
                variant="outline"
              >
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default InputEntityCreateModal
