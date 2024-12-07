"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readData_1 = require("./data/readData");
// === Problem Description - https://adventofcode.com/2024/day/5 ===
var filePath = "".concat(process.cwd(), "/src/05_print_queue/data/input.txt");
// const filePath = `${process.cwd()}/src/05_print_queue/data/input.txt.example`;
var data = (0, readData_1.readData)(filePath);
function sumOfMiddlesOfCorrectUpdates(data) {
    return data.updates.reduce(function (sumOfMiddles, update) {
        var sortedUpdate = update.toSorted(updateComparator);
        return update.join() !== sortedUpdate.join() ? sumOfMiddles : sumOfMiddles + update[Math.floor(update.length / 2)];
    }, 0);
}
function sumOfMiddlesOfSortedIncorrectUpdates(data) {
    return data.updates.reduce(function (sumOfMiddles, update) {
        var sortedUpdate = update.toSorted(updateComparator);
        return update.join() === sortedUpdate.join() ? sumOfMiddles : sumOfMiddles + sortedUpdate[Math.floor(update.length / 2)];
    }, 0);
}
function updateComparator(a, b) {
    return data.rules.some(function (rule) { return rule.number === a && rule.shouldBeBefore === b; }) ? -1 : 1;
}
console.log("Part 1: ", sumOfMiddlesOfCorrectUpdates(data));
console.log("Part 2: ", sumOfMiddlesOfSortedIncorrectUpdates(data));
