export declare type PixelColor = string | CanvasGradient | CanvasPattern;
export interface Pos {
    x: number;
    y: number;
}
export interface Size {
    width: number;
    height: number;
}
export declare type Rect = Pos & Size;
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
    fill: (color: PixelColor) => void;
}
export declare const fillRect: (ctx: CanvasRenderingContext2D, rect: Rect, color: PixelColor) => void;
export declare const createPixelBox: (props: Partial<PixelBoxProps>) => PixelBox;
