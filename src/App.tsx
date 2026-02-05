import { appscreen, menuSection, cnvsSection, cnvsCanvas, cnvsToolbar, resizerVertical, resizerHorizontal } from './App.css.ts';
import { useState } from 'react';
import { generateEmptyShape, type Shape, type SubshapeType, calculateGlobalRotation } from './utils/ShapeUtils.ts';
import { useResizableLayout } from './utils/UseResizableLayout';
import { downloadToPC, saveToLocalStorage } from './utils/IOUtils.ts';

import CanvasToolbar from './components/CanvasToolbar.tsx';
import CanvasComponent from './components/CanvasComponent.tsx';
import MenuSection from './components/MenuSection.tsx';
import ConfirmCaptureModal from './components/ConfirmCaptureModal.tsx';
import LoadMenu from './components/LoadMenu.tsx';

const App = () => {

  /* STATES */
  const [shapeState, setShapeState] = useState<Shape>(generateEmptyShape());
  const [selectedSubshape, setSelectedSubshape] = useState<SubshapeType>('empty');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [shapeRotation, setShapeRotation] = useState<[number, number, number]>([0, 0, 0]);

  // --- Capture State ---
  const [captureTrigger, setCaptureTrigger] = useState(false);
  const [captureMode, setCaptureMode] = useState<'download' | 'save' | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Load Menu State ---
  const [isLoadMenuOpen, setIsLoadMenuOpen] = useState(false);

  // --- Resizable Layout ---
  const { sidebarWidth, bottomHeight, startResizingSidebar, startResizingBottom } = useResizableLayout();

  /* HANDLERS */
  // --- Subshape Logic ---
  const updateSubshapeType = (index: number, newType: SubshapeType) => {
    setShapeState((prevShapeState) => {
      const newShapeState = [...prevShapeState];
      const newRotation = newType === 'empty' ? [0, 0, 0] : newShapeState[index - 1].rotation;
      newShapeState[index - 1] = {
        ...newShapeState[index - 1],
        type: newType,
        rotation: newRotation as [number, number, number]
      };
      return newShapeState;
    });
  };

  const updateSubshapeRotation = (index: number, axis: 'x' | 'y' | 'z', direction: number) => {
    setShapeState((prevShapeState) => {
      const newShapeState = [...prevShapeState];
      const targetShape = newShapeState[index - 1];
      newShapeState[index - 1] = { ...targetShape, rotation: calculateGlobalRotation(targetShape.rotation, axis, direction) };
      return newShapeState;
    });
  };

  const updateShapeRotation = (axis: 'x' | 'y' | 'z', direction: number) => {
    setShapeRotation(prev => calculateGlobalRotation(prev, axis, direction));
  };

  const resetShape = () => {
    setShapeState(generateEmptyShape());
    setShapeRotation([0, 0, 0]);
  };

  const resetShapeRotation = () => setShapeRotation([0, 0, 0]);

  // --- Capture Logic Steps ---
  const initiateCapture = (mode: 'download' | 'save') => {
    setCaptureMode(mode);
    setCaptureTrigger(true);
  };

  const handleCaptureComplete = (dataUrl: string) => {
    setCaptureTrigger(false); // Reset trigger
    setCapturedImage(dataUrl);
    setIsModalOpen(true);
  };

  const handleCancelCapture = () => {
    setIsModalOpen(false);
    setCapturedImage(null);
    setCaptureMode(null);
  };

  const handleConfirmCapture = (name: string) => {
    if (!capturedImage) return;

    if (captureMode === 'download') {
      downloadToPC(capturedImage, name);
    } 
    else if (captureMode === 'save') {
      const result = saveToLocalStorage(shapeState, capturedImage, name);
      alert(result.message);
    }

    setIsModalOpen(false);
    setCapturedImage(null);
    setCaptureMode(null);
  };

  // --- Load Logic ---
  const handleLoadClick = () => {
    setIsLoadMenuOpen(true);
  };

  const handleConfirmLoad = (loadedShape: Shape) => {
    setShapeState(loadedShape);
    setShapeRotation([0, 0, 0]); 
    setIsLoadMenuOpen(false);
  };

  /* COMPONENT */
  return (
    <div className={appscreen}>
      
      {/* MODALS */}
      <ConfirmCaptureModal 
        isOpen={isModalOpen}
        imageData={capturedImage}
        mode={captureMode}
        onConfirm={handleConfirmCapture}
        onCancel={handleCancelCapture}
      />

      <LoadMenu 
        isOpen={isLoadMenuOpen}
        onClose={() => setIsLoadMenuOpen(false)}
        onLoadShape={handleConfirmLoad}
      />

      {/* MAIN APP */}
      <aside className={menuSection} style={{ width: `${sidebarWidth}px` }}>
        <MenuSection
          selectedShape={selectedSubshape}
          onSelectShape={setSelectedSubshape}
        />
      </aside>
      <div className={resizerVertical} onMouseDown={startResizingSidebar} />

      <div className={cnvsSection} style={{ gridTemplateRows: `1fr auto ${bottomHeight}px` }}>

        <section className={cnvsCanvas}>
          <CanvasComponent
            onReset={resetShape}
            shape={shapeState}
            hoveredIndex={hoveredIndex}
            shapeRotation={shapeRotation}
            onRotateObject={updateShapeRotation}
            onResetShapeRotation={resetShapeRotation}
            captureTrigger={captureTrigger}
            onCaptureComplete={handleCaptureComplete}
            onInitiateCapture={initiateCapture}
            onLoadClick={handleLoadClick}
          />
        </section>
        <div className={resizerHorizontal} onMouseDown={startResizingBottom} />

        <section className={cnvsToolbar}>
          <CanvasToolbar
            shape={shapeState}
            onSubshapeClick={(index) => updateSubshapeType(index, selectedSubshape)}
            onRotate={(index, axis, dir) => updateSubshapeRotation(index, axis, dir)}
            onHover={setHoveredIndex}
          />
        </section>

      </div>
    </div>
  )
}

export default App;