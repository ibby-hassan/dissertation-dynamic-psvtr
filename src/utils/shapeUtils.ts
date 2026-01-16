export type SubshapeType = 'empty' | 'cube' | 'half' | 'wedge';
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