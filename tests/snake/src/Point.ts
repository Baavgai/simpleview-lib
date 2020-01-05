export interface Point {
    readonly x: number;
    readonly y: number;
}

export const createPoint = (x: number, y: number): Point =>
    ({ x, y });

export const pointAdd = (a: Point, b: Point) =>
    createPoint(a.x + b.x, a.y + b.y);
