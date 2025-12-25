/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectToDB } from "@/lib/db/connectDB";
import Resume from "@/lib/Schemas/ResumeSchema";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const { resumeUrl } = await req.json();

    const updatedResume = await Resume.findOneAndUpdate(
      {},
      { resumeUrl },
      { upsert: true, new: true }
    );

    return Response.json({ updatedResume, success: true });
  } catch (error: any) {
    return Response.json({ error: "Failed to update resume", success: false });
  }
}

export async function GET() {
  try {
    await connectToDB();
    const resume = await Resume.findOne();
    return Response.json(resume || {});
  } catch (error) {
    return Response.json({ error: "Failed to fetch resume" }, { status: 500 });
  }
}
