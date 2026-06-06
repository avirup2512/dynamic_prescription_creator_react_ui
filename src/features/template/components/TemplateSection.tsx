import TemplateSectionInput from "./TemplateSectionInput";
import HeaderUtilService from "../../header/utils/utilsService";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SectionUtilsService from "../../section/utils/SectionUtilsService"
import { AddCoulmnToSection, UpdateWidthOfColumn } from "../store/TemplateSlice";
const renderHeaderRow = (row: any, rowIndex: number,onAddInputValue: (payload: any) => void,onAddQuantityValue: (payload: any) => void,onAddQuantityTextValue: (payload: any) => void,sectionType: string,onAddDropdownOptionsValue: (payload: any) => void,onDeleteInput: (rowIndex: number, sectionKey: string, inputIndex: number) => void,TemplateState:any,SectionState:any, addColumnToTemplate:any) => {
  const columns = row?.columns || [];
  const addColumn = () => {
    const currentSection = sectionType === "header" ? TemplateState?.CurrentTemplate?.header : TemplateState?.CurrentTemplate?.body;
    console.log(TemplateState?.CurrentTemplate)
      if (currentSection?.rows?.[rowIndex]?.columns?.length >= 3)
          return;
      const columnData = JSON.parse(JSON.stringify(SectionState?.defaultColumn));
      const width = SectionUtilsService.calculateWidthAfterColumnDeletion(currentSection?.rows?.[rowIndex]?.columns.length+1 || 0);
      const columnPosition = currentSection?.rows?.[rowIndex]?.columns?.length ? currentSection.rows[rowIndex].columns.length+1 : 1;
    columnData.column_order = columnPosition;
    addColumnToTemplate(rowIndex, columnData, width)
    }
  const onRemove = (rowIndex: number) => {
    // Implement row removal logic here
  }
  return (
    <div key={rowIndex} className="rounded-2xl border border-border bg-white/80 p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h4 className="text-sm font-semibold text-foreground">Row {rowIndex + 1}</h4>
        {/* <span className="rounded-full bg-muted px-2 py-1 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          {sectionType === 'header' ? 'Header' : 'Body'} row
        </span> */}
        <div className="flex gap-2 items-center">
          {/* <Button size="icon"
                type="button"
                variant="ghost"
                className="h-6 w-6 hover:bg-green-100" onClick={addColumn}>
            <Plus className="size-4" />
          </Button> */}
          {/* <Button
                aria-label="Delete input"
                onClick={() => onRemove(rowIndex)}
                size="icon"
                type="button"
                variant="ghost"
                className="h-6 w-6 hover:bg-red-100"
              >
                <Trash2 className="size-3 text-red-600" />
              </Button> */}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-3">
        {columns && columns.map((column: any, columnIndex: number) => {
          return (
            <div key={columnIndex} className={ `space-y-3 rounded-2xl border border-border bg-slate-100 p-3 ${HeaderUtilService.getWidthClass(column.width)}` }>
              <div className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                Column {columnIndex + 1}
              </div>

              {column?.inputs && column?.inputs.length ? (
                <TemplateSectionInput sectionType={sectionType} columnIndex={columnIndex} inputs={column.inputs} rowIndex={rowIndex} onAddInputValue={onAddInputValue} onAddQuantityValue={onAddQuantityValue} onAddQuantityTextValue={onAddQuantityTextValue} onAddDropdownOptionsValue={onAddDropdownOptionsValue} onDeleteInput={onDeleteInput} />
              ) : (
                <div className="min-h-[88px] rounded-xl border border-dashed border-border bg-white/80 p-3 text-sm text-muted-foreground">
                  Empty section
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
const renderRows = (rows: any[], rowType: 'headerRows' | 'bodyRows') => {
    console.log(rows);
  if (!rows?.length) {
    return <p className="text-sm text-muted-foreground">No rows available.</p>
  }

  return rows.map((row, rowIndex) => (
   <></>
  ))
}
const renderValue = (value: any) => {
  if (value === null || value === undefined) {
    return <span className="text-muted-foreground">N/A</span>
  }

  if (typeof value === 'object') {
    return (
      <pre className="whitespace-pre-wrap rounded bg-slate-950/5 p-3 text-xs leading-5 text-slate-700">
        {JSON.stringify(value, null, 2)}
      </pre>
    )
  }

  return <span>{String(value)}</span>
}
function TemplateSection({ sectionData, sectionType, onAddInputValue, onAddQuantityValue, onAddQuantityTextValue, onAddDropdownOptionsValue, onDeleteInput }: any) {
    const TemplateState = useSelector((state: any) => state.template);
  const SectionState = useSelector((state: any) => state.section);
  const dispatch = useDispatch();
    const [rows, setRows] = useState(sectionData?.rows || [])

    useEffect(() => {
      setRows(sectionData?.rows || [])
      console.log(sectionData)
    }, [sectionData, sectionType])

  const addColumnToTemplate = (index:any,data:any,width:any) => {
      dispatch(AddCoulmnToSection({ rowIndex:index, columnData:data , sectionType}));
      dispatch(UpdateWidthOfColumn({ rowIndex:index, width,sectionType }))
  }

    return(
        <section className="rounded-2xl border border-border bg-slate-50 p-5">
            <div className="mb-4">
              <div>
                <h4 className="text-sm font-semibold text-slate-900">
                  {sectionType === 'header' ? 'Header' : sectionType === 'body' ? 'Body' : 'Footer'} Details
                </h4>
                <p className="text-sm text-slate-500">
                  Review the current section content and edit input rows below.
                </p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
            <div>
                <div className="text-xs uppercase tracking-[0.16em] text-slate-500">ID</div>
                <div className="mt-1 text-sm text-slate-800">{sectionData.id || 'N/A'}</div>
            </div>
            <div>
                <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Name</div>
                <div className="mt-1 text-sm text-slate-800">{sectionData.name || 'N/A'}</div>
            </div>
            </div>
            {Array.isArray(rows) && rows.length > 0 ? (
            <div className="mt-6 space-y-4">
                {rows.map((row: any, index: number) => renderHeaderRow(row, index, onAddInputValue, onAddQuantityValue, onAddQuantityTextValue,sectionType,onAddDropdownOptionsValue, onDeleteInput,TemplateState,SectionState,addColumnToTemplate))}
            </div>
            ) : (
            renderRows(sectionData.headerRows || [], 'headerRows')
            )}
    </section>
    )
}

export default TemplateSection