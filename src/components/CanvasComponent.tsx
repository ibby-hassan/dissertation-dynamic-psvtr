import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import { canvasWrapper } from './styles/CanvasOverlay.css.ts';
import CanvasOverlay from './CanvasOverlay';

interface CanvasComponentProps {
    onReset: () => void;
}

const CanvasComponent = ({ onReset }: CanvasComponentProps) => {
    return (
        <div className={canvasWrapper}>
            <CanvasOverlay onReset={onReset} />
            <Canvas
                frameloop={"demand"}
                camera={{ zoom: 135, position: [3, 3, 3] }}
                orthographic
                flat={true}
            >
                <axesHelper args={[2]} />
                {/* <OrbitControls /> */}
            </Canvas>
        </div>
    )
}

export default CanvasComponent;
