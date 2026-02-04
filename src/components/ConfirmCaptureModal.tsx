import {
  modalOverlay,
  modalContent,
  modalTitle, imagePreview,
  buttonGroup,
  confirmButton, cancelButton
} from "./styles/ConfirmCaptureModal.css.ts";

interface ConfirmCaptureModalProps {
  isOpen: boolean;
  imageData: string | null;
  mode: 'download' | 'save' | null;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmCaptureModal = ({ isOpen, imageData, mode, onConfirm, onCancel }: ConfirmCaptureModalProps) => {
  if (!isOpen || !imageData || !mode) return null;

  const actionText = mode === 'download' ? 'Download' : 'Save';

  return (
    <div className={modalOverlay}>
      <div className={modalContent}>
        <h2 className={modalTitle}>Shape Captured</h2>
        
        <img src={imageData} alt="Capture Preview" className={imagePreview} />
        
        <div className={buttonGroup}>
          <button className={cancelButton} onClick={onCancel}>
            Cancel
          </button>
          <button className={confirmButton} onClick={onConfirm}>
            {actionText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmCaptureModal;