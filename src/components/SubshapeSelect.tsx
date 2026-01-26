import { subshapeSelect, index, icon, controlsContainer, rotateButton, posTop, posBottom, posLeft, posRight } from "./styles/SubshapeSelect.css.ts";

import arrowIcon from "../assets/arrow.png";

interface SubshapeSelectProps {
  indexValue: number;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onRotate?: (direction: 'up' | 'down' | 'left' | 'right') => void;
}

const SubshapeSelect = ({ indexValue = -1, onClick, onMouseEnter, onMouseLeave, onRotate }: SubshapeSelectProps) => {

  const handleRotate = (e: React.MouseEvent, dir: 'up' | 'down' | 'left' | 'right') => {
    e.stopPropagation(); // Stop the click from selecting the shape type
    console.log(`Rotate subshape ${indexValue}: ${dir}`);
    if (onRotate) onRotate(dir);
  };

  return (
    <div className={subshapeSelect} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      
      <p className={index}>{indexValue}</p>
      
      <section className={icon}>
        {/* 3D Preview or Icon goes here */}
      </section>

      <div className={controlsContainer}>
        <div className={`${rotateButton} ${posTop}`} onClick={(e) => handleRotate(e, 'up')}>
          <img src={arrowIcon} alt="Rotate Up" width="100%" />
        </div>

        <div className={`${rotateButton} ${posBottom}`} onClick={(e) => handleRotate(e, 'down')}>
          <img src={arrowIcon} alt="Rotate Down" width="100%" />
        </div>

        <div className={`${rotateButton} ${posLeft}`} onClick={(e) => handleRotate(e, 'left')}>
          <img src={arrowIcon} alt="Rotate Left" width="100%" />
        </div>

        <div className={`${rotateButton} ${posRight}`} onClick={(e) => handleRotate(e, 'right')}>
          <img src={arrowIcon} alt="Rotate Right" width="100%" />
        </div>
      </div>

    </div>
  )
};
export default SubshapeSelect;