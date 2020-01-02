const Conway = (function ({ view, bgColor, liveColor, liveChar, pattern }) {
    view.fill(bgColor);
    pattern.split("\n")
        .filter(x => x.trim().length !== 0)
        .map((line, y) => line.split('').map((value, x) => ({ x, y, value })).filter(x => x.value === liveChar))
        .reduce((acc, xs) => { acc.push(...xs); return acc; }, [])
        .forEach(({ x, y }) => view.setPixel(x, y, liveColor));

    const traverse = new Array(view.width * view.height).fill(0).map((_, idx) => ({ x: idx % view.width, y: Math.floor(idx / view.width) }));

    const nextGen = () => {
        // const live = traverse.filter(p => calcNextGenValue(p.x, p.y));
        const live = traverse.filter(({x, y}) => {
            const isAlive = (x, y) => {
                return view.getPixel(x, y) === liveColor;
            }
            const f = (dx, dy) => isAlive(x + dx, y + dy) ? 1 : 0;
            var count = f(-1, -1) + f(0, -1) + f(1, -1)
                + f(-1, 0) + f(1, 0)
                + f(-1, 1) + f(0, 1) + f(1, 1);
            return isAlive(x, y)
                ? (count === 2 || count === 3)
                : count === 3;
        });
        view.fill(bgColor);
        live.forEach(p => view.setPixel(p.x, p.y, liveColor));
    };

    const animate = () => {
        view.draw();
        nextGen();
    };

    return { animate }; // , nextGen, draw: view.draw };

})({
    view: SimpleView.createPixelBox({
        canvasId: "canvas1", width: 64, height: 48, gutterSize: 2, cellSize: 8
    }),
    bgColor: "#000",
    liveColor: "#0f0",
    liveChar: 'O',
    pattern: `    .
    ........................O...........
    ......................O.O...........
    ............OO......OO............OO
    ...........O...O....OO............OO
    OO........O.....O...OO..............
    OO........O...O.OO....O.O...........
    ..........O.....O.......O...........
    ...........O...O....................
    ............OO......................    `
});



// Conway.draw();
setInterval(Conway.animate, 200);
// nextGen();
// View.draw();

