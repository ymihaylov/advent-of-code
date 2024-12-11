import {AntennaMap, AntennaSymbol, Position} from "../types/types";
import {isValidPosition} from "../../utils";

export class AntennaAnalyzer {
    private readonly antennaMap: AntennaMap;
    private readonly grid: string[][];

    constructor(grid: string[][]) {
        this.grid = grid;
        this.antennaMap = this.mapAntennas(grid);
    }

    private mapAntennas(grid: string[][]): AntennaMap {
        const map = new Map<AntennaSymbol, Position[]>();

        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[row].length; col++) {
                const symbol = grid[row][col] as AntennaSymbol;
                if (symbol === ".") continue;

                const position: Position = {row, col};

                if (!map.has(symbol)) {
                    map.set(symbol, []);
                }

                map.get(symbol)?.push(position);
            }
        }

        return map;
    }

    private findAntinode(antenna1: Position, antenna2: Position): Position {
        const dy = antenna2.row - antenna1.row;
        const dx = antenna2.col - antenna1.col;

        return {
            row: antenna1.row - dy,
            col: antenna1.col - dx
        };
    }

    public findAllAntinodes(): Set<string> {
        const antinodePositions = new Set<string>();

        for (const [_, antennas] of this.antennaMap) {
            for (const antenna1 of antennas) {
                for (const antenna2 of antennas) {
                    if (antenna1 === antenna2) {
                        continue;
                    }

                    const antinode = this.findAntinode(antenna1, antenna2);

                    if (!isValidPosition(antinode.row, antinode.col, this.grid)) {
                        continue;
                    }

                    antinodePositions.add(`${antinode.row}, ${antinode.col}`);
                }
            }
        }

        return antinodePositions;
    }
}
