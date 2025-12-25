/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectToDB } from "@/lib/db/connectDB";
import SkillsCategory from "@/lib/Schemas/SkillsCategorySchema";
import Skills from "@/lib/Schemas/SkillsSchema";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectToDB();
    const skillsCategories = await SkillsCategory.find().populate("skills");
    return NextResponse.json({ skillsCategories, status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch skills categories" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectToDB();
    const { skillsCategoryData } = await req.json();
    // console.log("POST data received:", skillsCategoryData.category);
    const { category, color, icon } = skillsCategoryData;
    // console.log("POST data received:", category, color, icon);

    const existSkillsCategory = await SkillsCategory.findOne({
      category: category,
    });

    if (existSkillsCategory) {
      return NextResponse.json(
        { error: "Skills category with this name already exists" },
        { status: 400 }
      );
    }

    const newSkillsCategory = await SkillsCategory.create({
      category,
      color,
      icon,
      skills: [],
    });

    console.log("newSkillsCategory=", newSkillsCategory);

    return NextResponse.json({ newSkillsCategory, status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create skills category" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    await connectToDB();
    const { id, data } = await req.json();
    const existSkillsCategory = await SkillsCategory.findOne({ _id: id });

    if (!existSkillsCategory) {
      return NextResponse.json(
        { error: "Skills category with this name does not exist" },
        { status: 400 }
      );
    }

    const updatedSkillsCategory = await SkillsCategory.findOneAndUpdate(
      { _id: id },
      data,
      {
        new: true,
      }
    );

    return NextResponse.json({ updatedSkillsCategory, status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update skills category" },
      { status: 500 }
    );
  }
}

// export async function DELETE(req: Request) {
//   try {
//     await connectToDB();
//     const { id } = await req.json();
//     const existSkillsCategory = await SkillsCategory.findOne({ _id: id });

//     if (!existSkillsCategory) {
//       return NextResponse.json(
//         { error: "Skills category with this name does not exist" },
//         { status: 400 }
//       );
//     }

//     const deletedSkillsCategory = await SkillsCategory.findOneAndDelete({
//       _id: id,
//     });

//     return NextResponse.json({ deletedSkillsCategory, status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to delete skills category" },
//       { status: 500 }
//     );
//   }
// }

export async function DELETE(req: Request) {
  try {
    await connectToDB();

    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { error: "Missing skills category ID" },
        { status: 400 }
      );
    }

    const existSkillsCategory = await SkillsCategory.findById(id);
    if (!existSkillsCategory) {
      return NextResponse.json(
        { error: "Skills category does not exist" },
        { status: 404 }
      );
    }

    // Delete all skills with this category
    await Skills.deleteMany({ category: id });

    // Then delete the category itself
    const deletedSkillsCategory = await SkillsCategory.findByIdAndDelete(id);

    return NextResponse.json({ deletedSkillsCategory }, { status: 200 });
  } catch (error) {
    console.error("Error deleting skills category:", error);
    return NextResponse.json(
      { error: "Failed to delete skills category" },
      { status: 500 }
    );
  }
}
