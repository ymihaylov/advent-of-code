"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RegexMemoryDataParser_1 = require("../services/parsers/RegexMemoryDataParser");
describe("MemoryDataParser", function () {
    var parser;
    beforeEach(function () {
        parser = new RegexMemoryDataParser_1.RegexMemoryDataParser();
    });
    describe("parseWithoutEnableCheck", function () {
        it("should parse all valid mul pairs", function () {
            var input = "mul(2,3) mul(4,5) mul(6,7)";
            var expected = [
                [2, 3],
                [4, 5],
                [6, 7],
            ];
            var result = parser.parseWithoutEnableCheck(input);
            expect(result).toEqual(expected);
        });
        it("should return an empty array when no mul pairs are found", function () {
            var input = "no mul pairs here";
            var result = parser.parseWithoutEnableCheck(input);
            expect(result).toEqual([]);
        });
        it("should ignore malformed mul pairs", function () {
            var input = "mul(2,3) mul(4,not_a_number) mul(5,6)";
            var expected = [
                [2, 3],
                [5, 6],
            ];
            var result = parser.parseWithoutEnableCheck(input);
            expect(result).toEqual(expected);
        });
    });
    describe("parseWithEnableCheck", function () {
        it("should parse mul pairs when always enabled", function () {
            var input = "mul(2,3) mul(4,5)";
            var expected = [
                [2, 3],
                [4, 5],
            ];
            var result = parser.parseWithEnableCheck(input);
            expect(result).toEqual(expected);
        });
        it("should skip mul pairs when disabled by don't", function () {
            var input = "don't mul(2,3) mul(4,5)";
            var expected = [];
            var result = parser.parseWithEnableCheck(input);
            expect(result).toEqual(expected);
        });
        it("should re-enable parsing after do", function () {
            var input = "don't mul(2,3) do mul(4,5) mul(6,7)";
            var expected = [
                [4, 5],
                [6, 7],
            ];
            var result = parser.parseWithEnableCheck(input);
            expect(result).toEqual(expected);
        });
        it("should correctly handle multiple do and don't toggles", function () {
            var input = "\n                mul(2,3)\n                don't mul(4,5)\n                do mul(6,7)\n                don't mul(8,9)\n                do mul(10,11) mul(12,13)\n            ";
            var expected = [
                [2, 3],
                [6, 7],
                [10, 11],
                [12, 13],
            ];
            var result = parser.parseWithEnableCheck(input);
            expect(result).toEqual(expected);
        });
        it("should return an empty array when no valid mul pairs are enabled", function () {
            var input = "don't mul(2,3) don't mul(4,5)";
            var result = parser.parseWithEnableCheck(input);
            expect(result).toEqual([]);
        });
        it("should ignore malformed mul pairs even when enabled", function () {
            var input = "\n                do mul(2,3)\n                mul(4,not_a_number)\n                mul(5,6)\n            ";
            var expected = [
                [2, 3],
                [5, 6],
            ];
            var result = parser.parseWithEnableCheck(input);
            expect(result).toEqual(expected);
        });
    });
});
