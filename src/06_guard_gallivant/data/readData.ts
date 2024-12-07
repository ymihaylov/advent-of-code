import * as fs from "fs";
import {LabMap} from "../types/types";

export function readData(filePath: string): LabMap {
    return fs
        .readFileSync(filePath, "utf-8")
        .trim()
        .split("\n")
        .map(line => {
            return line.split("");
        });
}
