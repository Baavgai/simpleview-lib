import { initGameState, update, doOp } from "./state";
import { initGameView } from "./view";
import "./style.css";

const SIZE = {width: 20, height: 20 };
let state = initGameState(SIZE);
let view = initGameView(SIZE);

function gameLoop(timeStamp: number) {
    state = update(state, timeStamp);
    view(state);

    window.requestAnimationFrame(gameLoop);
}

const Keys = {
    LEFT: 37, RIGHT: 39, UP: 38, DOWN: 40, SPACE: 32, ESC: 27
};

window.onkeydown = function(e: KeyboardEvent) {
    // e.preventDefault();
    if (e.keyCode === Keys.UP) {
        state = doOp(state, "up");
    } else if (e.keyCode === Keys.DOWN) {
        state = doOp(state, "down");
    } else if (e.keyCode === Keys.LEFT) {
        state = doOp(state, "left");
    } else if (e.keyCode === Keys.RIGHT) {
        state = doOp(state, "right");
    } else if (e.keyCode === Keys.ESC) {
        state = initGameState(SIZE);
    }
};

window.requestAnimationFrame(gameLoop);
