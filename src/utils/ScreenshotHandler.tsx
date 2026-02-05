import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

interface ScreenshotHandlerProps {
  captureTrigger: boolean;
  onCaptured: (dataUrl: string) => void;
  onComplete: () => void;
}

const ScreenshotHandler = ({ captureTrigger, onCaptured, onComplete }: ScreenshotHandlerProps) => {
  const { gl, scene, camera } = useThree();

  useEffect(() => {
    if (captureTrigger) {
      const axes = scene.getObjectByName("axes-helper");
      const originalVisibility = axes ? axes.visible : true;
      if (axes) axes.visible = false;
      
      gl.render(scene, camera);
      onCaptured(gl.domElement.toDataURL('image/png'));

      if (axes) axes.visible = originalVisibility;
      gl.render(scene, camera); 
      onComplete();
    }
  }, [captureTrigger, gl, scene, camera, onCaptured, onComplete]);

  return null;
};
export default ScreenshotHandler;