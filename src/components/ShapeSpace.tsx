import type { Shape, Subshape } from '../utils/shapeUtils';
import { SUBSHAPE_GEOMETRIES } from '../utils/geometryDefs';

interface ShapeSpaceProps {
  shape: Shape;
}

const ShapeSpace = ({ shape }: ShapeSpaceProps) => {
  return (
    <group position={[-0.5, -0.5, -0.5]}>
      {shape.map((subshape: Subshape) => {
        const { position, rotation, type, index } = subshape;

        const GEOMETRIES = SUBSHAPE_GEOMETRIES[type];

        if (!GEOMETRIES) return null;

        return (
          <group key={index} position={position} rotation={rotation}>
            <mesh position={GEOMETRIES.offset}>
              {GEOMETRIES.geometry}
              <meshStandardMaterial color="white" flatShading />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

export default ShapeSpace;