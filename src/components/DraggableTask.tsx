// DraggableContainer.js
import React, { ReactNode } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


type DraggableContainerPropsType = {
    id: string,
    children: ReactNode
}

export const DraggableContainer = ({ id, children }: DraggableContainerPropsType) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        // <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <div ref={setNodeRef} style={style} {...attributes}>
            {children}
        </div>
    );
};

