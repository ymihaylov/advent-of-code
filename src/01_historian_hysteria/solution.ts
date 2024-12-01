import {readData} from "./data/readData";
import {SimilarityScoreCalculator} from "./calculators/SimilarityScoreCalculator";
import {TotalDistanceCalculator} from "./calculators/TotalDistanceCalculator";

const filePath = `${process.cwd()}/src/01_historian_hysteria/data/input.txt`;
const result = readData(filePath);

// Challenge 1
const distanceCalculator = new TotalDistanceCalculator(result.list1, result.list2);
console.log("Total Distance:", distanceCalculator.calculateTotalDistance());

// Challenge 2
const similarityCalculator = new SimilarityScoreCalculator(result.list1, result.list2);
console.log("Similarity Score:", similarityCalculator.calculateSimilarityScore());