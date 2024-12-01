import {sortListOfNumbers} from "../../utils";

export class SimilarityScoreCalculator {

    private readonly list1: number[];
    private readonly list2: number[];

    public constructor(list1: number[], list2: number[]) {
        if (list1.length !== list2.length) {
            throw Error(`Lists have different lengths! ${list1.length} !== ${list2.length}`);
        }

        this.list1 = sortListOfNumbers(list1);
        this.list2 = sortListOfNumbers(list2);
    }

    private buildFrequencyMap(numbers: number[]): Map<number, number> {
        const frequencyMap = new Map<number, number>();

        numbers.forEach((number: number) => {
            frequencyMap.set(number, (frequencyMap.get(number) || 0) + 1)
        });

        return frequencyMap;
    }

    public calculateSimilarityScore(): number {
        const frequencyMap = this.buildFrequencyMap(this.list2);

        return this.list1.reduce((similarityScore: number, number: number) => {
            return similarityScore + number * (frequencyMap.get(number) || 0);
        }, 0);
    }
}