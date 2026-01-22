import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import type { Shape } from './shapeUtils';

const SceneUpdater = ({ shape }: { shape: Shape }) => {
  const { invalidate } = useThree();

  useEffect(() => { invalidate(); }, shape);
  
  return null;
};

export default SceneUpdater;