

import { useEffect } from 'react'
import type { HeaderSections, HeaderSection as HeaderSectionType } from '../../type/HeaderSectionType'
import HeaderSection from './HeaderSection';
import HeaderUtilsService from '../../utils/utilsService';
function HeaderSectionContainer({
  section,
  rowIndex,
  sectionObjectId,
  onAddInput,
  onDeleteInput,
}: {
  section: Array<HeaderSections>
  rowIndex:number
  sectionObjectId:string
  onAddInput?: (sectionId: string, inputType: { id: string; name: string }) => void
  onDeleteInput?: (sectionId: string, inputId: string) => void
}) {
  useEffect(()=>{
    console.log(section);
  },[section]);

  return (
    <div
      className={`cursor-grab rounded-lg border border-border bg-background p-3 transition } ${HeaderUtilsService.getWidthClass(section.width)}`}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Input list</span>
        </div>
      </div>
      { <HeaderSection 
        sectionId={sectionObjectId}
        rowIndex={rowIndex}
        inputs={section}
        onAddInput={onAddInput}
        onDeleteInput={onDeleteInput}
      /> }
    </div>
  )
}
export default HeaderSectionContainer;