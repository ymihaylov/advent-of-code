import {MemoryData, MultiplyPair, ParseMode} from "../types/types";
import {RegexMemoryDataParser} from "./RegexMemoryDataParser";

export class MemoryMultiplyProcessor {

    constructor(private readonly parser: RegexMemoryDataParser) {
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
