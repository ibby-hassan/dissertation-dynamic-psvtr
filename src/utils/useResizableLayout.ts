import { useState, useCallback, useEffect, useRef, type MouseEvent } from 'react';

// Constraints
const MIN_SIDEBAR_WIDTH = 180;
const MIN_TOOLBAR_HEIGHT = 100;
const MIN_TOOLBAR_ITEM_WIDTH = 70;
const TOOLBAR_ITEM_COUNT = 8;
const MIN_TOOLBAR_AREA_WIDTH = (MIN_TOOLBAR_ITEM_WIDTH * TOOLBAR_ITEM_COUNT) + 50;

export const useResizableLayout = () => {
    // Initial sizes
    const [sidebarWidth, setSidebarWidth] = useState(300);
    const [bottomHeight, setBottomHeight] = useState(150);

    // Refs to track dragging state
    const isResizingSidebar = useRef(false);
    const isResizingBottom = useRef(false);

    // ADDED: Accept the event and prevent default behavior
    const startResizingSidebar = (e: MouseEvent) => {
        e.preventDefault(); 
        isResizingSidebar.current = true;
        document.body.style.cursor = 'col-resize';
    };

    const startResizingBottom = (e: MouseEvent) => {
        e.preventDefault();
        isResizingBottom.current = true;
        document.body.style.cursor = 'row-resize';
    };

    const stopResizing = useCallback(() => {
        isResizingSidebar.current = false;
        isResizingBottom.current = false;
        document.body.style.cursor = 'default';
    }, []);

    const handleMouseMove = useCallback((e: globalThis.MouseEvent) => {
        if (isResizingSidebar.current) {
            const newWidth = e.clientX;
            const maxSidebarWidth = window.innerWidth - MIN_TOOLBAR_AREA_WIDTH;
            
            // Clamp logic
            const constrainedWidth = Math.max(MIN_SIDEBAR_WIDTH, Math.min(newWidth, maxSidebarWidth));
            setSidebarWidth(constrainedWidth);
        }

        if (isResizingBottom.current) {
            const newHeight = window.innerHeight - e.clientY;
            
            // Clamp logic for height
            const constrainedHeight = Math.max(MIN_TOOLBAR_HEIGHT, Math.min(newHeight, window.innerHeight * 0.5));
            setBottomHeight(constrainedHeight);
        }
    }, []);

    // Global Event Listeners
    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', stopResizing);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', stopResizing);
        };
    }, [handleMouseMove, stopResizing]);

    return {
        sidebarWidth,
        bottomHeight,
        startResizingSidebar,
        startResizingBottom
    };
};