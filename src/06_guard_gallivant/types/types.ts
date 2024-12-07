export type LabMap = string[][];

export enum GuardDirections {
    UP = "^",
    RIGHT = ">",
    DOWN = "v",
    LEFT = "<",
}

export type Position = {
    row: number;
    col: number;
};

export type GuardInfo = {
    position: Position;
    direction: GuardDirections;
}
