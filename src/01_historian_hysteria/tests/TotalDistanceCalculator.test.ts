import {TotalDistanceCalculator} from "../calculators/TotalDistanceCalculator";

describe("TotalDistanceCalculator", () => {
  it("should throw an error if lists have different lengths", () => {
    expect(() => new TotalDistanceCalculator([1, 2, 3], [4, 5])).toThrow(
      "Lists have different lengths! 3 !== 2"
    );
  });

  it("should calculate total distance correctly when lists are pre-sorted", () => {
    const calculator = new TotalDistanceCalculator([1, 2, 3], [4, 5, 6]);
    const totalDistance = calculator.calculateTotalDistance();

    // Total Distance: |1 - 4| + |2 - 5| + |3 - 6| = 3 + 3 + 3 = 9
    expect(totalDistance).toBe(9);
  });

  it("should calculate total distance correctly for negative numbers", () => {
    const calculator = new TotalDistanceCalculator([-1, -2, -3], [-4, -5, -6]);
    const totalDistance = calculator.calculateTotalDistance();

    // Total Distance: |-1 - (-4)| + |-2 - (-5)| + |-3 - (-6)| = 3 + 3 + 3 = 9
    expect(totalDistance).toBe(9);
  });
});