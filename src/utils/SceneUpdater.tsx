import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';

const SceneUpdater = ({ dependencies }: { dependencies: any[] }) => {
  const { invalidate } = useThree();

  useEffect(() => {
    invalidate();
  }, dependencies);
  
  return null;
};

export default SceneUpdater;