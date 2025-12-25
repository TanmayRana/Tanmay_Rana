/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectToDB } from "@/lib/db/connectDB";
import About, { Passions } from "@/lib/Schemas/AboutSchema";

export async function GET() {
  try {
    await connectToDB();
    const passions = await Passions.find();
    return Response.json({ passions, status: 200 });
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch passions" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectToDB();
    const { title, description, icon } = await req.json();
    const newPassion = await Passions.create({ title, description, icon });
    return Response.json({ newPassion, status: 200 });
  } catch (error) {
    return Response.json(
      { error: "Failed to create passion" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return Response.json({ error: "ID is required" }, { status: 400 });

    const { title, description, icon } = await req.json();
    const updatedPassion = await Passions.findByIdAndUpdate(
      id,
      { title, description, icon },
      { new: true }
    );

    if (!updatedPassion) {
      return Response.json({ error: "Passion not found" }, { status: 404 });
    }

    return Response.json({ updatedPassion, status: 200 });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// export async function DELETE(req: Request) {
//   try {
//     await connectToDB();
//     const { searchParams } = new URL(req.url);
//     const id = searchParams.get("id");

//     const deleted = await Passions.findByIdAndDelete(id);
//     if (!deleted) {
//       return Response.json({ error: "Passion not found" }, { status: 404 });
//     }

//     return Response.json({ message: "Passion deleted", status: 200 });
//   } catch (error) {
//     return Response.json(
//       { error: "Failed to delete passion" },
//       { status: 500 }
//     );
//   }
// }

export async function DELETE(req: Request) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify({ error: "Missing ID" }), {
        status: 400,
      });
    }

    // Delete the passion
    const deleted = await Passions.findByIdAndDelete(id);

    if (!deleted) {
      return new Response(JSON.stringify({ error: "Passion not found" }), {
        status: 404,
      });
    }

    // Remove the passion ID from About's passions array
    await About.updateMany({ passions: id }, { $pull: { passions: id } });

    return new Response(JSON.stringify({ message: "Passion deleted" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting passion:", error);
    return new Response(JSON.stringify({ error: "Failed to delete passion" }), {
      status: 500,
    });
  }
}
