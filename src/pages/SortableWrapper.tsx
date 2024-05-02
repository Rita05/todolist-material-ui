import React, { ReactNode } from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface SortableWrapperProps {
    items: Array<string>,
    children: ReactNode;
}


export const SortableWrapper = ({ items, children }: SortableWrapperProps) => {
    return (
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {children}
        </SortableContext>
    );
};

