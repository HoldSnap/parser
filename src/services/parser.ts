import axios from "axios";
import * as cheerio from "cheerio";
import { topLongestWords } from "../utils/words.js";

export async function fetchAndExtractWords(
  url: string,
  limit: number
): Promise<string[]> {
  const { data } = await axios.get<string>(url);
  const $ = cheerio.load(data);

  $("script, style, noscript").remove();

  let text = $("body").text();

  text = text
    .replace(/[_-]+/g, " ")
    .replace(/[^A-Za-zА-ЯЁа-яё0-9]+/g, " ")
    .trim()
    .replace(/([a-zа-яё])([A-ZА-ЯЁ])/g, "$1 $2")
    .replace(/([0-9])([A-Za-zА-ЯЁа-яё])/g, "$1 $2")
    .replace(/([A-Za-zА-ЯЁа-яё])([0-9])/g, "$1 $2");

  return topLongestWords(text, limit);
}
