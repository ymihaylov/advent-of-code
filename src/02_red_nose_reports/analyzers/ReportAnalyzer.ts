import {isMonotonicList} from "../../utils";
import {Report, Reports} from "../types";

export class ReportAnalyzer {
    constructor(private readonly reports: Reports) {
    }

    private isSafeReport(report: Report): boolean {
        return isMonotonicList(report) && this.hasValidLevelDifferences(report);
    }

    private isSafeReportWithDampener(report: Report): boolean {
        if (this.isSafeReport(report)) {
            return true;
        }

        return report.some((_, index) => {
            const dampenedReport = [...report.slice(0, index), ...report.slice(index + 1)];

            return this.isSafeReport(dampenedReport);
        })
    }

    private hasValidLevelDifferences(report: Report): boolean {
        return report.every((level, index): boolean => {
            if (index === 0) {
                return true;
            }

            const diff = Math.abs(level - report[index - 1]);
            return diff >= 1 && diff <= 3;
        })
    }

    public getSafeReports(): Reports {
        return this.reports.filter(report => this.isSafeReport(report));
    }

    public getSafeReportsWithDampener(): Reports {
        return this.reports.filter(report => this.isSafeReportWithDampener(report));
    }
}
