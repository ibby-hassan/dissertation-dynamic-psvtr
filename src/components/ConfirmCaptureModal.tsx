import { useState, useEffect } from "react";
import {
  modalOverlay,
  modalContent,
  modalTitle, imagePreview, inputField,
  buttonGroup,
  confirmButton, cancelButton
} from "./styles/ConfirmCaptureModal.css.ts";

interface ConfirmCaptureModalProps {
  isOpen: boolean;
  imageData: string | null;
  mode: 'download' | 'save' | 'rename' | null;
  initialName?: string;
  onConfirm: (name: string) => void;
  onCancel: () => void;
}

const ConfirmCaptureModal = ({ isOpen, imageData, mode, initialName, onConfirm, onCancel }: ConfirmCaptureModalProps) => {
  const [shapeName, setShapeName] = useState("psvtr-shape");

  useEffect(() => {
    if (isOpen) {
        setShapeName(initialName || "psvtr-shape");
    }
  }, [isOpen, initialName]);

  if (!isOpen || !imageData || !mode) return null;

  let actionText = 'Save';
  let titleText = 'Save to Library';

  if (mode === 'download') {
      actionText = 'Download';
      titleText = 'Download Screenshot';
  } else if (mode === 'rename') {
      actionText = 'Update';
      titleText = 'Rename Shape';
  }

  return (
    <div className={modalOverlay}>
      <div className={modalContent}>
        <h2 className={modalTitle}>{titleText}</h2>
        
        <img src={imageData} alt="Capture Preview" className={imagePreview} />
        
        <div>
          <input 
            className={inputField}
            type="text" 
            value={shapeName} 
            onChange={(e) => setShapeName(e.target.value)}
            placeholder="Enter shape name..."
            autoFocus
          />
        </div>
        
        <div className={buttonGroup}>
          <button className={cancelButton} onClick={onCancel}>
            Cancel
          </button>
          <button className={confirmButton} onClick={() => onConfirm(shapeName || "Untitled Shape")}>
            {actionText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmCaptureModal;