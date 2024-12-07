"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readData = readData;
var fs = require("fs");
function readData(filePath) {
    var fileContent = fs.readFileSync(filePath, "utf-8").trim();
    // Split by empty line
    var sections = fileContent.split(/\r?\n\r?\n/);
    var data = {
        rules: [],
        updates: []
    };
    // Parse rules
    var rawRules = sections[0].split(/\r?\n/);
    data.rules = rawRules.map(parseRule);
    // Parse updates to check
    data.updates = sections[1]
        .split(/\n/)
        .map(function (line) { return line.split(",").map(Number); });
    return data;
}
function parseRule(rawRule) {
    var _a = rawRule.split("|").map(Number), number = _a[0], shouldBeBefore = _a[1];
    return { number: number, shouldBeBefore: shouldBeBefore };
}
