
import { Plus} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '../../../components/ui/button'
import type { HeaderTemplates } from '../type/HeaderSectionType'
import { useDispatch, useSelector } from 'react-redux'
import { AddInputToSections, AddRows, AddHeaderTemplate, RemoveInputFromSections, RemoveRows, SetCurrentHeader, EditHeaderTemplate,AddHeaderSection  } from '../store/HeaderSlice'
import HeaderRow from '../components/backup/HeaderRow'
import { useLocation, useParams } from 'react-router-dom'


export default function CreateHeader() {
  const headerTemplateId = useParams();
  const location = useLocation();
  const isEdit = location.pathname.includes("/edit");
  const savedTemplateList = localStorage.getItem("savedTemplateList") ? JSON.parse(localStorage.getItem("savedTemplateList")) : [];
  
  const HeaderState = useSelector((state:any)=> state.header);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(SetCurrentHeader(HeaderState?.defaultHeader))
  },[])
  useEffect(()=>{
    setRows(HeaderState?.currentHeader);
    console.log(HeaderState?.currentHeader);
  },[HeaderState]);
  useEffect(()=>{
    const isEdit = location.pathname.includes("/edit");
    const isCreate = location.pathname.includes("/create");
    console.log(headerTemplateId?.id);
    
    if(isEdit && headerTemplateId && headerTemplateId?.id)
    {
      const currentTemplate = savedTemplateList.find((template:any)=> template.id == headerTemplateId.id) || HeaderState?.defaultHeader;
      dispatch(SetCurrentHeader(currentTemplate))
    }
  },[location])
  const [rows, setRows] = useState<HeaderTemplates>(HeaderState?.defaultHeader)
  function addRows() {
    dispatch(AddRows())
  }
  function removeSection(rowIndex: number) {
    dispatch(RemoveRows({rowIndex}))
  }

  function handleAddInput(
    sectionId: string,
    rowIndex:number,
    inputType: { id: string; name: string },
  ) {
    const payload:any = {headerRowsIndex:rowIndex,headerSectionIndex:sectionId,inputType:{type:inputType?.id}}
    dispatch(AddInputToSections(payload));
  }

  function handleDeleteInput(sectionId: string, inputId: string,rowIndex:number) {
    dispatch(RemoveInputFromSections({headerRowsIndex:rowIndex,headerSectionIndex:sectionId,headerSectionInputIndex:inputId}));
  }
  function saveHeaderTemplate()
  {
    if(isEdit && headerTemplateId?.id)
    {
      const templateObject = {
        id:headerTemplateId?.id,
        name:rows?.name,
        headerRows:rows.headerRows
      };      
      dispatch(EditHeaderTemplate({editedHeaderTemplate:templateObject,headerTemplateId:headerTemplateId?.id}))
    }else{
      const templateObject = {
        id:Date.now(),
        name:"untitled_template_name",
        headerRows:rows.headerRows
      };
      dispatch(AddHeaderTemplate(templateObject));
    }
  }
  function handleAddHeaderSection(width: string, rowIndex: number) {
    const headerSectionWidth = Object.values(rows?.headerRows[rowIndex]?.headerSections || {}).reduce(
      (total:any, headerSection:any) => {
        const sectionWidth = headerSection.width ? parseInt(headerSection.width, 10) : 0
        return total + sectionWidth
      },
      0,
    )
    if (headerSectionWidth+parseInt(width, 10) < 101) {
      const newHeaderSectionId = Object.keys(rows?.headerRows[rowIndex]?.headerSections || {}).length + 1;
      const payload:any = {headerRowsIndex:rowIndex,headerSectionIndex:newHeaderSectionId,width}
      dispatch(AddHeaderSection(payload));
    } else {
      alert('Total width of header sections cannot exceed 3.')
    }
  }
  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-normal">
            Create Header
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Add header sections and reorder them inside the container.
          </p>
        </div>

        <div className="flex gap-2">
          <Button className="h-9 gap-2" type="button" onClick={addRows}>
          <Plus className="size-4" />
          Add row
        </Button>
        <Button className="h-9 gap-2" type="button" onClick={saveHeaderTemplate}>
          <Plus className="size-4" />
          {isEdit ? "Update Header" : "Create Header"}
        </Button>
        </div>
      </div>

      <section className="rounded-xl border border-border bg-background p-4 shadow-sm thlu">
          {
            rows && Object.keys(rows).length > 0 && 
            <div className="space-y-4">
              {rows?.headerRows.map((section:any,i:number) => (
                <HeaderRow
                  key={section.id}
                  rowIndex={i}
                  onRemove={removeSection}
                  onAddInput={handleAddInput}
                  onDeleteInput={handleDeleteInput}
                  onAddHeaderSection={handleAddHeaderSection}
                  section={section}
                />
              ))}
            </div>
          }
        {rows.length === 0 ? (
          <div className="flex min-h-48 items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
            Add a row to start.
          </div>
        ) : null}
      </section>
    </div>
  )
}
