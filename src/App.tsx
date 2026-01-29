import { appscreen, menuSection, cnvsSection, cnvsCanvas, cnvsToolbar, resizerVertical, resizerHorizontal } from './App.css.ts';
import { useState } from 'react';
import { generateEmptyShape, type Shape, type SubshapeType } from './utils/shapeUtils';
import { useResizableLayout } from './utils/useResizableLayout';

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
      newShapeState[index - 1] = { ...newShapeState[index - 1], type: newType };
      console.log(newShapeState);
      return newShapeState;
    });
  };

  // --- Subshape Rotation (XYZ) ---
  const updateSubshapeRotation = (index: number, axis: 'x' | 'y' | 'z', direction: number) => {
    setShapeState((prevShapeState) => {
      const newShapeState = [...prevShapeState];
      const targetShape = newShapeState[index - 1];

      const HALF_PI = Math.PI / 2;
      let newRotation = [...targetShape.rotation] as [number, number, number];
      
      const axisIdx = axis === 'x' ? 0 : axis === 'y' ? 1 : 2;
      newRotation[axisIdx] += (direction * HALF_PI);

      newShapeState[index - 1] = { ...targetShape, rotation: newRotation };
      return newShapeState;
    });
  };

  // --- Whole Object Rotation ---
  const updateShapeRotation = (axis: 'x' | 'y', direction: number) => {
    setShapeRotation(prev => {
        const [x, y, z] = prev;
        const step = (Math.PI / 2) * direction;
        
        if (axis === 'x') return [x + step, y, z];
        if (axis === 'y') return [x, y + step, z];
        return [x, y, z];
    });
  };

  // --- Reset Shape ---
  const resetShape = () => {
    setShapeState(generateEmptyShape());
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
          />
        </section>
        <div className={resizerHorizontal} onMouseDown={startResizingBottom} />

        <section className={cnvsToolbar}>
          <CanvasToolbar
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