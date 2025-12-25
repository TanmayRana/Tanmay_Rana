import { NextApiRequest, NextApiResponse } from "next";
import { connectToDB } from "@/lib/db/connectDB";
import { Message } from "@/lib/Schemas/MessageSchema";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        await connectToDB();

        const { name, email, subject, message } = req.body;

        const newMessage = await Message.create({
            name,
            email,
            subject,
            message,
        });



        return res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error creating message:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
