// Mock the utility function for independent testing
import {Report, Reports} from "../../../src/02_red_nose_reports/types";
import {ReportAnalyzer} from "../../../src/02_red_nose_reports/analyzers/ReportAnalyzer";
import {isMonotonicList} from "../../../src/utils";

jest.mock("../../../src/utils", () => ({
    isMonotonicList: jest.fn(),
}));

describe("ReportAnalyzer", () => {
    let reports: Reports;
    let analyzer: ReportAnalyzer;

    beforeEach(() => {
        reports = [
            [7, 6, 4, 2, 1], // Safe
            [1, 2, 7, 8, 9], // Not safe
            [9, 7, 6, 2, 1], // Safe
            [1, 3, 2, 4, 5], // Safe with dampener (remove 3)
            [8, 6, 4, 4, 1], // Safe with dampener (remove one 4)
            [1, 3, 6, 7, 9], // Safe
        ];
        analyzer = new ReportAnalyzer(reports);
    });

    describe("isSafeReport", () => {
        it("should return true for a safe report", () => {
            (isMonotonicList as jest.Mock).mockReturnValue(true);

            const report: Report = [7, 6, 4, 2, 1];

            expect((analyzer as any).isSafeReport(report)).toBe(true);
        });

        it("should return false for a report that is not monotonic", () => {
            (isMonotonicList as jest.Mock).mockReturnValue(false);

            const report: Report = [1, 2, 1, 7, 8, 9];

            expect((analyzer as any).isSafeReport(report)).toBe(false);
        });

        it("should return false for a report with invalid level differences", () => {
            (isMonotonicList as jest.Mock).mockReturnValue(true);

            const report: Report = [7, 6, 4, 8, 1]; // 4 -> 8 difference > 3

            expect((analyzer as any).isSafeReport(report)).toBe(false);
        });
    });

    describe("isSafeReportWithDampener", () => {
        it("should return true for a safe report", () => {
            const report: Report = [7, 6, 4, 2, 1];

            jest.spyOn(analyzer as any, "isSafeReport").mockReturnValue(true);

            expect((analyzer as any).isSafeReportWithDampener(report)).toBe(true);
        });

        it("should return true for a report safe with one level removed", () => {
            const report: Report = [1, 3, 2, 4, 5]; // Removing 3 makes it safe

            jest.spyOn(analyzer as any, "isSafeReport")
                .mockImplementationOnce(() => false) // Original not safe
                .mockImplementationOnce(() => true); // Safe after dampening

            expect((analyzer as any).isSafeReportWithDampener(report)).toBe(true);
        });

        it("should return false for a report not safe even with dampener", () => {
            const report: Report = [1, 2, 7, 8, 9];

            jest.spyOn(analyzer as any, "isSafeReport").mockReturnValue(false);

            expect((analyzer as any).isSafeReportWithDampener(report)).toBe(false);
        });
    });

    describe("getSafeReports", () => {
        it("should return only safe reports", () => {
            (isMonotonicList as jest.Mock).mockImplementation((report: Report) =>
                [0, 2, 5].includes(reports.indexOf(report))
            );

            expect(analyzer.getSafeReports()).toEqual([
                [7, 6, 4, 2, 1],
                [1, 3, 6, 7, 9],
            ]);
        });
    });

    describe("getSafeReportsWithDampener", () => {
        it("should return only reports safe with dampener", () => {
            jest.spyOn(analyzer as any, "isSafeReportWithDampener").mockImplementation((report: Report) =>
                [0, 2, 3, 4, 5].includes(reports.indexOf(report))
            );

            expect(analyzer.getSafeReportsWithDampener()).toEqual([
                [7, 6, 4, 2, 1],
                [9, 7, 6, 2, 1],
                [1, 3, 2, 4, 5],
                [8, 6, 4, 4, 1],
                [1, 3, 6, 7, 9],
            ]);
        });
    });
});
