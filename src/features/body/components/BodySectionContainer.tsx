import type { BodySectionData } from '../type/BodySectionType'
import BodySection from './BodySection'
import BodyUtilsService from '../utils/utilsService'

function BodySectionContainer({
  section,
  rowIndex,
  sectionObjectId,
  onAddInput,
  onDeleteInput,
}: {
  section: BodySectionData
  rowIndex: number
  sectionObjectId: string
  onAddInput?: (sectionId: string, rowIndex: number, inputType: { id: string; name: string }) => void
  onDeleteInput?: (sectionId: string, inputIndex: number, rowIndex: number) => void
}) {
  return (
    <div
      className={`rounded-lg border border-border bg-background p-3 transition ${BodyUtilsService.getWidthClass(section.width)}`}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Input list</span>
        </div>
      </div>
      <BodySection
        sectionId={sectionObjectId}
        rowIndex={rowIndex}
        inputs={section}
        onAddInput={onAddInput}
        onDeleteInput={onDeleteInput}
      />
    </div>
  )
}

export default BodySectionContainer
