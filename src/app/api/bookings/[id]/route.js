import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export async function PATCH(request, { params }) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const bookingId = resolvedParams?.id;

    if (!bookingId) {
      return NextResponse.json({ error: "Booking id is required." }, { status: 400 });
    }

    const body = await request.json();
    const updateDoc = {
      ...body,
      updatedAt: new Date(),
    };

    if (Object.prototype.hasOwnProperty.call(updateDoc, "hours")) {
      updateDoc.hours = Number(updateDoc.hours || 1);
    }

    if (Object.prototype.hasOwnProperty.call(updateDoc, "totalPrice")) {
      updateDoc.totalPrice = Number(updateDoc.totalPrice || 0);
    }

    const client = await clientPromise;
    const bookingsCollection = client.db().collection("bookings");

    const filters = ObjectId.isValid(bookingId)
      ? [{ _id: new ObjectId(bookingId) }, { _id: bookingId }]
      : [{ _id: bookingId }];

    const result = await bookingsCollection.updateOne(
      { $or: filters },
      { $set: updateDoc }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Booking not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Booking updated successfully." });
  } catch (error) {
    return NextResponse.json({ error: "Unable to update booking." }, { status: 500 });
  }
}