import { createPixelBox, PixelBox, PixelColor } from "simpleview-lib";
import { initGame } from "./Game";
import "./style.css";

const Game = initGame(createPixelBox({ canvasId: "canvas1", width: 64, height: 48, gutterSize: 2, cellSize: 8 }));

const animate = () => {
    if (!Game.isDone()) {
        Game.step();
    }
};

setInterval(animate, 200);
