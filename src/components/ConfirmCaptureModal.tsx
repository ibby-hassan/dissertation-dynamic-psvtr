import { useState } from "react";
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
  mode: 'download' | 'save' | null;
  onConfirm: (name: string) => void;
  onCancel: () => void;
}

const ConfirmCaptureModal = ({ isOpen, imageData, mode, onConfirm, onCancel }: ConfirmCaptureModalProps) => {
  const [shapeName, setShapeName] = useState("Untitled Shape");

  if (!isOpen || !imageData || !mode) return null;

  const actionText = mode === 'download' ? 'Download' : 'Save';
  const titleText = mode === 'download' ? 'Download Screenshot' : 'Save to Library';

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