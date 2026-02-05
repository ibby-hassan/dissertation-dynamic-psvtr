import { Euler, Quaternion, Vector3 } from 'three';

export type SubshapeType = 'empty' | 'cube' | 'half' | 'wedge' | 'pie' | 'oblique cube'| 'long wedge' | 'big pie' | 'big oblique cube';
export type Subshape = {
  type: SubshapeType;
  position: [number, number, number];
  index: number;
  rotation: [number, number, number];
};
export type Shape = Subshape[];

export function generateEmptyShape(): Shape {
  const shape: Subshape[] = [];

  for (let i = 1; i <= 8; i++) {
    shape.push({
      type: 'empty',
      position: indexToGrid(i),
      index: i,
      rotation: [0, 0, 0],
    });
  }
  return shape;
}

export function indexToGrid(index: number): [number, number, number] {
  if (index < 1 || index > 8) {
    throw new Error("Index must be between 1 and 8");
  }
  const zeroBased = index - 1;
  const x = (zeroBased >> 2) & 1;
  const y = (zeroBased >> 1) & 1;
  const z = zeroBased & 1;
  return [x, y, z];
}

export function gridToIndex(x: number, y: number, z: number): number {
  if (x < 0 || x > 1 || y < 0 || y > 1 || z < 0 || z > 1) {
    throw new Error("Coordinates must be 0 or 1");
  }
  return (x * 4) + (y * 2) + z + 1;
}

export function calculateGlobalRotation( currentRotation: [number, number, number],
  axis: 'x' | 'y' | 'z',
  direction: number
): [number, number, number] {
  
  // 1. Euler -> Quaternion
  const currentEuler = new Euler(...currentRotation);
  const currentQ = new Quaternion().setFromEuler(currentEuler);

  // 2. Define the World Axis (Unchanging grid axis)
  const worldAxis = new Vector3(
    axis === 'x' ? 1 : 0,
    axis === 'y' ? 1 : 0,
    axis === 'z' ? 1 : 0
  );

  const angle = direction * (Math.PI / 2);
  const deltaQ = new Quaternion().setFromAxisAngle(worldAxis, angle);

  // 3. Pre-multiply apply the rotation relative to the World
  currentQ.premultiply(deltaQ);

  // 4. Quaternion -> Euler
  const newEuler = new Euler().setFromQuaternion(currentQ);
  
  return [newEuler.x, newEuler.y, newEuler.z];
}

export const getMinRotation = (currentRotation: [number, number, number]): string => {
  const givenOrientation = new Quaternion().setFromEuler(new Euler(...currentRotation));
  const HALF_PI = Math.PI / 2;
  
  let bestTuple = [0, 0, 0];
  let minCost = Infinity;

  const candidates = [0, 1, -1, 2]; 

  // Brute force O(n^3) but n=4, so it's neglibile.
  for (let x of candidates) {
    for (let y of candidates) {
      for (let z of candidates) {
        const candidateOrientation = new Quaternion().setFromEuler(new Euler(-x * HALF_PI, -y * HALF_PI, -z * HALF_PI));
          
        // If angle difference is tiny, it's a visual match.
        if (candidateOrientation.angleTo(givenOrientation) < 0.1) {
          const cost = Math.abs(x) + Math.abs(y) + Math.abs(z); // Calculate "Cost": sum of moves needed. 
          if (cost < minCost) {
            minCost = cost;
            bestTuple = [x, y, z];
          }
        }
      }
    }
  }

    return `(${bestTuple[0]}, ${bestTuple[1]}, ${bestTuple[2]})`;
};