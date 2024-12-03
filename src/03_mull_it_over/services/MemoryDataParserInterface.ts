import {MemoryData, MultiplyPair} from "../types/types";

export interface MemoryDataParserInterface {
    parseWithoutEnableCheck(memoryData: MemoryData): MultiplyPair[];
    parseWithEnableCheck(memoryData: MemoryData): MultiplyPair[];
}