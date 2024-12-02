import {readData} from "./data/readData";
import {ReportAnalyzer} from "./analyzers/ReportAnalyzer";
import {Reports} from "./types";

const filePath = `${process.cwd()}/src/02_red_nose_reports/data/input.txt`;
const reports: Reports = readData(filePath);

const testReports: Reports = [
    [7, 6, 4, 2, 1],
    [1, 2, 7, 8, 9],
    [9, 7, 6, 2, 1],
    [1, 3, 2, 4, 5],
    [8, 6, 4, 4, 1],
    [1, 3, 6, 7, 9],
];

const reportAnalyzer = new ReportAnalyzer(reports);

// Part 1
console.log("Safe Reports: ", reportAnalyzer.getSafeReports().length);

// Part 2
console.log("Safe Reports Dampened: ", reportAnalyzer.getSafeReportsWithDampener().length);
