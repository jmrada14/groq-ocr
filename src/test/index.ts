import fs from "fs";
import { GroqVisionModel, ocr } from "..";

async function main() {
  let markdown = await ocr({
    filePath: "./image.jpg",
    apiKey: "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",
    model: GroqVisionModel.LLAMA_32_90B,
  });
  // write the markdown to a file
  fs.writeFileSync("output.md", markdown);
}

main();
