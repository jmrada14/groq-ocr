<div align="center">
  <div>
    <h1 align="center">Groq OCR 🔬</h1>
  </div>
	<p>An npm library to run OCR with Groq provided models.</p>
<a href="https://groq.com" target="_blank" rel="noopener noreferrer">
  <img
    src="https://groq.com/wp-content/uploads/2024/03/PBG-mark1-color.svg"
    alt="Powered by Groq for fast inference."
    width="200"
    height="200"
  />
</a>
</div>

---

## Disclaimer

_This project is still in development‼️_

_PDF support is limited to single-page local PDFs._

_PDF support relies on [pdftopic](https://github.com/Ilyes-El-Majouti/pdftopic) library which requires node>=12 and imagemagick._

## Installation

`npm i groq-ocr`

## Usage

```javascript
import { ocr, GroqVisionModel } from "groq-ocr";
const result = await ocr({
  filePath: "./filepath.jpg", // Allowed formats: jpg, jpeg, png, pdf.
  apiKey: process.env.GROQ_API_KEY, // Get your API key from https://console.groq.com/
  model: GroqVisionModel.LLAMA_32_90B, // available models: LLAMA_32_11B, LLAMA_32_90B. Default: LLAMA_32_11B
  jsonMode: false, // Default: false. Set to true to get JSON output.
});
```

## How it works

This library uses multimodal models with vision capabilities provided by [Groq](https://groq.com/) to run OCR on images and PDFs and return markdown or JSON.

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
- [ ] Add support for multi-page PDFs OCR (COMING SOON)
- [ ] extend prompt with custom instructions

## Credit

This project was highly inspired by [llama-ocr](https://github.com/Nutlope/llama-ocr/tree/main).

[![Formatted with Biome](https://img.shields.io/badge/Formatted_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev/)
