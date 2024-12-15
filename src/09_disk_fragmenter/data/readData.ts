import * as fs from "fs";

export function readData(filePath: string): number[] {
    return fs
        .readFileSync(filePath, "utf-8")
        .trim()
        .split("")
        .map(n => parseInt(n));
}
