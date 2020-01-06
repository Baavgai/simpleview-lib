import { createPixelBox, PixelColor, PixelBoxProps } from "simpleview-lib";
import { GameState } from "./state";

const COLOR_BG: PixelColor = "#000";
const COLOR_SNAKE: PixelColor = "#0f0";
const COLOR_SNAKE_HEAD: PixelColor = "#0fa";
const COLOR_FOOD: PixelColor = "#f00";

export const initGameView = (props: Partial<PixelBoxProps>) => {
    const view = createPixelBox({ canvasId: "canvas1", width: 20, height: 20, gutterSize: 2, cellSize: 12, ...props });
    return (gs: GameState) => {
        view.fill(COLOR_BG);
        view.setPixel(gs.head.x, gs.head.y, COLOR_SNAKE_HEAD);
        view.setPixel(gs.food.x, gs.food.y, COLOR_FOOD);
        gs.body.forEach(({ x, y }) => view.setPixel(x, y, COLOR_SNAKE));
        view.draw();
    }
};
