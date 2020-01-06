import { Point, Size, createPoint, pointInRect, pointAdd, pointEqual } from "./Point";


export type GameOp =
    | "up"
    | "down"
    | "left"
    | "right"
    ;

export interface GameState {
    readonly size: Size;
    readonly heading: Point;
    readonly food: Point;
    readonly head: Point; // this this could be part of the body, the seems logically easier
    readonly body: Point[];
    readonly lastTimeStamp: number;
    readonly speedMs: number;
    readonly done: boolean;
}

const randFoodPos = ({ size, head, body }: GameState) => {
    const valid = (p: Point) => !pointEqual(p, head) && !body.some(bp => pointEqual(p, bp));
    const rndPt = () => createPoint(Math.floor(Math.random() * size.width), Math.floor(Math.random() * size.height));
    let pt = rndPt();
    while(!valid(pt)) {
        pt = rndPt();
    }
    return pt;
};

const moveSnake = (gs: GameState, grow = false): GameState => {
    const head = pointAdd(gs.head, gs.heading);
    let body = [gs.head, ...gs.body];
    if (!grow) { body.pop(); }
    return { ...gs, head, body };
};

const isDone = (gs: GameState): boolean =>
    gs.body.some(p => pointEqual(gs.head, p)) || !pointInRect(gs.head, { ...gs.size, x: 0, y: 0 });


const opToHeading = (op: GameOp): Point | undefined => {
    if (op === "up") { return createPoint(0, -1); }
    if (op === "down") { return createPoint(0, 1); }
    if (op === "left") { return createPoint(-1, 0); }
    if (op === "right") { return createPoint(1, 0); }
    return undefined;
};


export const doOp = (gs: GameState, op: GameOp): GameState => {
    if (!gs.done) {
        const heading = opToHeading(op);
        if (heading !== undefined) {
            return { ...gs, heading };
        }
    }
    return gs;
};

export const initGameState = (size: Size): GameState => {
    // createPoint(Math.floor(size.width / 2), Math.floor(size.height / 2)),
    let gs: GameState = {
        size,
        heading: createPoint(1, 0),
        head: createPoint(Math.floor(size.width / 3), Math.floor(size.height / 3)),
        body: [],
        food: createPoint(0, 0),
        done: false,
        speedMs: 300,
        lastTimeStamp: 0
    };
    gs = moveSnake(gs, true);
    gs = moveSnake(gs, true);
    gs = moveSnake(gs, true);
    gs = {...gs, food: randFoodPos(gs) };
    return gs;
    // return moveSnake(moveSnake(moveSnake({size, heading, head, body, food, done }, true), true), true);
};

export const update = (gs: GameState, timeStamp: number): GameState => {
    if (gs.done) {
        return gs;
    } else {
        const elapsedMs = timeStamp - gs.lastTimeStamp;
        // console.log({ ...gs, elapsedMs });
        if (elapsedMs > gs.speedMs) {
            const gsm = moveSnake(gs, false);
            return { ...gsm, done: isDone(gsm), lastTimeStamp: timeStamp };
        } else {
            return gs;
        }
    }
};

