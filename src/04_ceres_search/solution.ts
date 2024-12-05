import {readData} from "./data/readData";
import {WordSearchMatrix} from "./types/types";

// === Problem Description - https://adventofcode.com/2024/day/4 ===

// const filePath = `${process.cwd()}/src/04_ceres_search/data/input.txt`;
const filePath = `${process.cwd()}/src/04_ceres_search/data/input.txt.example`;

const wordSearch: WordSearchMatrix = readData(filePath);

let count = 0;
const rowsCount = wordSearch.length;
const colsCount = wordSearch[0].length;

function isLetter(row: number, col: number, letter: string) {
    if (row < 0 || row >= rowsCount) {
        return false
    }

    if (col < 0 || col >= colsCount) {
        return false
    }

    return wordSearch[row][col] === letter;
}

const lookingForWord = "MAS";

for (let currentRow = 0; currentRow < wordSearch.length; currentRow++) {
    for (let currentCol = 0; currentCol < wordSearch[currentRow].length; currentCol++) {
        const currentLetter = wordSearch[currentRow][currentCol];

        if (currentLetter !== "X") {
            continue;
        }

        const horizontalLeft = wordSearch[currentRow].slice(currentCol + 1, currentCol + lookingForWord.length + 1).join('');
        const horizontalRight = wordSearch[currentRow].slice(Math.max(0, currentCol - lookingForWord.length), currentCol).reverse().join('');

        if (horizontalLeft === lookingForWord) {
            count++;
        }

        if (horizontalRight === lookingForWord) {
            count++;
        }

        if (isLetter(currentRow + 1, currentCol, "M") && isLetter(currentRow + 2, currentCol, "A") && isLetter(currentRow + 3, currentCol, "S")) {
            count++;
            console.log("Found VERTICAL NOT REVERSED", currentRow, currentCol);
        }

        if (isLetter(currentRow - 1, currentCol, "M") && isLetter(currentRow - 2, currentCol, "A") && isLetter(currentRow - 3, currentCol, "S")) {
            count++;
            console.log("Found VERTICAL REVERSED", currentRow, currentCol);
        }

        // ========================================
        if (isLetter(currentRow + 1, currentCol + 1, "M") && isLetter(currentRow + 2, currentCol + 2, "A") && isLetter(currentRow + 3, currentCol + 3, "S")) {
            count++;
            console.log("Found DIAGONAL RIGHT NOT REVERSED", currentRow, currentCol);
        }

        if (isLetter(currentRow + 1, currentCol - 1, "M") && isLetter(currentRow + 2, currentCol - 2, "A") && isLetter(currentRow + 3, currentCol - 3, "S")) {
            count++;
            console.log("Found DIAGONAL LEFT NOT REVERSED", currentRow, currentCol);
        }

        if (isLetter(currentRow - 1, currentCol - 1, "M") && isLetter(currentRow - 2, currentCol - 2, "A") && isLetter(currentRow - 3, currentCol - 3, "S")) {
            count++;
            console.log("Found diagonal LEFT REVERSED", currentRow, currentCol);
        }



        if (isLetter(currentRow - 1, currentCol + 1, "M") && isLetter(currentRow - 2, currentCol + 2, "A") && isLetter(currentRow - 3, currentCol + 3, "S")) {
            count++;
            console.log("Found diagonal RIGHT REVERSED", currentRow, currentCol);
        }
    }
}

console.log("Part 1: " + count);
// console.log("Part 2: " + processor.multiply(memoryData, ParseMode.EnableCheck));


// Part 2
// for (let currentRow = 0; currentRow < wordSearch.length; currentRow++) {
//     for (let currentCol = 0; currentCol < wordSearch[currentRow].length; currentCol++) {
//         const currentLetter = wordSearch[currentRow][currentCol];
//
//         if (currentLetter !== "A") {
//             continue;
//         }
//
//         // Top left - bottom right
//         const a =
//             (isLetter(currentRow - 1, currentCol - 1, "M") && isLetter(currentRow + 1, currentCol + 1, "S")) ||
//             (isLetter(currentRow - 1, currentCol - 1, "S") && isLetter(currentRow + 1, currentCol + 1, "M"));
//
//
//
//         // Top right - bottom left
//         const b =
//             (isLetter(currentRow - 1, currentCol + 1, "M") && isLetter(currentRow + 1, currentCol - 1, "S")) ||
//             (isLetter(currentRow - 1, currentCol + 1, "S") && isLetter(currentRow + 1, currentCol - 1, "M"));
//
//         if (a && b) {
//             count++;
//         }
//     }
// }
console.log(count);

