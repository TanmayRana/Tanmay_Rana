/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectToDB } from "@/lib/db/connectDB";
import About, { Passions } from "@/lib/Schemas/AboutSchema";

export async function GET() {
  try {
    await connectToDB();
    const about = await About.findOne().populate("passions"); // only one
    return Response.json({ about, status: 200 });
  } catch (error) {
    return Response.json({ error: "Failed to fetch about" }, { status: 500 });
  }
}

// export async function POST(req: Request) {
//   try {
//     await connectToDB();
//     const { story } = await req.json();
//     const existingPassions = await Passions.findOne();
//     const passionsId = [];
//     if (existingPassions) {
//       existingPassions.forEach((p) => {
//         passionsId.push(p._id);
//       });
//     }

//     const updated = await About.findOneAndUpdate(
//       {},
//       { story, passions: passionsId },
//       { upsert: true, new: true }
//     );

//     return Response.json({ updated, status: 200 });
//   } catch (error) {
//     return Response.json({ error: "Failed to update story" }, { status: 500 });
//   }
// }

export async function POST(req: Request) {
  try {
    await connectToDB();

    const { story, story2, exp_year, projects_completed, happy_clients } =
      await req.json();

    // Get all existing passions
    const existingPassions = await Passions.find();
    const passionsId = existingPassions.map((p) => p._id);

    // Create or update the About document
    const updated = await About.findOneAndUpdate(
      {},
      {
        story,
        story2,
        passions: passionsId,
        exp_year,
        projects_completed,
        happy_clients,
      },
      { upsert: true, new: true }
    );

    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (error) {
    console.error("Error in About POST:", error);
    return new Response(JSON.stringify({ error: "Failed to update story" }), {
      status: 500,
    });
  }
}
