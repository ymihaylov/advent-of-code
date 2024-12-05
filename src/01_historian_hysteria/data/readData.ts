import * as fs from "fs";

export function readData(filePath: string): { list1: number[], list2: number[] } {
    const data = fs.readFileSync(filePath, "utf-8");

    const list1: number[] = [];
    const list2: number[] = [];

    data
        .trim()
        .split("\n")
        .forEach(line => {
            const [first, second] = line.trim().split(/\s+/).map(Number);

            list1.push(first);
            list2.push(second);
        });

    return {list1, list2}
}
