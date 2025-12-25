/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectToDB } from "@/lib/db/connectDB";
import Technologie from "@/lib/Schemas/TechnologieSchema";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const { name, icon, color, level } = await req.json();

    const existingTechnologie = await Technologie.findOne({ name });
    if (existingTechnologie) {
      return Response.json({
        message: "Technologie already exists",
        status: 400,
      });
    }

    const newTechnologie = new Technologie({ name, icon, color, level });
    await newTechnologie.save();

    return Response.json({
      message: "Technologie created successfully",
      status: 201,
      technologie: newTechnologie,
    });
  } catch (error: any) {
    return Response.json({ message: error.message, status: 400 });
  }
}

export async function GET() {
  try {
    await connectToDB();

    const technologies = await Technologie.find();
    return Response.json({ technologies, status: 200 });
  } catch (error: any) {
    return Response.json({ message: error.message, status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    // console.log("id in DELETE", id);

    const existingTechnologie = await Technologie.findOne({ _id: id });
    console.log("existingTechnologie in DELETE", existingTechnologie);
    if (!existingTechnologie) {
      return Response.json({
        message: "Technologie does not exist",
        status: 400,
      });
    }

    await Technologie.findOneAndDelete({ _id: id });

    return Response.json({
      message: "Technologie deleted successfully",
      status: 200,
    });
  } catch (error: any) {
    return Response.json({ message: error.message, status: 400 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const { name, icon, color, level } = await req.json();

    // console.log("id , name in PUT", id, name);

    const existingTechnologie = await Technologie.findOne({ _id: id });
    if (!existingTechnologie) {
      return Response.json({
        message: "Technologie does not exist",
        status: 400,
      });
    }

    const updatedTechnologie = await Technologie.findOneAndUpdate(
      { _id: id },
      { name, icon, color, level },
      { new: true }
    );

    return Response.json({
      message: "Technologie updated successfully",
      status: 200,
      technologie: updatedTechnologie,
    });
  } catch (error: any) {
    return Response.json({ message: error.message, status: 400 });
  }
}
