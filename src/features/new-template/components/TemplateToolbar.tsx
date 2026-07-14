/**
 * TemplateToolbar - Search, filter, sort, and view toggle controls
 */

import { Search, Grid3x3, List, ChevronDown, LayoutGrid } from 'lucide-react';
import { useState } from 'react';

type SortOption = 'recent' | 'newest' | 'oldest' | 'alphabetical' | 'mostused';
type ViewMode = 'grid' | 'list';
type GridSize = 'small' | 'medium' | 'large';

interface TemplateToolbarProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    sortBy: SortOption;
    onSortChange: (sort: SortOption) => void;
    viewMode: ViewMode;
    onViewModeChange: (mode: ViewMode) => void;
    gridSize: GridSize;
    onGridSizeChange: (size: GridSize) => void;
    resultsCount: number;
}

export function TemplateToolbar({
    searchQuery,
    onSearchChange,
    sortBy,
    onSortChange,
    viewMode,
    onViewModeChange,
    gridSize,
    onGridSizeChange,
    resultsCount,
}: TemplateToolbarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isSizeOpen, setIsSizeOpen] = useState(false);

    const sortOptions: { label: string; value: SortOption }[] = [
        { label: 'Recently Edited', value: 'recent' },
        { label: 'Newest', value: 'newest' },
        { label: 'Oldest', value: 'oldest' },
        { label: 'Alphabetical', value: 'alphabetical' },
        { label: 'Most Used', value: 'mostused' },
    ];

    const gridSizeOptions: { label: string; value: GridSize }[] = [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
    ];

    const currentSortLabel =
        sortOptions.find((opt) => opt.value === sortBy)?.label || 'Sort';

    const currentSizeLabel =
        gridSizeOptions.find((opt) => opt.value === gridSize)?.label || 'Medium';

    return (
        <div className="space-y-4">
            {/* Toolbar Container */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                {/* Left: Search Box */}
                <div className="relative flex-1 sm:max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search templates..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm placeholder:text-slate-400 transition-colors focus:border-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-200"
                    />
                </div>

                {/* Right: Sort, Grid Size, View Toggle */}
                <div className="flex gap-2">
                    {/* Sort Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50"
                        >
                            <span>{currentSortLabel}</span>
                            <ChevronDown className="h-4 w-4 transition-transform" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                        </button>

                        {/* Dropdown Menu */}
                        {isOpen && (
                            <div className="absolute right-0 z-50 mt-2 w-48 rounded-lg border border-slate-200 bg-white shadow-lg">
                                {sortOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => {
                                            onSortChange(option.value);
                                            setIsOpen(false);
                                        }}
                                        className={`block w-full px-4 py-2.5 text-left text-sm transition-colors first:rounded-t-lg last:rounded-b-lg ${sortBy === option.value
                                                ? 'bg-blue-50 font-medium text-blue-700'
                                                : 'text-slate-700 hover:bg-slate-50'
                                            }`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Grid Size Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsSizeOpen(!isSizeOpen)}
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50"
                            title="Grid size"
                        >
                            <LayoutGrid className="h-4 w-4" />
                            <span>{currentSizeLabel}</span>
                            <ChevronDown className="h-4 w-4 transition-transform" style={{ transform: isSizeOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                        </button>

                        {/* Dropdown Menu */}
                        {isSizeOpen && (
                            <div className="absolute right-0 z-50 mt-2 w-40 rounded-lg border border-slate-200 bg-white shadow-lg">
                                {gridSizeOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => {
                                            onGridSizeChange(option.value);
                                            setIsSizeOpen(false);
                                        }}
                                        className={`block w-full px-4 py-2.5 text-left text-sm transition-colors first:rounded-t-lg last:rounded-b-lg ${gridSize === option.value
                                                ? 'bg-blue-50 font-medium text-blue-700'
                                                : 'text-slate-700 hover:bg-slate-50'
                                            }`}
                                    >
                                        {option.label === 'Small' && '📦 Small'}
                                        {option.label === 'Medium' && '📋 Medium'}
                                        {option.label === 'Large' && '📱 Large'}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* View Mode Toggle */}
                    <div className="inline-flex gap-1 rounded-lg border border-slate-200 bg-white p-1">
                        <button
                            onClick={() => onViewModeChange('grid')}
                            className={`rounded-md p-2 transition-colors ${viewMode === 'grid'
                                    ? 'bg-slate-100 text-slate-900'
                                    : 'text-slate-600 hover:text-slate-700'
                                }`}
                            title="Grid view"
                        >
                            <Grid3x3 className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => onViewModeChange('list')}
                            className={`rounded-md p-2 transition-colors ${viewMode === 'list'
                                    ? 'bg-slate-100 text-slate-900'
                                    : 'text-slate-600 hover:text-slate-700'
                                }`}
                            title="List view"
                        >
                            <List className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Results info */}
            {searchQuery && (
                <div className="text-xs text-slate-500">
                    Found <span className="font-medium text-slate-700">{resultsCount}</span> {resultsCount === 1 ? 'template' : 'templates'}
                </div>
            )}
        </div>
    );
}
