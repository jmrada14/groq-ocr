import fs from "node:fs";
import path from "node:path";
import { config } from "dotenv";
import { GroqVisionModel, ocr } from "../src";
config();

const remoteJpg =
	"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/ReceiptSwiss.jpg/900px-ReceiptSwiss.jpg";
const localJpg = path.join(__dirname, "../test/sample.jpg");
const localPdf = path.join(__dirname, "../test/sample.pdf");
const localMultipagePdf = path.join(__dirname, "../test/hayekpretence.pdf");

async function markdownTests() {
	// Test OCR on a local image file to markdown
	const markdown = await ocr({
		filePath: localJpg,
		apiKey: process.env.GROQ_API_KEY,
		model: GroqVisionModel.LLAMA_32_90B,
	});
	fs.writeFileSync(path.join(__dirname, "output_image_to_md.md"), markdown);
	// Test OCR on a remote image file to markdown
	const markdown2 = await ocr({
		filePath: remoteJpg,
		apiKey: process.env.GROQ_API_KEY,
		model: GroqVisionModel.LLAMA_32_90B,
	});
	fs.writeFileSync(
		path.join(__dirname, "output_remote_image_to_md.md"),
		markdown2,
	);
	// Test OCR on a local PDF file to markdown
	const markdown3 = await ocr({
		filePath: localPdf,
		apiKey: process.env.GROQ_API_KEY,
		model: GroqVisionModel.LLAMA_32_90B,
	});
	fs.writeFileSync(path.join(__dirname, "output_pdf_to_md.md"), markdown3);
	// Test OCR on a local multipage PDF file to markdown
	const markdown4 = await ocr({
		filePath: localMultipagePdf,
		apiKey: process.env.GROQ_API_KEY,
		model: GroqVisionModel.LLAMA_32_90B,
	});
	fs.writeFileSync(path.join(__dirname, "output_multipdf_to_md.md"), markdown4);
}

async function jsonTests() {
	// Test OCR on a local image file to json
	const json = await ocr({
		filePath: localJpg,
		apiKey: process.env.GROQ_API_KEY,
		model: GroqVisionModel.LLAMA_32_90B,
		jsonMode: true,
	});
	fs.writeFileSync(path.join(__dirname, "output_image_to_json.json"), json);
	// Test OCR on a remote image file to json
	const json2 = await ocr({
		filePath: remoteJpg,
		apiKey: process.env.GROQ_API_KEY,
		model: GroqVisionModel.LLAMA_32_90B,
		jsonMode: true,
	});
	fs.writeFileSync(
		path.join(__dirname, "output_remote_image_to_json.json"),
		json2,
	);
	// Test OCR on a local PDF file to json
	const json3 = await ocr({
		filePath: localPdf,
		apiKey: process.env.GROQ_API_KEY,
		model: GroqVisionModel.LLAMA_32_90B,
		jsonMode: true,
	});
	fs.writeFileSync(path.join(__dirname, "output_pdf_to_json.json"), json3);
}

markdownTests();
jsonTests();
