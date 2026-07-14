/**
 * TemplateActions - Action buttons for template card
 */

import { Edit3, Copy, MoreVertical } from 'lucide-react';
import type { Template } from '../type/TemplateType';

interface TemplateActionsProps {
    template: Template;
    onEdit: (template: Template) => void;
    onDuplicate: (template: Template) => void;
    onMore?: (template: Template) => void;
}

export function TemplateActions({
    template,
    onEdit,
    onDuplicate,
    onMore,
}: TemplateActionsProps) {
    return (
        <div className="flex gap-1.5">
            {/* Edit Button */}
            <button
                onClick={() => onEdit(template)}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-slate-100 px-2 py-1.5 text-xs font-medium text-slate-700 transition-colors duration-150 hover:bg-slate-200 active:bg-slate-300"
                title="Edit template"
            >
                <Edit3 className="h-3 w-3" />
                <span className="hidden sm:inline">Edit</span>
            </button>

            {/* Duplicate Button */}
            <button
                onClick={() => onDuplicate(template)}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-slate-100 px-2 py-1.5 text-xs font-medium text-slate-700 transition-colors duration-150 hover:bg-slate-200 active:bg-slate-300"
                title="Duplicate template"
            >
                <Copy className="h-3 w-3" />
                <span className="hidden sm:inline">Duplicate</span>
            </button>

            {/* More Options Button */}
            <button
                onClick={() => onMore?.(template)}
                className="flex items-center justify-center rounded-md bg-slate-100 px-2 py-1.5 text-slate-700 transition-colors duration-150 hover:bg-slate-200 active:bg-slate-300"
                title="More options"
            >
                <MoreVertical className="h-3 w-3" />
            </button>
        </div>
    );
}
