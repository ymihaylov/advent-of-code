import {readData} from "./data/readData";

// === Problem Description - https://adventofcode.com/2024/day/9 ===

const filePath = `${process.cwd()}/src/09_disk_fragmenter/data/input.txt`;
// const filePath = `${process.cwd()}/src/09_disk_fragmenter/data/input.txt.example`;

const data = readData(filePath);

function part1_1(data: string[]) {
    let result: string[] = [];
    let currentId = 0;

    for (let i = 0; i < data.length; i++) {
        if (i % 2 === 0) {
            result.push(...Array.from({length: Number(data[i])}).fill(String(currentId)) as string[]);
            currentId++
            continue;
        }

        result.push(...Array.from({length: Number(data[i])}).fill('.') as string[]);
    }
    return result;
}

function part1_2(data: string[]) {


    for (let i = data.length - 1; i > 0; i--) {
        if (data[i] === '.') {
            continue;
        }

        const freeSlotIndex = data.findIndex((value) => value === '.');
        if (freeSlotIndex > -1 && freeSlotIndex < i) {
            data[freeSlotIndex] = data[i];
            data[i] = '.';
        }
    }

    return data;
}

function parseGroups(input: string): Map<number, string> {
    const result = new Map<number, string>();

    // Split by dots and filter out empty strings
    const parts = input.split(/\.+/).filter(Boolean);

    for (const part of parts) {
        if (part.length === 0) continue;

        if (part.length === 1 || (part.length > 1 && [...part].every(char => char === part[0]))) {
            // Handle single digit groups (0-9)
            const id = parseInt(part[0]);
            result.set(id, part);
        } else {
            // Handle multi-digit groups (10+)
            // Get the first two characters as the ID
            const id = parseInt(part.slice(0, 2));
            result.set(id, part);
        }
    }

    return result;
}

function part1(data: string[]) {
    let transform1 = part1_1(data);
    let transform2 = part1_2(transform1);

    let sum = 0;
    for (let i = 0; i < transform2.length; i++) {
        if (transform2[i] === '.') {
            break;
        }

        sum += i * Number(transform2[i]);
    }

    console.log(sum);
    // console.log(JSON.stringify(transform2) == JSON.stringify("0099811188827773336446555566..............".split("")));

    // console.log(result);
    // console.log(JSON.stringify(result) == JSON.stringify("00...111...2...333.44.5555.6666.777.888899".split("")));
}

function part2(data: string[]) {
    let transform1: string = part1_1(data).join('');


    let lastIndexFill = 0;

    let matches = parseGroups(transform1);
    for (const group of matches.values()) {
        const groupLength = group.length;

        const foundFreeSpaceIndex = transform1.indexOf('.'.repeat(groupLength));

        if (foundFreeSpaceIndex > -1 && foundFreeSpaceIndex < transform1.indexOf(group)) {
            lastIndexFill = foundFreeSpaceIndex + group.length;
            transform1 = transform1.replace(group, '.'.repeat(groupLength));

            transform1 = transform1.slice(0, foundFreeSpaceIndex) + group + transform1.slice(foundFreeSpaceIndex + groupLength);
        }
    }


    const array = transform1.split("");
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i] === '.') {
            continue;
        }

        sum += i * Number(array[i]);
    }

    console.log(sum);
    return;
}

// Part 1
part2(data);

// Part 2
