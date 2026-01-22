import { canvasToolbar } from "./styles/CanvasToolbar.css.ts";
import SubshapeSelect from "./SubshapeSelect";

interface CanvasToolbarProps {
    onSubshapeClick: (index: number) => void;
    onHover: (index: number | null) => void;
};
    

const CanvasToolbar = ({ onSubshapeClick, onHover }: CanvasToolbarProps) => {
    return (
        <div className={canvasToolbar}>
            {Array.from({ length: 8 }, (_, index) => (
                <SubshapeSelect 
                    key={index} 
                    indexValue={index + 1} 
                    onClick={() => onSubshapeClick(index + 1)} 
                    onMouseEnter={() => onHover(index + 1)}
                    onMouseLeave={() => onHover(null)}
                />
            ))}
        </div>
    )
};
export default CanvasToolbar;