import { canvasToolbar } from "./styles/CanvasToolbar.css.ts";
import SubshapeSelect from "./SubshapeSelect";

interface CanvasToolbarProps {
    onSubshapeClick: (index: number) => void;
    onHover: (index: number | null) => void;
    // Updated signature:
    onRotate: (index: number, axis: 'x' | 'y' | 'z', direction: number) => void;
};

const CanvasToolbar = ({ onSubshapeClick, onHover, onRotate }: CanvasToolbarProps) => {
    return (
        <div className={canvasToolbar}>
            {Array.from({ length: 8 }, (_, index) => (
                <SubshapeSelect 
                    key={index} 
                    indexValue={index + 1} 
                    onClick={() => onSubshapeClick(index + 1)} 
                    onMouseEnter={() => onHover(index + 1)}
                    onMouseLeave={() => onHover(null)}
                    // Pass axis and direction up
                    onRotate={(axis, dir) => onRotate(index + 1, axis, dir)}
                />
            ))}
        </div>
    )
};
export default CanvasToolbar;