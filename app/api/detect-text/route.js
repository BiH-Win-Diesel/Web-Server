import { NextResponse } from "next/server";
import vision from "@google-cloud/vision";

export async function POST(request) {
  const client = new vision.ImageAnnotatorClient({
    credentials: {
      private_key: process.env.PRIVATE_KEY,
      client_email: process.env.CLIENT_EMAIL,
    },
  });

  const rq = await request.json();
  const { imageUrl } = rq;

  try {
    const [result] = await client.documentTextDetection(imageUrl);
    const fullTextAnnotation = result.fullTextAnnotation;

    if (!fullTextAnnotation) {
      return NextResponse.json(
        { detectedText: "Not detected" },
        { status: 200 }
      );
    }

    const calculateSize = (vertices) => {
      const width = vertices[1].x - vertices[0].x;
      const height = vertices[2].y - vertices[1].y;
      return width * height;
    };

    let largestText = "";
    let largestSize = 0;

    fullTextAnnotation.pages.forEach((page) => {
      page.blocks.forEach((block) => {
        block.paragraphs.forEach((paragraph) => {
          paragraph.words.forEach((word) => {
            const wordText = word.symbols.map((s) => s.text).join("");
            const size = calculateSize(word.boundingBox.vertices);
            if (size > largestSize) {
              largestSize = size;
              largestText = wordText;
            }
          });
        });
      });
    });

    const productName = largestText || "Not detected";
    return NextResponse.json({ productName: productName }, { status: 200 });
  } catch (error) {
    console.error("Error processing image:", error);
    return NextResponse.json(
      { data: "Error processing image:" },
      { status: 500 }
    );
  }
}
