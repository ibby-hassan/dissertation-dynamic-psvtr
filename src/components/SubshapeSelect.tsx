import {
  subshapeSelect, index, controlsContainer, rotateButton,
  btnX, btnY, btnZ,
  posXLeft, posXRight, posYLeft, posYRight, posZLeft, posZRight,
  rotCW, rotCCW,
  infoContainer, typeLabel, rotationLabel
} from "./styles/SubshapeSelect.css.ts";
import type { SubshapeType } from "../utils/shapeUtils.ts";
import { getMinRotation } from "../utils/shapeUtils.ts";

import arrowIcon from "../assets/arrow.png";

interface SubshapeSelectProps {
  indexValue: number;
  type: SubshapeType;
  rotation: [number, number, number];
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onRotate?: (axis: 'x' | 'y' | 'z', direction: number) => void;
}

const SubshapeSelect = ({ indexValue = -1, type, rotation, onClick, onMouseEnter, onMouseLeave, onRotate }: SubshapeSelectProps) => {

  const handleRotate = (e: React.MouseEvent, axis: 'x' | 'y' | 'z', dir: number) => {
    e.stopPropagation();
    if (onRotate) onRotate(axis, dir);
  };

  const rotationTracker = getMinRotation(rotation);

  return (
    <div className={subshapeSelect} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>

      <div className={infoContainer}>
        <p className={index}>{indexValue}</p>
        <p className={typeLabel}>{type}</p>
        <p className={rotationLabel}>{rotationTracker}</p>
      </div>

      <div className={controlsContainer}>
        {/* --- X AXIS (Red) --- */}
        <div className={`${rotateButton} ${btnX} ${posXLeft}`} onClick={(e) => handleRotate(e, 'x', -1)} title="X Axis CCW">
          <img src={arrowIcon} className={rotCCW} alt="<" width="70%" />
        </div>
        <div className={`${rotateButton} ${btnX} ${posXRight}`} onClick={(e) => handleRotate(e, 'x', 1)} title="X Axis CW">
          <img src={arrowIcon} className={rotCW} alt=">" width="70%" />
        </div>

        {/* --- Y AXIS (Green) --- */}
        <div className={`${rotateButton} ${btnY} ${posYLeft}`} onClick={(e) => handleRotate(e, 'y', -1)} title="Y Axis CCW">
          <img src={arrowIcon} className={rotCCW} alt="<" width="70%" />
        </div>
        <div className={`${rotateButton} ${btnY} ${posYRight}`} onClick={(e) => handleRotate(e, 'y', 1)} title="Y Axis CW">
          <img src={arrowIcon} className={rotCW} alt=">" width="70%" />
        </div>

        {/* --- Z AXIS (Blue) --- */}
        <div className={`${rotateButton} ${btnZ} ${posZLeft}`} onClick={(e) => handleRotate(e, 'z', -1)} title="Z Axis CCW">
          <img src={arrowIcon} className={rotCCW} alt="<" width="70%" />
        </div>
        <div className={`${rotateButton} ${btnZ} ${posZRight}`} onClick={(e) => handleRotate(e, 'z', 1)} title="Z Axis CW">
          <img src={arrowIcon} className={rotCW} alt=">" width="70%" />
        </div>
      </div>

    </div>
  )
};
export default SubshapeSelect;