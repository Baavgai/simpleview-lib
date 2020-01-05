import { PixelBox, PixelColor } from "simpleview-lib";
import { snakeFeed, snakeHead, snakeMove, createSnake, Snake } from "./Snake";
import { createPoint } from "./Point";

const HeadingDelta = {
    up: createPoint(0, -1),
    down: createPoint(0, 1),
    left: createPoint(-1, 0),
    right: createPoint(1, 0)
};

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

    let snake = createSnake(HeadingDelta.right, [ createPoint(Math.floor(view.width / 3), Math.floor(view.height / 3))]);
    snake = snakeMove(snakeFeed(snakeMove(snakeFeed(snakeMove(snakeFeed(snake))))));

    const isDone = () => done;
    const inputHandler = (dir: Direction) => { };
    const step = () => {
        view.fill(COLOR_BG);
        snake.body.forEach(({x, y}) => view.setPixel(x, y, COLOR_SNAKE));
        view.draw();
    };

    return { isDone, inputHandler, step };
};
