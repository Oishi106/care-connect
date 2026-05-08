import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

const allowedStatuses = new Set(["approved", "rejected"]);

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const statusParam = String(searchParams.get("status") || "pending").toLowerCase();
    const statusFilter = ["pending", "approved", "rejected"].includes(statusParam) ? statusParam : "pending";

    const client = await clientPromise;
    const usersCollection = client.db().collection("users");

    const caregivers = await usersCollection
      .find({ role: "caregiver", applicationStatus: statusFilter })
      .sort({ createdAt: -1, updatedAt: -1 })
      .toArray();

    const applications = caregivers.map((user) => ({
      _id: user._id?.toString?.() || user._id,
      name: user.name || "Unknown",
      email: user.email || "",
      phone: user.phone || "",
      specialty: user.specialty || user.serviceType || user.category || "General Care",
      image: user.profileImage || user.image || "",
      experience: user.experience || user.yearsOfExperience || "",
      about: user.about || user.bio || "",
      status: user.applicationStatus || "pending",
      createdAt: user.createdAt || user.updatedAt || new Date(),
      updatedAt: user.updatedAt || null,
    }));

    return NextResponse.json(applications);
  } catch {
    return NextResponse.json({ error: "Unable to load caregiver applications right now." }, { status: 500 });
  }
}

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
