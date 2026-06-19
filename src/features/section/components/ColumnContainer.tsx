

import { useEffect } from 'react'
import type { Column as ColumnType } from '../type/SectionType'
import Column from './Column';
import { Button } from '../../../components/ui/button';
import { Trash2 } from 'lucide-react';
function ColumnContainer({
  column,
  rowIndex,
  columnIndex,
  onAddInput,
  onDeleteInput,
  onDeleteColumn,
}: {
  column: ColumnType
  rowIndex?:number
  columnIndex?:number
  onAddInput?: (sectionId: string, inputType: { id: string; name: string }) => void
  onDeleteInput?: (columnIndex: string, inputId: string) => void
  onDeleteColumn?: (columnIndex: any,rowIndex: any) => void
}) {
  useEffect(()=>{
    console.log(column);
  },[column]);
  const deleteColumn = () => {
    onDeleteColumn && onDeleteColumn?.(columnIndex, rowIndex);
  }
  return (
    <div
      className="cursor-grab rounded-lg border border-border bg-background p-3 transition"
    >
        <div className="mb-3 flex items-center gap-2 justify-between">
          <span className="text-sm font-medium">Input list</span>
          <Button aria-label="Delete input"
                onClick={() => deleteColumn()}
                size="icon"
                type="button"
                variant="ghost"
                className="h-6 w-6 hover:bg-red-100">
            <Trash2 className="size-3 text-red-600" />
          </Button>
      </div>
      { <Column 
        columnIndex={columnIndex}
        rowIndex={rowIndex}
        inputGroup={column?.inputGroup}
        onAddInput={onAddInput}
        onDeleteInput={onDeleteInput}
      /> }
    </div>
  )
}
export default ColumnContainer;