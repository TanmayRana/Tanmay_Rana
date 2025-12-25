/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectToDB } from "@/lib/db/connectDB";
import SkillsCategory from "@/lib/Schemas/SkillsCategorySchema";
import Skills from "@/lib/Schemas/SkillsSchema";
// import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const filter = category ? { category } : {};
    const skills = await Skills.find(filter).populate("category");
    const SkillData = skills.map((skill) => {
      return {
        _id: skill._id,
        name: skill.name,
        level: skill.level,
        category: skill.category.category,
      };
    });
    return NextResponse.json({ skills: SkillData, status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 }
    );
  }
}

// export async function POST(req: Request) {
//   try {
//     const data = await req.json();
//     const { name, level, category } = data;

//     // console.log("data in POST", data);

//     // Check if skill already exists
//     const existSkill = await Skills.findOne({ name });
//     if (existSkill) {
//       return NextResponse.json(
//         { error: "Skill with this name already exists" },
//         { status: 400 }
//       );
//     }

//     const categoryData = await SkillsCategory.findOne({ category: category });
//     console.log("category in POST", categoryData);

//     if (!categoryData) {
//       return NextResponse.json(
//         { error: "Category not found" },
//         { status: 404 }
//       );
//     }

//     const categoryId = categoryData._id;

//     const newSkill = await Skills.create({
//       name,
//       level,
//       category: categoryId,
//     });

//     // Add the new skill reference to the category using a MongoDB $push update
//     await SkillsCategory.findByIdAndUpdate(categoryId, {
//       $push: { skills: newSkill._id },
//     });

//     return NextResponse.json({ newSkill }, { status: 200 });
//   } catch (error) {
//     console.error("POST error:", error);
//     return NextResponse.json(
//       { error: "Failed to create skill" },
//       { status: 500 }
//     );
//   }
// }

export async function POST(req: Request) {
  try {
    await connectToDB();
    const { name, level, category } = await req.json();

    // 1. Validate input
    if (!name || !level || !category) {
      return NextResponse.json(
        { error: "name, level, and category are required" },
        { status: 400 }
      );
    }

    // 2. Check duplicate skill
    const existingSkill = await Skills.findOne({ name }).lean();
    if (existingSkill) {
      return NextResponse.json(
        { message: "Skill with this name already exists" },
        { status: 409 }
      );
    }

    // 3. Find category (as a Mongoose document, not lean)
    const categoryDoc = await SkillsCategory.findOne({ category });

    // console.log("categoryDoc", categoryDoc);

    if (!categoryDoc) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // 4. Create skill
    const newSkill = await Skills.create({
      name,
      level,
      category: categoryDoc._id,
    });

    // 5. Ensure skills array exists and push new skill id, then save
    if (!Array.isArray((categoryDoc as any).skills)) {
      (categoryDoc as any).skills = [];
    }

    (categoryDoc as any).skills.push(newSkill._id);
    await categoryDoc.save();

    // console.log("Updated category after adding skill", categoryDoc);

    return NextResponse.json({ newSkill }, { status: 201 });
  } catch (error) {
    console.error("Skill POST error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing skill ID" }, { status: 400 });
    }

    const data = await req.json();
    const { name, level, category } = data;
    // console.log("PUT data received:", data);

    const existSkill = await Skills.findById(id).populate("category");
    if (!existSkill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    let categoryId = existSkill.category._id; // default: same category

    if (existSkill.category.category !== category) {
      const categoryData = await SkillsCategory.findOne({ category });
      if (!categoryData) {
        return NextResponse.json(
          { error: "Category not found" },
          { status: 404 }
        );
      }
      categoryId = categoryData._id;
    }

    const updatedData = { name, level, category: categoryId };

    const updatedSkill = await Skills.findByIdAndUpdate(
      id,
      updatedData, // ✅ Correct structure
      { new: true }
    );

    return NextResponse.json({ updatedSkill }, { status: 200 });
  } catch (error) {
    console.error("Error in PUT /api/skills:", error);
    return NextResponse.json(
      { error: "Failed to update skill" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const existSkill = await Skills.findOne({ _id: id });

    if (!existSkill) {
      return NextResponse.json(
        { error: "Skill with this name does not exist" },
        { status: 400 }
      );
    }

    // Remove skill reference from its category's skills array
    await SkillsCategory.updateOne(
      { _id: existSkill.category },
      { $pull: { skills: existSkill._id } }
    );

    const deletedSkill = await Skills.findOneAndDelete({ _id: id });

    return NextResponse.json({ deletedSkill, status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete skill" },
      { status: 500 }
    );
  }
}
