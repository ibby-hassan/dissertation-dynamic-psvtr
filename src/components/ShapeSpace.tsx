import type { Shape, Subshape } from '../utils/shapeUtils';

interface ShapeSpaceProps {
  shape: Shape;
}

const GEOMETRIES = {
  empty: null,
  cube: {
    geometry: <boxGeometry args={[1, 1, 1]} />,
    offset: [0, 0, 0] as [number, number, number],
    color: 'white',
  },
  half: {
    geometry: <boxGeometry args={[1, 0.5, 1]} />,
    offset: [0, -0.25, 0] as [number, number, number],
    color: 'white',
  },
  wedge: null
};

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
              <meshStandardMaterial color={geometry.color} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

export default ShapeSpace;


