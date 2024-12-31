import fs from "fs";
import { GroqVisionModel, ocr } from "..";

async function main() {
  let markdown = await ocr({
    filePath: "./image.jpg",
    apiKey: process.env.GROQ_API_KEY,
    model: GroqVisionModel.LLAMA_32_90B,
  });
  // write the markdown to a file
  fs.writeFileSync("output.md", markdown);
}

main();
