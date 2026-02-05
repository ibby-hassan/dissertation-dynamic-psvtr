import { canvasToolbar } from "./styles/CanvasToolbar.css.ts";
import SubshapeSelect from "./SubshapeSelect";
import type { Shape } from "../utils/ShapeUtils.ts";

interface CanvasToolbarProps {
  shape: Shape;
  onSubshapeClick: (index: number) => void;
  onHover: (index: number | null) => void;
  // Updated signature:
  onRotate: (index: number, axis: 'x' | 'y' | 'z', direction: number) => void;
};

const CanvasToolbar = ({ shape, onSubshapeClick, onHover, onRotate }: CanvasToolbarProps) => {
  return (
    <div className={canvasToolbar}>
      {shape.map((subshape) => (
        <SubshapeSelect
          key={subshape.index - 1}
          indexValue={subshape.index}
          // Pass the dynamic data
          type={subshape.type}
          rotation={subshape.rotation}

          onClick={() => onSubshapeClick(subshape.index)}
          onMouseEnter={() => onHover(subshape.index)}
          onMouseLeave={() => onHover(null)}
          onRotate={(axis, dir) => onRotate(subshape.index, axis, dir)}
        />
      ))}
    </div>
  )
};
export default CanvasToolbar;