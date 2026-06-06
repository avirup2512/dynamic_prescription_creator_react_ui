import { useState, useMemo } from "react"
import { Button } from "./button"
import { Input } from "./input"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "./command"
import { CheckIcon } from "../tiptap-icons/check-icon"
import { CloseIcon } from "../tiptap-icons/close-icon"
import { Edit, Edit2, Trash2 } from "lucide-react"

export interface SearchableListEditorItem {
  id: string
  label: string
}

export interface SearchableListEditorProps {
  items: SearchableListEditorItem[]
  selectedId?: string
  onSelect?: (id: string) => void
  onItemsChange?: (items: SearchableListEditorItem[]) => void
  placeholder?: string
  searchPlaceholder?: string
  addMoreButtonLabel?: string
  emptyMessage?: string
}

export function SearchableListEditor({
  items,
  selectedId,
  onSelect,
  onItemsChange,
  placeholder = "Select items",
  searchPlaceholder = "Search...",
  addMoreButtonLabel = "Add More",
  emptyMessage = "No items found",
}: SearchableListEditorProps) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [items, searchQuery])

  const handleAddMore = () => {
    const newId = `item-${Date.now()}`
    onItemsChange([...items, { id: newId, label: "" }])
  }

  const handleStartEdit = (id: string, label: string) => {
    setEditingId(id)
    setEditValue(label)
  }

  const handleSaveEdit = (id: string) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, label: editValue } : item
    )
    onItemsChange(updatedItems)
    setEditingId(null)
    setEditValue("")
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditValue("")
  }

  const handleDeleteItem = (id: string) => {
    onItemsChange(items.filter((item) => item.id !== id))
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          {selectedId
            ? items.find((item) => item.id === selectedId)?.label ?? placeholder
            : items.length > 0
            ? `${items.length} item${items.length !== 1 ? "s" : ""}`
            : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <input
            placeholder={searchPlaceholder}
            className="h-8 w-full border-0 border-b border-input bg-transparent px-3 py-1 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <CommandList>
            {/* <CommandEmpty>{emptyMessage}</CommandEmpty> */}
            <CommandGroup>
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className={
                    "flex items-center gap-2 px-2 py-1.5 " +
                    (selectedId === item.id ? "bg-muted/30 rounded-md" : "hover:bg-muted/10 rounded-md")
                  }
                  onClick={(e) => {
                    if (editingId === item.id) return
                    if ((e.target as HTMLElement).closest("button")) return
                    if (onSelect) {
                      onSelect(item.id)
                      setOpen(false)
                    }
                  }}
                >
                  {editingId === item.id ? (
                    <div className="flex flex-1 items-center gap-1">
                      <Input
                        autoFocus
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        placeholder="Enter value"
                        className="h-7 flex-1 text-xs"
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6"
                        onClick={() => handleSaveEdit(item.id)}
                      >
                        <CheckIcon className="h-4 w-4 text-green-600" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6"
                        onClick={handleCancelEdit}
                      >
                        <CloseIcon className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <span className="flex-1 text-sm">{item.label || "(empty)"}</span>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleStartEdit(item.id, item.label)
                        }}
                      >
                        <Edit2 className="size-3" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteItem(item.id)
                        }}
                      >
                        <Trash2 className="size-3 text-red-600" />
                      </Button>
                    </>
                  )}
                </div>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
        <div className="border-t border-input p-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={handleAddMore}
          >
            + {addMoreButtonLabel}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
