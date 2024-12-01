import {sortListOfNumbers} from "../../utils";

export class TotalDistanceCalculator {

    private readonly list1: number[];
    private readonly list2: number[];

    public constructor(list1: number[], list2: number[]) {
        if (list1.length !== list2.length) {
            throw Error(`Lists have different lengths! ${list1.length} !== ${list2.length}`);
        }

        this.list1 = sortListOfNumbers(list1);
        this.list2 = sortListOfNumbers(list2);
    }

    public calculateTotalDistance(): number {
        return this.list1.reduce((totalDistance, value, index) => {
            return totalDistance + Math.abs(value - this.list2[index]);
        }, 0);
    }
}