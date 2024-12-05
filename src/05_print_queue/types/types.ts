export type Rule = {
    number: number,
    shouldBeBefore: number,
}

export type Update = number[];

export type Data = {
    rules: Rule[],
    updates: Update[],
};