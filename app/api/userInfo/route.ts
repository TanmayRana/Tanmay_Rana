/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectToDB } from "@/lib/db/connectDB";
import { Contact } from "@/lib/Schemas/contactSchema";
import Profile from "@/lib/Schemas/ProfileSchema";

export async function GET(request: Request) {
  try {
    await connectToDB();
    const profiledata = await Profile.findOne();
    const contactData = await Contact.find();
    // profiledata.profileImage,profiledata.name,contactData.email
    const userInfo = {
      name: profiledata.name,
      profileImage: profiledata.profileImage,
      email: contactData[0]?.email,
    };
    return new Response(JSON.stringify(userInfo), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error, status: 500 }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
