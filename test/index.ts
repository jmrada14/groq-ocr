import fs from "node:fs";
import path from "node:path";
import { config } from "dotenv";
import { GroqVisionModel, ocr } from "../src";
config();

async function main() {
	// Test OCR on a local image file to markdown
	const markdown = await ocr({
		filePath: path.join(__dirname, "../test/image.jpg"),
		apiKey: process.env.GROQ_API_KEY,
		model: GroqVisionModel.LLAMA_32_90B,
	});
	fs.writeFileSync(path.join(__dirname, "output_image_to_md.md"), markdown);
}

main();
