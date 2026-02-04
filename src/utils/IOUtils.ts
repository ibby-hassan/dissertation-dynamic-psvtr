import type { Shape } from "./ShapeUtils";

export function downloadToPC(dataUrl: string) {
    const link = document.createElement('a');
    link.setAttribute('download', `PSVTR-Shape-${Date.now()}.png`);
    link.setAttribute('href', dataUrl);
    link.click();
    link.remove();
};

export function saveToLocalStorage(shape: Shape, dataUrl: string): { success: boolean; message: string } {
    const saveObject = {
        id: Date.now(),
        date: new Date().toISOString(),
        shape: shape,
        image: dataUrl
    };

    try {
        const existingSaves = JSON.parse(localStorage.getItem('psvtr_saves') || '[]');
        existingSaves.push(saveObject);
        localStorage.setItem('psvtr_saves', JSON.stringify(existingSaves));
        return { success: true, message: "Shape saved successfully!" };
    } catch (e) {
        console.error("Storage failed", e);
        return { success: false, message: "Failed to save: Local Storage might be full." };
    }
}