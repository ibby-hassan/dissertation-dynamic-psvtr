import { Canvas } from '@react-three/fiber';

import { canvasWrapper } from './styles/CanvasOverlay.css.ts';
import CanvasOverlay from './CanvasOverlay';
import ShapeSpace from './ShapeSpace.tsx';
import SceneUpdater from '../utils/SceneUpdater';
import type { Shape } from '../utils/shapeUtils';
import SubshapeIndicator from './SubshapeIndicator.tsx';
import { OrbitControls } from '@react-three/drei';

interface CanvasComponentProps {
  onReset: () => void;
  shape: Shape;
  hoveredIndex: number | null;
}



const CanvasComponent = ({ onReset, shape, hoveredIndex }: CanvasComponentProps) => {
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
        <SubshapeIndicator hoveredIndex={hoveredIndex} />

        <axesHelper args={[1.5]} />
        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  )
}

export default CanvasComponent;