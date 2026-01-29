import * as THREE from 'three';
import type { SubshapeType } from './shapeUtils';
import type { JSX } from 'react';


// --- 2D Shape Definitions ---

// Wedge: Right-angled triangle
const wedgeShape = new THREE.Shape();
wedgeShape.moveTo(0, 0);
wedgeShape.lineTo(1, 0);
wedgeShape.lineTo(0, 1);
wedgeShape.closePath();

// Pie: Quarter circle
const pieShape = new THREE.Shape();
pieShape.moveTo(0, 0);
pieShape.lineTo(1, 0);
pieShape.absarc(0, 0, 1, 0, Math.PI / 2, false);
pieShape.lineTo(0, 0);
pieShape.closePath();

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
  }
};