import axios from "axios";
import * as cheerio from "cheerio";
import { topLongestWords } from "../utils/words.js";

export async function fetchAndExtractWords(
  url: string,
  limit: number
): Promise<string[]> {
  const { data } = await axios.get<string>(url);
  const $ = cheerio.load(data);

  const htmlWithSpaces = $("body").html()?.replace(/></g, "> <") || "";
  let text = cheerio.load(htmlWithSpaces).text();

  text = text.replace(/[_-]+/g, " ");
  text = text.replace(/[^A-Za-zА-ЯЁа-яё0-9]+/g, " ").trim();

  text = text.replace(/([a-zа-яё])([A-ZА-ЯЁ])/g, "$1 $2");
  text = text.replace(/([0-9])([A-Za-zА-ЯЁа-яё])/g, "$1 $2");
  text = text.replace(/([A-Za-zА-ЯЁа-яё])([0-9])/g, "$1 $2");

  return topLongestWords(text, limit);
}
