import {readData} from "./data/readData";
import {Calculation} from "./types/types";

// === Problem Description - https://adventofcode.com/2024/day/7 ===

// const filePath = `${process.cwd()}/src/07_bridge_repair/data/input.txt`;
const filePath = `${process.cwd()}/src/07_bridge_repair/data/input.txt.example`;

const data = readData(filePath);

// === Part 1
const PART_1_SYMBOLS = ["+", "*"];
const PART_2_SYMBOLS = ["+", "*", "||"];

function filterGoodCalculations(calculations: Calculation[], symbols: string[]): Calculation[] {
    const goodCalculation: Calculation[] = []

    for (const calculation of calculations) {
        const permutations = generatePermutations(symbols, calculation.numbers.length - 1);

        for (const permutation of permutations) {
            const result = doTheCalculation(calculation.numbers, permutation);

            if (result === calculation.testValue) {
                goodCalculation.push(calculation);
                break;
            }
        }
    }

    return goodCalculation;
}

// === Do the calculation
function doTheCalculation(calculation: number[], permutation: string[]): number {
    if (calculation.length === 0) {
        return 0;
    }

    let calculationResult = calculation[0];

    for (let i = 0; i < calculation.length; i++) {
        if (i === calculation.length - 1) {
            return calculationResult;
        }

        if (permutation[i] === "+") {
            calculationResult = calculationResult + calculation[i + 1];
            continue;
        }

        if (permutation[i] === "*") {
            calculationResult = calculationResult * calculation[i + 1];
            continue;
        }

        if (permutation[i] === "||") {
            calculationResult = Number(`${calculationResult}${calculation[i + 1]}`);
        }
    }

    return calculationResult;
}

// === Symbol Permutations
function generatePermutations(symbols: string[], n: number): string[][] {
    if (n === 0) {
        return [[]];
    }

    const smallerPermutations = generatePermutations(symbols, n - 1);
    const permutations: string[][] = [];

    for (const symbol of symbols) {
        for (const permutation of smallerPermutations) {
            permutations.push([symbol, ...permutation]);
        }
    }

    return permutations;
}

function generatePermutationsWithBacktrack(symbols: string[], n: number): string[][] {
    const result: string[][] = [];

    function backtrack(current: string[]) {
        if (current.length === n) {
            result.push([...current]);
            return;
        }

        for (const symbol of symbols) {
            current.push(symbol);
            backtrack(current);
            current.pop();
        }
    }

    backtrack([]);

    return result;
}

const part1Sum = filterGoodCalculations (data, PART_1_SYMBOLS).reduce((acc, calculation) => acc + calculation.testValue, 0);
const part2Sum = filterGoodCalculations (data, PART_2_SYMBOLS).reduce((acc, calculation) => acc + calculation.testValue, 0);

console.log(part1Sum);
console.log(part2Sum);
