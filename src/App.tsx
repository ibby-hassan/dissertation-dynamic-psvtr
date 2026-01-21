import { 
  appscreen, 
  menuSection, 
  cnvsSection, 
  cnvsCanvas, 
  cnvsToolbar, 
  resizerVertical, 
  resizerHorizontal 
} from './App.css.ts';
import { useState } from 'react';
import { generateEmptyShape, type Shape, type SubshapeType } from './utils/shapeUtils';
import { useResizableLayout } from './utils/useResizableLayout'; // Assuming you moved the hook here

import CanvasToolbar from './components/CanvasToolbar.tsx';
import CanvasComponent from './components/CanvasComponent.tsx';
import MenuSection from './components/MenuSection.tsx';

const App = () => {
  const [shapeState, setShapeState] = useState<Shape>(generateEmptyShape());
  const [selectedSubshape, setSelectedSubshape] = useState<SubshapeType>('cube');

  const { 
    sidebarWidth, 
    bottomHeight, 
    startResizingSidebar, 
    startResizingBottom 
  } = useResizableLayout();

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