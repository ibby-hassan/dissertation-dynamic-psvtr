import {
  menuOverlay, header, title, gridContainer, emptyState,
  footer, loadBtn, cancelBtn,
  sortControls, sortButton, activeSort, sortIcon
} from "./styles/LoadMenu.css.ts";

import { useState, useEffect } from "react";
import type { Shape } from "../utils/shapeUtils.ts";
import { fetchLocalSaves, deleteLocalSave, renameLocalSave, type SaveObject } from "../utils/IOUtils.ts";
import LoadMenuSavedShape from "./LoadMenuSavedShape";
import ConfirmCaptureModal from "./ConfirmCaptureModal.tsx";

import ascendingImg from "../assets/ascending.png";
import descendingImg from "../assets/descending.png";

interface LoadMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadShape: (shape: Shape) => void;
}

const LoadMenu = ({ isOpen, onClose, onLoadShape }: LoadMenuProps) => {
  const [saves, setSaves] = useState<SaveObject[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [renameTarget, setRenameTarget] = useState<SaveObject | null>(null);

  // Sorting State
  const [sortField, setSortField] = useState<'date' | 'name'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    if (isOpen) {
      setSaves(fetchLocalSaves());
      setSelectedId(null);
    }
  }, [isOpen]);

  // --- Handlers ---
  const handleConfirmLoad = () => {
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

  const handleRenameInit = (save: SaveObject) => {
    setRenameTarget(save);
  };

  const handleRenameConfirm = (newName: string) => {
    if (renameTarget) {
      const updatedList = renameLocalSave(renameTarget.id, newName);
      setSaves(updatedList);
      setRenameTarget(null);
    }
  };

  // --- Sorting Logic ---
  const handleSort = (field: 'date' | 'name') => {
    if (sortField === field) {
      // Toggle order if clicking same field
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      // New field: set defaults (Name -> Asc, Date -> Desc)
      setSortField(field);
      setSortOrder(field === 'name' ? 'asc' : 'desc');
    }
  };

  const sortedSaves = [...saves].sort((a, b) => {
    let comparison = 0;
    if (sortField === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else {
      comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  if (!isOpen) return null;

  return (
    <div className={menuOverlay}>
      {/* Rename Modal */}
      <ConfirmCaptureModal
        isOpen={!!renameTarget}
        imageData={renameTarget?.image || null}
        mode="rename"
        initialName={renameTarget?.name}
        onConfirm={handleRenameConfirm}
        onCancel={() => setRenameTarget(null)}
      />

      <div className={header}>
        <h2 className={title}>Load Saved Shape</h2>

        {/* Sort Controls */}
        <div className={sortControls}>
          <button
            className={`${sortButton} ${sortField === 'name' ? activeSort : ''}`}
            onClick={() => handleSort('name')}
            title="Sort by Name"
          >
            Name
            {sortField === 'name' && (
              <img
                src={sortOrder === 'asc' ? ascendingImg : descendingImg}
                className={sortIcon}
                alt={sortOrder === 'asc' ? "Ascending" : "Descending"}
              />
            )}
          </button>
          <button
            className={`${sortButton} ${sortField === 'date' ? activeSort : ''}`}
            onClick={() => handleSort('date')}
            title="Sort by Date"
          >
            Date
            {sortField === 'date' && (
              <img
                src={sortOrder === 'asc' ? ascendingImg : descendingImg}
                className={sortIcon}
                alt={sortOrder === 'asc' ? "Ascending" : "Descending"}
              />
            )}
          </button>
        </div>
      </div>

      <div className={gridContainer}>
        {sortedSaves.length === 0 ? (
          <div className={emptyState}>No saved shapes.</div>
        ) : (
          sortedSaves.map((save) => (
            <LoadMenuSavedShape
              key={save.id}
              data={save}
              isSelected={selectedId === save.id}
              onClick={() => setSelectedId(save.id)}
              onDelete={() => handleDelete(save.id)}
              onRename={() => handleRenameInit(save)}
            />
          ))
        )}
      </div>

      <div className={footer}>
        <button className={cancelBtn} onClick={onClose}>Cancel</button>
        <button
          className={loadBtn}
          onClick={handleConfirmLoad}
          disabled={selectedId === null}
        >
          Load Selected
        </button>
      </div>
    </div>
  );
};

export default LoadMenu;