import { Canvas } from '@react-three/fiber';
import { useState } from 'react';

import { canvasWrapper } from './styles/CanvasComponent.css.ts';
import CanvasOverlay from './CanvasOverlay';
import ShapeSpace from './ShapeSpace.tsx';
import SceneUpdater from '../utils/SceneUpdater';
import type { Shape } from '../utils/ShapeUtils';
import SubshapeIndicator from './SubshapeIndicator.tsx';
import ScreenshotHandler from '../utils/ScreenshotHandler';
import SaveModal from './SaveModal'; // Import the new modal

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
  
  // Screenshot State
  const [captureTrigger, setCaptureTrigger] = useState(false);
  const [screenshotData, setScreenshotData] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handler functions
  const toggleAxisHelper = () => {
    setAxisHelper(!axisHelper);
  }
  
  const handleScreenshotClick = () => {
    setCaptureTrigger(true);
  }

  const handleImageCaptured = (dataUrl: string) => {
    setScreenshotData(dataUrl);
    setIsModalOpen(true);
  }

  const handleConfirmDownload = (name: string) => {
    if (screenshotData) {
        const link = document.createElement('a');
        link.setAttribute('download', `${name}.png`);
        link.setAttribute('href', screenshotData);
        link.click();
    }
    setIsModalOpen(false);
  };

  return (
    <div className={canvasWrapper}>
      <CanvasOverlay 
        onReset={onReset} 
        onRotateObject={onRotateObject} 
        onResetShapeRotation={onResetShapeRotation}
        onToggleAxisHelper={toggleAxisHelper}
        onScreenshot={handleScreenshotClick}
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

        <ScreenshotHandler 
            captureTrigger={captureTrigger} 
            onCaptured={handleImageCaptured}
            onComplete={() => setCaptureTrigger(false)} 
        />
      </Canvas>

      <SaveModal 
        isOpen={isModalOpen}
        imageData={screenshotData}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDownload}
      />
    </div>
  )
}

export default CanvasComponent;