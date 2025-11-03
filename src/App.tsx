import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

const App = () => {
  return (
    <div className="h-dvh">
      <Canvas frameloop={"demand"} camera={ {position: [2,2,2]} }>
        <axesHelper args={[2]}/>
        <OrbitControls/>
      </Canvas>
    </div>
  )
}
export default App;
