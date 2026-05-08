import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import clientPromise from "@/lib/mongodb";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const usersCollection = client.db().collection("users");
    const caregiver = await usersCollection.findOne(
      { email: session.user.email, role: "caregiver" },
      {
        projection: {
          name: 1,
          email: 1,
          phone: 1,
          serviceType: 1,
          specialty: 1,
          experience: 1,
          bio: 1,
          profileImage: 1,
          image: 1,
          applicationStatus: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      }
    );

    if (!caregiver) {
      return NextResponse.json({ error: "Caregiver not found" }, { status: 404 });
    }

    return NextResponse.json({
      name: caregiver.name || "",
      email: caregiver.email || "",
      phone: caregiver.phone || "",
      serviceType: caregiver.serviceType || caregiver.specialty || "",
      experience: caregiver.experience || "",
      bio: caregiver.bio || "",
      imageUrl: caregiver.profileImage || caregiver.image || "",
      status: caregiver.applicationStatus || "pending",
    });
  } catch (error) {
    return NextResponse.json({ error: "Unable to load profile right now." }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const name = body.name?.trim() || "";
    const phone = body.phone?.trim() || "";
    const serviceType = body.serviceType?.trim() || "";
    const experience = body.experience?.trim() || "";
    const bio = body.bio?.trim() || "";
    const imageUrl = body.imageUrl?.trim() || "";

    if (!name || !phone || !serviceType || !experience || !bio || !imageUrl) {
      return NextResponse.json({ error: "All profile fields are required." }, { status: 400 });
    }

    const client = await clientPromise;
    const usersCollection = client.db().collection("users");

    const result = await usersCollection.updateOne(
      { email: session.user.email, role: "caregiver" },
      {
        $set: {
          name,
          phone,
          serviceType,
          specialty: serviceType,
          experience,
          bio,
          profileImage: imageUrl,
          image: imageUrl,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Caregiver not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Profile updated successfully." });
  } catch (error) {
    return NextResponse.json({ error: "Unable to update profile right now." }, { status: 500 });
  }
}