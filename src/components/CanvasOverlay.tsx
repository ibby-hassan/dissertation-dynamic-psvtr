import {
  overlayContainer,
  menuSegment,
  segmentTitle,
  actionGrid, actionButton,
  deleteAction, toggledAction, resetAction, saveAction, loadAction, downloadAction,
  trackerLabel, rotationRow,
  rotBtn, rotLabel,
  rowX, rowY, rowZ,
  iconCW, iconCCW, iconAction
} from "./styles/CanvasOverlay.css";
import { getMinRotation } from "../utils/shapeUtils";

import arrowIcon from "../assets/arrow.png";
import deleteIcon from "../assets/delete.png";
import saveIcon from "../assets/save.png";
import loadIcon from "../assets/menu.png";
import axisHelperIcon from "../assets/axis.png";
import resetIcon from "../assets/reset.png"
import screenshotIcon from "../assets/screenshot.png"
import orbitIcon from "../assets/orbit.png"

interface CanvasOverlayProps {
  // Action Props
  onDownloadClick: () => void;
  onSaveClick: () => void;
  onLoadClick: () => void;

  // View Props
  onToggleAxisHelper: () => void;
  isAxisVisible: boolean;
  onToggleOrbit: () => void;
  isOrbitEnabled: boolean;
  onResetOrbit: () => void;

  // Shape Actions
  onReset: () => void;
  onRotateObject: (axis: 'x' | 'y' | 'z', direction: number) => void;
  onResetShapeRotation: () => void;
  shapeRotation?: [number, number, number];
}

const CanvasOverlay = ({
  onReset,
  onRotateObject, onResetShapeRotation,
  onToggleAxisHelper, isAxisVisible,
  onToggleOrbit, isOrbitEnabled, onResetOrbit,
  onDownloadClick, onSaveClick, onLoadClick,
  shapeRotation = [0, 0, 0],
}: CanvasOverlayProps) => {

  const rotationTracker = getMinRotation(shapeRotation);

  return (
    <div className={overlayContainer}>

      {/* --- ACTIONS --- */}
      <div className={menuSegment}>
        <p className={segmentTitle}>Actions</p>
        <div className={actionGrid}>
          <button className={`${actionButton} ${saveAction}`} onClick={onSaveClick} title="Save Shape">
            <img src={saveIcon} className={iconAction} alt="Save" />
          </button>

          <button className={`${actionButton} ${loadAction}`} onClick={onLoadClick} title="Load Shape">
            <img src={loadIcon} className={iconAction} alt="Load" />
          </button>

          <button className={`${actionButton} ${downloadAction}`} onClick={onDownloadClick} title="Screenshot">
            <img src={screenshotIcon} className={iconAction} alt="Screenshot" />
          </button>
        </div>
      </div>

      {/* --- VIEW --- */}
      <div className={menuSegment}>
        <p className={segmentTitle}>View</p>
        <div className={actionGrid}>
          <button
            className={`${actionButton} ${isAxisVisible ? toggledAction : ''}`}
            onClick={onToggleAxisHelper} title="Toggle Axis Helper"
          >
            <img src={axisHelperIcon} className={iconAction} alt="Axis Helper" />
          </button>

          <button
            className={`${actionButton} ${isOrbitEnabled ? toggledAction : ''}`}
            onClick={onToggleOrbit} title="Toggle Orbit Controls"
          >
            <img src={orbitIcon} className={iconAction} alt="Orbit" />
          </button>
          <button className={actionButton} onClick={onResetOrbit} title="Reset Camera View">
            <img src={resetIcon} className={iconAction} alt="Reset View" />
          </button>
        </div>
      </div>

      {/* --- SHAPE ROTATION --- */}
      <div className={menuSegment}>
        <p className={segmentTitle}>Shape Rotation</p>

        <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', marginBottom: '0.5rem' }}>
          <button
            className={`${actionButton} ${deleteAction}`}
            onClick={onReset}
            title="Clear Canvas"
          >
            <img src={deleteIcon} className={iconAction} alt="Clear" />
          </button>

          <button className={`${actionButton} ${resetAction}`} onClick={onResetShapeRotation} title="Reset Rotation">
            <img src={resetIcon} className={iconAction} alt="Reset Rot" />
          </button>
        </div>

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