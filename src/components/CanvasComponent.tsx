import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const CanvasComponent = () => {
    return (
        <Canvas
            frameloop={"demand"}
            camera={{ zoom: 135, position: [3, 3, 3] }}
            orthographic
            flat={true}
        >
            <axesHelper args={[2]} />
            {/* <OrbitControls /> */}
        </Canvas>
    )
}

export default CanvasComponent;
