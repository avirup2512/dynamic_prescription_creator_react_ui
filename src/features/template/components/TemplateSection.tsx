import TemplateSectionInput from "./TemplateSectionInput";
import HeaderUtilService from "../../header/utils/utilsService";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronDown, Copy, Eye, EyeOff } from "lucide-react";
import SectionUtilsService from "../../section/utils/SectionUtilsService"
import { AddCoulmnToSection, CopySectionInTemplate, UpdateWidthOfColumn } from "../store/TemplateSlice";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/tiptap-ui-primitive/button/button";
const renderHeaderRow = (sectionIndex: any, row: any, rowIndex: number, onAddInputValue: (payload: any) => void, onAddQuantityValue: (payload: any) => void, onAddQuantityTextValue: (payload: any) => void, sectionType: string, onAddDropdownOptionsValue: (payload: any) => void, onDeleteInput: (rowIndex: number, sectionKey: string, inputIndex: number) => void, TemplateState: any, SectionState: any, addColumnToTemplate: any) => {
  const dispatch = useDispatch();
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

              {column?.inputGroup && column?.inputGroup.length ? (
                <TemplateSectionInput sectionIndex={sectionIndex} sectionType={sectionType} columnIndex={columnIndex} inputGroup={column.inputGroup} rowIndex={rowIndex} onAddInputValue={onAddInputValue} onAddQuantityValue={onAddQuantityValue} onAddQuantityTextValue={onAddQuantityTextValue} onAddDropdownOptionsValue={onAddDropdownOptionsValue} onDeleteInput={onDeleteInput} />
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
function TemplateSection({sectionIndex, sectionData, sectionType, onAddInputValue, onAddQuantityValue, onAddQuantityTextValue, onAddDropdownOptionsValue, onDeleteInput }: any) {
    const TemplateState = useSelector((state: any) => state.template);
  const SectionState = useSelector((state: any) => state.section);
  const dispatch = useDispatch();
    const [rows, setRows] = useState(sectionData?.rows || [])
    const [collapsed, setCollapsed] = useState(false)
    const [copySectionOpen, setCopySectionOpen] = useState(false);

    useEffect(() => {
      setRows(sectionData?.rows || [])
      console.log(sectionData)
    }, [sectionData, sectionType])

  const addColumnToTemplate = (index:any,data:any,width:any) => {
      dispatch(AddCoulmnToSection({sectionIndex, rowIndex:index, columnData:data , sectionType}));
    dispatch(UpdateWidthOfColumn({ sectionIndex, rowIndex: index, width, sectionType }));
  }

  const isSectionHidden = sectionData?.isVisible === false;

    return(
    <section
      className={`rounded-2xl border p-5 transition ${
        isSectionHidden
          ? 'border-dashed border-slate-300 bg-slate-100/80 opacity-75'
          : 'border-border bg-slate-50'
      }`}
    >
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                {/* <h4 className="text-sm font-semibold text-slate-900">
                  {sectionType === 'header' ? 'Header' : sectionType === 'body' ? 'Body' : 'Footer'} Details
              </h4> */}
              <div className="flex flex-wrap items-center gap-2">
                <h4 className={`text-sm font-semibold ${isSectionHidden ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
                  {sectionData.name}
                </h4>
                {isSectionHidden && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-2 py-0.5 text-xs font-medium text-slate-500">
                    <EyeOff className="size-3" />
                    Hidden
                  </span>
                )}
              </div>
                <p className="text-sm text-slate-500">
                  {isSectionHidden
                    ? 'This section is hidden and will be excluded from the template output.'
                    : 'Review the current section content and edit input rows below.'}
                </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className={`rounded-full p-1 ${
                isSectionHidden
                  ? 'bg-white text-slate-400'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
              onClick={() => setCopySectionOpen(true)}
              aria-label={isSectionHidden ? 'Section hidden' : 'Section visible'}
            >
              <Copy className="size-4" />
            </button>
            <button
              type="button"
              className={`rounded-full p-1 ${
                isSectionHidden
                  ? 'bg-white text-slate-400'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
              // onClick={() => onToggleVisibility(section.id || `${index}`)}
              aria-label={isSectionHidden ? 'Section hidden' : 'Section visible'}
            >
              {sectionData?.isVisible ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
            </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-100"
                onClick={() => setCollapsed((prev) => !prev)}
                aria-expanded={!collapsed}
              >
                <span>{collapsed ? 'Expand' : 'Collapse'}</span>
                <ChevronDown className={`size-4 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
              </button>
          </div>
            </div>
            {!collapsed && (
              <>
                {Array.isArray(rows) && rows.length > 0 ? (
                  <div className="mt-6 space-y-4">
                    {rows.map((row: any, index: number) => renderHeaderRow(sectionIndex,row, index, onAddInputValue, onAddQuantityValue, onAddQuantityTextValue,sectionType,onAddDropdownOptionsValue, onDeleteInput,TemplateState,SectionState,addColumnToTemplate))}
                  </div>
                ) : (
                  renderRows(sectionData.rows || [], 'headerRows')
                )}
              </>
        )}
        <Dialog open={copySectionOpen} onOpenChange={(value) => !value && setCopySectionOpen(false)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Copy Section</DialogTitle>
            <DialogDescription>Add new section name</DialogDescription>
            </DialogHeader>
              <label htmlFor="sectionName" className="block text-sm font-medium text-gray-700">
                    Section Name
                </label>
              <input
                type="text"
                name="sectionName"
                id="sectionName"
                className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/20"
                placeholder="Enter section name"
              />
            <DialogFooter>
              <Button onClick={() => {
                dispatch(CopySectionInTemplate({
                  sectionIndex,
                  sectionName: (document.getElementById('sectionName') as HTMLInputElement)?.value || undefined,
                  sectionType
                }));
                setCopySectionOpen(false);
              }}>
                Add
              </Button>
              <Button onClick={()=> setCopySectionOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
    )
}

export default TemplateSection
