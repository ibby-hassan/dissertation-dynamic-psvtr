import { Canvas } from '@react-three/fiber';

import { canvasWrapper } from './styles/CanvasComponent.css.ts';
import CanvasOverlay from './CanvasOverlay';
import ShapeSpace from './ShapeSpace.tsx';
import SceneUpdater from '../utils/SceneUpdater';
import type { Shape } from '../utils/ShapeUtils';
import SubshapeIndicator from './SubshapeIndicator.tsx';
import { useState } from 'react';
import ScreenshotHandler from '../utils/ScreenshotHandler';

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
  const [captureTrigger, setCaptureTrigger] = useState(false);

  // Handler functions
  const toggleAxisHelper = () => {
    setAxisHelper(!axisHelper);
  }
  const handleScreenshot = () => {
    setCaptureTrigger(true);
  }

  return (
    <div className={canvasWrapper}>
      <CanvasOverlay 
        onReset={onReset} 
        onRotateObject={onRotateObject} 
        onResetShapeRotation={onResetShapeRotation}
        onToggleAxisHelper={toggleAxisHelper}
        onScreenshot={handleScreenshot}
        isAxisVisible={axisHelper}
        shapeRotation={shapeRotation}
      />
      <Canvas
        frameloop={"demand"}
        camera={{ zoom: 135, position: [3, 3, 3] }}
        orthographic
        flat={true}
        gl={{ preserveDrawingBuffer: true }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 20, 5]} intensity={1} />

        <group rotation={shapeRotation} position={[1, 1, 1]}>
            <ShapeSpace shape={shape} />
            <SubshapeIndicator hoveredIndex={hoveredIndex} />
        </group>

        <SceneUpdater dependencies={[shape, axisHelper]} />
        {axisHelper ? <axesHelper args={[2.5]} name="axes-helper" /> : null}

        <ScreenshotHandler captureTrigger={captureTrigger} onComplete={() => setCaptureTrigger(false)} />
      </Canvas>
    </div>
  )
}

export default CanvasComponent;