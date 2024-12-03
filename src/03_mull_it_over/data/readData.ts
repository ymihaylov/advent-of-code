import * as fs from "fs";

export function readData(filePath: string): string {
    return fs.readFileSync(filePath, "utf-8").trim();
}
