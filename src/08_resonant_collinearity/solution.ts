import {readData} from "./data/readData";
import {AntennaAnalyzer} from "./services/AntennaAnalyzer";

// === Problem Description - https://adventofcode.com/2024/day/8 ===

const filePath = `${process.cwd()}/src/08_resonant_collinearity/data/input.txt`;
// const filePath = `${process.cwd()}/src/08_resonant_collinearity/data/input.txt.example`;

const data = readData(filePath);
const antennaAnalyzer = new AntennaAnalyzer(data);

// Part 1
console.log(antennaAnalyzer.findAllAntinodes().size);

// Part 2
console.log(antennaAnalyzer.findAllAntinodesPartTwo().size)

