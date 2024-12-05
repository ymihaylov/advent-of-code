import {readData} from "./data/readData";
import {Data, Update} from "./types/types";


// === Problem Description - https://adventofcode.com/2024/day/5 ===

const filePath = `${process.cwd()}/src/05_print_queue/data/input.txt`;
// const filePath = `${process.cwd()}/src/05_print_queue/data/input.txt.example`;

const data: Data = readData(filePath);

function sumOfMiddlesOfCorrectUpdates(data: Data): number {
    return data.updates.reduce((sumOfMiddles: number, update: Update) => {
        const sortedUpdate = update.toSorted(updateComparator)

        return update.join() !== sortedUpdate.join() ? sumOfMiddles : sumOfMiddles + update[Math.floor(update.length / 2)]
    }, 0)
}

function sumOfMiddlesOfSortedIncorrectCorrectUpdates(data: Data): number {
    return data.updates.reduce((sumOfMiddles: number, update: Update) => {
        const sortedUpdate = update.toSorted(updateComparator)

        return update.join() === sortedUpdate.join() ? sumOfMiddles : sumOfMiddles + sortedUpdate[Math.floor(update.length / 2)]
    }, 0)
}

function updateComparator(a: number, b: number): -1 | 1 {
    return data.rules.some(rule => rule.number === a && rule.shouldBeBefore === b) ? -1 : 1
}

console.log("Part 1: ", sumOfMiddlesOfCorrectUpdates(data));
console.log("Part 2: ", sumOfMiddlesOfSortedIncorrectCorrectUpdates(data));
