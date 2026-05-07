import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const body = await request.json();
    const fullName = body.fullName?.trim();
    const email = body.email?.trim().toLowerCase();
    const password = body.password;
    const role = body.role === "caregiver" ? "caregiver" : "user";
    const phone = body.phone?.trim() || "";
    const experience = body.experience?.trim() || "";
    const serviceType = body.serviceType?.trim() || "";
    const bio = body.bio?.trim() || "";

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { error: "Full name, email and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    if (role === "caregiver" && (!phone || !experience || !serviceType || !bio)) {
      return NextResponse.json(
        { error: "Phone, experience, service type, and bio are required for caregiver applications." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const usersCollection = client.db().collection("users");
    const existingUser = await usersCollection.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 12);

    const result = await usersCollection.insertOne({
      name: fullName,
      email,
      password: hashedPassword,
      role,
      phone: role === "caregiver" ? phone : "",
      experience: role === "caregiver" ? experience : "",
      serviceType: role === "caregiver" ? serviceType : "",
      bio: role === "caregiver" ? bio : "",
      applicationStatus: role === "caregiver" ? "pending" : "active",
      image: null,
      emailVerified: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(
      {
        message: "Account created successfully.",
        user: {
          id: result.insertedId.toString(),
          name: fullName,
          email,
          role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to create account right now." },
      { status: 500 }
    );
  }
}
