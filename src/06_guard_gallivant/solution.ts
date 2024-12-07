import {readData} from "./data/readData";
import {GuardDirections, LabMap, Position} from "./types/types";
import {GuardMover} from "./services/GuardMover";

// === Problem Description - https://adventofcode.com/2024/day/6 ===

const filePath = `${process.cwd()}/src/06_guard_gallivant/data/input.txt`;
// const filePath = `${process.cwd()}/src/06_guard_gallivant/data/input.txt.example`;

const labMap = readData(filePath);

const guardMover = new GuardMover(labMap);

// guardMover.move()
// guardMover.move()
// guardMover.move()
// guardMover.move()

while (guardMover.move() === undefined) {
    guardMover.move();
}
console.log(guardMover.move());


// console.log("Part 1: ", sumOfMiddlesOfCorrectUpdates(data));
// console.log("Part 2: ", sumOfMiddlesOfSortedIncorrectUpdates(data));
