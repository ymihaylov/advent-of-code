import {RegexMemoryDataParser} from "../services/parsers/RegexMemoryDataParser";
import {MemoryData, MultiplyPair} from "../types/types";

describe("MemoryDataParser", () => {
    let parser: RegexMemoryDataParser;

    beforeEach(() => {
        parser = new RegexMemoryDataParser();
    });

    describe("parseWithoutEnableCheck", () => {
        it("should parse all valid mul pairs", () => {
            const input: MemoryData = "mul(2,3) mul(4,5) mul(6,7)";
            const expected: MultiplyPair[] = [
                [2, 3],
                [4, 5],
                [6, 7],
            ];

            const result = parser.parseWithoutEnableCheck(input);
            expect(result).toEqual(expected);
        });

        it("should return an empty array when no mul pairs are found", () => {
            const input: MemoryData = "no mul pairs here";
            const result = parser.parseWithoutEnableCheck(input);
            expect(result).toEqual([]);
        });

        it("should ignore malformed mul pairs", () => {
            const input: MemoryData = "mul(2,3) mul(4,not_a_number) mul(5,6)";
            const expected: MultiplyPair[] = [
                [2, 3],
                [5, 6],
            ];

            const result = parser.parseWithoutEnableCheck(input);
            expect(result).toEqual(expected);
        });
    });

    describe("parseWithEnableCheck", () => {
        it("should parse mul pairs when always enabled", () => {
            const input: MemoryData = "mul(2,3) mul(4,5)";
            const expected: MultiplyPair[] = [
                [2, 3],
                [4, 5],
            ];

            const result = parser.parseWithEnableCheck(input);
            expect(result).toEqual(expected);
        });

        it("should skip mul pairs when disabled by don't", () => {
            const input: MemoryData = "don't mul(2,3) mul(4,5)";
            const expected: MultiplyPair[] = [];

            const result = parser.parseWithEnableCheck(input);
            expect(result).toEqual(expected);
        });

        it("should re-enable parsing after do", () => {
            const input: MemoryData = "don't mul(2,3) do mul(4,5) mul(6,7)";
            const expected: MultiplyPair[] = [
                [4, 5],
                [6, 7],
            ];

            const result = parser.parseWithEnableCheck(input);
            expect(result).toEqual(expected);
        });

        it("should correctly handle multiple do and don't toggles", () => {
            const input: MemoryData = `
                mul(2,3)
                don't mul(4,5)
                do mul(6,7)
                don't mul(8,9)
                do mul(10,11) mul(12,13)
            `;
            const expected: MultiplyPair[] = [
                [2, 3],
                [6, 7],
                [10, 11],
                [12, 13],
            ];

            const result = parser.parseWithEnableCheck(input);
            expect(result).toEqual(expected);
        });

        it("should return an empty array when no valid mul pairs are enabled", () => {
            const input: MemoryData = "don't mul(2,3) don't mul(4,5)";
            const result = parser.parseWithEnableCheck(input);
            expect(result).toEqual([]);
        });

        it("should ignore malformed mul pairs even when enabled", () => {
            const input: MemoryData = `
                do mul(2,3)
                mul(4,not_a_number)
                mul(5,6)
            `;
            const expected: MultiplyPair[] = [
                [2, 3],
                [5, 6],
            ];

            const result = parser.parseWithEnableCheck(input);
            expect(result).toEqual(expected);
        });
    });
});