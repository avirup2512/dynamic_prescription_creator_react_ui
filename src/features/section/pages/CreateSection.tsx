
import { Plus, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '../../../components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { AddInputToSections, AddRowsToSection, RemoveInputFromSections, RemoveRows,AddHeaderSection,DeleteColumn, UpdateWidthOfColumn, AddSectionTemplate, recalculateRowOrder, SetSectionName  } from '../store/SectionSlice'
import SectionRow from '../components/SectionRow'
import { useNavigate, useParams } from 'react-router-dom'
import { SetCurrentSection } from '../store/SectionSlice'
import '../style/Section.css'
import SectionUtilsService from '../utils/SectionUtilsService'
import SectionService from '../service/SectionService'
export default function CreateSection() {
  const SectionState = useSelector((state: any) => state.section);
  const sectionService = SectionService;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditMode, setIsEditMode] = useState(Boolean(id));
  const [sectionName, setSectionName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    if (isEditMode && id) {
      //  dispatch(SetCurrentSection(location.state.editData));
      getSectionById(id);
      setIsEditMode(true);
    } else {
      dispatch(SetCurrentSection(SectionState?.defaultSection));
    }
  }, [id, isEditMode]);
  const getSectionById = async (id:string) => {
    try {
      const fetchedSection = await sectionService.getSectionById(id);
      if (fetchedSection && fetchedSection.success)
      {
        dispatch(SetCurrentSection(fetchedSection.data));
      }
    } catch (error) {
      
    }
  }
  function addRows() {
    dispatch(AddRowsToSection())
    dispatch(recalculateRowOrder());
  }
  function removeSection(rowIndex: number) {
    dispatch(RemoveRows({rowIndex}))
  }
  function handleDeleteColumn(columnIndex: number, rowIndex: number) {
    dispatch(DeleteColumn({ columnIndex, rowIndex }));
    const width = SectionUtilsService.calculateWidthAfterColumnDeletion(SectionState?.currentSection?.rows?.[rowIndex]?.column?.length - 1 || 0);
    console.log(width);
    dispatch(UpdateWidthOfColumn({ rowIndex, width }))
  }

  function handleAddInput(
    columnIndex: string,
    rowIndex:number,
    inputType: any,
  ) {
    const payload: any = { rowIndex, columnIndex, input: inputType }
    dispatch(AddInputToSections(payload));
  }

  function handleDeleteInput(inputGroupIndex: number,rowIndex: number,columnIndex: number) {
    dispatch(RemoveInputFromSections({rowIndex,columnIndex,inputGroupIndex}));
  }
  async function saveSectionTemplate()
  {
     const templateObject = {
        name:SectionState?.currentSection?.name,
        rows:SectionState?.currentSection?.rows
    };
    setIsSaving(true);
    try {
      if(isEditMode) {
        // Handle update logic here
        const updatedSection = await sectionService.updateSection(id as string,{data:templateObject});
        console.log(updatedSection);
        // dispatch(AddSectionTemplate(templateObject));
        if(updatedSection && updatedSection.success) {
          // Handle successful update
          navigate('/dashboard/section'); // Redirect to section templates list or show success message
        }
      } else {
        const addedSection = await sectionService.createSection({data:templateObject});
        console.log(templateObject);
        // dispatch(AddSectionTemplate(templateObject));
        if(addedSection && addedSection.success) {
          // Handle successful creation
          navigate('/dashboard/section'); // Redirect to section templates list or show success message
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  }
  function handleAddHeaderSection(width: string, rowIndex: number) {
    const headerSectionWidth:any = Object.values(SectionState?.currentSection?.rows?.headerRows[rowIndex]?.headerSections || {}).reduce(
      (total:any, headerSection:any) => {
        const sectionWidth = headerSection.width ? parseInt(headerSection.width, 10) : 0
        return total + sectionWidth
      },
      0,
    )
    if (headerSectionWidth+parseInt(width, 10) < 101) {
      const newHeaderSectionId = Object.keys(SectionState?.currentSection?.rows?.headerRows[rowIndex]?.headerSections || {}).length + 1;
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
            Create Reusable Sections
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Add header sections and reorder them inside the container.
          </p>
        </div>
          <Button className="h-9 gap-2" type="button" onClick={saveSectionTemplate} disabled={isSaving}>
          {isSaving ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
          {isSaving ? "Saving..." : (false ? "Update" : "Save")}
        </Button>
      </div>
      <div className="space-y-2 mb-3">
          <label className="text-sm font-medium" htmlFor="name">
              Name <span className="text-destructive">*</span>
          </label>
          <input
              className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/20"
              id="name"
              name="name"
              placeholder="Enter name"
              defaultValue={SectionState?.currentSection?.name ?? ''}
              required
              type="text"
              disabled={isSaving}
              onChange={(e:any)=> dispatch(SetSectionName({name: e?.currentTarget?.value}))}
          />
      </div>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-end">
                <div className="flex gap-2">
          <Button className="h-9 gap-2" type="button" onClick={addRows} disabled={isSaving}>
          <Plus className="size-4" />
          Add row
        </Button>
        </div>
      </div>
      <section className="rounded-xl border border-border bg-background p-4 shadow-sm thlu">
          {
            SectionState?.currentSection?.rows && SectionState?.currentSection?.rows.length > 0 ? 
            <div className="space-y-4">
              {SectionState?.currentSection?.rows?.map((section: any, index: number) => (
                <SectionRow
                  key={section?.row_id ?? index}
                  rowIndex={index}
                  onRemove={removeSection}
                  onAddInput={handleAddInput}
                  onDeleteInput={handleDeleteInput}
                  onAddHeaderSection={handleAddHeaderSection}
                  onDeleteColumn={handleDeleteColumn}
                  rowData={section}
                />
              ))}
            </div>
            : (
              <div className="flex min-h-48 items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
                Add a row to start.
              </div>
            )
          }
        {SectionState?.currentSection?.rows && Array.isArray(SectionState?.currentSection?.rows)&& SectionState?.currentSection?.rows.length === 0 ? (
          <div className="flex min-h-48 items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
            Add a row to start.
          </div>
        ) : null}
      </section>
    </div>
  )
}
