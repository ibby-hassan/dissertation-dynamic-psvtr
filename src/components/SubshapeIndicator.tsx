import { indexToGrid } from '../utils/shapeUtils';

interface SubshapeIndicatorProps {
  hoveredIndex: number | null;
}

const SubshapeIndicator = ({ hoveredIndex }: SubshapeIndicatorProps) => {
  // If nothing is hovered, don't put anything in the scene
  if (hoveredIndex === null) return null;

  const position = indexToGrid(hoveredIndex);

  return (
    <mesh position={position}>
      <boxGeometry args={[1,1,1]} />
      <meshStandardMaterial 
        color="#FED766" 
        transparent 
        opacity={0.3} 
        depthTest={false} 
      />
    </mesh>
  );
};

export default SubshapeIndicator;