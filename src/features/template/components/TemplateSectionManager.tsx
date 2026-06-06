import { Eye, EyeOff, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RemoveAppendedSection, ToggleAppendedSectionVisibility } from "../store/TemplateSlice";
import { Button } from "@/components/tiptap-ui-primitive/button/button";
import { useState } from "react";

function TemplateSectionManager({handleToggleSectionVisibility, handleRemoveSection, savedSectionList, selectedHeaderSectionId, handleAddSection,setSelectedHeaderSectionId}: any)
{
    const dispatch = useDispatch();
    const [headerPickerOpen, setHeaderPickerOpen] = useState(false);
    const TemplateState = useSelector((state: any) => state.template);
    return (
        <section className="rounded-2xl border border-border bg-slate-50 p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Header</h4>
                  <p className="text-sm text-slate-500">Show/hide header block and add saved sections.</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={TemplateState.CurrentTemplate.show_header}
                    onChange={(event) => handleToggleSectionVisibility('show_header', event.target.checked)}
                    className="sr-only"
                    aria-hidden
                  />
                  <button
                    type="button"
                    aria-pressed={!TemplateState.CurrentTemplate.show_header}
                    aria-label={TemplateState.CurrentTemplate.show_header ? 'Hide header' : 'Show header'}
                    onClick={() => handleToggleSectionVisibility('show_header', !TemplateState.CurrentTemplate.show_header)}
                    className="p-1 rounded hover:bg-slate-100"
                  >
                    {TemplateState.CurrentTemplate.show_header ? (
                      <Eye className="size-4" />
                    ) : (
                      <EyeOff className="size-4" />
                    )}
                  </button>
                  <button
                    type="button"
                    aria-label="Remove header"
                    onClick={() => handleRemoveSection('header')}
                    className="p-1 rounded hover:bg-slate-100 text-red-600"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>

              <div className="mb-4 rounded-2xl border border-border bg-white p-3 text-sm">
                <div className="text-xs uppercase tracking-[0.12em] text-slate-500">Current sections</div>
                <div className="mt-2 space-y-2">
                  {TemplateState.CurrentTemplate.header?._sections && TemplateState.CurrentTemplate.header._sections.length ? (
                    TemplateState.CurrentTemplate.header._sections.map((s: any, i: number) => (
                      <div key={s.id || i} className="flex w-full items-center justify-between rounded-md border border-border bg-white px-3 py-2">
                        <div className="text-sm font-medium text-slate-800">{s.name}</div>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="sr-only" aria-hidden checked={s.visible ?? true} readOnly />
                          <button type="button" aria-label={s.visible ? 'Hide section' : 'Show section'} onClick={() => dispatch(ToggleAppendedSectionVisibility({ sectionType: 'header', sectionId: s.id }))} className="p-1 rounded hover:bg-slate-100">
                            {s.visible ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                          </button>
                          <button type="button" aria-label="Remove section" onClick={() => dispatch(RemoveAppendedSection({ sectionType: 'header', sectionId: s.id }))} className="p-1 rounded hover:bg-slate-100 text-red-600">
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="font-medium text-slate-800">{TemplateState.CurrentTemplate.header?.name || 'No section added'}</div>
                  )}
                </div>
              </div>

              <Button type="button" variant="outline" onClick={() => setHeaderPickerOpen((prev) => !prev)}>
                Add section
              </Button>

              {headerPickerOpen && (
                <div className="mt-4 rounded-2xl border border-border bg-white p-4 shadow-sm">
                  <label className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Choose saved section</label>
                  <select
                    value={selectedHeaderSectionId}
                    onChange={(event) => setSelectedHeaderSectionId(event.target.value)}
                    className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                  >
                    <option value="">Choose a section...</option>
                    {savedSectionList.map((section) => (
                      <option key={section.id} value={section.id}>
                        {section.name}
                      </option>
                    ))}
                  </select>
                  <div className="mt-3 flex gap-2">
                    <Button
                      type="button"
                      disabled={!selectedHeaderSectionId}
                      onClick={() => handleAddSection(selectedHeaderSectionId, 'header')}
                    >
                      Add
                    </Button>
                    <Button type="button" variant="ghost" onClick={() => setHeaderPickerOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </section>
    )
}
export default TemplateSectionManager;