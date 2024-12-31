import fs from "fs";
import path from "path";
import { GroqVisionModel, ocr } from "../src";
import { config } from "dotenv";
config();

async function main() {
  // Test OCR on a local image file to markdown
  let markdown = await ocr({
    filePath: path.join(__dirname, "../test/image.jpg"),
    apiKey: process.env.GROQ_API_KEY,
    model: GroqVisionModel.LLAMA_32_90B,
  });
  fs.writeFileSync(path.join(__dirname, "output_image_to_md.md"), markdown);
}

main();
