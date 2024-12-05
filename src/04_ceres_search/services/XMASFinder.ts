import {Direction, Position, WordSearchMatrix} from "../types/types";
import {Dir} from "node:fs";

export class XMASFinder {
    private readonly XMASWord = "XMAS";

    private readonly XMASdirections: Direction[] = [
        {dRow: 0, dCol: 1},  // Horizontal right
        {dRow: 0, dCol: -1}, // Horizontal left

        {dRow: 1, dCol: 0},  // Vertical down
        {dRow: -1, dCol: 0}, // Vertical up

        {dRow: 1, dCol: 1},  // Diagonal down-right
        {dRow: 1, dCol: -1}, // Diagonal down-left

        {dRow: -1, dCol: 1}, // Diagonal up-right
        {dRow: -1, dCol: -1} // Diagonal up-left
    ];

    private isValidPosition(matrix: WordSearchMatrix, position: Position): boolean {
        return position.row >= 0
            && position.row < matrix.length
            && position.col >= 0
            && position.col < matrix[0].length;
    }

    private getMatrixElement(matrix: WordSearchMatrix, position: Position): string | null {
        return this.isValidPosition(matrix, position)
            ? matrix[position.row][position.col]
            : "";
    }

    private matchesWord(
        matrix: WordSearchMatrix,
        word: string,
        start: Position,
        direction: Direction
    ): boolean {
        for (let i = 0; i < word.length; i++) {
            const position = {
                row: start.row + i * direction.dRow,
                col: start.col + i * direction.dCol,
            };

            const char = this.getMatrixElement(matrix, position);

            if (char !== word[i]) {
                return false;
            }
        }

        return true;
    }

    public getXMASCount(wordSearchMatrix: WordSearchMatrix): number {
        let count = 0;

        for (let row = 0; row < wordSearchMatrix.length; row++) {
            for (let col = 0; col < wordSearchMatrix[row].length; col++) {
                const position = {row, col};

                for (const direction of this.XMASdirections) {
                    if (this.matchesWord(wordSearchMatrix, this.XMASWord, position, direction)) {
                        count++;
                    }
                }
            }
        }

        return count;
    }

    public getCrossMasCount(wordSearchMatrix: WordSearchMatrix): number {
        let count = 0;

        for (let currentRow = 0; currentRow < wordSearchMatrix.length; currentRow++) {
            for (let currentCol = 0; currentCol < wordSearchMatrix[currentRow].length; currentCol++) {
                const currentLetter = wordSearchMatrix[currentRow][currentCol];

                if (currentLetter !== "A") {
                    continue;
                }

                // Top left - bottom right
                const a =
                    (this.getMatrixElement(wordSearchMatrix, {row: currentRow - 1, col: currentCol - 1}) === "M" && this.getMatrixElement(wordSearchMatrix, {row: currentRow + 1, col: currentCol + 1}) === "S") ||
                    (this.getMatrixElement(wordSearchMatrix, {row: currentRow - 1, col: currentCol - 1}) === "S") && this.getMatrixElement(wordSearchMatrix, {row: currentRow + 1, col: currentCol + 1}) === "M";

                const b =
                    (this.getMatrixElement(wordSearchMatrix, {row: currentRow - 1, col: currentCol + 1}) === "M" && this.getMatrixElement(wordSearchMatrix, {row: currentRow + 1, col: currentCol - 1}) === "S") ||
                    (this.getMatrixElement(wordSearchMatrix, {row: currentRow - 1, col: currentCol + 1}) === "S") && this.getMatrixElement(wordSearchMatrix, {row: currentRow + 1, col: currentCol - 1}) === "M";


                if (a && b) {
                    count++;
                }
            }
        }

        return count;
    }
}
