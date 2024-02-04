import { Storage } from "@google-cloud/storage";
import { NextResponse } from "next/server";

export async function GET(request) {
  const req = new URL(request.url);
  const filename = `images/ProductImages/${req.searchParams.get("file")}`;
  const bucketName = process.env.BUCKET_NAME;

  const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    credentials: {
      client_email: process.env.CLIENT_EMAIL,
      private_key: process.env.PRIVATE_KEY,
    },
  });

  const bucket = storage.bucket(bucketName);
  const file = bucket.file(filename);
  const options = {
    expires: Date.now() + 5 * 60 * 1000, //  5 minutes,
    fields: { "x-goog-meta-source": "nextjs-project" },
  };
  const [response] = await file.generateSignedPostPolicyV4(options);
  return NextResponse.json({ data: response }, { status: 200 });
}
