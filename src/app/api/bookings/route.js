import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = (searchParams.get("email") || "").trim().toLowerCase();

    const client = await clientPromise;
    const bookingsCollection = client.db().collection("bookings");

    const query = email ? { userEmail: email } : {};

    const bookings = await bookingsCollection.find(query).sort({ createdAt: -1 }).toArray();

    const normalized = bookings.map((booking) => ({
      ...booking,
      _id: booking._id?.toString?.() || booking._id,
    }));

    return NextResponse.json(normalized);
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const payload = {
      userEmail: (body.userEmail || "").trim().toLowerCase(),
      userName: body.userName || "",
      serviceId: body.serviceId || "",
      serviceTitle: body.serviceTitle || "",
      caregiverId: body.caregiverId || "",
      caregiverName: body.caregiverName || "",
      date: body.date || "",
      time: body.time || "",
      hours: Number(body.hours || 1),
      notes: body.notes || "",
      totalPrice: Number(body.totalPrice || 0),
      status: body.status || "Pending",
      paymentStatus: body.paymentStatus || "unpaid",
      createdAt: body.createdAt ? new Date(body.createdAt) : new Date(),
      updatedAt: new Date(),
    };

    if (!payload.userEmail || !payload.serviceId || !payload.caregiverId) {
      return NextResponse.json({ error: "Missing booking fields." }, { status: 400 });
    }

    const client = await clientPromise;
    const bookingsCollection = client.db().collection("bookings");
    const result = await bookingsCollection.insertOne(payload);

    return NextResponse.json({ _id: result.insertedId.toString() }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Unable to save booking draft." }, { status: 500 });
  }
}