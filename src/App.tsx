import { appscreen, menuSection, cnvsSection, cnvsCanvas, cnvsToolbar, resizerVertical, resizerHorizontal } from './App.css.ts';
import { useState } from 'react';
import { generateEmptyShape, type Shape, type SubshapeType, calculateGlobalRotation } from './utils/ShapeUtils.ts';
import { useResizableLayout } from './utils/UseResizableLayout';

import CanvasToolbar from './components/CanvasToolbar.tsx';
import CanvasComponent from './components/CanvasComponent.tsx';
import MenuSection from './components/MenuSection.tsx';

const App = () => {
  const [shapeState, setShapeState] = useState<Shape>(generateEmptyShape());
  const [selectedSubshape, setSelectedSubshape] = useState<SubshapeType>('empty');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [shapeRotation, setShapeRotation] = useState<[number, number, number]>([0, 0, 0]);

  // Resizable layout
  const { sidebarWidth, bottomHeight, startResizingSidebar, startResizingBottom } = useResizableLayout();

  // --- Place a subshape ---
  const updateSubshapeType = (index: number, newType: SubshapeType) => {
    setShapeState((prevShapeState) => {
      const newShapeState = [...prevShapeState];

      const newRotation = newType === 'empty' ? [0, 0, 0] : newShapeState[index - 1].rotation;
      newShapeState[index - 1] = {
        ...newShapeState[index - 1],
        type: newType,
        rotation: newRotation as [number, number, number]
      };
      console.log(newShapeState);
      return newShapeState;
    });
  };

  // --- Subshape Rotation (Global Logic) ---
  const updateSubshapeRotation = (index: number, axis: 'x' | 'y' | 'z', direction: number) => {
    setShapeState((prevShapeState) => {
      const newShapeState = [...prevShapeState];
      const targetShape = newShapeState[index - 1];

      newShapeState[index - 1] = { ...targetShape, rotation: calculateGlobalRotation(targetShape.rotation, axis, direction) };
      return newShapeState;
    });
  };

  // --- Whole Object Rotation (Global Logic) ---
  const updateShapeRotation = (axis: 'x' | 'y' | 'z', direction: number) => {
    setShapeRotation(prev => {
        return calculateGlobalRotation(prev, axis, direction);
    });
  };

  // --- Reset Shape ---
  const resetShape = () => {
    setShapeState(generateEmptyShape());
    setShapeRotation([0, 0, 0]);
  };

  // --- Reset Shape Rotation ---
  const resetShapeRotation = () => {
    setShapeRotation([0, 0, 0]);
  };

  return (
    <div className={appscreen}>

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