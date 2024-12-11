export function sortListOfNumbers(numbers: number[]): number[] {
    return [...numbers].sort((a, b) => a - b);
}

export function isIncreasingList(numbers:  number[]): boolean {
    return numbers.every((num, i) => i === 0 || num > numbers[i - 1]);
}

export function isDecreasingList(numbers:  number[]): boolean {
    return numbers.every((num, i) => i === 0 || num < numbers[i - 1]);
}

export function isMonotonicList(numbers: number[]): boolean {
    return isIncreasingList(numbers) || isDecreasingList(numbers);
}

export function isValidPosition(row: number, col: number, data: string[][]): boolean {
    return row >= 0 && row < data.length && col >= 0 && col < data[row].length;
}