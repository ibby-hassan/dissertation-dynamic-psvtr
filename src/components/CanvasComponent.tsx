import { Canvas } from '@react-three/fiber';

import { canvasWrapper } from './styles/CanvasComponent.css.ts';
import CanvasOverlay from './CanvasOverlay';
import ShapeSpace from './ShapeSpace.tsx';
import SceneUpdater from '../utils/SceneUpdater';
import type { Shape } from '../utils/shapeUtils';
import SubshapeIndicator from './SubshapeIndicator.tsx';
import { useState } from 'react';

interface CanvasComponentProps {
  onReset: () => void;
  shape: Shape;
  hoveredIndex: number | null;
  shapeRotation: [number, number, number];
  onRotateObject: (axis: 'x' | 'y' | 'z', direction: number) => void;
  onResetShapeRotation: () => void;
}

const CanvasComponent = ({ onReset, shape, hoveredIndex, shapeRotation, onRotateObject, onResetShapeRotation }: CanvasComponentProps) => {
  const [axisHelper, setAxisHelper] = useState(true);

  const toggleAxisHelper = () => {
    setAxisHelper(!axisHelper);
  }

  return (
    <div className={canvasWrapper}>
      <CanvasOverlay 
        onReset={onReset} 
        onRotateObject={onRotateObject} 
        onResetShapeRotation={onResetShapeRotation}
        onToggleAxisHelper={toggleAxisHelper}
        isAxisVisible={axisHelper}
      />
      <Canvas
        frameloop={"demand"}
        camera={{ zoom: 135, position: [3, 3, 3] }}
        orthographic
        flat={true}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[10, 20, 5]} intensity={1.5} />

        <group rotation={shapeRotation} position={[1, 1, 1]}>
            <ShapeSpace shape={shape} />
            <SubshapeIndicator hoveredIndex={hoveredIndex} />
        </group>

        <SceneUpdater dependencies={[shape, axisHelper]} />
        {axisHelper ? <axesHelper args={[2.5]} /> : null}
      </Canvas>
    </div>
  )
}

export default CanvasComponent;