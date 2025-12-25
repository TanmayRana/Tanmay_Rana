import { connectToDB } from "@/lib/db/connectDB";
import Project from "@/lib/Schemas/ProjectSchema";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        await connectToDB();
        const featuredProjects = await Project.find({ featured: true });
        return NextResponse.json({ projects: featuredProjects, status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch featured projects" },
            { status: 500 }
        );
    }
}
