/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectToDB } from "@/lib/db/connectDB";
import { Certification } from "@/lib/Schemas/CertificationSchema";

export async function GET(req: Request) {
  await connectToDB();
  try {
    const certifications = await Certification.find({});

    return Response.json({ certifications, status: 200 });
  } catch (error: any) {
    return Response.json({ error: error.message, status: 500 });
  }
}

export async function POST(req: Request) {
  await connectToDB();
  try {
    const { title, issuer, date, description, credentialUrl, link, featured } = await req.json();

    const existingCert = await Certification.findOne({ title });

    if (existingCert) {
      return Response.json({
        error: "Certification already exists",
        status: 400,
      });
    }

    const newCert = new Certification({
      title,
      issuer,
      date,
      description,
      credentialUrl,
      link,
      featured,
    });

    await newCert.save();

    return Response.json({ status: 200 });
  } catch (error: any) {
    return Response.json({ error: error.message, status: 500 });
  }
}

// export async function PUT(req: Request) {
//   try {
//     await connectToDB();
//     const { searchParams } = new URL(req.url);
//     console.log("searchParams in PUT", searchParams);

//     const id = searchParams.get("id");
//     console.log("id in PUT", id);

//     const { title, issuer, date, credentialUrl } = await req.json();

//     console.log({ title, issuer, date, credentialUrl });

//     const existingCert = await Certification.findOne({ title: title });

//     if (!existingCert) {
//       return Response.json({
//         error: "Certification not found",
//         status: 404,
//       });
//     }

//     const updatedCert = await Certification.findByIdAndUpdate(
//       id,
//       {
//         title,
//         issuer,
//         date,
//         credentialUrl,
//       },
//       { new: true }
//     );

//     return Response.json({ updatedCert, status: 200 });
//   } catch (error: any) {
//     return Response.json({ error: error.message, status: 500 });
//   }
// }

export async function PUT(req: Request) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return Response.json({ error: "ID is required", status: 400 });
    }

    const { title, issuer, date, description, credentialUrl, link, featured } = await req.json();

    const existingCert = await Certification.findById(id);
    // console.log("existingCert in PUT", existingCert);

    if (!existingCert) {
      return Response.json({ error: "Certification not found", status: 404 });
    }

    const updatedCert = await Certification.findByIdAndUpdate(
      id,
      {
        title,
        issuer,
        date,
        description,
        credentialUrl,
        link,
        featured,
      },
      { new: true }
    );

    return Response.json({ updatedCert, status: 200 });
  } catch (error: any) {
    return Response.json({ error: error.message, status: 500 });
  }
}

export async function DELETE(req: Request) {
  await connectToDB();
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const cert = await Certification.findById(id);

    if (!cert) {
      return Response.json({
        error: "Certification not found",
        status: 404,
      });
    }

    await Certification.findByIdAndDelete(id);

    return Response.json({ status: 200 });
  } catch (error: any) {
    return Response.json({ error: error.message, status: 500 });
  }
}
