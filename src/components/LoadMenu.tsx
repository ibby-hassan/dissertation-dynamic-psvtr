import { 
  menuOverlay, header, title, gridContainer, emptyState, 
  footer, loadBtn, cancelBtn 
} from "./styles/LoadMenu.css.ts";

import { useState, useEffect } from "react";
import type { Shape } from "../utils/ShapeUtils";
import { fetchLocalSaves, deleteLocalSave, type SaveObject } from "../utils/IOUtils.ts";
import LoadMenuSavedShape from "./LoadMenuSavedShape";

interface LoadMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadShape: (shape: Shape) => void;
}

const LoadMenu = ({ isOpen, onClose, onLoadShape }: LoadMenuProps) => {
  const [saves, setSaves] = useState<SaveObject[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSaves(fetchLocalSaves());
      setSelectedId(null);
    }
  }, [isOpen]);

  const handleConfirm = () => {
    if (selectedId === null) return;
    const selectedSave = saves.find(s => s.id === selectedId);
    if (selectedSave) {
      onLoadShape(selectedSave.shape);
    }
  };

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this shape?");
    if (confirmDelete) {
        const updatedList = deleteLocalSave(id);
        setSaves(updatedList);
        
        if (selectedId === id) {
            setSelectedId(null);
        }
    }
  };

  if (!isOpen) return null;

  return (
    <div className={menuOverlay}>
      <div className={header}>
        <h2 className={title}>Load Saved Shape</h2>
      </div>

      <div className={gridContainer}>
        {saves.length === 0 ? (
          <div className={emptyState}>No saved shapes.</div>
        ) : (
          saves.map((save) => (
            <LoadMenuSavedShape
              key={save.id}
              data={save}
              isSelected={selectedId === save.id}
              onClick={() => setSelectedId(save.id)}
              onDelete={() => handleDelete(save.id)}
            />
          ))
        )}
      </div>

      <div className={footer}>
        <button className={cancelBtn} onClick={onClose}>Cancel</button>
        <button 
          className={loadBtn} 
          onClick={handleConfirm}
          disabled={selectedId === null}
        >
          Load Selected
        </button>
      </div>
    </div>
  );
};

export default LoadMenu;