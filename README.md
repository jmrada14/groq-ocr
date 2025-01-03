<div align="center">
  <div>
    <h1 align="center">Groq OCR 🔬</h1>
  </div>
  <p>An npm library and CLI to run OCR with Groq provided models.</p>
<a href="https://groq.com" target="_blank" rel="noopener noreferrer">
  <img
    src="https://groq.com/wp-content/uploads/2024/03/PBG-mark1-color.svg"
    alt="Powered by Groq for fast inference."
    width="200"
    height="200"
  />
</a>
</div>

## Table of Contents
- [Disclaimer](#disclaimer)
- [Installation](#installation)
- [Usage](#usage)
  - [Use as NPM package](#use-as-npm-package)
  - [ocr options](#ocr-options)
  - [Use as CLI](#use-as-cli)
  - [CLI Examples](#cli-examples)
  - [CLI Options](#cli-options)
- [How it works](#how-it-works)
- [Models](#models)
- [Roadmap](#roadmap)
- [Credit](#credit)

---

## Disclaimer

_This project is still in development‼️_

_PDF support is limited to single-page local PDFs._

_PDF support relies on [pdftopic](https://github.com/Ilyes-El-Majouti/pdftopic) library which requires node>=12 and imagemagick._

_JSON mode might fail with `json_validate_failed` error_

## Installation

`npm i groq-ocr` to use as an NPM package.

`npm i -g groq-ocr` to use as a CLI.

## Usage

### Use as NPM package:

```javascript
import { ocr, GroqVisionModel } from "groq-ocr";
const result = await ocr({
  filePath: "./filepath.jpg", // Allowed formats: jpg, jpeg, png, pdf.
  apiKey: process.env.GROQ_API_KEY, // Get your API key from https://console.groq.com/
  model: GroqVisionModel.LLAMA_32_90B, // available models: LLAMA_32_11B, LLAMA_32_90B. Default: LLAMA_32_11B
  jsonMode: false, // Default: false. Set to true to get JSON output.
  additionalInstructions: "Additional instructions to be included in the prompt.", // Use to give custom instructions to the model.
});
```

### ocr options:

- **filePath** (required): Path to image/PDF file or URL
  - Supported formats: `.jpg`, `.jpeg`, `.png`, `.pdf`
- **apiKey** (optional): Groq API key
  - Defaults to `GROQ_API_KEY` environment variable
- **model** (optional): Vision model to use
  - `GroqVisionModel.LLAMA_32_11B` (default) - Llama 3.2 11B Vision Preview
  - `GroqVisionModel.LLAMA_32_90B` - Llama 3.2 90B Vision Preview
- **jsonMode** (optional): Return structured JSON instead of markdown
  - Defaults to `false`
- **additionalInstructions** (optional): Additional instructions to be included in the prompt.
  - Defaults to "" - use to give custom instructions to the model.

### Use as CLI:

Either set your Groq API key as environment variable:

```bash
export GROQ_API_KEY=your-api-key
```

Or provide it as CLI option with `-k` flag when running commands.

### CLI Examples

```bash
# Basic usage
groq-ocr -f image.jpg

# Output as JSON
groq-ocr -f scan.pdf -j

# Save to file
groq-ocr -f receipt.png -o result.txt

# Use specific model and API key
groq-ocr -f document.jpg -m llama-3.2-90b-vision-preview -k your-api-key
```

### CLI Options

- `-f, --file <path>` (required): Path to input image/PDF file
- `-k, --api-key <key>`: Groq API key (defaults to `GROQ_API_KEY` env var)
- `-m, --model <model>`: Vision model to use:
  - `llama-3.2-11b-vision-preview` (default)
  - `llama-3.2-90b-vision-preview`
- `-j, --json`: Output in JSON format instead of markdown
- `-o, --output <path>`: Write result to file instead of console
- `-V, --version`: Display version number
- `-h, --help`: Display help information


## How it works

This library and CLI uses multimodal models with vision capabilities provided by [Groq](https://groq.com/) to run OCR on images and PDFs and return markdown or JSON.

PDFs are converted to images using [pdftopic](https://github.com/Ilyes-El-Majouti/pdftopic).

## Models

The plan is to support all models provided by Groq with vision capabilities.
[Groq vision models](https://console.groq.com/docs/vision)

Currently supported models:

```typescript
enum GroqVisionModel {
  LLAMA_32_11B = "llama-3.2-11b-vision-preview",
  LLAMA_32_90B = "llama-3.2-90b-vision-preview",
}
```

## Roadmap

- [x] Add support for local images OCR
- [x] Add support for remote images OCR
- [x] Add support for single page PDFs
- [x] Add support for JSON output in addition to markdown
- [x] Add CLI 
- [x] extend prompt with custom instructions
- [ ] Add support for multi-page PDFs OCR (COMING SOON)


## Credit

This project was highly inspired by [llama-ocr](https://github.com/Nutlope/llama-ocr/tree/main).

[![Formatted with Biome](https://img.shields.io/badge/Formatted_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev/)
