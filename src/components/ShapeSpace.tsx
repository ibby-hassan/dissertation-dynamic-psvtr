import type { Shape, Subshape } from '../utils/shapeUtils';
import * as THREE from 'three'; // Import Three.js to create the Shape

// 1. Define the 2D Triangle Shape (Right Angle)
export const wedgeShape = new THREE.Shape();
wedgeShape.moveTo(0, 0); // Start at corner
wedgeShape.lineTo(1, 0); // Draw width
wedgeShape.lineTo(0, 1); // Draw height
wedgeShape.closePath();  // Connect back to start

// 2. Define Extrusion Settings
export const wedgeSettings = { 
  depth: 1, 
  bevelEnabled: false 
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
    geometry: <extrudeGeometry args={[wedgeShape, wedgeSettings]} />,
    // Shift X,Y,Z by -0.5 to center the 0..1 shape coordinates within the -0.5..0.5 voxel space
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
              <meshStandardMaterial color={"white"} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

export default ShapeSpace;


