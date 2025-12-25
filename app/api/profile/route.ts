/* eslint-disable @typescript-eslint/no-unused-vars */
// app/api/profile/route.ts
import { connectToDB } from "@/lib/db/connectDB";
import Profile from "@/lib/Schemas/ProfileSchema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();
    const profile = await Profile.findOne();
    return NextResponse.json(profile || {});
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

// export async function POST(req: Request) {
//   try {
//     await connectToDB();
//     const { profileImage, name, title, tagline } = await req.json();
//     console.log("data in POST", { profileImage, name, title, tagline });

//     const updated = await Profile.findOneAndUpdate(
//       {},
//       {
//         profileImage,
//         name,
//         title,
//         tagline,
//       },
//       {
//         upsert: true,
//         new: true,
//       }
//     );

//     return NextResponse.json(updated);
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to update profile" },
//       { status: 500 }
//     );
//   }
// }

export async function POST(req: Request) {
  try {
    await connectToDB(); // Ensure this function is correctly implemented

    const { profileImage, name, title, tagline, description, roles, expertise, whatsapp, greeting, location } = await req.json();

    // console.log("Data received:", { profileImage, name, title, tagline, description, roles, expertise, whatsapp, greeting, location });

    // Assuming Profile is your Mongoose model, adjust if using a different ORM
    const updated = await Profile.findOneAndUpdate(
      {},
      { profileImage, name, title, tagline, description, roles, expertise, whatsapp, greeting, location },
      { upsert: true, new: true }
    );

    // console.log("Updated profile:", updated);

    return new Response(JSON.stringify(updated), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating profile:", error);

    return new Response(JSON.stringify({ error: "Failed to update profile" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
