export function sortListOfNumbers(numbers: number[]): number[] {
    return [...numbers].sort((a, b) => a - b);
}