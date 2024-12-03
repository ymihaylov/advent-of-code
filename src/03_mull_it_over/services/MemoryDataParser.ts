import {MulState, MemoryData, MultiplyPair} from "../types/types";

export class MemoryDataParser {

    private basicRegex = /mul\((\d+),(\d+)\)/g;
    private regexWithEnableFlagCheck = /(don't|do)|mul\((\d+),(\d+)\)/g;

    public parseWithoutEnableCheck(memoryData: MemoryData): MultiplyPair[] {
        const matches: MultiplyPair[] = [];

        let match: RegExpExecArray | null;
        while ((match = this.basicRegex.exec(memoryData)) !== null) {
            matches.push([parseInt(match[1]), parseInt(match[2])]);
        }

        return matches;
    }

    public parseWithEnableCheck(memoryData: MemoryData): MultiplyPair[] {
        const matches: MultiplyPair[] = [];
        let match: RegExpMatchArray | null;

        let isEnabled = true;

        while ((match = this.regexWithEnableFlagCheck.exec(memoryData)) !== null) {
            const [_, stateChange, num1, num2] = match;

            if (stateChange === MulState.Do) {
                isEnabled = true;
            } else if (stateChange === MulState.Dont) {
                isEnabled = false;
            } else if (isEnabled && num1 && num2) {
                matches.push([parseInt(num1), parseInt(num2)]);
            }
        }

        return matches;
    }
}
