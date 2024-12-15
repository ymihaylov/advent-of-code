import {readData} from "./data/readData";
import {DiskRepresentation, FileId, FreeSpace} from "./types/types";

// === Problem Description - https://adventofcode.com/2024/day/9 ===

// const filePath = `${process.cwd()}/src/09_disk_fragmenter/data/input.txt`;
const filePath = `${process.cwd()}/src/09_disk_fragmenter/data/input.txt.example`;

const diskMapInput: number[] = readData(filePath);

function howManyFilesWithId(disk: DiskRepresentation, currentIndex: number): number {
    let count = 1;

    let j = currentIndex + 1;

    while (disk[j] === disk[currentIndex]) {
        count++;
        j++;
    }

    return count;
}

function transformDiskMapToDisk(diskMapInput: number[]): DiskRepresentation {
    return diskMapInput.flatMap((number, currentIndex) => {
            return Array(number).fill(currentIndex % 2 === 0 ? Number(currentIndex) / 2 : ".");
        }
    );
}

function calculateChecksum(disk: (FreeSpace | FileId)[]): number {
    return disk.reduce((previousSum, currentNumber, currentFileId) => {
        return currentNumber === "." ? previousSum : Number(previousSum) + Number(currentNumber) * Number(currentFileId);
    }, 0) as number;
}

function solutionPart1(diskMapInput: number[]): number {
    let disk: DiskRepresentation = transformDiskMapToDisk(diskMapInput);

    for (let currentIndex = disk.length - 1; currentIndex > 0; currentIndex--) {

        if (disk[currentIndex] === '.') {
            continue;
        }

        const freeSlotIndex = disk.findIndex((value) => value === '.');

        if (freeSlotIndex > -1 && freeSlotIndex < currentIndex) {
            disk[freeSlotIndex] = disk[currentIndex];
            disk[currentIndex] = '.';
        }
    }

    return calculateChecksum(disk);
}

function solutionPart2(diskMapInput: number[]): number {
    let disk: DiskRepresentation = transformDiskMapToDisk(diskMapInput);

    for (let num = Math.ceil(diskMapInput.length / 2) - 1; num >= 0; num--) {
        const idStartIndex = disk.indexOf(num),
            filesCount = howManyFilesWithId(disk, idStartIndex);

        for (let j = 0; j < idStartIndex; j++) {
            if (disk[j] === "." && howManyFilesWithId(disk, j) >= filesCount) {
                disk.splice(idStartIndex, filesCount, ...Array(filesCount).fill("."));
                disk.splice(j, filesCount, ...Array(filesCount).fill(num));

                break;
            }
        }
    }

    return calculateChecksum(disk);
}

console.log("Part 1 Fragmentation Checksum: " + solutionPart1(diskMapInput));
console.log("Part 2 Fragmentation Checksum: " + solutionPart2(diskMapInput));