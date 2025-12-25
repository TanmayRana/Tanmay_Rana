/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectToDB } from "@/lib/db/connectDB";
import { Certification } from "@/lib/Schemas/CertificationSchema";

export async function GET(req: Request) {
    await connectToDB();
    try {
        const certifications = await Certification.find({ featured: true });

        return Response.json({ certifications, status: 200 });
    } catch (error: any) {
        return Response.json({ error: error.message, status: 500 });
    }
}
