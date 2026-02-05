import { Canvas } from '@react-three/fiber';
import { useState } from 'react';
import { OrbitControls } from '@react-three/drei';

import { canvasWrapper } from './styles/CanvasComponent.css.ts';
import CanvasOverlay from './CanvasOverlay';
import ShapeSpace from './ShapeSpace.tsx';
import SceneUpdater from '../utils/SceneUpdater';
import CaptureHandler from '../utils/CaptureHandler.tsx';
import SubshapeIndicator from './SubshapeIndicator.tsx';
import type { Shape } from '../utils/ShapeUtils.ts';

interface CanvasComponentProps {
  onReset: () => void;
  shape: Shape;
  hoveredIndex: number | null;
  shapeRotation: [number, number, number];
  onRotateObject: (axis: 'x' | 'y' | 'z', direction: number) => void;
  onResetShapeRotation: () => void;
  captureTrigger: boolean;
  onCaptureComplete: (data: string) => void;
  onInitiateCapture: (mode: 'download' | 'save') => void;
  onLoadClick: () => void;
}

const CanvasComponent = ({
  onReset,
  shape,
  hoveredIndex,
  shapeRotation,
  onRotateObject,
  onResetShapeRotation,
  captureTrigger,
  onCaptureComplete, onInitiateCapture, onLoadClick
}: CanvasComponentProps) => {

  const [axisHelper, setAxisHelper] = useState(true);

  return (
    <div className={canvasWrapper}>
      <CanvasOverlay
        onReset={onReset}
        onRotateObject={onRotateObject}
        onResetShapeRotation={onResetShapeRotation}
        onToggleAxisHelper={() => setAxisHelper(!axisHelper)}
        isAxisVisible={axisHelper}
        shapeRotation={shapeRotation}
        onDownloadClick={() => onInitiateCapture('download')}
        onSaveClick={() => onInitiateCapture('save')}
        onLoadClick={onLoadClick}
      />

      <Canvas
        frameloop={"demand"}
        camera={{ zoom: 135, position: [3, 3, 3] }}
        orthographic
        flat={true}
        gl={{ preserveDrawingBuffer: true }} // Required for screenshot
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 20, 5]} intensity={1} />

        <group rotation={shapeRotation} position={[1, 1, 1]}>
          <ShapeSpace shape={shape} />
          <SubshapeIndicator hoveredIndex={hoveredIndex} />
        </group>

        <SceneUpdater dependencies={[shape, axisHelper]} />

        {axisHelper ? <axesHelper name="axes-helper-object" args={[2.5]} /> : null}

        <CaptureHandler
          captureTrigger={captureTrigger}
          onCaptured={onCaptureComplete}
        />

        {/* <OrbitControls /> */}

      </Canvas>
    </div>
  )
}

export default CanvasComponent;