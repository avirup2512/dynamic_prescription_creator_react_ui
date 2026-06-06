import TemplateSection from './TemplateSection'
import type { SavedBody } from '@/features/body/type/BodySectionType'
import type { SavedHeader } from '@/features/header/type/HeaderSectionType'

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

const TemplateSectionDetails = ({
  header,
  body,
  footer,
  showHeader = true,
  showBody = true,
  showFooter = true,
  onAddQuantityValue,
  onAddInputValue,
  onAddDropdownOptionsValue,
  onAddQuantityTextValue,
  onDeleteInput 
}: {
  header?: SavedHeader
  body?: SavedBody
  footer?: any
  showHeader?: boolean
  showBody?: boolean
  showFooter?: boolean
  onAddQuantityValue?: any
  onAddInputValue?: any
  onAddQuantityTextValue?: any
  onDeleteInput :any,
  onBodyInputChange?: (rowIndex: number, sectionKey: string, inputIndex: number, value: string,sectionType:string) => void
  onBodyQuantityToggle?: (rowIndex: number, sectionKey: string, inputIndex: number, checked: boolean,sectionType:string) => void
  onBodyQuantityValueChange?: (rowIndex: number, sectionKey: string, inputIndex: number, value: string,sectionType:string) => void
  onBodyQuantityTextValueChange?: (rowIndex: number, sectionKey: string, inputIndex: number, value: string,sectionType:string) => void
  onBodyDeleteInput?: (rowIndex: number, sectionKey: string, inputIndex: number,sectionType:string) => void
  onBodyAddInput?: (inputType: any, rowIndex: number, sectionKey: string,sectionType:string) => void
  onAddDropdownOptionsValue?: any
}) => {
  const hasAnySelection = Boolean((header && header.id) || (body && body.id) || (footer && footer.id))

  return (
    <div className="mt-8 rounded-2xl border border-border bg-background p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold tracking-tight">Selected Section Details</h3>

      {!hasAnySelection ? (
        <p className="text-sm text-muted-foreground">Select a header and body to view full section details. Footer is optional.</p>
      ) : (
        <div className="space-y-6">
          {header ? (
            showHeader ? (
              <TemplateSection
                onAddDropdownOptionsValue={onAddDropdownOptionsValue}
                onAddQuantityValue={onAddQuantityValue}
                onAddInputValue={onAddInputValue}
                onAddQuantityTextValue={onAddQuantityTextValue}
                sectionData={header}
                sectionType="header"
                onDeleteInput={onDeleteInput}
              />
            ) : (
              <section className="rounded-2xl border border-border bg-slate-50 p-5">
                <h4 className="text-sm font-semibold text-slate-900">Header Hidden</h4>
                <p className="mt-2 text-sm text-slate-600">The header is marked hidden and will be excluded from the template output.</p>
              </section>
            )
          ) : null}

          {body ? (
            showBody ? (
              <TemplateSection
                onAddDropdownOptionsValue={onAddDropdownOptionsValue}
                sectionData={body}
                onAddQuantityValue={onAddQuantityValue}
                onAddInputValue={onAddInputValue}
                onAddQuantityTextValue={onAddQuantityTextValue}
                sectionType="body"
                onDeleteInput={onDeleteInput}
              />
            ) : (
              <section className="rounded-2xl border border-border bg-slate-50 p-5">
                <h4 className="text-sm font-semibold text-slate-900">Body Hidden</h4>
                <p className="mt-2 text-sm text-slate-600">The body is marked hidden and will be excluded from the template output.</p>
              </section>
            )
          ) : null}

          {footer ? (
            showFooter ? (
              <section className="rounded-2xl border border-border bg-slate-50 p-5">
                <h4 className="mb-3 text-sm font-semibold text-slate-900">Footer Details</h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <div className="text-xs uppercase tracking-[0.16em] text-slate-500">ID</div>
                    <div className="mt-1 text-sm text-slate-800">{footer.id || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Name</div>
                    <div className="mt-1 text-sm text-slate-800">{footer.name || 'N/A'}</div>
                  </div>
                </div>
                {Object.entries(footer)
                  .filter(([key]) => key !== 'id' && key !== 'name')
                  .map(([key, value]) => (
                    <div key={key} className="mt-4">
                      <div className="text-xs uppercase tracking-[0.12em] text-slate-500">{key}</div>
                      <div className="mt-1 text-sm text-slate-700">{renderValue(value)}</div>
                    </div>
                  ))}
              </section>
            ) : (
              <section className="rounded-2xl border border-border bg-slate-50 p-5">
                <h4 className="text-sm font-semibold text-slate-900">Footer Hidden</h4>
                <p className="mt-2 text-sm text-slate-600">The footer is marked hidden and will be excluded from the template output.</p>
              </section>
            )
          ) : null}
        </div>
      )}
    </div>
  )
}

export default TemplateSectionDetails
