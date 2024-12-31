#!/usr/bin/env node

import { writeFile } from "node:fs/promises";
import { program } from "commander";
import { config } from "dotenv";
import { ocr } from "./index";
import type { GroqVisionModel } from "./index";

config();

program
	.name("groq-ocr")
	.description("CLI tool to perform OCR using Groq models")
	.version("1.0.1")
	.requiredOption("-f, --file <path>", "Path to image or PDF file")
	.option(
		"-k, --api-key <key>",
		"Groq API key (defaults to GROQ_API_KEY env variable)",
	)
	.option(
		"-m, --model <model>",
		"Model to use (llama-3.2-11b-vision-preview or llama-3.2-90b-vision-preview)",
	)
	.option("-j, --json", "Output in JSON format instead of markdown")
	.option("-o, --output <path>", "Write output to file instead of console")
	.parse();

const options = program.opts();

async function main() {
	try {
		const result = await ocr({
			filePath: options.file,
			apiKey: options.apiKey,
			model: options.model as GroqVisionModel,
			jsonMode: options.json || false,
		});

		if (options.output) {
			await writeFile(options.output, result);
			console.log(`Output written to ${options.output}`);
		} else {
			console.log(result);
		}
	} catch (error) {
		console.error("Error:", (error as Error).message);
		process.exit(1);
	}
}

main();
