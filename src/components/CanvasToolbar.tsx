import { canvasToolbar } from "./styles/CanvasToolbar.css.ts";
import SubshapeSelect from "./SubshapeSelect";

interface CanvasToolbarProps {
    onSubshapeClick: (index: number) => void;
};
    

const CanvasToolbar = ({ onSubshapeClick }: CanvasToolbarProps) => {
    return (
        <div className={canvasToolbar}>
            {Array.from({ length: 8 }, (_, index) => (
                <SubshapeSelect 
                    key={index} 
                    indexValue={index + 1} 
                    onClick={() => onSubshapeClick(index + 1)} 
                />
            ))}
        </div>
    )
};
export default CanvasToolbar;