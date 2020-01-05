import { Point, pointAdd } from "./Point";

export interface Snake {
    readonly heading: Point;
    readonly body: Point[];
    readonly eaten: boolean;
}

export const createSnake = (heading: Point, body: Point[]): Snake =>
    ({ heading, body, eaten: false });

export const snakeHead = ({ body }: Snake): Point =>
    body[0];

export const snakeFeed = ({ heading, body }: Snake): Snake =>
    ({ heading, body, eaten: true });

export const snakeMove = (snake: Snake): Snake => {
    let body = [pointAdd(snakeHead(snake), snake.heading), ...snake.body];
    if (!snake.eaten) { body.pop(); }
    return createSnake(snake.heading, body);
};

// export const snakeDead = (snake: Snake): boolean
