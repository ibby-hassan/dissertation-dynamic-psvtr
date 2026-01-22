import { appscreen, menuSection, cnvsSection, cnvsCanvas, cnvsToolbar, resizerVertical, resizerHorizontal } from './App.css.ts';
import { useState } from 'react';
import { generateEmptyShape, type Shape, type SubshapeType } from './utils/shapeUtils';
import { useResizableLayout } from './utils/useResizableLayout';

import CanvasToolbar from './components/CanvasToolbar.tsx';
import CanvasComponent from './components/CanvasComponent.tsx';
import MenuSection from './components/MenuSection.tsx';

const App = () => {
  const [shapeState, setShapeState] = useState<Shape>(generateEmptyShape());
  const [selectedSubshape, setSelectedSubshape] = useState<SubshapeType>('cube');

  // Resizable layout
  const { sidebarWidth, bottomHeight, startResizingSidebar, startResizingBottom } = useResizableLayout();

  // Shape Manipulations
  const updateSubshapeType = (index: number, newType: SubshapeType) => {
      setShapeState((prevShapeState) => {
        const newShapeState = [...prevShapeState];
        newShapeState[index - 1] = { ...newShapeState[index - 1], type: newType };
        return newShapeState;
      });
    };

  const updateSubshapeRotation = (index: number, newRotation: [number, number, number]) => {
    setShapeState((prevShapeState) => {
      const newShapeState = [...prevShapeState];
      newShapeState[index - 1] = { ...newShapeState[index - 1], rotation: newRotation };
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
          <CanvasComponent onReset={resetShape} />
        </section>
        <div className={resizerHorizontal} onMouseDown={startResizingBottom} />

        <section className={cnvsToolbar}>
          <CanvasToolbar />
        </section>

      </div>
    </div>
  )
}

export default App;