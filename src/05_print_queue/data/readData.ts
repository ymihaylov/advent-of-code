import * as fs from "fs";
import {Data, Rule} from "../types/types";

export function readData(filePath: string): Data {

    const fileContent = fs.readFileSync(filePath, "utf-8").trim();

    // Split by empty line
    const sections = fileContent.split(/\r?\n\r?\n/);

    let data: Data = {
        rules: [],
        updates: []
    };

    // Parse rules
    const rawRules = sections[0].split(/\r?\n/);
    data.rules = rawRules.map(parseRule);

    // Parse updates to check
    data.updates = sections[1]
        .split(/\n/)
        .map((line: string): number[] => line.split(",").map(Number));

    return data;
}

function parseRule(rawRule: string): Rule {
    const [number, shouldBeBefore] = rawRule.split("|").map(Number);
    return { number, shouldBeBefore };
}
