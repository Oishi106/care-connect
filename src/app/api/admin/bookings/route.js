import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get("limit") || "5"), 50);

    const client = await clientPromise;
    const bookingsCollection = client.db().collection("bookings");

    const bookings = await bookingsCollection
      .find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();

    const normalizedBookings = bookings.map((b) => ({
      _id: b._id?.toString?.() || b._id,
      userName: b.userName || b.userEmail?.split("@")[0] || "User",
      userEmail: b.userEmail || "",
      serviceTitle: b.serviceName || b.serviceTitle || "Service",
      status: b.status || "Pending",
      totalPrice: b.totalPrice || 0,
      createdAt: b.createdAt || null,
    }));

    return NextResponse.json(normalizedBookings);
  } catch (error) {
    console.error("Admin bookings error:", error);
    return NextResponse.json([], { status: 500 });
  }
}
