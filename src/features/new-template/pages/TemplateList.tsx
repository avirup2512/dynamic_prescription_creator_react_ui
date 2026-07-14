import TemplateLibrary from '../components/TemplateLibrary';

/**
 * TemplateList - Template Management Page
 * 
 * Renders the premium Template Library interface for managing prescription templates.
 * This page provides:
 * - Responsive grid layout (4 cols desktop, 3 cols laptop, 2 cols tablet, 1 col mobile)
 * - Beautiful template cards with visual previews
 * - Real-time search and filtering
 * - Sorting options (recent, newest, oldest, alphabetical, most used)
 * - Grid/List view toggle
 * - Empty state for new users
 * - Loading skeletons
 * - Full template management (create, edit, duplicate, preview, delete)
 */
export default function TemplateList() {
    return <TemplateLibrary />;
}