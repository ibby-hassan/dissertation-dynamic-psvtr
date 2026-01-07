import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useState } from 'react';
import GUI from './components/GUI/GUI';
import ShapeRenderer from './components/ShapeRenderer';

/* Voxels are defined here, for storing in the app's state. */
export interface Voxel {
  type: 'cube' | 'ramp' | 'half';
  rotation?: [number, number, number];
};

/* VoxelSpace is that aforementioned state. */
export type VoxelSpace = {
  0: null | Voxel;
  1: null | Voxel;
  2: null | Voxel;
  3: null | Voxel;
  4: null | Voxel;
  5: null | Voxel;
  6: null | Voxel;
  7: null | Voxel;
};

const App = () => {
  /* Initialise an empty voxelSpace to begin with. */
  const [voxelSpace, setVoxelSpace] = useState<VoxelSpace>({
    0: null, 1: null, 2: null, 3: null,
    4: null, 5: null, 6: null, 7: null
  });

  const [selectedVoxelType, setSelectedVoxelType] = useState<Voxel['type']>('cube');

  // Handle clicking a slot in the GUI
  const handleSlotClick = (index: number) => {
    setVoxelSpace((prev) => {
      const currentVoxel = prev[index as keyof VoxelSpace];

      // If empty, or if different type -> Place/Replace
      if (!currentVoxel || currentVoxel.type !== selectedVoxelType) {
        return {
          ...prev,
          [index]: { type: selectedVoxelType }
        };
      }

      // If same type -> Remove (Toggle off)
      return {
        ...prev,
        [index]: null
      };
    });
  };

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
        <ShapeRenderer voxelSpace={voxelSpace} />
      </Canvas>
      <GUI
        selectedVoxelType={selectedVoxelType}
        setSelectedVoxelType={setSelectedVoxelType}
        onSlotClick={handleSlotClick}
      />
    </div>
  )
}
export default App;