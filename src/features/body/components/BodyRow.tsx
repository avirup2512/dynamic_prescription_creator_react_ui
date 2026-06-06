import type { BodySectionObject } from "../type/BodySectionType"
import BodySectionContainer from "./BodySectionContainer"

const MAX_SECTIONS_PER_ROW = 3

function BodyRow({
  rowIndex,
  rowObject,
  onAddInput,
  onDeleteInput,
}: {
  rowIndex: number
  rowObject: BodySectionObject
  onAddInput?: (sectionId: string, rowIndex: number, inputType: { id: string; name: string }) => void
  onDeleteInput?: (sectionId: string, inputIndex: number, rowIndex: number) => void
}) {
  return (
    <div className="rounded-lg border border-dashed border-border bg-muted/20 p-3">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-xs font-medium text-muted-foreground">
          {Object.keys(rowObject).length}/{MAX_SECTIONS_PER_ROW} body sections
        </p>
      </div>

      <div className="grid grid-cols-12 gap-3">
        {Object.keys(rowObject).map((sectionKey) => (
          <BodySectionContainer
            key={sectionKey}
            rowIndex={rowIndex}
            sectionObjectId={sectionKey}
            section={rowObject[sectionKey]!}
            onAddInput={onAddInput}
            onDeleteInput={onDeleteInput}
          />
        ))}
      </div>

      {Object.keys(rowObject).length === 0 ? (
        <div className="flex min-h-24 items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
          Add a body section to this row.
        </div>
      ) : null}
    </div>
  )
}

export default BodyRow
