import type { Shape } from "./ShapeUtils";

export function downloadToPC(dataUrl: string, filename: string) {
    const link = document.createElement('a');

    const PNGify = filename.endsWith('.png') ? filename : `${filename}.png`;
    
    link.setAttribute('download', PNGify);
    link.setAttribute('href', dataUrl);
    link.click();
    link.remove();
};

export function saveToLocalStorage(shape: Shape, dataUrl: string, name: string): { success: boolean; message: string } {
    const saveObject = {
        id: Date.now(),
        name: name,
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