import {readData} from "./data/readData";
import {MemoryMultiplyProcessor} from "./services/MemoryMultiplyProcessor";
import {MemoryData, ParseMode} from "./types/types";
import {RegexMemoryDataParser} from "./services/parsers/RegexMemoryDataParser";

// === Problem Description - https://adventofcode.com/2024/day/3 ===

// const filePath = `${process.cwd()}/src/03_mull_it_over/data/input.txt`;
const filePath = `${process.cwd()}/src/03_mull_it_over/data/input.txt.example`;

const memoryData: MemoryData = readData(filePath);

const parser = new RegexMemoryDataParser();
const processor: MemoryMultiplyProcessor = new MemoryMultiplyProcessor(parser);

console.log("Part 1: " + processor.multiply(memoryData, ParseMode.NoEnableCheck));
console.log("Part 2: " + processor.multiply(memoryData, ParseMode.EnableCheck));
