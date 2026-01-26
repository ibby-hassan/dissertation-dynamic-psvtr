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

  // Resizable layout
  const { sidebarWidth, bottomHeight, startResizingSidebar, startResizingBottom } = useResizableLayout();

  // Shape Manipulations
  const updateSubshapeType = (index: number, newType: SubshapeType) => {
    setShapeState((prevShapeState) => {
      const newShapeState = [...prevShapeState];
      newShapeState[index - 1] = { ...newShapeState[index - 1], type: newType };
      console.log(newShapeState);
      return newShapeState;
    });
  };

  const updateSubshapeRotation = (index: number, direction: 'up' | 'down' | 'left' | 'right') => {
    setShapeState((prevShapeState) => {
      const newShapeState = [...prevShapeState];
      const targetShape = newShapeState[index - 1];
      
      const HALF_PI = Math.PI / 2;
      let newRotation = [...targetShape.rotation] as [number, number, number];

      switch (direction) {
        case 'left':
          newRotation[1] -= HALF_PI;
          break;
        case 'right':
          newRotation[1] += HALF_PI;
          break;
        case 'up':
          newRotation[2] += HALF_PI;
          break;
        case 'down':
          newRotation[2] -= HALF_PI;
          break;
      }

      newShapeState[index - 1] = { ...targetShape, rotation: newRotation };
      return newShapeState;
    });
  };

  const resetShape = () => {
    setShapeState(generateEmptyShape());
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
            onRotate={(index, dir) => updateSubshapeRotation(index, dir)}
            onHover={setHoveredIndex}
          />
        </section>

      </div>
    </div>
  )
}

export default App;