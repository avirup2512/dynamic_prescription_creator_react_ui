/**
 * TemplateGrid - Responsive grid layout with adjustable size
 * 
 * Grid Size Options:
 * - Small: 5/4/2/2 columns (smaller cards, compact)
 * - Medium: 4/3/2/1 columns (default)
 * - Large: 2/2/1/1 columns (larger cards, spacious)
 */

import React from 'react';
import type { Template } from '../type/TemplateType';
import { TemplateCard } from './TemplateCard';

type GridSize = 'small' | 'medium' | 'large';

interface TemplateGridProps {
    templates: Template[];
    selectedTemplates?: Set<string>;
    onSelectTemplate?: (templateId: string, selected: boolean) => void;
    onEdit: (template: Template) => void;
    onDuplicate: (template: Template) => void;
    onPreview: (template: Template) => void;
    onMore?: (template: Template) => void;
    size?: GridSize;
}

export function TemplateGrid({
    templates,
    selectedTemplates = new Set(),
    onSelectTemplate,
    onEdit,
    onDuplicate,
    onPreview,
    onMore,
    size = 'medium',
}: TemplateGridProps) {
    /**
     * Get grid classes based on size
     * Small: Smaller cards, more columns (compact view)
     * Medium: Default size
     * Large: Larger cards, fewer columns (spacious view)
     */
    const getGridClasses = (): string => {
        switch (size) {
            case 'small':
                return 'grid auto-rows-max gap-3.5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5';
            case 'large':
                return 'grid auto-rows-max gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2';
            case 'medium':
            default:
                return 'grid auto-rows-max gap-4.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
        }
    };

    return (
        <div className={getGridClasses()}>
            {templates.map((template) => (
                <TemplateCard
                    key={template.id}
                    template={template}
                    isSelected={selectedTemplates.has(template.id)}
                    onSelect={onSelectTemplate}
                    onEdit={onEdit}
                    onDuplicate={onDuplicate}
                    onPreview={onPreview}
                    onMore={onMore}
                />
            ))}
        </div>
    );
}
