import * as fs from "fs";
import {Calculation} from "../types/types";

export function readData(filePath: string): Calculation[] {
    const lines = fs
        .readFileSync(filePath, "utf-8")
        .trim()
        .split("\n");

    return lines
        .map(line => {
            const lineSplit = line.split(": ");

            return {testValue: Number(lineSplit[0]), numbers: lineSplit[1].split(" ").map(Number)};
        })
}
