import {readData} from "./data/readData";
import {WordSearchMatrix} from "./types/types";
import {machine} from "node:os";
import {XMASFinder} from "./services/XMASFinder";

// === Problem Description - https://adventofcode.com/2024/day/4 ===

// const filePath = `${process.cwd()}/src/04_ceres_search/data/input.txt`;
const filePath = `${process.cwd()}/src/04_ceres_search/data/input.txt.example`;

const wordSearch: WordSearchMatrix = readData(filePath);

const xmasFinder = new XMASFinder();
console.log("Part 1 (XMAS occurrences): " + xmasFinder.getXMASCount(wordSearch));
console.log("Part 2 (Cross-MAS occurrences): " + xmasFinder.getCrossMasCount(wordSearch));
