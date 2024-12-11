export type AntennaSymbol = string & { length: 1 };

export interface Position {
    row: number,
    col: number,
}

export interface Antinode {
    positions: Position[],
    sourceAntennas: [Position, Position]
}

export type AntennaMap = Map<AntennaSymbol, Position[]>;
