/**
 * TemplateCard - Individual template card component
 * Displays preview, metadata, and action buttons
 * Size: approximately 320px × 380px
 */

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';
import { Eye, Pencil, X } from 'lucide-react';
import type { Template } from '../type/TemplateType';
import { SetCurrentTemplate } from '../store/TemplateSlice';
import { TemplatePreview } from './TemplatePreview';
import { TemplateStatusBadge } from './TemplateStatusBadge';
import { TemplateActions } from './TemplateActions';
import PreviewLayer from './main/PrescriptionCanvas/PreviewLayer';

interface TemplateCardProps {
    template: Template;
    isSelected?: boolean;
    onSelect?: (templateId: string, selected: boolean) => void;
    onEdit: (template: Template) => void;
    onDuplicate: (template: Template) => void;
    onPreview: (template: Template) => void;
    onMore?: (template: Template) => void;
}

export function TemplateCard({
    template,
    isSelected = false,
    onSelect,
    onEdit,
    onDuplicate,
    onPreview,
    onMore,
}: TemplateCardProps) {
    const dispatch = useDispatch();
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    // Determine status
    const isDraft = (template as any).is_draft === 1 || (template as any).is_draft === true;
    const status = isDraft ? 'draft' : 'published';

    // Format last updated date
    const lastUpdated = template.created_at
        ? formatDistanceToNow(new Date(template.created_at), { addSuffix: true })
        : 'Recently updated';

    // Get template tags (placeholder for now)
    const tags = (template as any).tags || [];

    const handlePreviewOpen = () => {
        dispatch(SetCurrentTemplate(template));
        setIsPreviewOpen(true);
    };

    const handleEditFromPreview = () => {
        setIsPreviewOpen(false);
        onEdit(template);
    };

    return (
        <div className="group relative h-full w-full">
            {/* Card Container */}
            <div className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg transition-all duration-300 hover:border-slate-300 hover:shadow-xl">
                {/* Preview Section with Controls */}
                <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-white">
                    <div className="transition-transform duration-300 group-hover:scale-[1.02]">
                        <TemplatePreview template={template} />
                    </div>

                    {/* Checkbox - Top Left */}
                    <div className="absolute left-3 top-3 z-10">
                        <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => onSelect?.(template.id, e.target.checked)}
                            className="h-4 w-4 rounded border-slate-300 cursor-pointer"
                        />
                    </div>

                    {/* Preview Button - Top Right */}
                    <button
                        onClick={handlePreviewOpen}
                        className="absolute right-3 top-3 z-10 flex items-center justify-center rounded-md bg-white p-2 text-black transition-all duration-150 hover:bg-slate-100 shadow-md"
                        title="Preview template"
                    >
                        <Eye className="h-4 w-4" />
                    </button>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col gap-2 border-t border-slate-200 p-3">
                    {/* Template Name */}
                    <div>
                        <h3 className="line-clamp-2 font-semibold text-sm text-slate-900">
                            {template.name || 'Untitled Template'}
                        </h3>
                    </div>

                    {/* Hospital/Clinic Name (if available) */}
                    {(template as any).hospital_name && (
                        <p className="line-clamp-1 text-xs text-slate-600">
                            {(template as any).hospital_name}
                        </p>
                    )}

                    {/* Tags */}
                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                            {tags.slice(0, 2).map((tag: string, idx: number) => (
                                <span key={idx} className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                                    {tag}
                                </span>
                            ))}
                            {tags.length > 2 && (
                                <span className="text-xs text-slate-500">+{tags.length - 2}</span>
                            )}
                        </div>
                    )}

                    {/* Last Updated and Status Row */}
                    <div className="flex items-center justify-between gap-2 text-xs">
                        <span className="text-slate-500">{lastUpdated}</span>
                        <TemplateStatusBadge status={status} isDraft={isDraft} />
                    </div>

                    {/* Action Buttons */}
                    <div className="border-t border-slate-200 pt-2">
                        <TemplateActions
                            template={template}
                            onEdit={onEdit}
                            onDuplicate={onDuplicate}
                            onMore={onMore}
                        />
                    </div>
                </div>
            </div>

            {isPreviewOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-3 sm:p-6" onClick={() => setIsPreviewOpen(false)}>
                    <div className="flex h-full w-full max-w-7xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 sm:px-6">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-900">{template.name || 'Untitled Template'}</h3>
                                <p className="text-sm text-slate-500">Template preview</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleEditFromPreview}
                                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                                >
                                    <Pencil className="h-4 w-4" />
                                    Edit
                                </button>
                                <button
                                    onClick={() => setIsPreviewOpen(false)}
                                    className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white p-2 text-slate-700 transition hover:bg-slate-50"
                                    title="Close preview"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-auto bg-slate-50 p-4 sm:p-6">
                            <div className="mx-auto max-w-5xl rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
                                <PreviewLayer sections={[]} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
