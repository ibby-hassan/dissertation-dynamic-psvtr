import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

const ScreenshotHandler = ({ captureTrigger, onComplete }: { captureTrigger: boolean, onComplete: () => void }) => {
  const { gl, scene, camera } = useThree();

  useEffect(() => {
    if (captureTrigger) {
      const axes = scene.getObjectByName("axes-helper");
      const originalVisibility = axes ? axes.visible : true;
      if (axes) axes.visible = false;
      gl.render(scene, camera);

      // Trigger Download
      const dataUrl = gl.domElement.toDataURL('image/png');
      const link = document.createElement('a');
      link.setAttribute('download', 'psvtr-shape.png');
      link.setAttribute('href', dataUrl);
      link.click();

      if (axes) axes.visible = originalVisibility;
      gl.render(scene, camera); 
      onComplete();
    }
  }, [captureTrigger, gl, scene, camera, onComplete]);

  return null;
};
export default ScreenshotHandler;