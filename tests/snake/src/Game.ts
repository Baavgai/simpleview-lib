import { PixelBox, PixelColor } from "simpleview-lib";

export enum Direction {
    Up, Down, Left, Right
}

export interface Game {
    isDone: () => boolean;
    inputHandler: (dir: Direction) => void;
    step: () => void;
}

const COLOR_BG: PixelColor = "#000";
const COLOR_SNAKE: PixelColor = "#0f0";
const COLOR_FOOD: PixelColor = "#f00";

export const initGame = (view: PixelBox): Game => {
    let done = false;

    const isDone = () => done;
    const inputHandler = (dir: Direction) => { };
    const step = () => {
        view.fill(COLOR_BG);
        view.draw();
    };

    return { isDone, inputHandler, step };
};
