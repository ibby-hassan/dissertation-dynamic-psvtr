import * as THREE from 'three';
import type { SubshapeType } from './shapeUtils';
import type { JSX } from 'react';


// --- 2D Shape Definitions ---

const wedgeShape = new THREE.Shape();
wedgeShape.moveTo(0, 0);
wedgeShape.lineTo(1, 0);
wedgeShape.lineTo(0, 1);
wedgeShape.closePath();

const pieShape = new THREE.Shape();
pieShape.moveTo(0, 0);
pieShape.lineTo(1, 0);
pieShape.absarc(0, 0, 1, 0, Math.PI / 2, false);
pieShape.lineTo(0, 0);
pieShape.closePath();

const obliqueCubeVertices = new Float32Array([
  1, 0, 0,
  0, 0, 0,
  0, 0, 1,
  1, 0, 1,
  1, 1, 0,
  0, 1, 0,
  0, 1, 1
]);
const obliqueCubeIndices = [
  // Triangle faces
  0, 4, 3,
  6, 2, 3,
  4, 5, 6,
  4, 6, 3,
  // Square faces
  4, 0, 1,
  5, 4, 1,
  1, 2, 6,
  1, 6, 5,
  3, 2, 1,
  0, 3, 1
];
const obliqueCubeGeometry = new THREE.BufferGeometry();
obliqueCubeGeometry.setAttribute('position', new THREE.BufferAttribute(obliqueCubeVertices, 3));
obliqueCubeGeometry.setIndex(obliqueCubeIndices);

const longWedgeShape = new THREE.Shape();
longWedgeShape.moveTo(0, 0);
longWedgeShape.lineTo(2, 0);
longWedgeShape.lineTo(0, 1);
longWedgeShape.closePath();

const bigPieShape = new THREE.Shape();
bigPieShape.moveTo(0, 0);
bigPieShape.lineTo(2, 0);
bigPieShape.absarc(0, 0, 2, 0, Math.PI / 2, false);
bigPieShape.lineTo(0, 0);
bigPieShape.closePath();

const clawVertices = new Float32Array([
  1,0,0,
  1,1,0,
  0,1,0,
  0,0,0,
  0,0,1
]);
const clawIndices = [
  1,4,0,
  2,4,1,
  4,3,0,
  4,2,3,
  2,0,3,
  2,1,0
];
const clawGeometry = new THREE.BufferGeometry();
clawGeometry.setAttribute('position', new THREE.BufferAttribute(clawVertices, 3));
clawGeometry.setIndex(clawIndices);

// --- Extrusion Settings ---
const extrudeSettings = {
  depth: 1,
  bevelEnabled: false,
  curveSegments: 64
};


// --- Configuration Interface ---
export interface GeometryConfig {
  geometry: JSX.Element; // The R3F geometry component
  offset: [number, number, number]; // Center correction
}

// --- Main Registry ---
export const SUBSHAPE_GEOMETRIES: Record<SubshapeType, GeometryConfig | null> = {
  empty: null,
  cube: {
    geometry: <boxGeometry args={[1, 1, 1]} />,
    offset: [0, 0, 0],
  },
  half: {
    geometry: <boxGeometry args={[1, 0.5, 1]} />,
    offset: [0, -0.25, 0],
  },
  wedge: {
    geometry: <extrudeGeometry args={[wedgeShape, extrudeSettings]} />,
    // Center the 0..1 coordinates to -0.5..0.5
    offset: [-0.5, -0.5, -0.5],
  },
  pie: {
    geometry: <extrudeGeometry args={[pieShape, extrudeSettings]} />,
    offset: [-0.5, -0.5, -0.5],
  },
  'oblique cube': {
    geometry: <primitive object={obliqueCubeGeometry} attach="geometry" />,
    offset: [-0.5, -0.5, -0.5],
  },
  'long wedge': {
    geometry: <extrudeGeometry args={[longWedgeShape, extrudeSettings]} />,
    offset: [-0.5, -0.5, -0.5],
  },
  'big pie': {
    geometry: <extrudeGeometry args={[bigPieShape, extrudeSettings]} />,
    offset: [-0.5, -0.5, -0.5],
  },
  'claw': {
    geometry: <primitive object={clawGeometry} attach="geometry" />,
    offset: [-0.5, -0.5, -0.5],
  }
};