/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import ImageKit from "imagekit";
import { v4 as uuidv4 } from "uuid";

// Initialize ImageKit
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export async function POST(req: Request) {
  try {
    const { file } = await req.json();
    // console.log("file", file);

    const imageId = uuidv4();

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    const response = await imagekit.upload({
      file, // base64 string (without data:image/png;base64, prefix)
      fileName: `${imageId}.png`,
    });
    // console.log("response", response);

    return NextResponse.json({ url: response.url }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
