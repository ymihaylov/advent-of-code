import {SimilarityScoreCalculator} from "../../../src/01_historian_hysteria/calculators/SimilarityScoreCalculator";

describe("SimilarityScoreCalculator", () => {
  it("should throw an error if lists have different lengths", () => {
    expect(() => new SimilarityScoreCalculator([1, 2, 3], [4, 5])).toThrow(
      "Lists have different lengths! 3 !== 2"
    );
  });

  it("should calculate similarity score correctly when lists have overlapping numbers", () => {
    const calculator = new SimilarityScoreCalculator([1, 2, 3], [3, 3, 2]);
    const similarityScore = calculator.calculateSimilarityScore();

    // Similarity Score: (1 * 0) + (2 * 1) + (3 * 2) = 8
    expect(similarityScore).toBe(8);
  });

  it("should calculate similarity score correctly when lists have no overlapping numbers", () => {
    const calculator = new SimilarityScoreCalculator([1, 2, 3], [4, 5, 6]);
    const similarityScore = calculator.calculateSimilarityScore();

    // Similarity Score: 0 (no overlaps)
    expect(similarityScore).toBe(0);
  });

  it("should calculate similarity score correctly with duplicate numbers in the lists", () => {
    const calculator = new SimilarityScoreCalculator([1, 1, 2], [1, 1, 3]);
    const similarityScore = calculator.calculateSimilarityScore();

    // Similarity Score: (1 * 2) + (1 * 2) + (2 * 0) = 4
    expect(similarityScore).toBe(4);
  });
});