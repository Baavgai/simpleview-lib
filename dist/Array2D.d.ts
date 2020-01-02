export declare const range: (size: number) => number[];
export declare function buildArray2D<T>(rows: number, cols: number, value: T): T[][];
export declare function buildArray2D<T>(rows: number, cols: number, f: (row: number, col: number) => T): T[][];
export declare const transformArray2D: <T>(xs: T[][], getValue: (row: number, col: number, value: T) => T) => void;
export declare const fillArray2D: <T>(xs: T[][], value: T) => void;
