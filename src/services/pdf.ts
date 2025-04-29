import PDFDocument from "pdfkit";
import { arrayBuffer } from "node:stream/consumers";

export async function generatePdf(words: string[]): Promise<Buffer> {
  const doc = new PDFDocument({ margin: 40 });
  doc
    .fontSize(18)
    .text("10 most necessary words", { align: "center" })
    .moveDown();

  for (let i = 0; i < words.length; i++) {
    doc.fontSize(14).text(`${i + 1}. ${words[i]}`);
  }
  doc.end();

  const bufAB = await arrayBuffer(doc);
  return Buffer.from(bufAB);
}
