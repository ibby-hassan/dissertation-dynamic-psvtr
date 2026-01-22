import { Canvas } from '@react-three/fiber';

import { canvasWrapper } from './styles/CanvasOverlay.css.ts';
import CanvasOverlay from './CanvasOverlay';
import ShapeSpace from './ShapeSpace.tsx';
import SceneUpdater from '../utils/SceneUpdater';
import type { Shape } from '../utils/shapeUtils';

interface CanvasComponentProps {
  onReset: () => void;
  shape: Shape;
}



const CanvasComponent = ({ onReset, shape }: CanvasComponentProps) => {
  return (
    <div className={canvasWrapper}>
      <CanvasOverlay onReset={onReset} />
      <Canvas
        frameloop={"demand"}
        camera={{ zoom: 135, position: [3, 3, 3] }}
        orthographic
        flat={true}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[10, 20, 5]} intensity={1.5} />

        <ShapeSpace shape={shape} />
        <SceneUpdater shape={shape} /> {/* Forces updates when shape changes */}

        {/* <axesHelper args={[2]} /> */}
        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  )
}

export default CanvasComponent;