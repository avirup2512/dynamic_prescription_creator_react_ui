/**
 * TEMPLATE LIBRARY - QUICK REFERENCE GUIDE
 * 
 * Fast lookup for component props, hooks, and usage patterns
 */

// ============================================================================
// COMPONENT API REFERENCE
// ============================================================================

/**
 * TemplateLibrary
 * Main container component - handles all state and orchestration
 * 
 * Props: None (manages internal state)
 * 
 * Features:
 * - Auto-fetches templates on mount
 * - Real-time search filtering
 * - Multi-option sorting
 * - Grid/List view toggle
 * - Empty state for new users
 * - Loading skeletons
 * - Template CRUD operations
 * 
 * Usage:
 *   import TemplateLibrary from '@/features/new-template/components/TemplateLibrary';
 *   
 *   function Page() {
 *     return <TemplateLibrary />;
 *   }
 */

interface TemplateLibraryProps {}

/**
 * TemplateGrid
 * Responsive grid layout for template cards
 * 
 * Props:
 *   templates: Template[] - Array of templates to display
 *   onEdit: (template: Template) => void - Edit button handler
 *   onDuplicate: (template: Template) => void - Duplicate button handler
 *   onPreview: (template: Template) => void - Preview button handler
 *   onMore?: (template: Template) => void - More options handler (optional)
 * 
 * Grid Columns:
 *   Mobile (0px): 1 column
 *   Tablet (640px): 2 columns (sm:grid-cols-2)
 *   Laptop (1024px): 3 columns (lg:grid-cols-3)
 *   Desktop (1280px): 4 columns (xl:grid-cols-4)
 * 
 * Usage:
 *   <TemplateGrid
 *     templates={templates}
 *     onEdit={handleEdit}
 *     onDuplicate={handleDuplicate}
 *     onPreview={handlePreview}
 *     onMore={handleMore}
 *   />
 */

interface TemplateGridProps {
  templates: Template[];
  onEdit: (template: Template) => void;
  onDuplicate: (template: Template) => void;
  onPreview: (template: Template) => void;
  onMore?: (template: Template) => void;
}

/**
 * TemplateCard
 * Individual template card with preview, metadata, and actions
 * 
 * Size: ~320px × 430px (responsive)
 * 
 * Props:
 *   template: Template - Template object to display
 *   onEdit: (template: Template) => void - Edit handler
 *   onDuplicate: (template: Template) => void - Duplicate handler
 *   onPreview: (template: Template) => void - Preview handler
 *   onMore?: (template: Template) => void - More options (optional)
 * 
 * Layout:
 *   - 70% height: Preview section (TemplatePreview)
 *   - 30% height: Metadata section (name, hospital, date, status)
 *   - Actions bar: Edit, Duplicate, Preview, More buttons
 * 
 * Hover Effects:
 *   - Shadow increases
 *   - Border color changes
 *   - Preview scales slightly (1.02x)
 *   - Action buttons fade in
 * 
 * Usage:
 *   <TemplateCard
 *     template={template}
 *     onEdit={handleEdit}
 *     onDuplicate={handleDuplicate}
 *     onPreview={handlePreview}
 *     onMore={handleMore}
 *   />
 */

interface TemplateCardProps {
  template: Template;
  onEdit: (template: Template) => void;
  onDuplicate: (template: Template) => void;
  onPreview: (template: Template) => void;
  onMore?: (template: Template) => void;
}

/**
 * TemplatePreview
 * A4-aspect-ratio prescription template preview
 * 
 * Props:
 *   template: Template - Template object with section data
 * 
 * Features:
 *   - Maintains A4 aspect ratio (210mm:297mm = 0.707)
 *   - Visual section indicators (colored dots)
 *   - Shows included sections (header, body, footer)
 *   - Minimal, clean design
 *   - Responsive sizing
 * 
 * Usage:
 *   <TemplatePreview template={template} />
 */

interface TemplatePreviewProps {
  template: Template;
}

/**
 * TemplateToolbar
 * Search, sort, filter, and view mode controls
 * 
 * Props:
 *   searchQuery: string - Current search text
 *   onSearchChange: (query: string) => void - Search input handler
 *   sortBy: SortOption - Current sort option
 *   onSortChange: (sort: SortOption) => void - Sort change handler
 *   viewMode: ViewMode - Current view mode ('grid' | 'list')
 *   onViewModeChange: (mode: ViewMode) => void - View mode toggle handler
 *   resultsCount: number - Number of filtered results
 * 
 * Sort Options:
 *   - 'recent' - Recently edited (default)
 *   - 'newest' - Newest first
 *   - 'oldest' - Oldest first
 *   - 'alphabetical' - A-Z order
 *   - 'mostused' - Most used first
 * 
 * View Modes:
 *   - 'grid' - Grid layout (default)
 *   - 'list' - Table/list layout (future implementation)
 * 
 * Usage:
 *   <TemplateToolbar
 *     searchQuery={query}
 *     onSearchChange={setQuery}
 *     sortBy={sort}
 *     onSortChange={setSort}
 *     viewMode={view}
 *     onViewModeChange={setView}
 *     resultsCount={results.length}
 *   />
 */

type SortOption = 'recent' | 'newest' | 'oldest' | 'alphabetical' | 'mostused';
type ViewMode = 'grid' | 'list';

interface TemplateToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  resultsCount: number;
}

/**
 * TemplateActions
 * Action buttons: Edit, Duplicate, Preview, More
 * 
 * Props:
 *   template: Template - Template object
 *   onEdit: (template: Template) => void - Edit handler
 *   onDuplicate: (template: Template) => void - Duplicate handler
 *   onPreview: (template: Template) => void - Preview handler
 *   onMore?: (template: Template) => void - More options (optional)
 * 
 * Buttons:
 *   1. Edit - Navigate to edit page
 *   2. Duplicate - Create a copy
 *   3. Preview - Open preview modal/page
 *   4. More - Additional actions (context menu)
 * 
 * Responsive:
 *   - Desktop: Full button with text + icon
 *   - Mobile: Icon only (sm:inline shows text on tablets+)
 * 
 * Usage:
 *   <TemplateActions
 *     template={template}
 *     onEdit={handleEdit}
 *     onDuplicate={handleDuplicate}
 *     onPreview={handlePreview}
 *     onMore={handleMore}
 *   />
 */

interface TemplateActionsProps {
  template: Template;
  onEdit: (template: Template) => void;
  onDuplicate: (template: Template) => void;
  onPreview: (template: Template) => void;
  onMore?: (template: Template) => void;
}

/**
 * TemplateStatusBadge
 * Enterprise status badge with indicator dot
 * 
 * Props:
 *   status: 'draft' | 'published' | 'archived' - Status type
 *   isDraft?: boolean - Alternative way to specify draft status
 * 
 * Status Colors:
 *   - Draft: Amber (bg-amber-50, text-amber-700)
 *   - Published: Emerald (bg-emerald-50, text-emerald-700)
 *   - Archived: Slate (bg-slate-100, text-slate-600)
 * 
 * Usage:
 *   <TemplateStatusBadge status="draft" />
 *   <TemplateStatusBadge isDraft={true} />
 */

interface TemplateStatusBadgeProps {
  status: 'draft' | 'published' | 'archived';
  isDraft?: boolean;
}

/**
 * TemplateEmptyState
 * Beautiful empty state for new users
 * 
 * Props:
 *   onCreateFirst: () => void - Create first template handler
 *   isLoading?: boolean - Loading state (disables button)
 * 
 * Features:
 *   - Friendly illustration
 *   - Welcoming title and subtitle
 *   - Primary CTA button
 *   - Helpful hint text
 *   - Encourages template creation
 * 
 * Usage:
 *   <TemplateEmptyState
 *     onCreateFirst={handleCreate}
 *     isLoading={isCreating}
 *   />
 */

interface TemplateEmptyStateProps {
  onCreateFirst: () => void;
  isLoading?: boolean;
}

/**
 * TemplateSkeleton
 * Individual loading skeleton matching card dimensions
 * 
 * Props: None
 * 
 * Features:
 *   - Matches TemplateCard dimensions (~320x430px)
 *   - Animated pulse effect
 *   - Prevents layout shifting (CLS)
 *   - Multiple placeholder lines for metadata
 * 
 * Usage:
 *   <TemplateSkeleton />
 */

/**
 * TemplateGridSkeleton
 * Grid of loading skeletons
 * 
 * Props:
 *   count?: number - Number of skeleton cards (default: 8)
 * 
 * Grid Layout: Same as TemplateGrid
 *   Mobile: 1 column
 *   Tablet: 2 columns
 *   Laptop: 3 columns
 *   Desktop: 4 columns
 * 
 * Usage:
 *   <TemplateGridSkeleton count={12} />
 *   <TemplateGridSkeleton /> // defaults to 8
 */

interface TemplateGridSkeletonProps {
  count?: number;
}

// ============================================================================
// REDUX STATE
// ============================================================================

/**
 * Template State Shape:
 * 
 * state.template = {
 *   allTemplates: Template[]
 * }
 * 
 * Selectors:
 *   (state: any) => state.template.allTemplates
 * 
 * Actions:
 *   dispatch(SetAllTemplateList(templates))
 */

// ============================================================================
// HOOKS
// ============================================================================

/**
 * useLoader (from @/hooks/useLoader)
 * 
 * Returns:
 *   showLoader: (config: { title, description }) => void
 *   hideLoader: () => void
 * 
 * Usage:
 *   const { showLoader, hideLoader } = useLoader();
 *   
 *   showLoader({ title: 'Loading', description: 'Please wait...' });
 *   // ... do work
 *   hideLoader();
 */

// ============================================================================
// COMMON PATTERNS
// ============================================================================

/**
 * 1. Filtering Templates (useMemo)
 * 
 * const filteredTemplates = useMemo(() => {
 *   if (!searchQuery) return allTemplates;
 *   const query = searchQuery.toLowerCase();
 *   return allTemplates.filter(template =>
 *     template.name.toLowerCase().includes(query) ||
 *     template.hospital_name?.toLowerCase().includes(query)
 *   );
 * }, [allTemplates, searchQuery]);
 */

/**
 * 2. Sorting Templates (useMemo)
 * 
 * const sortedTemplates = useMemo(() => {
 *   const templates = [...filteredTemplates];
 *   switch (sortBy) {
 *     case 'alphabetical':
 *       return templates.sort((a, b) =>
 *         (a.name || '').localeCompare(b.name || '')
 *       );
 *     case 'newest':
 *       return templates.sort((a, b) =>
 *         new Date(b.created_at).getTime() -
 *         new Date(a.created_at).getTime()
 *       );
 *     // ... other cases
 *   }
 * }, [filteredTemplates, sortBy]);
 */

/**
 * 3. Handling Template Actions
 * 
 * const handleEdit = (template: Template) => {
 *   navigate(`edit/${template.id}/header`, {
 *     state: { editData: template }
 *   });
 * };
 * 
 * const handlePreview = (template: Template) => {
 *   navigate(`view/${template.id}`);
 * };
 */

// ============================================================================
// TYPES
// ============================================================================

/**
 * Template Type (from @/features/new-template/type/TemplateType)
 * 
 * {
 *   id: string
 *   name: string
 *   created_by?: string
 *   created_at?: string
 *   show_header?: boolean
 *   show_body?: boolean
 *   show_footer?: boolean
 *   header: Section[]
 *   body: Section[]
 *   footer?: Section[]
 *   is_draft?: boolean | number (1 or 0)
 *   hospital_name?: string
 *   category?: string
 * }
 */

/**
 * Section Type
 * {
 *   id?: string
 *   section_id: string
 *   template_section_id: string
 *   name: string
 *   section_order?: number
 *   style?: any
 *   rows: Row[]
 *   createdAt?: string
 *   isVisible: boolean
 * }
 */

// ============================================================================
// STYLING REFERENCE
// ============================================================================

/**
 * Color Palette:
 * 
 * Primary Actions:
 *   bg-blue-600 hover:bg-blue-700 active:bg-blue-800
 * 
 * Borders & Dividers:
 *   border-slate-200 hover:border-slate-300
 * 
 * Backgrounds:
 *   bg-white (card background)
 *   bg-slate-50 (light background)
 *   bg-slate-100 (hover backgrounds)
 * 
 * Text:
 *   text-slate-900 (primary text)
 *   text-slate-600 (secondary text)
 *   text-slate-500 (tertiary text)
 *   text-slate-400 (placeholder)
 * 
 * Status Colors:
 *   Draft: bg-amber-50, text-amber-700
 *   Published: bg-emerald-50, text-emerald-700
 *   Archived: bg-slate-100, text-slate-600
 * 
 * Shadows:
 *   shadow-sm (subtle, default card shadow)
 *   shadow-md (hover state)
 * 
 * Transitions:
 *   transition-all duration-200 (standard)
 *   transition-all duration-300 (hover effects)
 */

// ============================================================================
// USEFUL UTILITIES
// ============================================================================

/**
 * Format Date:
 * import { formatDistanceToNow } from 'date-fns';
 * formatDistanceToNow(new Date(template.created_at), { addSuffix: true })
 * // "2 hours ago"
 */

/**
 * Icons (from lucide-react):
 * - Plus
 * - Search
 * - Grid3x3
 * - List
 * - ChevronDown
 * - Edit3
 * - Copy
 * - Eye
 * - MoreVertical
 */

// ============================================================================
// PERFORMANCE TIPS
// ============================================================================

/**
 * 1. Use useMemo for filtering/sorting to prevent unnecessary recalculations
 * 2. Render skeletons during loading to prevent layout shift (CLS)
 * 3. Memoize callbacks with useCallback if needed
 * 4. Consider virtualizing large lists if > 100 templates
 * 5. Lazy load template previews if performance issues
 */

// ============================================================================
// COMMON ISSUES & SOLUTIONS
// ============================================================================

/**
 * Issue: Template list not updating after create
 * Solution: Call fetchTemplates() or dispatch(SetAllTemplateList()) after create
 * 
 * Issue: Images not loading in preview
 * Solution: Check template.header/body/footer structure for image fields
 * 
 * Issue: Layout shifting during load
 * Solution: Ensure TemplateSkeleton has same dimensions as TemplateCard
 * 
 * Issue: Search not finding results
 * Solution: Check that template.name and hospital_name are populated
 * 
 * Issue: Sort not working
 * Solution: Verify dates are in ISO format (YYYY-MM-DD)
 */

export {};
