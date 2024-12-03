import {MemoryData, MultiplyPair, ParseMode} from "../types/types";
import {MemoryDataParser} from "./MemoryDataParser";

export class MemoryMultiplyProcessor {

    constructor(private readonly parser: MemoryDataParser) {
    }

    public multiply(memoryData: MemoryData, parseMod: ParseMode = ParseMode.NoEnableCheck): number {
        const pairs = parseMod === ParseMode.EnableCheck
            ? this.parser.parseWithEnableCheck(memoryData)
            : this.parser.parseWithoutEnableCheck(memoryData);

        return this.calculateProductSum(pairs);
    }

    private calculateProductSum(pairs: MultiplyPair[]): number {
        return pairs.reduce((acc, [a, b]) => acc + a * b, 0);
    }
}