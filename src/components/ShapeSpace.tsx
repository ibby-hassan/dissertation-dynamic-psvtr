import type { Shape, Subshape } from '../utils/shapeUtils';
import * as THREE from 'three'; 

// --- Wedge Definition ---
export const wedgeShape = new THREE.Shape();
wedgeShape.moveTo(0, 0);
wedgeShape.lineTo(1, 0);
wedgeShape.lineTo(0, 1);
wedgeShape.closePath();

// --- Pie Definition (New) ---
const pieShape = new THREE.Shape();
pieShape.moveTo(0, 0); // Start at corner
pieShape.lineTo(1, 0); // Bottom edge
// Create a quarter circle from (1,0) to (0,1)
// absarc(x, y, radius, startAngle, endAngle, clockwise)
pieShape.absarc(0, 0, 1, 0, Math.PI / 2, false); 
pieShape.lineTo(0, 0); // Close back to corner
pieShape.closePath();

// --- Extrusion Settings ---
// Shared settings ensure they have same depth and look
export const extrudeSettings = { 
  depth: 1, 
  bevelEnabled: false,
  curveSegments: 32 // Smoother curve for the pie
};

const GEOMETRIES = {
  empty: null,
  cube: {
    geometry: <boxGeometry args={[1, 1, 1]} />,
    offset: [0, 0, 0] as [number, number, number],
  },
  half: {
    geometry: <boxGeometry args={[1, 0.5, 1]} />,
    offset: [0, -0.25, 0] as [number, number, number],
  },
  wedge: {
    geometry: <extrudeGeometry args={[wedgeShape, extrudeSettings]} />,
    offset: [-0.5, -0.5, -0.5] as [number, number, number],
  },
  pie: {
    geometry: <extrudeGeometry args={[pieShape, extrudeSettings]} />,
    offset: [-0.5, -0.5, -0.5] as [number, number, number],
  }
};

interface ShapeSpaceProps {
  shape: Shape;
}

const ShapeSpace = ({ shape }: ShapeSpaceProps) => {
  return (
    <group position={[-0.5, -0.5, -0.5]}>
      {shape.map((subshape: Subshape) => {

        const { position, rotation, type, index } = subshape;
        const geometry = GEOMETRIES[type];
        if (!geometry) return null;

        return (
          <group key={index} position={position} rotation={rotation}>
            <mesh position={geometry.offset}>
              {geometry.geometry}
              <meshStandardMaterial color={"white"} flatShading/>
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

export default ShapeSpace;