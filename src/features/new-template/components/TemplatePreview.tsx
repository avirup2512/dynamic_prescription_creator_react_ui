/**
 * TemplatePreview - Scaled-down prescription preview
 * Supports both full template objects and section payloads from the API
 */

import type { Template } from '../type/TemplateType';

type PreviewRow = {
    template_row_id?: string;
    row_name?: string;
    row_order?: number;
    columns?: Array<{
        template_column_id?: string;
        column_name?: string;
        width?: number | string;
        column_order?: number;
        inputGroup?: Array<{
            template_input_group_id?: string;
            input_group_order?: number;
            inputs?: Array<{ label?: string; name?: string }>;
        }>;
    }>;
};

type PreviewTemplateLike = Template & {
    rows?: PreviewRow[];
    sections?: Array<{ name?: string; rows?: PreviewRow[] }>;
    header?: Array<{ name?: string; rows?: PreviewRow[] }>;
    body?: Array<{ name?: string; rows?: PreviewRow[] }>;
    footer?: Array<{ name?: string; rows?: PreviewRow[] }>;
    is_header?: boolean | number;
    is_body?: boolean | number;
    is_footer?: boolean | number;
    show_header?: boolean | number;
    show_body?: boolean | number;
    show_footer?: boolean | number;
};

interface TemplatePreviewProps {
    template: Template;
}

export function TemplatePreview({ template }: TemplatePreviewProps) {
    const previewTemplate = template as PreviewTemplateLike;

    const directSections = Array.isArray(previewTemplate.sections) ? previewTemplate.sections : [];
    const headerSections = Array.isArray(previewTemplate.header) ? previewTemplate.header : [];
    const bodySections = Array.isArray(previewTemplate.body) ? previewTemplate.body : [];
    const footerSections = Array.isArray(previewTemplate.footer) ? previewTemplate.footer : [];
    const fallbackRows = Array.isArray(previewTemplate.rows) ? previewTemplate.rows : [];
    const sectionGroups = directSections.length > 0 ? directSections : [...headerSections, ...bodySections, ...footerSections];

    const hasSections = {
        header: Boolean(previewTemplate.show_header ?? previewTemplate.is_header ?? headerSections.length),
        body: Boolean(previewTemplate.show_body ?? previewTemplate.is_body ?? bodySections.length),
        footer: Boolean(previewTemplate.show_footer ?? previewTemplate.is_footer ?? footerSections.length),
    };

    const totalSections = Object.values(hasSections).filter(Boolean).length;

    const collectPreviewFields = (section: any) => {
        const fields: string[] = [];
        const rows = Array.isArray(section?.rows) ? section.rows : [];

        rows.forEach((row: any) => {
            (row?.columns ?? []).forEach((column: any) => {
                (column?.inputGroup ?? []).forEach((group: any) => {
                    (group?.inputs ?? []).forEach((input: any) => {
                        const label = input?.input_name || input?.label || input?.name || 'Field';
                        if (label && !fields.includes(label)) {
                            fields.push(label);
                        }
                    });
                });
            });
        });

        return fields;
    };

    if (sectionGroups.length > 0) {
        return (
            <div className="flex h-full w-full items-center justify-center bg-white p-2 sm:p-3">
                <div className="aspect-[4/5] w-full max-w-full overflow-hidden bg-white">
                    <div className="flex h-full flex-col p-2.5 text-xs">
                        <div className="mb-2 pb-2">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Template Preview</p>
                            <h4 className="text-sm font-semibold text-slate-800">
                                {previewTemplate.name || 'Untitled template'}
                            </h4>
                        </div>

                        <div className="flex-1 space-y-2 overflow-hidden">
                            {sectionGroups.map((section: any, sectionIndex: number) => {
                                const sectionRows = Array.isArray(section?.rows) ? section.rows : [];
                                const sectionTitle = section?.name || `Section ${sectionIndex + 1}`;
                                const previewFields = collectPreviewFields(section);

                                return (
                                    <div key={section?.template_section_id || section?.id || `section-${sectionIndex}`} className="p-1">
                                        <div className="grid grid-cols-2 gap-1">
                                            {previewFields.length > 0 ? (
                                                previewFields.slice(0, 4).map((field, fieldIndex) => (
                                                    <div key={`${sectionTitle}-${fieldIndex}`} className="px-1 py-1 text-[10px] text-slate-700">
                                                        <div className="truncate font-medium">{field}</div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="col-span-2 px-1 py-1 text-[10px] text-slate-400">
                                                    Empty section
                                                </div>
                                            )}

                                            {previewFields.length > 4 ? (
                                                <div className="px-1 py-1 text-center text-[10px] font-medium text-slate-500">
                                                    +{previewFields.length - 4}
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (fallbackRows.length > 0) {
        return (
            <div className="flex h-full w-full items-center justify-center bg-white p-2 sm:p-3">
                <div className="aspect-[4/5] w-full max-w-full overflow-hidden bg-white">
                    <div className="flex h-full flex-col p-2.5 text-xs">
                        <div className="mb-2 pb-2">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Section Preview</p>
                            <h4 className="text-sm font-semibold text-slate-800">{previewTemplate.name || 'Untitled section'}</h4>
                        </div>

                        <div className="flex-1 space-y-2 overflow-hidden">
                            {fallbackRows.map((row, rowIndex) => {
                                const rowFields = (row.columns ?? []).flatMap((column: any) =>
                                    (column.inputGroup ?? []).flatMap((group: any) => (group.inputs ?? []).map((input: any) => input?.input_name || input?.label || input?.name || 'Field'))
                                );

                                return (
                                    <div key={row.template_row_id || `row-${rowIndex}`} className="p-1">
                                        <div className="grid grid-cols-2 gap-1">
                                            {rowFields.length > 0 ? (
                                                rowFields.slice(0, 4).map((field, fieldIndex) => (
                                                    <div key={`${rowIndex}-${fieldIndex}`} className="px-1 py-1 text-[10px] text-slate-700">
                                                        <div className="truncate font-medium">{field}</div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="col-span-2 px-1 py-1 text-[10px] text-slate-400">
                                                    Empty row
                                                </div>
                                            )}

                                            {rowFields.length > 4 ? (
                                                <div className="px-1 py-1 text-center text-[10px] font-medium text-slate-500">
                                                    +{rowFields.length - 4}
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Fallback: existing lightweight template preview for full template objects
    if (totalSections === 0) {
        return (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-3 sm:p-4">
                <div className="aspect-[210/297] w-full max-w-full overflow-hidden rounded-sm border border-slate-200 bg-white shadow-sm">
                    <div className="flex h-full items-center justify-center text-slate-400">
                        <div className="text-center">
                            <p className="text-xs font-medium">No sections configured</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative flex h-full w-full items-center justify-center bg-white p-2 sm:p-3">
            <div className="aspect-[4/5] w-full max-w-full overflow-hidden rounded-md border border-slate-300 bg-white shadow">
                <div className="flex h-full flex-col p-2.5 text-xs">
                    {hasSections.header && (
                        <div className="mb-2 border-b border-slate-300 pb-2">
                            <div className="h-2 w-full rounded bg-slate-200" />
                            <div className="mt-1 h-1.5 w-3/4 rounded bg-slate-100" />
                        </div>
                    )}

                    {hasSections.body && (
                        <div className="flex-1 space-y-1.5">
                            <div className="h-1.5 w-full rounded bg-slate-200" />
                            <div className="h-1.5 w-5/6 rounded bg-slate-100" />
                            <div className="h-1.5 w-4/5 rounded bg-slate-100" />
                            <div className="mt-3 h-1.5 w-full rounded bg-slate-200" />
                            <div className="h-1.5 w-full rounded bg-slate-100" />
                            <div className="h-1.5 w-3/4 rounded bg-slate-100" />
                        </div>
                    )}

                    {!hasSections.body && <div className="flex-1" />}

                    {hasSections.footer && (
                        <div className="mt-2 border-t border-slate-200 pt-2">
                            <div className="h-1 w-full rounded bg-slate-100" />
                            <div className="mt-1 h-0.5 w-2/3 rounded bg-slate-50" />
                        </div>
                    )}
                </div>
            </div>

            {totalSections > 0 && (
                <div className="absolute bottom-2 right-2 flex gap-1">
                    {hasSections.header && (
                        <div className="h-2 w-2 rounded-full bg-blue-400" title="Header included" aria-label="Header included" />
                    )}
                    {hasSections.body && (
                        <div className="h-2 w-2 rounded-full bg-slate-400" title="Body included" aria-label="Body included" />
                    )}
                    {hasSections.footer && (
                        <div className="h-2 w-2 rounded-full bg-slate-300" title="Footer included" aria-label="Footer included" />
                    )}
                </div>
            )}
        </div>
    );
}
