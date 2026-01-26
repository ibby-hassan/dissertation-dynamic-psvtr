import type { Shape, Subshape } from '../utils/shapeUtils';

interface ShapeSpaceProps {
  shape: Shape;
}

const GEOMETRIES = {
  empty: null,
  cube: <boxGeometry args={[1, 1, 1]} />,
  half: <boxGeometry args={[1, 0.5, 1]} />,
  wedge: null
};

const ShapeSpace = ({ shape }: ShapeSpaceProps) => {
  return (
    <group position={[-0.5, -0.5, -0.5]}>
      {shape.map((subshape: Subshape) => {
        if (subshape.type === 'empty') return null;

        const { position, rotation, type } = subshape;

        return (
          <group position={position} rotation={rotation}>
            <mesh>
              {GEOMETRIES[type]}
              <meshStandardMaterial color="white" />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

export default ShapeSpace;


