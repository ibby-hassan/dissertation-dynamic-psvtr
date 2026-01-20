
import { appscreen, menuSection, cnvsSection, cnvsCanvas, cnvsToolbar } from './App.css.ts';
import { useState } from 'react';
import { generateEmptyShape, type Shape, type SubshapeType } from './utils/shapeUtils';

import CanvasToolbar from './components/CanvasToolbar.tsx';
import CanvasComponent from './components/CanvasComponent.tsx';
import MenuSection from './components/menuSection.tsx';


const App = () => {
  const [shapeState, setShapeState] = useState<Shape>(generateEmptyShape());

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
      <aside className={menuSection}>
        <MenuSection />
      </aside>
      <div className={cnvsSection}>
        <section className={cnvsCanvas}>
          {/* <CanvasComponent /> */}
        </section>
        <section className={cnvsToolbar}>
          <CanvasToolbar />
        </section>
      </div>
    </div>
  )
}

export default App;