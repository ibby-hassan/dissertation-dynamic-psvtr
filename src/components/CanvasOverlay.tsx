import {
  overlayContainer,
  menuSegment,
  segmentTitle,
  actionGrid, actionButton, 
  deleteAction, toggledAction, resetAction, saveAction, loadAction,
  trackerLabel, rotationRow,
  rotBtn, rotLabel,
  rowX, rowY, rowZ,
  iconCW, iconCCW, iconAction
} from "./styles/CanvasOverlay.css.ts";
import { getMinRotation } from "../utils/shapeUtils";

import arrowIcon from "../assets/arrow.png";
import deleteIcon from "../assets/delete.png";
import saveIcon from "../assets/save.png";
import loadIcon from "../assets/load.png";
import axisHelperIcon from "../assets/axis.png";
import resetIcon from "../assets/reset.png"
import screenshotIcon from "../assets/screenshot.png"

interface CanvasOverlayProps {
  onReset: () => void;
  onRotateObject: (axis: 'x' | 'y' | 'z', direction: number) => void;
  onToggleAxisHelper: () => void;
  onResetShapeRotation: () => void;
  isAxisVisible: boolean;
  shapeRotation?: [number, number, number];
}

const CanvasOverlay = ({ 
  onReset,
  onRotateObject,
  onToggleAxisHelper,
  onResetShapeRotation,
  isAxisVisible,
  shapeRotation = [0, 0, 0]
}: CanvasOverlayProps) => {

  const handleSave = () => console.log("Save functionality not implemented yet.");
  const handleLoad = () => console.log("Load functionality not implemented yet.");

  const rotationTracker = getMinRotation(shapeRotation);

  return (
    <div className={overlayContainer}>

      {/* --- ACTIONS --- */}
      <div className={menuSegment}>
        <p className={segmentTitle}>Actions</p>
        <div className={actionGrid}>
          <button
            className={`${actionButton} ${deleteAction}`}
            onClick={onReset}
            title="Clear Canvas"
          >
            <img src={deleteIcon} className={iconAction} alt="Reset" />
          </button>

          <button className={actionButton} onClick={handleSave} title="Save Shape">
            <img src={saveIcon} className={iconAction} alt="Save" />
          </button>

          <button className={actionButton} onClick={handleLoad} title="Load Shape">
            <img src={loadIcon} className={iconAction} alt="Load" />
          </button>

          <button
            className={`${actionButton} ${isAxisVisible ? toggledAction : ''}`}
            onClick={() => onToggleAxisHelper()} title="Toggle Axis Helper"
          >
            <img src={axisHelperIcon} className={iconAction} alt="Axis Helper" />
          </button>

          <button className={actionButton} title="Screenshot">
            <img src={screenshotIcon} className={iconAction} alt="Screenshot" />
          </button>
        </div>
      </div>

      {/* --- SHAPE ROTATION --- */}
      <div className={menuSegment}>
        <p className={segmentTitle}>Shape Rotation</p>

        <button className={`${actionButton} ${resetAction}`} onClick={onResetShapeRotation} title="Reset">
          <img src={resetIcon} className={iconAction} alt="Reset" />
        </button>
        <p className={trackerLabel}>{rotationTracker}</p>

        {/* X Axis Row */}
        <div className={`${rotationRow} ${rowX}`}>
          <button className={rotBtn} onClick={() => onRotateObject('x', -1)} title="Rotate X CCW">
            <img src={arrowIcon} className={iconCCW} alt="<" />
          </button>
          <span className={rotLabel}>X</span>
          <button className={rotBtn} onClick={() => onRotateObject('x', 1)} title="Rotate X CW">
            <img src={arrowIcon} className={iconCW} alt=">" />
          </button>
        </div>

        {/* Y Axis Row */}
        <div className={`${rotationRow} ${rowY}`}>
          <button className={rotBtn} onClick={() => onRotateObject('y', -1)} title="Rotate Y CCW">
            <img src={arrowIcon} className={iconCCW} alt="<" />
          </button>
          <span className={rotLabel}>Y</span>
          <button className={rotBtn} onClick={() => onRotateObject('y', 1)} title="Rotate Y CW">
            <img src={arrowIcon} className={iconCW} alt=">" />
          </button>
        </div>

        {/* Z Axis Row */}
        <div className={`${rotationRow} ${rowZ}`}>
          <button className={rotBtn} onClick={() => onRotateObject('z', -1)} title="Rotate Z CCW">
            <img src={arrowIcon} className={iconCCW} alt="<" />
          </button>
          <span className={rotLabel}>Z</span>
          <button className={rotBtn} onClick={() => onRotateObject('z', 1)} title="Rotate Z CW">
            <img src={arrowIcon} className={iconCW} alt=">" />
          </button>
        </div>

      </div>

    </div>
  );
};

export default CanvasOverlay;