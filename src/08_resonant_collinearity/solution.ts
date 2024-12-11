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


// 1. Im using AntennaSymbol as a key to store the positions of the antennas
// 2. Why Char is type and Position and Antinode are interface? How you decide when to use type and when to use interface?
// 3. Is this with antennaMap the best approach? Can you suggest something else but still readable and easy understandable?
// 4. Are the foreaches are too much? Or it is fine?
// 5. Is this a common way to do it in typescript? - if (symbol === ".") continue; I really preffer the full thing with curly braces
// 6. This is not working so straight forward:
// if (!map.has(symbol)) {
//     map.set(symbol, []);
// }
// It shoold be symbol as AntennaSymbol or const symbol = grid[row][col] as AntennaSymbol;
// 7.How is better to be AntennaAnalyzer - as a service or as constructor? What I mean
// COnstructor - as it is now. One Antenna analyzer receives one grid and works only with it
// Service - the class is not couple to grid. findAllAntinodes will receive a grid which should find antinodes
