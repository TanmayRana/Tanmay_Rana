/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectToDB } from "@/lib/db/connectDB";
import { SocialMedia } from "@/lib/Schemas/socialMediaSchema";

export async function GET(req: Request) {
  try {
    await connectToDB();
    const contact = await SocialMedia.find();

    return Response.json({ contact, status: 200 });
  } catch (error) {
    return Response.json({ error, status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDB();

    // console.log("Received social media data:", req.json());

    const { github, linkedin, twitter } = await req.json();
    // console.log("Received social media data:", github, linkedin, twitter);

    // const {
    //   githunurl: github,
    //   linkedinurl: linkedin,
    //   twitterurl: twitter,
    // } = await req.json();

    const contact = await SocialMedia.findOneAndUpdate(
      {},
      {
        githunurl: github,
        linkedinurl: linkedin,
        twitterurl: twitter,
      },
      { new: true, upsert: true }
    );

    return Response.json({ contact, status: 200 });
  } catch (error) {
    console.error("Social media update error:", error);
    return Response.json(
      { error: "Failed to update social media links" },
      { status: 500 }
    );
  }
}
