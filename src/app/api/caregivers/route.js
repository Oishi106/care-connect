import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db("CareConnect");
    const usersCollection = db.collection("users");

    // Fetch only approved caregivers with necessary fields
    const caregivers = await usersCollection
      .find({
        role: "caregiver",
        applicationStatus: "approved"
      })
      .project({
        _id: 1,
        name: 1,
        email: 1,
        specialty: 1,
        serviceType: 1,
        bio: 1,
        about: 1,
        image: 1,
        profileImage: 1,
        rating: 1,
        reviews: 1,
        price: 1,
        experience: 1,
        languages: 1,
        available: 1,
        badge: 1,
      })
      .sort({ createdAt: -1 })
      .toArray();

    // Map MongoDB data to frontend format
    const formattedCaregivers = caregivers.map(cg => ({
      id: cg._id.toString(),
      name: cg.name || "Unknown",
      specialty: cg.specialty || cg.serviceType || "General Care",
      rating: cg.rating || 4.5,
      reviews: cg.reviews || 0,
      price: cg.price || "$15/hr",
      image: cg.profileImage || cg.image || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9jdG9yfGVufDB8fDB8fHww",
      available: cg.available !== false,
      badge: cg.badge || "Verified",
      exp: cg.experience || "0 years",
      languages: cg.languages || ["English"],
    }));

    return NextResponse.json(formattedCaregivers);
  } catch (error) {
    console.error("Error fetching caregivers:", error);
    return NextResponse.json(
      { error: "Failed to fetch caregivers" },
      { status: 500 }
    );
  }
}
