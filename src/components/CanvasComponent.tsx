import { Canvas } from '@react-three/fiber';
import { useRef, useState } from 'react';

import { canvasWrapper } from './styles/CanvasComponent.css';
import CanvasOverlay from './CanvasOverlay';
import ShapeSpace from './ShapeSpace';
import SceneUpdater from '../utils/SceneUpdater';
import CaptureHandler from '../utils/CaptureHandler';
import SubshapeIndicator from './SubshapeIndicator';
import type { Shape } from '../utils/shapeUtils';
import { OrbitControls } from '@react-three/drei';

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
  const [orbitEnabled, setOrbitEnabled] = useState(false);

  const orbitRef = useRef<any>(null);
  const handleResetOrbit = () => {
    if (orbitRef.current) {
      orbitRef.current.reset();
    }
  };

  return (
    <div className={canvasWrapper}>
      <CanvasOverlay
        // Shape Rotation
        shapeRotation={shapeRotation}
        onReset={onReset}
        onRotateObject={onRotateObject}
        onResetShapeRotation={onResetShapeRotation}
        // View Props
        onToggleAxisHelper={() => setAxisHelper(!axisHelper)}
        isAxisVisible={axisHelper}
        onToggleOrbit={() => setOrbitEnabled(!orbitEnabled)}
        isOrbitEnabled={orbitEnabled}
        onResetOrbit={handleResetOrbit}
        // Actions
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

        {axisHelper ? <axesHelper name="axes-helper-object" args={[2.5]} /> : null}
        <OrbitControls 
            ref={orbitRef} 
            enabled={orbitEnabled} 
            enablePan={true} 
            enableZoom={false} 
            makeDefault={orbitEnabled} 
        />

        <SceneUpdater dependencies={[shape, axisHelper]} />
        <CaptureHandler
          captureTrigger={captureTrigger}
          onCaptured={onCaptureComplete}
        />

      </Canvas>
    </div>
  )
}

export default CanvasComponent;