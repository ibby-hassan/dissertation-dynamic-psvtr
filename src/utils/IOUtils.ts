import type { Shape } from "./ShapeUtils";

export interface SaveObject {
  id: number;
  name: string;
  date: string;
  shape: Shape;
  image: string;
}

const STORAGE_KEY = 'psvtr_saves';

export function downloadToPC(dataUrl: string, filename: string) {
  const link = document.createElement('a');
  const PNGify = filename.endsWith('.png') ? filename : `${filename}.png`;

  link.setAttribute('download', PNGify);
  link.setAttribute('href', dataUrl);
  link.click();
  link.remove();
};

export function saveToLocalStorage(shape: Shape, dataUrl: string, name: string): { success: boolean; message: string } {
  const saveObject: SaveObject = {
    id: Date.now(),
    name: name,
    date: new Date().toISOString(),
    shape: shape,
    image: dataUrl
  };

  try {
    const existingSaves = fetchLocalSaves();
    existingSaves.push(saveObject);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingSaves));
    return { success: true, message: "Shape saved successfully!" };
  } catch (e) {
    console.error("Storage failed", e);
    return { success: false, message: "Failed to save: Local Storage might be full." };
  }
}

export function fetchLocalSaves(): SaveObject[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsedSaves: SaveObject[] = JSON.parse(stored);
    // Sort by date descending (newest first)
    return parsedSaves.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (e) {
    console.error("Failed to load saves", e);
    return [];
  }
}

export function deleteLocalSave(id: number): SaveObject[] {
  try {
    const existingSaves = fetchLocalSaves();
    const updatedSaves = existingSaves.filter(save => save.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSaves));
    return updatedSaves;
  } catch (e) {
    console.error("Failed to delete save", e);
    return [];
  }
}

export function renameLocalSave(id: number, newName: string): SaveObject[] {
  try {
    const existingSaves = fetchLocalSaves();
    const saveIndex = existingSaves.findIndex(save => save.id === id);

    if (saveIndex !== -1) {
      existingSaves[saveIndex].name = newName;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existingSaves));

      // Return sorted list to maintain order
      return existingSaves.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    return existingSaves;
  } catch (e) {
    console.error("Failed to rename save", e);
    return [];
  }
}