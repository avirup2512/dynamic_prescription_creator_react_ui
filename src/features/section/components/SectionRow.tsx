import { Button } from '../../../components/ui/button'
import { useEffect, useRef, useState } from 'react'
import { Cross, Edit, Edit2, Edit2Icon, Plus, Save, Trash2 } from 'lucide-react'
import { EditSectionName, EditSectionRowsName } from '../store/SectionSlice'
import { useDispatch,useSelector } from 'react-redux'
import ColumnContainer from './ColumnContainer';
import SectionUtilsService from '../utils/SectionUtilsService';
import {AddCoulmnToSection,UpdateWidthOfColumn} from '../store/SectionSlice';
const MAX_SECTIONS_PER_ROW = 3
function SectionRow({
  rowData,
  rowIndex,
  onRemove,
  onReorderSections,
  onAddInput,
  onDeleteInput,
  onDeleteColumn,
  onAddHeaderSection
}: any) {
  const SectionState = useSelector((state:any)=> state.section);
  const dispatch = useDispatch();
  const [showSectionNameEdit, setShowSectionNameEdit] = useState(false);
  const [sectionName, setSectionName] = useState(rowData.name);

  const addColumn = () => {
    if (SectionState?.currentSection?.rows?.[rowIndex]?.columns?.length >= 3)
        return;
    const columnData = JSON.parse(JSON.stringify(SectionState?.defaultColumn));
    const width = SectionUtilsService.calculateWidthAfterColumnDeletion(SectionState?.currentSection?.rows?.[rowIndex]?.columns.length+1 || 0);
    const columnPosition = SectionState?.currentSection?.rows?.[rowIndex]?.columns?.length ? SectionState.currentSection.rows[rowIndex].columns.length+1 : 1;
    columnData.column_order = columnPosition;
    dispatch(AddCoulmnToSection({ rowIndex, columnData }));
    dispatch(UpdateWidthOfColumn({ rowIndex, width }))
  }
  const handleSectionNameEdit = () => {
    setShowSectionNameEdit(false);
    if(sectionName)
    dispatch(EditSectionRowsName({ rowIndex, rowName: sectionName }));
  }
  return (
    <div
      className={`rounded-xl border border-border bg-card p-4 shadow-sm transition}`}>
      <div className="mb-4 flex items-center justify-between gap-3">
        {
            showSectionNameEdit ? (
                <div className="flex items-center gap-2">
                    <input
                        className="h-9 rounded-lg border border-input bg-background pl-3 pr-3 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/20"
                        value={sectionName}
                        onChange={(e) => setSectionName(e.target.value)}
                    />
                    <Button
                        size="icon"
                        type="button"                       
                        onClick={handleSectionNameEdit}
                    >
                        <Save className="size-4" />
                    </Button>
                    <Button
                        size="icon"
                        type="button"                       
                        onClick={() => {setSectionName(rowData.name); setShowSectionNameEdit(false)}}
                    >
                        <Cross className="size-4" />
                    </Button>
                </div>
            ) : (
                <div className="flex items-center gap-3">
                    <h2 className="text-sm font-semibold">{rowData?.name}</h2>
                    <Button
                        aria-label="Remove header section"
                        onClick={() => setShowSectionNameEdit(true)}
                        size="icon"
                        type="button"
                        variant="ghost"
                        >
                        <Edit2Icon className="size-3" />
                    </Button>
                </div>
            )
        }
        <div className="flex gap-2 items-center">
          <Button size="icon"
                type="button"
                variant="ghost"
                className="h-6 w-6 hover:bg-green-100" onClick={addColumn}>
            <Plus className="size-4" />
          </Button>
          <Button
                aria-label="Delete input"
          onClick={() => onRemove(rowIndex)}
                size="icon"
                type="button"
                variant="ghost"
                className="h-6 w-6 hover:bg-red-100"
            >
                <Trash2 className="size-3 text-red-600" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3 min-h-[200px]">
          {rowData && rowData?.columns && rowData.columns.map((column: any,index: number) => (
              <div
              key={`column-${index}`}
              className={`rounded-lg border border-dashed border-border bg-background p-3 ${SectionUtilsService.getWidthClass(column.width)}`}>
              <ColumnContainer onDeleteColumn={onDeleteColumn} onDeleteInput={onDeleteInput} onAddInput={onAddInput} column={column} rowIndex={rowIndex} columnIndex={index} />
              </div>
          ))}
        </div>
    </div>
  )
}

export default SectionRow;
