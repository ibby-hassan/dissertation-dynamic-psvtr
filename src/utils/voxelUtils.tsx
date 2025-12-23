import { type VoxelSpace, type Voxel } from '../App';

// Converts a voxel index to 3D world coordinates.
export const getCoordinatesFromIndex = (index: number): [number, number, number] => {
  const x = Math.floor(index / 4);
  const y = Math.floor((index % 4) / 2);
  const z = index % 2;
  return [x, y, z];
};

// Converts 3D coordinates to a voxel index.
export const getIndexFromCoordinates = (x: number, y: number, z: number): number => {
  return 4*x + 2*y + z;
};

// Applies offset to voxel coordinates to get world position (centered in voxel).
export const applyOffset = (x: number, y: number, z: number): [number, number, number] => {
  return [x + 0.5, y + 0.5, z + 0.5];
};

// Converts a VoxelSpace object to an array of active voxels with their world positions and rotations.
export interface ActiveVoxel {
  position: [number, number, number];
  type: Voxel['type'];
  rotation: [number, number, number];
}

export const getVoxelsFromSpace = (voxelSpace: VoxelSpace): ActiveVoxel[] => {
  return Object.entries(voxelSpace)
    .filter((entry): entry is [string, Voxel] => entry[1] !== null)
    .map(([key, voxel]) => {
      const index = parseInt(key);
      const [x, y, z] = getCoordinatesFromIndex(index);
      return {
        position: applyOffset(x, y, z),
        type: voxel.type,
        rotation: voxel.rotation ?? [0, 0, 0] as [number, number, number]
      };
    });
};

// Geometries lookup for different voxel types.
export const GEOMETRIES = {
  cube: <boxGeometry args={[1, 1, 1]} />,
  half: <boxGeometry args={[1, 0.5, 1]} />,
  ramp: <boxGeometry args={[1, 1, 1]} />, // Placeholder for ramp geometry
}

