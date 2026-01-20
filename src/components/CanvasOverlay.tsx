import { overlayContainer, menuItem } from "./styles/CanvasOverlay.css.ts";

interface CanvasOverlayProps {
    onReset: () => void;
}

const CanvasOverlay = ({ onReset }: CanvasOverlayProps) => {
    return (
        <div className={overlayContainer}>
            <button className={menuItem} onClick={onReset}>Clear Canvas</button>
        </div>
    );
};

export default CanvasOverlay;
