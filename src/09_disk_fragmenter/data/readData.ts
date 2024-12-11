import * as fs from "fs";

export function readData(filePath: string): string[][] {
    const lines = fs
        .readFileSync(filePath, "utf-8")
        .trim()
        .split("\n");

    return lines
        .map(line => {
            return line.split("");
        });
}
