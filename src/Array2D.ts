export const range = (size: number) => {
    const xs = new Array<number>(size);
    for(let i=0; i<size; i++) {
        xs[i] = i;
    }
    return xs;
};

export function buildArray2D<T>(rows: number, cols: number, value: T): T[][];
export function buildArray2D<T>(rows: number, cols: number, f: (row: number, col: number) => T): T[][];
export function buildArray2D<T>(rows: number, cols: number, fv: T | ((row: number, col: number) => T)): T[][] {
    const f = (row: number, col: number) => {
        if (typeof fv === "function") {
            return (fv as any)(row, col) as T;
        }
        return fv as T;
    };
    return range(rows).map(row => range(cols).map(col => f(row, col)));
}

export const transformArray2D = <T>(xs: T[][], getValue: (row: number, col: number, value: T) => T) =>
    xs.forEach((ys, row) => ys.forEach((value, col) => xs[row][col] = getValue(row, col, value)));

export const fillArray2D = <T>(xs: T[][], value: T) =>
    transformArray2D(xs, () => value);

/*
    const xs = new Array<T>(size);
    for(let i=0; i<size; i++) {
        xs[i] = value;
    }
    return xs;
};
export function buildArray<T>(size: number, value: T): T[];
export function buildArray<T>(size: number, f: (idx:number) => T): T[];

export function buildArray<T>(size: number, fv: T | ((idx:number) => T)): T[] {
    const f = (idx:number) => {
        if (typeof fv === "function") {
            return (fv as any)(idx) as T;
        }
        return fv as T;
    };
    const xs = new Array<T>(size);
    for(let i=0; i<size; i++) {
        xs[i] = f(i);
    }
    return xs;
}

export function buildArray2D<T>(rows: number, cols: number, value: T): T[][];
export function buildArray2D<T>(rows: number, cols: number, f: (row: number, col: number) => T): T[][];
export function buildArray2D<T>(rows: number, cols: number, fv: T | ((row: number, col: number) => T)): T[][] {
    const f = (row: number, col: number) => {
        if (typeof fv === "function") {
            return (fv as any)(row, col) as T;
        }
        return fv as T;
    };
    const xs = new Array<Array<T>>(rows);
    for(let row=0; row<rows; row++) {
        xs[row] = buildArray(cols, col => f(row, col));
    }
    return xs;
}

export const transformArray2D = <T>(xs: T[][], getValue: (row: number, col: number, value: T) => T) =>
    xs.forEach((ys, row) => ys.forEach((value, col) => xs[row][col] = getValue(row, col, value)));

export const fillArray2D = <T>(xs: T[][], value: T) =>
    transformArray2D(xs, () => value);
export const range = (size: number) => {
    const xs = new Array<number>(size);
    for(let i=0; i<size; i++) {
        xs[i] = i;
    }
    return xs;
};

export function buildArray<T>(size: number, value: T): T[];
export function buildArray<T>(size: number, f: (idx:number) => T): T[];

export function buildArray<T>(size: number, fv: T | ((idx:number) => T)): T[] {
    const f = (idx:number) => {
        if (typeof fv === "function") {
            return (fv as any)(idx) as T;
        }
        return fv as T;
    };
    return range(size).map(f);
}

export function buildArray2D<T>(rows: number, cols: number, value: T): T[][];
export function buildArray2D<T>(rows: number, cols: number, f: (row: number, col: number) => T): T[][];
export function buildArray2D<T>(rows: number, cols: number, fv: T | ((row: number, col: number) => T)): T[][] {
    const f = (row: number, col: number) => {
        if (typeof fv === "function") {
            return (fv as any)(row, col) as T;
        }
        return fv as T;
    };
    return range(rows).map(row => range(cols).map(col => f(row, col)));
}

export const transformArray2D = <T>(xs: T[][], getValue: (row: number, col: number, value: T) => T) =>
    xs.forEach((ys, row) => ys.forEach((value, col) => xs[row][col] = getValue(row, col, value)));

export const fillArray2D = <T>(xs: T[][], value: T) =>
    transformArray2D(xs, () => value);
export function buildArray<T>(size: number, value: T): T[];
export function buildArray<T>(size: number, f: (idx:number) => T): T[];

export function buildArray<T>(size: number, fv: T | ((idx:number) => T)): T[] {
    const f = (idx:number) => {
        if (typeof fv === "function") {
            return (fv as any)(idx) as T;
        }
        return fv as T;
    };
    return range(size).map(f);
}

*/
