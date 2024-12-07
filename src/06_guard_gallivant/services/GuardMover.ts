import {GuardDirections, GuardInfo, LabMap, Position} from "../types/types";

export class GuardMover {

    private readonly movingMap: Map<GuardDirections, GuardDirections> = new Map([
        [GuardDirections.UP, GuardDirections.RIGHT],
        [GuardDirections.RIGHT, GuardDirections.DOWN],
        [GuardDirections.DOWN, GuardDirections.LEFT],
        [GuardDirections.LEFT, GuardDirections.UP],
    ]);
    private readonly positionChangeByDirection: Map<GuardDirections, Position> = new Map([
        [GuardDirections.UP, {row: -1, col: 0}],
        [GuardDirections.RIGHT, {row: 0, col: +1}],
        [GuardDirections.DOWN, {row: +1, col: -1}],
        [GuardDirections.LEFT, {row: 0, col: -1}],
    ]);

    private guardInfo: GuardInfo;
    private count = 0;s

    constructor(
        private labMap: string[][],
    ) {
        this.guardInfo = this.findGuardInfo(labMap);
    }

    private findGuardInfo(labMap: LabMap): GuardInfo {
        const guardSymbols = Object.values(GuardDirections).map(value => value.toString());

        for (let row = 0; row < labMap.length; row++) {
            const index = labMap[row].findIndex(col => guardSymbols.includes(col))

            if (index === -1) {
                continue;
            }

            return {
                position: {row, col: index},
                direction: labMap[row][index] as GuardDirections,
            }
        }

        throw Error("Guard info is not found!");
    }

    private isPositionOutOfBounds(position: Position): boolean {
        return position.row < 0
            || position.row >= this.labMap.length
            || position.col < 0
            || position.col >= this.labMap[0].length;
    }

    public move() {
        const newPosition: Position = {...this.guardInfo.position};

        const positionChange = this.positionChangeByDirection.get(this.guardInfo.direction) as Position;

        newPosition.row += positionChange.row;
        newPosition.col += positionChange.col;

        if (this.isPositionOutOfBounds(newPosition)) {
            return this.count + 1;
        }

        if (this.labMap[newPosition.row][newPosition.col] === "#") {
            this.guardInfo.direction = this.movingMap[this.guardInfo.direction];
            this.move();
            return;
        }

        if (this.labMap[newPosition.row][newPosition.col] === ".") {
            this.count++;
        }

        this.swapAndMark(newPosition);

        console.log("move it move it");
    }

    private swapAndMark(newPosition: Position) {
        const oldPosition = this.guardInfo.position
        this.labMap[oldPosition.row][oldPosition.col] = "X";
        this.labMap[newPosition.row][newPosition.col] = this.guardInfo.direction;
        this.guardInfo.position = newPosition;
    }
}
