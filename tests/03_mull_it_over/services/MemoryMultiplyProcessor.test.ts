import {MemoryMultiplyProcessor} from "../../../src/03_mull_it_over/services/MemoryMultiplyProcessor";
import {MemoryDataParser} from "../../../src/03_mull_it_over/services/MemoryDataParser";
import {MemoryData, MultiplyPair, ParseMode} from "../../../src/03_mull_it_over/types/types";

describe("MemoryMultiplyProcessor", () => {
    let parser: MemoryDataParser;
    let processor: MemoryMultiplyProcessor;

    beforeEach(() => {
        parser = new MemoryDataParser();
        processor = new MemoryMultiplyProcessor(parser);
    });

    describe("multiply", () => {
        it("should calculate the correct product sum for ParseMode.NoEnableCheck", () => {
            const memoryData: MemoryData = "mockMemoryData";
            const mockPairs: MultiplyPair[] = [
                [2, 3],
                [4, 5],
            ];

            jest.spyOn(parser, "parseWithoutEnableCheck").mockReturnValue(mockPairs);

            const result = processor.multiply(memoryData, ParseMode.NoEnableCheck);

            expect(parser.parseWithoutEnableCheck).toHaveBeenCalledWith(memoryData);
            expect(result).toBe(2 * 3 + 4 * 5);
        });

        it("should calculate the correct product sum for ParseMode.EnableCheck", () => {
            const memoryData: MemoryData = "mockMemoryData";
            const mockPairs: MultiplyPair[] = [
                [1, 2],
                [3, 4],
            ];

            jest.spyOn(parser, "parseWithEnableCheck").mockReturnValue(mockPairs);

            const result = processor.multiply(memoryData, ParseMode.EnableCheck);

            expect(parser.parseWithEnableCheck).toHaveBeenCalledWith(memoryData);
            expect(result).toBe(1 * 2 + 3 * 4);
        });

        it("should handle empty pairs array gracefully", () => {
            const memoryData: MemoryData = "mockMemoryData";
            const mockPairs: MultiplyPair[] = [];

            jest.spyOn(parser, "parseWithoutEnableCheck").mockReturnValue(mockPairs);

            const result = processor.multiply(memoryData, ParseMode.NoEnableCheck);

            expect(parser.parseWithoutEnableCheck).toHaveBeenCalledWith(memoryData);
            expect(result).toBe(0);
        });
    });

    describe("calculateProductSum (private)", () => {
        it("should correctly calculate the product sum for valid pairs", () => {
            const pairs: MultiplyPair[] = [
                [3, 4],
                [5, 6],
            ];

            const result = (processor as any).calculateProductSum(pairs);

            expect(result).toBe(3 * 4 + 5 * 6);
        });

        it("should return 0 for an empty pairs array", () => {
            const pairs: MultiplyPair[] = [];

            const result = (processor as any).calculateProductSum(pairs);

            expect(result).toBe(0);
        });
    });
});