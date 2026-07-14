/**
 * TemplateLibrary - Main template library page component
 * Production-ready template management UI for healthcare professionals
 */

import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Plus } from 'lucide-react';
import type { Template } from '../type/TemplateType';
import TemplateService from '../service/TemplateService';
import { SetAllTemplateList } from '../store/TemplateSlice';
import { useLoader } from '@/hooks/useLoader';
import { TemplateGrid } from './TemplateGrid';
import { TemplateToolbar } from './TemplateToolbar';
import { TemplateEmptyState } from './TemplateEmptyState';
import { TemplateGridSkeleton } from './TemplateSkeleton';

type SortOption = 'recent' | 'newest' | 'oldest' | 'alphabetical' | 'mostused';
type ViewMode = 'grid' | 'list';
type GridSize = 'small' | 'medium' | 'large';

export function TemplateLibrary() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { showLoader, hideLoader } = useLoader();

    // Redux state
    const templateState = useSelector((state: any) => state.template);
    const allTemplates = templateState?.allTemplates || [];

    // Local state
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<SortOption>('recent');
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [gridSize, setGridSize] = useState<GridSize>('medium');
    const [isLoading, setIsLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [selectedTemplates, setSelectedTemplates] = useState<Set<string>>(new Set());

    /**
     * Filter templates by search query
     * Searches template name, hospital name, and category
     */
    const filteredTemplates = useMemo(() => {
        if (!searchQuery.trim()) return allTemplates;

        const query = searchQuery.toLowerCase();
        return allTemplates.filter((template: Template) => {
            const name = (template.name || '').toLowerCase();
            const hospital = ((template as any).hospital_name || '').toLowerCase();
            const category = ((template as any).category || '').toLowerCase();

            return (
                name.includes(query) ||
                hospital.includes(query) ||
                category.includes(query)
            );
        });
    }, [allTemplates, searchQuery]);

    /**
     * Sort templates
     */
    const sortedTemplates = useMemo(() => {
        const templates = [...filteredTemplates];

        switch (sortBy) {
            case 'newest':
                return templates.sort(
                    (a, b) =>
                        new Date(b.created_at || 0).getTime() -
                        new Date(a.created_at || 0).getTime()
                );
            case 'oldest':
                return templates.sort(
                    (a, b) =>
                        new Date(a.created_at || 0).getTime() -
                        new Date(b.created_at || 0).getTime()
                );
            case 'alphabetical':
                return templates.sort((a, b) =>
                    (a.name || '').localeCompare(b.name || '')
                );
            case 'mostused':
                // Assuming there's a usageCount field
                return templates.sort(
                    (a, b) =>
                        ((b as any).usageCount || 0) - ((a as any).usageCount || 0)
                );
            case 'recent':
            default:
                // Recently edited (assume updated_at or created_at)
                return templates.sort(
                    (a, b) =>
                        new Date(b.created_at || 0).getTime() -
                        new Date(a.created_at || 0).getTime()
                );
        }
    }, [filteredTemplates, sortBy]);

    /**
     * Fetch templates on component mount
     */
    useEffect(() => {
        fetchTemplates();
    }, []);

    /**
     * Fetch all templates from API
     */
    async function fetchTemplates() {
        try {
            setIsLoading(true);
            showLoader({
                title: 'Loading Templates List',
                description: 'Fetching your prescription templates...',
            });

            const response = await TemplateService.getAllTemplates();
            if (response.success) {
                dispatch(SetAllTemplateList(response.data || []));
            }
        } catch (error) {
            console.error('Error fetching templates:', error);
        } finally {
            setIsLoading(false);
            hideLoader();
        }
    }

    /**
     * Create a new template
     */
    const handleCreateTemplate = async () => {
        try {
            setIsCreating(true);
            showLoader({
                title: 'Creating your template',
                description: 'creating your prescription templates...',
            });
            const response = await TemplateService.createDraftTemplate({
                data: { templateName: 'New Template' },
            });

            if (response.success && response?.data && response.data?.templateId) {
                const newTemplateId = response.data?.templateId;
                if (newTemplateId) {
                    navigate(`edit/${newTemplateId}/header`);
                }
            }
        } catch (error) {
            console.error('Error creating template:', error);
        } finally {
            setIsCreating(false);
            hideLoader();
        }
    };

    /**
     * Edit template
     */
    const handleEditTemplate = (template: Template) => {
        navigate(`edit/${template.id}/header`, {
            state: { editData: template },
        });
    };

    /**
     * Duplicate template
     */
    const handleDuplicateTemplate = async (template: Template) => {
        try {
            showLoader({
                title: 'Duplicating Template',
                description: 'Creating a copy of your template...',
            });

            // Duplicate logic - adjust based on your API
            const response = await TemplateService.createDraftTemplate({
                data: {
                    templateName: `${template.name} (Copy)`,
                    // Add any other fields needed for duplication
                },
            });

            if (response.success) {
                await fetchTemplates();
            }
        } catch (error) {
            console.error('Error duplicating template:', error);
        } finally {
            hideLoader();
        }
    };

    /**
     * Preview template
     */
    const handlePreviewTemplate = (template: Template) => {
        // Navigate to preview mode or open modal
        navigate(`view/${template.id}`);
    };

    /**
     * More options menu
     */
    const handleMoreOptions = (template: Template) => {
        // Could open a context menu or modal with additional options
        console.log('More options for:', template);
    };

    /**
     * Handle template selection
     */
    const handleSelectTemplate = (templateId: string, selected: boolean) => {
        setSelectedTemplates((prev) => {
            const newSet = new Set(prev);
            if (selected) {
                newSet.add(templateId);
            } else {
                newSet.delete(templateId);
            }
            return newSet;
        });
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Page Header */}
            <div className="border-b border-slate-200 bg-white px-6 py-6 sm:px-8 sm:py-8">
                <div className="mx-auto max-w-7xl">
                    {/* Breadcrumb */}
                    <nav className="mb-4 text-xs text-slate-500 sm:text-sm">
                        Dashboard &gt; <span className="text-slate-700">Template Library</span>
                    </nav>

                    {/* Header Title and Description */}
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                        <div className="min-w-0">
                            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                                Template Library
                            </h1>
                            <p className="mt-1 text-sm text-slate-600 sm:text-base">
                                Manage all your prescription templates.
                            </p>
                        </div>

                        {/* Create Button */}
                        <button
                            onClick={handleCreateTemplate}
                            disabled={isCreating}
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed sm:px-6 sm:py-3"
                        >
                            <Plus className="h-4 w-4" />
                            Create Template
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto max-w-7xl px-6 py-6 sm:px-8 sm:py-8">
                {/* Toolbar */}
                <div className="mb-8">
                    <TemplateToolbar
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        sortBy={sortBy}
                        onSortChange={setSortBy}
                        viewMode={viewMode}
                        onViewModeChange={setViewMode}
                        gridSize={gridSize}
                        onGridSizeChange={setGridSize}
                        resultsCount={sortedTemplates.length}
                    />
                </div>

                {/* Content Area */}
                {isLoading ? (
                    <TemplateGridSkeleton count={8} />
                ) : sortedTemplates.length === 0 ? (
                    <TemplateEmptyState
                        onCreateFirst={handleCreateTemplate}
                        isLoading={isCreating}
                    />
                ) : (
                    <TemplateGrid
                        templates={sortedTemplates}
                        selectedTemplates={selectedTemplates}
                        onSelectTemplate={handleSelectTemplate}
                        onEdit={handleEditTemplate}
                        onDuplicate={handleDuplicateTemplate}
                        onPreview={handlePreviewTemplate}
                        onMore={handleMoreOptions}
                        size={gridSize}
                    />
                )}

                {/* Results info when in search mode */}
                {searchQuery && !isLoading && sortedTemplates.length > 0 && (
                    <div className="mt-6 flex justify-center text-xs text-slate-500">
                        Showing {sortedTemplates.length} of {allTemplates.length}{' '}
                        {allTemplates.length === 1 ? 'template' : 'templates'}
                    </div>
                )}
            </div>
        </div>
    );
}

export default TemplateLibrary;
