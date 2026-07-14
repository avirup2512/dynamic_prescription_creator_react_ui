/**
 * TemplateEmptyState - Beautiful empty state when no templates exist
 */

import { Plus } from 'lucide-react';

interface TemplateEmptyStateProps {
    onCreateFirst: () => void;
    isLoading?: boolean;
}

export function TemplateEmptyState({ onCreateFirst, isLoading }: TemplateEmptyStateProps) {
    return (
        <div className="flex min-h-[500px] w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
            {/* Illustration - Simple, modern design */}
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-100">
                <svg
                    viewBox="0 0 100 100"
                    className="h-12 w-12 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                >
                    {/* Document icon with plus */}
                    <rect x="20" y="15" width="60" height="70" rx="3" />
                    <line x1="35" y1="30" x2="65" y2="30" />
                    <line x1="35" y1="40" x2="65" y2="40" />
                    <line x1="35" y1="50" x2="50" y2="50" />
                    {/* Plus sign overlay */}
                    <circle cx="70" cy="70" r="12" fill="white" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="70" y1="65" x2="70" y2="75" strokeWidth="2" />
                    <line x1="65" y1="70" x2="75" y2="70" strokeWidth="2" />
                </svg>
            </div>

            {/* Title */}
            <h2 className="mb-3 text-xl font-semibold text-slate-900">No Templates Yet</h2>

            {/* Subtitle */}
            <p className="mb-8 max-w-sm text-sm text-slate-600">
                Create your first prescription template and start building reusable consultation layouts for your patients.
            </p>

            {/* Primary Button */}
            <button
                onClick={onCreateFirst}
                disabled={isLoading}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <Plus className="h-4 w-4" />
                Create First Template
            </button>

            {/* Helpful hint */}
            <p className="mt-6 text-xs text-slate-500">
                Templates help you save time by reusing prescription layouts across patients.
            </p>
        </div>
    );
}
