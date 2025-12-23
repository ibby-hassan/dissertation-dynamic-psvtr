import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Geometry, Base, Addition, type CSGGeometryRef } from '@react-three/csg';
import { type VoxelSpace, type Voxel } from '../App';
import { getVoxelsFromSpace, GEOMETRIES } from '../utils/voxelUtils';

interface ShapeRendererProps {
  voxelSpace: VoxelSpace;
}

const ShapeRenderer = ({ voxelSpace }: ShapeRendererProps) => {  

  // When voxelSpace changes, flag that edges need updating
  const needsEdgeUpdate = useRef(true);
  useEffect(() => {
    needsEdgeUpdate.current = true;
  }, [voxelSpace]);

  // Per frame: If voxelSpace changed and csg geometry is ready, compute edges
  const csgRef = useRef<CSGGeometryRef>(null);
  const [edgesGeometry, setEdgesGeometry] = useState<THREE.EdgesGeometry | null>(null);
  useFrame(() => {
    if (needsEdgeUpdate.current && csgRef.current?.geometry) {
      const edges = new THREE.EdgesGeometry(csgRef.current.geometry, 1);
      setEdgesGeometry(edges);
      needsEdgeUpdate.current = false;
    }
  });

  // Parse voxelSpace to get array of active voxels
  const components = getVoxelsFromSpace(voxelSpace);
  if (components.length === 0) return null;

  /* CSG rendering work by taking a Base shape (the first voxel) and unioning it with Additional shapes, hence deleting intersecting faces so they don't exist; merging the outmost faces of component shapes into one composite shape with essentially a solid continuous inside. */
  const [first, ...rest] = components;
  return (
    <group name="composite-shape">
      <mesh>
        <Geometry ref={csgRef}>
          <Base position={first.position} rotation={first.rotation}>
            {GEOMETRIES[first.type]}
          </Base>

          {rest.map((voxel, i) => (
            <Addition key={i} position={voxel.position} rotation={voxel.rotation}>
              {GEOMETRIES[voxel.type]}
            </Addition>
          ))}
        </Geometry>
        <meshStandardMaterial color="white" />
      </mesh>

      {/* Black edges rendered on top once the composite shape is rendered. */}
      {edgesGeometry && (
        <lineSegments geometry={edgesGeometry}>
          <lineBasicMaterial color="black" />
        </lineSegments>
      )}
    </group>
  );
};

export default ShapeRenderer;