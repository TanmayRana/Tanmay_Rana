/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectToDB } from "@/lib/db/connectDB";
import Project from "@/lib/Schemas/ProjectSchema";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectToDB();
    const projects = await Project.find();
    // console.log(projects);
    return NextResponse.json({ projects, status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectToDB();
    const data = await req.json();
    // console.log("data", data);

    const existProject = await Project.findOne({ name: data.title });

    if (existProject) {
      return NextResponse.json(
        { error: "Project with this title already exists" },
        { status: 400 }
      );
    }

    const newProject = await Project.create(data);

    return NextResponse.json({ newProject, status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    await connectToDB();
    const { id, data } = await req.json();
    const existProject = await Project.findOne({ _id: id });

    if (!existProject) {
      return NextResponse.json(
        { error: "Project with this title does not exist" },
        { status: 400 }
      );
    }

    const updatedProject = await Project.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });

    return NextResponse.json({ updatedProject, status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    await connectToDB();
    const { id } = await req.json();
    const existProject = await Project.findOne({ _id: id });

    if (!existProject) {
      return NextResponse.json(
        { error: "Project with this title does not exist" },
        { status: 400 }
      );
    }

    const updatedProject = await Project.findOneAndDelete({ _id: id });

    return NextResponse.json({ updatedProject, status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
