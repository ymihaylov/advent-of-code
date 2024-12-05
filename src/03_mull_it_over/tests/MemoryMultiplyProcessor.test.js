"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MemoryMultiplyProcessor_1 = require("../services/MemoryMultiplyProcessor");
var RegexMemoryDataParser_1 = require("../services/parsers/RegexMemoryDataParser");
var types_1 = require("../types/types");
describe("MemoryMultiplyProcessor", function () {
    var parser;
    var processor;
    beforeEach(function () {
        parser = new RegexMemoryDataParser_1.RegexMemoryDataParser();
        processor = new MemoryMultiplyProcessor_1.MemoryMultiplyProcessor(parser);
    });
    describe("multiply", function () {
        it("should calculate the correct product sum for ParseMode.NoEnableCheck", function () {
            var memoryData = "mockMemoryData";
            var mockPairs = [
                [2, 3],
                [4, 5],
            ];
            jest.spyOn(parser, "parseWithoutEnableCheck").mockReturnValue(mockPairs);
            var result = processor.multiply(memoryData, types_1.ParseMode.NoEnableCheck);
            expect(parser.parseWithoutEnableCheck).toHaveBeenCalledWith(memoryData);
            expect(result).toBe(2 * 3 + 4 * 5);
        });
        it("should calculate the correct product sum for ParseMode.EnableCheck", function () {
            var memoryData = "mockMemoryData";
            var mockPairs = [
                [1, 2],
                [3, 4],
            ];
            jest.spyOn(parser, "parseWithEnableCheck").mockReturnValue(mockPairs);
            var result = processor.multiply(memoryData, types_1.ParseMode.EnableCheck);
            expect(parser.parseWithEnableCheck).toHaveBeenCalledWith(memoryData);
            expect(result).toBe(1 * 2 + 3 * 4);
        });
        it("should handle empty pairs array gracefully", function () {
            var memoryData = "mockMemoryData";
            var mockPairs = [];
            jest.spyOn(parser, "parseWithoutEnableCheck").mockReturnValue(mockPairs);
            var result = processor.multiply(memoryData, types_1.ParseMode.NoEnableCheck);
            expect(parser.parseWithoutEnableCheck).toHaveBeenCalledWith(memoryData);
            expect(result).toBe(0);
        });
    });
    describe("calculateProductSum (private)", function () {
        it("should correctly calculate the product sum for valid pairs", function () {
            var pairs = [
                [3, 4],
                [5, 6],
            ];
            var result = processor.calculateProductSum(pairs);
            expect(result).toBe(3 * 4 + 5 * 6);
        });
        it("should return 0 for an empty pairs array", function () {
            var pairs = [];
            var result = processor.calculateProductSum(pairs);
            expect(result).toBe(0);
        });
    });
});
