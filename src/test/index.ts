import fs from "fs";
import { GroqVisionModel, ocr } from "..";
import { config } from "dotenv";
config();

async function main() {
  let markdown = await ocr({
    filePath: "",
    apiKey: process.env.GROQ_API_KEY,
    model: GroqVisionModel.LLAMA_32_90B,
  });
  // write the markdown to a file
  fs.writeFileSync("output.md", markdown);
}

main();
