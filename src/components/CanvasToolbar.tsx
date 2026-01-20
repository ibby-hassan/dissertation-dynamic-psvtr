import { canvasToolbar } from "./styles/CanvasToolbar.css.ts";
import SubshapeSelect from "./SubshapeSelect";

const CanvasToolbar = () => {
    return (
        <div className={canvasToolbar}>
            {Array.from({ length: 8 }, (_, index) => (
                <SubshapeSelect key={index} indexValue={index + 1} />
            ))}
        </div>
    )
};
export default CanvasToolbar;