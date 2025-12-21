import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useState } from 'react';

export interface Voxel {
  type: 'cube' | 'ramp' | 'half';
  rotation?: [number, number, number];
};

// VoxelSet tracks which voxels are active to make up the 2x2x2 composite shape.
export type VoxelSpace = {
  0: null|Voxel;
  1: null|Voxel;
  2: null|Voxel;
  3: null|Voxel;
  4: null|Voxel;
  5: null|Voxel;
  6: null|Voxel;
  7: null|Voxel;
};

const App = () => {

// Start with an empty voxelSpace. Use setVoxelSpace when making changes to the scene.
const [voxelSpace, setVoxelSpace] = useState<VoxelSpace>({
    0: null, 1: null, 2: null, 3: null, 
    4: null, 5: null, 6: null, 7: null
});

  return (
    <div className="h-dvh bg-gray-500">
      <Canvas 
        frameloop={"demand"} 
        camera={ {zoom: 135, position: [3,3,3]} } 
        orthographic
        onPointerDown={toggleCube}
      >
        <axesHelper args={[2]}/>
        <ambientLight intensity={1.5} />

        <OrbitControls/>
      </Canvas>
    </div>
  )
}
export default App;