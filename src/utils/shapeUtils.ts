export type SubshapeType = 'empty' | 'cube' | 'half' | 'wedge';

export type Subshape = {
    id: string;
    type: SubshapeType;
    position: [number, number, number];
    rotation: [number, number, number];
};

export type Shape = Subshape[];

export function generateEmptyShape(): Shape {
    const shape: Subshape[] = [];
    // Using centered coordinates for the 2x2x2 grid
    // The subshapes are 1x1x1, so centers are at 0.5 and 0.5
    const coords = [0.5, 0.5];

    let index = 0;
    for (const x of coords) {
        for (const y of coords) {
            for (const z of coords) {
                shape.push({
                    id: `subshape-${index++}`,
                    type: 'empty',
                    position: [x, y, z],
                    rotation: [0, 0, 0],
                });
            }
        }
    }
    return shape;
};
