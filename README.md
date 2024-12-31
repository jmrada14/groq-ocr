# Groq OCR 🔬

An npm library to run OCR with Groq provided models.

## Disclaimer

_This project is still in development‼️_
_PDF support is limited to single-page PDFs._

## Installation

`npm i groq-ocr`

## Usage

```javascript
import { ocr, GroqVisionModel } from "groq-ocr";
const result = await ocr({
  filePath: "./filepath.jpg",
  apiKey: process.env.GROQ_API_KEY,
  model: GroqVisionModel.LLAMA_32_90B,
});
```
