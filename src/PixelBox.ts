export type PixelColor = string | CanvasGradient | CanvasPattern;

export interface Pos {
    x: number;
    y: number;
}

export interface Size {
    width: number;
    height: number;
}

export type Rect = Pos & Size;

export interface PixelBoxProps extends Size {
    canvasId: string;
    gutterColor: PixelColor;
    resizeCanvas: boolean;
    offsetX: number;
    offsetY: number;
    cellSize: number;
    gutterSize: number;
}

export interface PixelBox {
    readonly cellSize: number;
    readonly gutterSize: number;
    readonly viewRect: Rect;
    draw: () => void;

    readonly width: number;
    readonly height: number;
    validPos: (x: number, y: number) => boolean;
    setPixel: (x: number, y: number, color: PixelColor) => void;
    getPixel: (x: number, y: number) => PixelColor | undefined;
    // getPixelAt: (idx: number) => PixelColor | undefined;
    fill: (color: PixelColor) => void;

    // transform: (f:(x: number, y: number, color: PixelColor) => PixelColor) => void;
};

import { buildArray2D, fillArray2D } from "./Array2D";
// , transformArray2D

const PixelBoxDefaults: PixelBoxProps = {
    canvasId: "viewCanvas",
    cellSize: 8,
    width: 50,
    height: 50,
    gutterSize: 1,
    // bgColor: "#000",
    gutterColor: "#333",
    resizeCanvas: true,
    offsetX: 0,
    offsetY: 0
};

export const fillRect = (ctx: CanvasRenderingContext2D, rect: Rect, color: PixelColor) => {
    ctx.fillStyle = color;
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
};



export const createPixelBox = (props: Partial<PixelBoxProps>): PixelBox => {
    const p = { ...PixelBoxDefaults, ...props };
    const canEle = document.getElementById(p.canvasId) as HTMLCanvasElement;
    let pixels = buildArray2D<PixelColor>(p.width, p.height, "#000");

    const posToCell = (n: number) =>
        n * (p.cellSize + p.gutterSize) + p.gutterSize;

    const viewRect: Rect = {
        x: p.offsetX, y: p.offsetY,
        width: posToCell(p.width),
        height: posToCell(p.height)
    };

    const draw = () => {
        const ctx = canEle.getContext("2d") as CanvasRenderingContext2D;
        fillRect(ctx, viewRect, p.gutterColor);
        let cell: Rect = { x: 0, y: 0, width: p.cellSize, height: p.cellSize };
        // let idx = 0;
        for (let y = 0; y < p.height; y++) {
            cell.y = posToCell(y) + p.offsetY;
            for (let x = 0; x < p.width; x++) {
                cell.x = posToCell(x) + p.offsetX;
                fillRect(ctx, cell, pixels[x][y]);
            }
        }
    };

    const validPos = (x: number, y: number) =>
        x >= 0 && y >= 0 && x < p.width && y < p.height;

    const setPixel = (x: number, y: number, color: PixelColor) => {
        if (validPos(x, y)) {
            pixels[x][y] = color;
        }
    };

    const getPixel = (x: number, y: number): PixelColor | undefined =>
        validPos(x, y) ? pixels[x][y] : undefined;

    const fill = (color: PixelColor) =>
        fillArray2D(pixels, color);


    if (p.resizeCanvas) {
        canEle.width = viewRect.width + p.offsetX;
        canEle.height = viewRect.height + p.offsetY;
    }

    const { cellSize, gutterSize } = p;
    const { width, height } = p;
    return {
        cellSize, width, height, gutterSize,
        viewRect: { ...viewRect },
        validPos, setPixel, getPixel, fill, draw
    };
};

/*
export const createPixelBox = (props: Partial<PixelBoxProps>): PixelBox => {
    const p = { ...PixelBoxDefaults, ...props };
    const canEle = document.getElementById(p.canvasId) as HTMLCanvasElement;
    let pc = createPixelCollection(p);

    const posToCell = (n: number) =>
        n * (p.cellSize + p.gutterSize) + p.gutterSize;

    const viewRect: Rect = {
        x: p.offsetX, y: p.offsetY,
        width: posToCell(p.width),
        height: posToCell(p.height)
    };

    const draw = () => {
        const ctx = canEle.getContext("2d") as CanvasRenderingContext2D;
        fillRect(ctx, viewRect, p.gutterColor);
        let cell: Rect = { x: 0, y: 0, width: p.cellSize, height: p.cellSize };
        // let idx = 0;
        for (let y = 0; y < p.height; y++) {
            cell.y = posToCell(y) + p.offsetY;
            for (let x = 0; x < p.width; x++) {
                cell.x = posToCell(x) + p.offsetX;
                const color = pc.getPixel(x, y);
                if (color !== undefined) {
                    fillRect(ctx, cell, color);
                }
            }
        }
    };

    const transform = (f:(x: number, y: number, color: PixelColor) => PixelColor) => {
        pc = pc.transform(f);
    };

    if (p.resizeCanvas) {
        canEle.width = viewRect.width + p.offsetX;
        canEle.height = viewRect.height + p.offsetY;
    }

    const { cellSize, gutterSize } = p;
    const { width, height, validPos, setPixel, getPixel, fill } = pc;
    return {
        transform,
        cellSize, width, height, gutterSize,
        viewRect: { ...viewRect },
        validPos, setPixel, getPixel, fill, draw
    };
};
    let data: PixelColor[] = [];

    const fill = (color: PixelColor) => {
        data = new Array(width * height).fill(color);
    };

    const toIndex = (x: number, y: number) =>
        y * width + x;

    const validPos = (x: number, y: number) =>
        x >= 0 && y >= 0 && x < width && y < height;

    const setPixel = (x: number, y: number, color: PixelColor) => {
        if (validPos(x, y)) {
            data[toIndex(x, y)] = color;
        }
    };

    const getPixel = (x: number, y: number): PixelColor | undefined =>
        validPos(x, y) ? data[toIndex(x, y)] : undefined;

    const transform = (f:(x: number, y: number, color: PixelColor) => PixelColor): PixelCollection => {
        const result = createPixelCollection({ width, height });
        let idx = 0;
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++, idx++) {
                result.setPixel(x, y, f(x,y, data[idx]));
            }
        }
        return result;
    };

    fill("#000");
    return { transform, width, height, validPos, setPixel, getPixel, fill };

*/