import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Geometry, Base, Addition, type CSGGeometryRef } from '@react-three/csg';
import { type VoxelSpace } from '../App';
import { getVoxelsFromSpace, GEOMETRIES } from '../utils/VoxelUtils';

interface ShapeRendererProps {
  voxelSpace: VoxelSpace;
}

// Helper to create a string key for an edge (order-independent)
const edgeKey = (a: THREE.Vector3, b: THREE.Vector3, precision: number = 1000): string => {
  // Round to grid to handle floating-point imprecision
  const round = (v: THREE.Vector3) =>
    `${Math.round(v.x * precision)},${Math.round(v.y * precision)},${Math.round(v.z * precision)}`;
  const keyA = round(a);
  const keyB = round(b);
  return keyA < keyB ? `${keyA}|${keyB}` : `${keyB}|${keyA}`;
};

// Compute edges where faces meet at an angle (not coplanar)
const computeAngleBasedEdges = (geometry: THREE.BufferGeometry, coplanarThreshold: number = 0.9999): THREE.BufferGeometry => {
  const position = geometry.getAttribute('position');
  const triCount = position.count / 3;

  // Map of edge -> array of face normals that share this edge
  const edgeNormals = new Map<string, { normal: THREE.Vector3, vertices: [THREE.Vector3, THREE.Vector3] }[]>();

  const vA = new THREE.Vector3();
  const vB = new THREE.Vector3();
  const vC = new THREE.Vector3();
  const normal = new THREE.Vector3();
  const cb = new THREE.Vector3();
  const ab = new THREE.Vector3();

  // Iterate through all triangles
  for (let i = 0; i < triCount; i++) {
    const i3 = i * 3;

    vA.fromBufferAttribute(position, i3);
    vB.fromBufferAttribute(position, i3 + 1);
    vC.fromBufferAttribute(position, i3 + 2);

    // Compute face normal
    cb.subVectors(vC, vB);
    ab.subVectors(vA, vB);
    normal.crossVectors(cb, ab).normalize();

    // Process each edge of the triangle
    const edges: [THREE.Vector3, THREE.Vector3][] = [
      [vA.clone(), vB.clone()],
      [vB.clone(), vC.clone()],
      [vC.clone(), vA.clone()]
    ];

    for (const [v1, v2] of edges) {
      const key = edgeKey(v1, v2);
      if (!edgeNormals.has(key)) {
        edgeNormals.set(key, []);
      }
      edgeNormals.get(key)!.push({
        normal: normal.clone(),
        vertices: [v1, v2]
      });
    }
  }

  // Collect edges where adjacent faces are NOT coplanar
  const edgeVertices: number[] = [];

  for (const [, faces] of edgeNormals) {
    // Only consider edges shared by exactly 2 faces (manifold edges)
    if (faces.length === 2) {
      const dot = faces[0].normal.dot(faces[1].normal);
      // If normals are different enough, this is a real edge
      if (dot < coplanarThreshold) {
        const [v1, v2] = faces[0].vertices;
        edgeVertices.push(v1.x, v1.y, v1.z);
        edgeVertices.push(v2.x, v2.y, v2.z);
      }
    } else if (faces.length === 1) {
      // Boundary edge (only one face) - always draw
      const [v1, v2] = faces[0].vertices;
      edgeVertices.push(v1.x, v1.y, v1.z);
      edgeVertices.push(v2.x, v2.y, v2.z);
    }
  }

  const edgeGeometry = new THREE.BufferGeometry();
  edgeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(edgeVertices, 3));
  return edgeGeometry;
};

const ShapeRenderer: React.FC<ShapeRendererProps> = ({ voxelSpace }: ShapeRendererProps) => {

  // When voxelSpace changes, flag that edges need updating
  const needsEdgeUpdate = useRef(true);
  useEffect(() => {
    needsEdgeUpdate.current = true;
  }, [voxelSpace]);

  // Per frame: If voxelSpace changed and csg geometry is ready, compute edges
  const csgRef = useRef<CSGGeometryRef>(null);
  const [edgesGeometry, setEdgesGeometry] = useState<THREE.BufferGeometry | null>(null);
  useFrame(() => {
    if (needsEdgeUpdate.current && csgRef.current?.geometry) {
      const edges = computeAngleBasedEdges(csgRef.current.geometry);
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
        <meshBasicMaterial color="white" />
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