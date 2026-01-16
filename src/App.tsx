
import { appscreen, toolbarSection, cnvsSection, cnvsCanvas, cnvstoolbar } from './App.css.ts';
import CanvasComponent from './components/CanvasComponent.tsx';
import { useState } from 'react';
import { generateEmptyShape, type Shape } from './utils/shapeUtils';

const App = () => {
  const [shape, setShape] = useState<Shape>(generateEmptyShape());

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

// Shape Manipulation Functions