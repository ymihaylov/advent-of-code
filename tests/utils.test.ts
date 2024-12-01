import {sortListOfNumbers} from "../src/utils";

describe("sortListOfNumbers", () => {
    it("should handle an empty list", () => {
        expect(sortListOfNumbers([])).toEqual([]);
    });

    it("should sort a list of numbers in ascending order", () => {
        expect(sortListOfNumbers([3, 1, 2])).toEqual([1, 2, 3]);
    });

    it("should not modify the original list", () => {
        const unsortedList = [3, 1, 2];
        const sortedList = sortListOfNumbers(unsortedList);

        expect(unsortedList).toEqual([3, 1, 2]);
        expect(sortedList).toEqual([1, 2, 3]);
    });
});
