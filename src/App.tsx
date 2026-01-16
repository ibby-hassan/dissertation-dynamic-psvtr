
import { appscreen, toolbarSection, cnvsSection, cnvsCanvas, cnvstoolbar } from './App.css.ts';
import CanvasComponent from './components/CanvasComponent.tsx';
import { useState } from 'react';
import { generateEmptyShape, type Shape, type SubshapeType } from './utils/shapeUtils';

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
      <aside className={toolbarSection}>

      </aside>
      <div className={cnvsSection}>
        <section className={cnvsCanvas}>
          {/* <CanvasComponent /> */}
        </section>
        <section className={cnvstoolbar}>

        </section>
      </div>
    </div>
  )
}

export default App;