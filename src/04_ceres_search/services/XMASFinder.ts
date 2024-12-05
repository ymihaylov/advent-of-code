import {Position, WordSearchMatrix} from "../types/types";

export class XMASFinder {
    private readonly XMASWord = "XMAS";

    private readonly boundaries = {
        HORIZONTAL_RIGHT: [0, this.XMASWord.length - 1], // Same ROW, three columns to the right
        HORIZONTAL_LEFT: [-(this.XMASWord.length - 1), 0], // Same ROW, -three columns to the left

        VERTICAL_UP: [0, -(this.XMASWord.length - 1)], // Three ROWS up, same COLUMN
        VERTICAL_DOWN: [0, this.XMASWord.length - 1], // Three rows down, same COLUMN

        DIAGONAL_UP_RIGHT: [-(this.XMASWord.length - 1), this.XMASWord.length - 1], // Three rows up, three columns right
        DIAGONAL_UP_LEFT: [-(this.XMASWord.length - 1), -(this.XMASWord.length - 1)], // Three rows up, three columns left

        DIAGONAL_DOWN_RIGHT: [this.XMASWord.length - 1, this.XMASWord.length - 1], // Three rows down, three columns right
        DIAGONAL_DOWN_LEFT: [-(this.XMASWord.length - 1), this.XMASWord.length - 1], // Three rows down, three columns left
    };

    // Part 1
    public countXMASWords(wordSearchMatrix: WordSearchMatrix): number {
        const positionsWithX = this.findAllPlacesWithX(wordSearchMatrix);

        positionsWithX.forEach((position: Position) => {
            const {row, col} = position;
            const [rowBound, colBound] = this.boundaries.HORIZONTAL_RIGHT;

            const XMASResults: string[] = [];

            const horizontalRightText = wordSearchMatrix[row].slice(col + 1, col + colBound + 1).join("");
            const horizontalLeftText = wordSearchMatrix[row].slice(Math.max(col - colBound, 0), col).join("");

            XMASResults.push(horizontalLeftText, horizontalRightText);

            const [rowBoundUp, colBoundUp] = this.boundaries.VERTICAL_UP;
            const [rowBoundDown, colBoundDown] = this.boundaries.VERTICAL_DOWN;

            let verticalUpText = "";
            let verticalDownText = "";

            for (let i = row + 1; i < Math.min((row + rowBoundDown), wordSearchMatrix.length) + 1; i++) {
                verticalDownText += wordSearchMatrix[i]?.[col];
            }

            XMASResults.push(verticalDownText);

            for (let i = Math.max((row - rowBoundUp), 0); i < row; i++) {
                verticalUpText += wordSearchMatrix[i]?.[col];
            }


            const [rowBoundDiagonalUp, colBoundDiagonalRight] = this.boundaries.DIAGONAL_UP_RIGHT;


            // const diagonalUpRight = wordSearchMatrix.slice(row + rowBoundDiagonalUp, row + 1).map((row, index) => row[col + index]).join("");
            // const diagonalUpLeft = wordSearchMatrix.slice(row + rowBoundDiagonalUp, row + 1).map((row, index) => row[col - index]).join("");
            //
            // const [rowBoundDiagonalDown, colBoundDiagonalLeft] = this.boundaries.DIAGONAL_DOWN_LEFT;
            // const diagonalDownRight = wordSearchMatrix.slice(row + 1, row + rowBoundDiagonalDown + 1).map((row, index) => row[col + index]).join("");
            // const diagonalDownLeft = wordSearchMatrix.slice(row + 1, row + rowBoundDiagonalDown + 1).map((row, index) => row[col - index]).join("");
            //
            // const words = [horizontalRight, horizontalLeft, verticalUp, verticalDown, diagonalUpRight, diagonalUpLeft, diagonalDownRight, diagonalDownLeft];
            //
            // words.forEach((word) => {
            //     if (word === this.XMASWord) {
            //         console.log("Found XMAS word at position: ", position);
            //     }
            // });
        });

        return 0;
    }

    private findAllPlacesWithX(wordSearchMatrix: WordSearchMatrix): Position[] {
        return wordSearchMatrix.reduce<Position[]>((positions, row, rowIndex) => {
            row.forEach((value, colIndex) => {
                value === "X" && positions.push({row: rowIndex, col: colIndex});
            });

            return positions;
        }, [])
    }
}
