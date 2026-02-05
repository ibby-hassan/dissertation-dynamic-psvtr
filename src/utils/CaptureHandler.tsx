import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

interface CaptureHandlerProps {
  captureTrigger: boolean;
  onCaptured: (dataUrl: string) => void;
}

const CaptureHandler = ({ captureTrigger, onCaptured }: CaptureHandlerProps) => {
  const { gl, scene, camera } = useThree();

  useEffect(() => {
    if (captureTrigger) {
      const axes = scene.getObjectByName("axes-helper-object");
      const originalVisibility = axes ? axes.visible : true;
      if (axes) axes.visible = false;

      gl.render(scene, camera);
      const dataUrl = gl.domElement.toDataURL('image/png');

      if (axes) axes.visible = originalVisibility;
      gl.render(scene, camera); 
      onCaptured(dataUrl);
    }
  }, [captureTrigger, gl, scene, camera, onCaptured]);

  return null;
};

export default CaptureHandler;