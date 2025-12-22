import Voxel from './Voxel';
import { type VoxelSpace } from '../App';
import { Selection, Select, EffectComposer, Outline } from '@react-three/postprocessing';

/* ShapeRenderer takes voxelSpace (the App's internal state representing the shape on the scene) and renders it as an object on the scene.
voxelSet is basically an array where each index represents a space for a voxel on the 2x2x2 grid. */
interface ShapeRendererProps {
  voxelSpace: VoxelSpace;
}

const ShapeRenderer = ({ voxelSpace }: ShapeRendererProps) => {

  /* voxelSet index i == voxel space 4x+2y+z. */
  const getPositionFromIndex = (index: number): [number, number, number] => {
    const x = Math.floor(index / 4);
    const y = Math.floor((index % 4) / 2);
    const z = index % 2;
    /* A voxel of size 1 placed at 0,0,0 will not sit on top of that point, but dead in the centre of it. We're adding 0.5 to each coordinate to adjust it so it sits snapped onto the voxel space grid. 
    This will need adjusted if the voxel size ever isn't 1x1x1. */
    return [x + 0.5, y + 0.5, z + 0.5];
  };

  return (
    <Selection>
      {/* Post-processing: Given a selected section (the composite shape), applies a global outline. */}
      <EffectComposer multisampling={8} autoClear={false}>
        <Outline 
          visibleEdgeColor={0x000000} // Black
          edgeStrength={3} 
          width={1000} 
        />
      </EffectComposer>

      {/* The section selected for the defined post-processing. Here we render the shapes directly from voxelSpace */}
      <Select enabled>
        <group name="composite-shape">
          {/* Object.entries turns our {0: voxel, 1: voxel...} into an array we can map.
          We filter out nulls so we don't render empty air. */}
          {Object.entries(voxelSpace).map(([key, voxel]) => {
            if (!voxel) return null;

            const index = parseInt(key);
            const position = getPositionFromIndex(index);
            return (
              <Voxel 
                key={index} 
                type={voxel.type} 
                position={position} 
                rotation={voxel.rotation} 
              />
            );
          })}
        </group>
      </Select>
    </Selection>
  );
};

export default ShapeRenderer;