import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import PDFDocument from "pdfkit";
import { arrayBuffer } from "node:stream/consumers";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function generatePdf(words: string[]): Promise<Buffer> {
  const doc = new PDFDocument({ margin: 40 });

  const fontPath = path.resolve(__dirname, "../assets/fonts/DejaVuSans.ttf");
  if (fs.existsSync(fontPath)) {
    try {
      doc.registerFont("DejaVuSans", fontPath);
      doc.font("DejaVuSans");
    } catch (err) {
      console.error("Error loading font DejaVuSans:", err);
      doc.font("Times-Roman");
    }
  } else {
    console.error(`Font file not found at ${fontPath}`);
    doc.font("Times-Roman");
  }

  doc
    .fontSize(18)
    .text("10 самых длинных слов", { align: "center" })
    .moveDown();

  words.forEach((word, idx) => {
    const len = word.length;
    doc.fontSize(14).text(`${idx + 1}. ${word} (длина: ${len})`);
  });

  doc.end();

  const bufAB = await arrayBuffer(doc);

  return Buffer.from(bufAB);
}
