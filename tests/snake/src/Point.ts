export interface Point {
    readonly x: number;
    readonly y: number;
}

export interface Size {
    readonly width: number;
    readonly height: number;
}

export type Rect = Point & Size;

export const createPoint = (x: number, y: number): Point =>
    ({ x, y });

export const createRect = (x: number, y: number, width: number, height: number): Rect =>
    ({ x, y, width, height });


export const pointEqual = (a: Point, b: Point) =>
    a.x === b.x && a.y === b.y;

export const pointAdd = (a: Point, b: Point) =>
    createPoint(a.x + b.x, a.y + b.y);

export const pointInRect = (p: Point, r: Rect) =>
    p.x>=r.x && p.y>=r.y && p.x<(r.x + r.width - 1) && p.y<(r.y + r.height - 1);

