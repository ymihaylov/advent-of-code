import {isDecreasingList, isIncreasingList, isMonotonicList, sortListOfNumbers} from "../utils";

describe("Utility Functions", () => {
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

    describe("isIncreasingList", () => {
        it("should return true for a strictly increasing list", () => {
            expect(isIncreasingList([1, 2, 3, 4, 5])).toBe(true);
        });

        it("should return false for a non-increasing list", () => {
            expect(isIncreasingList([1, 3, 2, 4, 5])).toBe(false);
        });

        it("should return false for a decreasing list", () => {
            expect(isIncreasingList([5, 4, 3, 2, 1])).toBe(false);
        });

        it("should return true for a single-element list", () => {
            expect(isIncreasingList([1])).toBe(true);
        });

        it("should return true for an empty list", () => {
            expect(isIncreasingList([])).toBe(true);
        });
    });

    describe("isDecreasingList", () => {
        it("should return true for a strictly decreasing list", () => {
            expect(isDecreasingList([5, 4, 3, 2, 1])).toBe(true);
        });

        it("should return false for a non-decreasing list", () => {
            expect(isDecreasingList([5, 3, 4, 2, 1])).toBe(false);
        });

        it("should return false for an increasing list", () => {
            expect(isDecreasingList([1, 2, 3, 4, 5])).toBe(false);
        });

        it("should return true for a single-element list", () => {
            expect(isDecreasingList([5])).toBe(true);
        });

        it("should return true for an empty list", () => {
            expect(isDecreasingList([])).toBe(true);
        });
    });

    describe("isMonotonicList", () => {
        it("should return true for a strictly increasing list", () => {
            expect(isMonotonicList([1, 2, 3, 4, 5])).toBe(true);
        });

        it("should return true for a strictly decreasing list", () => {
            expect(isMonotonicList([5, 4, 3, 2, 1])).toBe(true);
        });

        it("should return false for a non-monotonic list", () => {
            expect(isMonotonicList([1, 3, 2, 4, 5])).toBe(false);
        });

        it("should return true for a single-element list", () => {
            expect(isMonotonicList([7])).toBe(true);
        });

        it("should return true for an empty list", () => {
            expect(isMonotonicList([])).toBe(true);
        });
    });
});
