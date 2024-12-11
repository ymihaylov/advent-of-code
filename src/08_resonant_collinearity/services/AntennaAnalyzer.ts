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

    // Part 2

    private areCollinear(point: Position, antenna1: Position, antenna2: Position): boolean {
        // Using cross product to determine if three points lie on the same line
        return (point.col - antenna1.col) * (antenna2.row - antenna1.row) ===
            (point.row - antenna1.row) * (antenna2.col - antenna1.col);
    }

    public findAllAntinodesPartTwo(): Set<string> {
        const antinodePositions = new Set<string>();

        for (const [_, antennas] of this.antennaMap) {
            if (antennas.length < 2) {
                continue;
            }

            // Check each grid position
            for (let row = 0; row < this.grid.length; row++) {
                for (let col = 0; col < this.grid[0].length; col++) {

                    // For each pair of antennas
                    for (let i = 0; i < antennas.length; i++) {
                        let foundCollinear = false;

                        for (let j = i + 1; j < antennas.length; j++) {
                            const antenna1 = antennas[i];
                            const antenna2 = antennas[j];

                            if (this.areCollinear({row, col}, antenna1, antenna2)) {
                                antinodePositions.add(`${row}, ${col}`);
                                foundCollinear = true;
                                break;
                            }
                        }

                        if (foundCollinear) break;
                    }
                }
            }
        }

        return antinodePositions;
    }
}
