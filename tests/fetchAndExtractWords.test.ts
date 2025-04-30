import { describe, beforeEach, test, expect, vi } from "vitest";
import axios from "axios";
import { fetchAndExtractWords } from "../src/services/parser";
import { topLongestWords } from "../src/utils/words";

vi.mock("axios");
vi.mock("../src/utils/words");

describe("fetchAndExtractWords", () => {
  const fakeHTML = `
    <body>
      HelloWorldCamelCase
      snake_case-word
      РусскоеСловоPascalCase123
      Другое123Русское
    </body>
  `;

  beforeEach(() => {
    const mockedGet = vi.mocked(axios.get);
    mockedGet.mockResolvedValue({ data: fakeHTML });

    const mockedTop = vi.mocked(topLongestWords);
    mockedTop.mockImplementation((text: string, limit: number) =>
      text.trim().split(/\s+/).slice(0, limit)
    );
  });

  test("разбивает CamelCase, snake_case и границы цифра↔буква", async() => {
    const words = await fetchAndExtractWords("https://example.com", 10);
    expect(words).toEqual([
      "Hello",
      "World",
      "Camel",
      "Case",
      "snake",
      "case",
      "word",
      "Русское",
      "Слово",
      "Pascal",
    ]);
  });

  test("обрезает результат до заданного limit", async() => {
    const words = await fetchAndExtractWords("https://example.com", 3);
    expect(words).toHaveLength(3);
  });

  test("устраняет множественные и внешние пробелы", async() => {
    vi.mocked(axios.get).mockResolvedValue({
      data: `<body>  A    B   C  </body>`,
    });

    const words = await fetchAndExtractWords("https://example.com", 10);
    expect(words).toEqual(["A", "B", "C"]);
  });
});
