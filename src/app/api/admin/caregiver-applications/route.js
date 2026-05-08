import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

const allowedStatuses = new Set(["approved", "rejected"]);

export async function PATCH(request) {
  try {
    const body = await request.json();
    const status = body.status;
    const email = body.email?.trim().toLowerCase();

    if (!allowedStatuses.has(status)) {
      return NextResponse.json({ error: "Invalid status update." }, { status: 400 });
    }

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const client = await clientPromise;
    const usersCollection = client.db().collection("users");

    const result = await usersCollection.updateOne(
      { email, role: "caregiver" },
      {
        $set: {
          applicationStatus: status,
          updatedAt: new Date(),
          ...(status === "approved" ? { approvedAt: new Date() } : { rejectedAt: new Date() }),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Application not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Application updated successfully.", status });
  } catch (error) {
    return NextResponse.json({ error: "Unable to update application right now." }, { status: 500 });
  }
}
