import axios from "axios";
import * as cheerio from "cheerio";
import { topLongestWords } from "../utils/words.js";

export async function fetchAndExtractWords(
  url: string,
  limit: number
): Promise<string[]> {
  const { data } = await axios.get<string>(url);
  const $ = cheerio.load(data);
  const text = $("body").text();
  return topLongestWords(text, limit);
}
