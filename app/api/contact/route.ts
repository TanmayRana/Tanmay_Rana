/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectToDB } from "@/lib/db/connectDB";
import { Contact } from "@/lib/Schemas/contactSchema";

export async function GET(req: Request) {
  try {
    await connectToDB();
    const contact = await Contact.find();

    return Response.json({ contact, status: 200 });
  } catch (error) {
    return Response.json({ error, status: 500 });
  }
}

// export async function POST(req: Request) {
//   try {
//     await connectToDB();
//     const data = await req.json();
//     const { email, phone, location } = data;
//     console.log(email, phone, location);

//     const contact = await Contact.findOneAndUpdate(
//       {},
//       {
//         email,
//         phone,
//         location,
//       },
//       { new: true }
//     );
//     return Response.json({ contact, status: 200 });
//   } catch (error) {
//     return Response.json({ error, status: 500 });
//   }
// }

export async function POST(req: Request) {
  try {
    await connectToDB();

    const { email, phone, location } = await req.json();
    // console.log("Received:", email, phone, location);

    const contact = await Contact.findOneAndUpdate(
      {},
      { email, phone, location },
      {
        new: true,
        upsert: true, // 🔁 ensure it creates if not exists
      }
    );

    return Response.json({ contact, status: 200 });
  } catch (error) {
    console.error("Contact update error:", error);
    return Response.json(
      { error: "Failed to update contact" },
      { status: 500 }
    );
  }
}
