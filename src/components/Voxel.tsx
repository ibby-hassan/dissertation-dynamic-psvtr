import { type Voxel as VoxelData } from '../App';

/* Voxel from App.tsx (read in here as VoxelType) tells this component
what type of voxel (cube, ramp, etc) to construct, alongside position and rotation. */
interface VoxelProps {
  position: [number, number, number];
  type: VoxelData['type'];
  rotation?: VoxelData['rotation']
}

/* All actual R3F implementations of shape geometry go here and are referenced
when the type passed in as param matches. */
const GEOMETRIES = {
  cube: <boxGeometry args={[1,1,1]} />,
  half: <boxGeometry args={[1,0.5,1]} />,
  ramp: null
};

const Voxel = ({ position, type, rotation=[0,0,0] }: VoxelProps) => {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        {GEOMETRIES[type]}
        <meshStandardMaterial color={"white"} /> {/* All shapes are this standard white, outlined post-render. */}
      </mesh>
    </group>
  );
};

export default Voxel;