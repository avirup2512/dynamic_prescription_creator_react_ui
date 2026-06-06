# SearchableListEditor Component

A reusable, fully-featured list editor component with search, inline editing, and add/delete capabilities.

## Features

✅ **Searchable Dropdown** - Real-time filtering of list items  
✅ **Inline Editing** - Click edit icon to modify items  
✅ **Add/Delete** - "Add More" button and delete icons  
✅ **Fully Customizable** - All labels and messages configurable  
✅ **Built with shadcn** - Uses existing UI components  
✅ **TypeScript Support** - Fully typed props and items

## Installation

The component is already created at:

```
src/components/ui/searchable-list-editor.tsx
```

## Usage

### Basic Example

```typescript
import { SearchableListEditor, SearchableListEditorItem } from "@/components/ui/searchable-list-editor"

function MyComponent() {
  const [items, setItems] = useState<SearchableListEditorItem[]>([
    { id: "1", label: "Item 1" },
    { id: "2", label: "Item 2" },
  ])

  return (
    <SearchableListEditor
      items={items}
      onItemsChange={setItems}
      placeholder="Select items"
    />
  )
}
```

### With Customization

```typescript
<SearchableListEditor
  items={items}
  onItemsChange={setItems}
  placeholder="Click to select"
  searchPlaceholder="Search items..."
  addMoreButtonLabel="Add New Item"
  emptyMessage="No items available"
/>
```

## Props

### SearchableListEditorProps

| Prop                 | Type                                          | Required | Default          | Description                           |
| -------------------- | --------------------------------------------- | -------- | ---------------- | ------------------------------------- |
| `items`              | `SearchableListEditorItem[]`                  | ✅       | -                | Array of items to display             |
| `onItemsChange`      | `(items: SearchableListEditorItem[]) => void` | ✅       | -                | Callback when items change            |
| `placeholder`        | `string`                                      | ❌       | "Select items"   | Button text when dropdown closed      |
| `searchPlaceholder`  | `string`                                      | ❌       | "Search..."      | Search input placeholder              |
| `addMoreButtonLabel` | `string`                                      | ❌       | "Add More"       | Label for add button                  |
| `emptyMessage`       | `string`                                      | ❌       | "No items found" | Message when search yields no results |

### SearchableListEditorItem

```typescript
interface SearchableListEditorItem {
  id: string; // Unique identifier
  label: string; // Display text
}
```

## Actions

### Search

- User can type in the search box to filter items
- Search is case-insensitive
- Filters happen in real-time

### Edit Item

1. Click the **pencil icon** next to item
2. Input box opens with current value
3. Click **green checkmark** (✓) to save
4. Click **red X** (✗) to cancel

### Delete Item

1. Click the **trash icon** next to item
2. Item is immediately removed from list

### Add New Item

1. Click **Add More** button at bottom
2. Empty item is added to list
3. Click pencil icon to edit the new item

## Component Structure

```
SearchableListEditor
├── Popover (dropdown container)
├── Command (search + list)
│   ├── Search Input
│   ├── Command List
│   │   └── Items
│   │       ├── View Mode
│   │       │   ├── Item Label
│   │       │   ├── Edit Icon
│   │       │   └── Delete Icon
│   │       └── Edit Mode
│   │           ├── Input Field
│   │           ├── Save Icon
│   │           └── Cancel Icon
│   └── Empty State
└── Add More Button
```

## Styling

- Uses shadcn's `Button`, `Input`, `Popover`, and `Command` components
- Inherits theme from your shadcn configuration
- Responsive and mobile-friendly
- Dark mode compatible

## Form Integration

```typescript
function MyForm() {
  const [formData, setFormData] = useState({
    tags: [
      { id: "1", label: "Tag 1" },
    ]
  })

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      console.log("Form data:", formData)
    }}>
      <SearchableListEditor
        items={formData.tags}
        onItemsChange={(newTags) =>
          setFormData({ ...formData, tags: newTags })
        }
        placeholder="Select tags"
      />
      <button type="submit">Submit</button>
    </form>
  )
}
```

## Icon Components

The component includes two inline icon components:

- **PencilIcon** - Edit button icon
- **TrashIcon** - Delete button icon

They also use:

- **CheckIcon** - From `tiptap-icons/check-icon.tsx` (save button)
- **CloseIcon** - From `tiptap-icons/close-icon.tsx` (cancel button)

## Keyboard Interactions

- **Tab** - Navigate through interactive elements
- **Enter** - Save edited item (when focus is on save button)
- **Escape** - Close popover

## Common Use Cases

### 1. Tags/Labels Manager

```typescript
<SearchableListEditor
  items={tags}
  onItemsChange={setTags}
  placeholder="Manage tags"
/>
```

### 2. Dynamic Form Fields

```typescript
<SearchableListEditor
  items={dynamicFields}
  onItemsChange={setDynamicFields}
  addMoreButtonLabel="Add Field"
/>
```

### 3. Dropdown Options

```typescript
<SearchableListEditor
  items={dropdownOptions}
  onItemsChange={setDropdownOptions}
  placeholder="Select options"
/>
```

## Notes

- Empty items display as "(empty)" in the list
- New items get unique IDs based on timestamp
- All changes trigger `onItemsChange` callback immediately
- Component is fully controlled - all state management is in parent

## Future Enhancements

- Drag-to-reorder functionality
- Bulk actions
- Copy to clipboard
- Import/export
- Validation rules per item
