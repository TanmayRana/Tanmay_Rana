import { connectToDB } from "@/lib/db/connectDB";
import SkillsCategory from "@/lib/Schemas/SkillsCategorySchema";
import Skills from "@/lib/Schemas/SkillsSchema";

// String-based icon mapping (used on frontend)
const ICON_MAP: Record<string, string> = {
  Frontend: "Globe",
  Backend: "Server",
  Database: "Database",
  "DevOps & Tools": "Cloud",
};

export async function GET() {
  try {
    await connectToDB();

    const categories = await SkillsCategory.find();
    const allSkills = await Skills.find();

    const skillCategories = categories.map((category) => {
      // Match skills where skill.category === category._id
      const matchedSkills = allSkills
        .filter(
          (skill) => skill?.category?.toString() === category?._id.toString()
        )
        .map((skill) => ({
          name: skill.name,
          level: skill.level,
        }));

      const iconKey = category?.category;
      const icon = ICON_MAP[iconKey] || "Default";

      return {
        title: iconKey,
        icon,
        color: category.color,
        skills: matchedSkills,
      };
    });

    return new Response(JSON.stringify(skillCategories), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching skill categories:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
