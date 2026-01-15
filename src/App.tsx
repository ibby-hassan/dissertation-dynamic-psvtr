import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';


const App = () => {
  return (
    <div className="relative w-full h-screen bg-gray-200">
      <Canvas
        frameloop={"demand"}
        camera={{ zoom: 135, position: [3, 3, 3] }}
        orthographic
        flat={true}
      >
        <axesHelper args={[2]} />
        <OrbitControls />
      </Canvas>
    </div>
  )
}

export default App;