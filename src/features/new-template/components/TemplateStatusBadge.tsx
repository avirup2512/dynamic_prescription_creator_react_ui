/**
 * TemplateStatusBadge - Enterprise status badge component
 */

interface TemplateStatusBadgeProps {
    status: 'draft' | 'published' | 'archived';
    isDraft?: boolean;
}

export function TemplateStatusBadge({ status, isDraft }: TemplateStatusBadgeProps) {
    // Map isDraft flag to status for backwards compatibility
    const displayStatus = isDraft ? 'draft' : status;

    const statusStyles = {
        draft: {
            container: 'bg-amber-100 border border-amber-300',
            text: 'text-amber-900',
            dot: 'bg-amber-600',
        },
        published: {
            container: 'bg-emerald-100 border border-emerald-300',
            text: 'text-emerald-900',
            dot: 'bg-emerald-600',
        },
        archived: {
            container: 'bg-slate-200 border border-slate-300',
            text: 'text-slate-700',
            dot: 'bg-slate-600',
        },
    };

    const styles = statusStyles[displayStatus];

    const statusLabel = {
        draft: 'Draft',
        published: 'Published',
        archived: 'Archived',
    };

    return (
        <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${styles.container} ${styles.text}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
            {statusLabel[displayStatus]}
        </span>
    );
}
