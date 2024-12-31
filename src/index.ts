import fs from "fs";
import Groq from "groq-sdk";

/**
 * Enumeration representing available Groq Vision model options.
 * @enum {string}
 * @readonly
 * @description Models that can be used for vision and language processing with Groq API
 */
export enum GroqVisionModel {
  LLAMA_32_11B = "llama-3.2-11b-vision-preview",
  LLAMA_32_90B = "llama-3.2-90b-vision-preview",
}

/**
 * Performs Optical Character Recognition (OCR) on an image file using Groq's API.
 *
 * @param options - The OCR options
 * @param options.filePath - The path to the image file to perform OCR on. Accepts local file paths or remote URLs. Allowed extensions: .jpg, .jpeg, .png, .pdf
 * @param options.apiKey - Optional Groq API key. Defaults to GROQ_API_KEY environment variable
 * @param options.model - Optional Groq vision model to use. Defaults to LLAMA_32_11B
 * @returns Promise<string> A promise that resolves to the extracted text in markdown format
 */
export async function ocr({
  filePath,
  apiKey = process.env.GROQ_API_KEY,
  model = GroqVisionModel.LLAMA_32_11B,
}: {
  filePath: string;
  apiKey?: string;
  model?: GroqVisionModel;
}) {
  const client = new Groq({ apiKey });
  return await getMarkdown({ groq: client, model, filePath });
}

/**
 * Converts an image into precise Markdown format, maintaining the original document's visual hierarchy and structure.
 *
 * @param options - The options object
 * @param options.groq - The Groq client instance
 * @param options.model - The GroqVision model to use for image processing
 * @param options.filePath - Path to the image file (can be local path or remote URL)
 *
 * @returns Promise<string> A promise that resolves to the Markdown representation of the image
 **/
async function getMarkdown({
  groq,
  model,
  filePath,
}: {
  groq: Groq;
  model: GroqVisionModel;
  filePath: string;
}) {
  const systemPrompt = `Convert the provided image into Markdown format. 
  Ensure that all content from the page is included, such as headers, footers, subtexts, images (with alt text if possible), tables, and any other elements.
  Preserve the exact visual hierarchy and semantic structure of the original document.
  Requirements:

  - Output Only Markdown: Return solely the Markdown content without any additional explanations or comments.
  - No Delimiters: Do not use code fences or delimiters like \`\`\`markdown.
  - Complete Content: Do not omit any part of the page, including headers, footers, and subtext.
  - Keep the text in the same order as the original document.
  - Keep the text as close to the original formatting as possible.
  - Do NOT include any text that is not visible on the image.
  - Compare output structure to original document layout
  - Verify all content is included without omissions
  - Ensure semantic meaning is preserved
  - Confirm heading hierarchy matches visual importance
  - Validate table column alignment matches source
  `;
  const imageUrl = isRemoteFile(filePath)
    ? filePath
    : `data:image/jpeg;base64,${encodeImage(filePath)}`;
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: systemPrompt,
          },
          {
            type: "image_url",
            image_url: {
              url: imageUrl,
            },
          },
        ],
      },
    ],
    model: model,
    stream: false,
    stop: null,
  });
  return completion.choices[0].message.content;
}

/**
 * Reads an image file from the specified path and converts it to a base64 encoded string.
 *
 * @param imagePath - The file system path to the image file
 * @returns A base64 encoded string representation of the image
 * @throws {Error} If the file cannot be read or does not exist
 */
function encodeImage(imagePath: string) {
  try {
    if (!fs.existsSync(imagePath)) {
      throw new Error(`Image file not found: ${imagePath}`);
    }
    const imageFile = fs.readFileSync(imagePath);
    return Buffer.from(imageFile).toString("base64");
  } catch (error) {
    throw new Error(`Failed to encode image: ${(error as Error).message}`);
  }
}

/**
 * Determines if a file path is a remote URL.
 *
 * @param filePath - The file path to check
 * @returns boolean True if the path is a remote URL (starts with http:// or https://), false otherwise
 * @throws {Error} If filePath is not a string
 */
function isRemoteFile(filePath: string): boolean {
  if (typeof filePath !== "string") {
    throw new Error("File path must be a string");
  }
  return filePath.startsWith("http://") || filePath.startsWith("https://");
}
