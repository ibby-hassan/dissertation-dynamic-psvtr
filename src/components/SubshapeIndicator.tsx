import { indexToGrid } from '../utils/shapeUtils';

interface SubshapeIndicatorProps {
  hoveredIndex: number | null;
}

const SubshapeIndicator = ({ hoveredIndex }: SubshapeIndicatorProps) => {
  if (hoveredIndex === null) return null;

  const position = indexToGrid(hoveredIndex);

  return (
    <group position={[-0.5, -0.5, -0.5]}>
      <mesh position={position}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#FED766"
          transparent
          opacity={0.2}
          depthTest={false}
        />
      </mesh>
    </group>
  );
};

export default SubshapeIndicator;