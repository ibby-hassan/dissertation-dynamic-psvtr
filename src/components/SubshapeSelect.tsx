import { 
  subshapeSelect, index, icon, controlsContainer, rotateButton, 
  btnX, btnY, btnZ,
  posXLeft, posXRight, posYLeft, posYRight, posZLeft, posZRight,
  rotCW, rotCCW
} from "./styles/SubshapeSelect.css.ts";

import arrowIcon from "../assets/arrow.png";

interface SubshapeSelectProps {
  indexValue: number;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onRotate?: (axis: 'x' | 'y' | 'z', direction: number) => void;
}

const SubshapeSelect = ({ indexValue = -1, onClick, onMouseEnter, onMouseLeave, onRotate }: SubshapeSelectProps) => {

  const handleRotate = (e: React.MouseEvent, axis: 'x' | 'y' | 'z', dir: number) => {
    e.stopPropagation(); 
    if (onRotate) onRotate(axis, dir);
  };

  return (
    <div className={subshapeSelect} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      
      <p className={index}>{indexValue}</p>
      
      <section className={icon}>
        {/* 3D Preview or Icon goes here */}
      </section>

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