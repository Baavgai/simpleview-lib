# SimpleView

The HTML 5 canvas is a complex and versatile element.  Sometime too complex.

This offers an extremely limited set of methods.  Simply `getPixel(x,y): color` and `setPixel(x,y,color)`.

## Install

```shell
npm install --save simpleview-lib
# or
yarn add simpleview-lib
```

## Viewport

Display is not view.  If your view logically has 50x50 cells, displaying each cell as one pixel is rather unsatisfying.  A number of projects favor a scaled display.  Setting this kind of thing up should only be done once, so it's done once here...

## PixelBox

A simple scaled display

### createPixelBox(props): PixelBox

| PropName | Type | default | Description |
| - | - | - | - |
| canvasId | string | viewCanvas | Element ID to bind to |
| width | number | 50 | Pixels across |
| height | number | 50 | Pixels down |
| gutterSize | number | 1 | |
| gutterColor | PixelColor | #333 | |
| resizeCanvas | boolean | true | |
| offsetX | number | 0 | |
| offsetY | number | 0 | |
| cellSize | number | 8 | |

### PixelBox type

```typescript
interface PixelBox {
    readonly width: number;
    readonly height: number;
    readonly cellSize: number;
    readonly gutterSize: number;
    readonly viewRect: { x: number; y: number; width: number; height: number; };
    draw: () => void;
    validPos: (x: number, y: number) => boolean;
    setPixel: (x: number, y: number, color: PixelColor) => void;
    getPixel: (x: number, y: number) => PixelColor | undefined;
    fill: (color: PixelColor) => void;
};

```
