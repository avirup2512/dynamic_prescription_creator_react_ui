

import type { HeaderSectionObject, HeaderSection as HeaderSectionType } from '../../type/HeaderSectionType'
import HeaderSectionContainer from './HeaderSectionContainer'
const MAX_SECTIONS_PER_ROW = 3
function HeaderRowSection({
  rowId,
  rowIndex,
  rowObject,
  onAddInput,
  onDeleteInput,
}: {
  rowId: string
  rowIndex:number
  rowObject: HeaderSectionObject
  onAddInput?: (sectionId: string, inputType: { id: string; name: string }) => void
  onDeleteInput?: (sectionId: string, inputId: string) => void
}) {

  return (
    <div className="rounded-lg border border-dashed border-border bg-muted/20 p-3 thlu 2">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-xs font-medium text-muted-foreground">
          {Object.keys(rowObject).length}/{MAX_SECTIONS_PER_ROW} header sections
        </p>
      </div>
          <div className="grid grid-cols-12 gap-3">
            {Object.keys(rowObject).map((section:any) => (
              <HeaderSectionContainer
                key={section}
                rowIndex={rowIndex}
                sectionObjectId = {section}
                section={rowObject[section]}
                onAddInput={onAddInput}
                onDeleteInput={onDeleteInput}
              />
            ))}
          </div>
      {Object.keys(rowObject).length === 0 ? (
        <div className="flex min-h-24 items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
          Add a header section to this row.
        </div>
      ) : null}
    </div>
  )
}

export default HeaderRowSection
