import { Request, Response } from "express";
import { fetchAndExtractWords } from "../services/parser.js";
import { generatePdf } from "../services/pdf.js";

export async function parseHandler(req: Request, res: Response): Promise<void> {
  const url = String(req.query.url ?? "");
  if (!url) {
    res.status(400).send("Missing url parameter");

    return;
  }

  try {
    const words = await fetchAndExtractWords(url, 10);
    const pdf = await generatePdf(words);

    res
      .type("application/pdf")
      .set("Content-Disposition", "attachment; filename=words.pdf")
      .send(pdf);
  } catch {
    res.status(500).send("Internal Server Error");
  }
}
