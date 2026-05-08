import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

const allowedStatuses = new Set(["approved", "rejected"]);

export async function PATCH(request, { params }) {
  try {
    const body = await request.json();
    const status = body.status;

    if (!allowedStatuses.has(status)) {
      return NextResponse.json({ error: "Invalid status update." }, { status: 400 });
    }

    const resolvedParams = await Promise.resolve(params);
    const applicationId = resolvedParams?.id;

    if (!applicationId) {
      return NextResponse.json({ error: "Application id is required." }, { status: 400 });
    }

    const client = await clientPromise;
    const usersCollection = client.db().collection("users");
    const update = {
      $set: {
        applicationStatus: status,
        role: "caregiver",
        updatedAt: new Date(),
        ...(status === "approved" ? { approvedAt: new Date(), rejectedAt: null } : { rejectedAt: new Date(), approvedAt: null }),
      },
    };

    const filters = ObjectId.isValid(applicationId)
      ? [{ _id: new ObjectId(applicationId) }, { _id: applicationId }]
      : [{ _id: applicationId }];

    let result = { matchedCount: 0 };

    for (const filter of filters) {
      result = await usersCollection.updateOne(filter, update);
      if (result.matchedCount > 0) {
        break;
      }
    }

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Application not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Application updated successfully.", status });
  } catch (error) {
    return NextResponse.json({ error: "Unable to update application right now." }, { status: 500 });
  }
}
