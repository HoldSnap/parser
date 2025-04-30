import { describe, test, expect } from "vitest";
import { topLongestWords } from "../src/utils/words";

describe("topLongestWords", () => {
  test.each([
    {
      words: ["a", "bbb", "cc", "dddd", "ee"],
      limit: 3,
      expected: ["dddd", "bbb", "cc"],
    },
    {
      words: ["one", "two", "three", "four"],
      limit: 2,
      expected: ["three", "four"],
    },
    {
      words: ["short", "tiny"],
      limit: 5,
      expected: ["short", "tiny"],
    },
  ])("выбирает топ-$limit из $words", ({ words, limit, expected }) => {
    expect(topLongestWords(words.join(" "), limit)).toEqual(expected);
  });
});
