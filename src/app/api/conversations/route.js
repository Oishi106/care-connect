import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = (searchParams.get("email") || "").trim().toLowerCase();
    const name = (searchParams.get("name") || "").trim().toLowerCase();
    const role = (searchParams.get("role") || "user").trim().toLowerCase();

    if (!email) {
      return NextResponse.json([]);
    }

    const client = await clientPromise;
    const db = client.db();
    const bookingsCollection = db.collection("bookings");
    const messagesCollection = db.collection("messages");

    const bookingsQuery = role === "caregiver"
      ? {
          $or: [
            { caregiverEmail: email },
            { caregiverName: name },
            { caregiverId: email },
          ],
        }
      : { userEmail: email };

    const bookings = await bookingsCollection
      .find(bookingsQuery)
      .sort({ createdAt: -1 })
      .toArray();

    const latestByCaregiver = new Map();
    for (const booking of bookings) {
      const conversationId = String(booking.caregiverId || booking.caregiverEmail || booking.caregiverName || booking._id);
      if (!latestByCaregiver.has(conversationId)) {
        latestByCaregiver.set(conversationId, booking);
      }
    }

    const conversationIds = Array.from(latestByCaregiver.keys());
    const lastMessages = conversationIds.length
      ? await messagesCollection
          .find({ conversationId: { $in: conversationIds } })
          .sort({ createdAt: -1 })
          .toArray()
      : [];

    const lastMessageByConversation = new Map();
    for (const message of lastMessages) {
      const key = String(message.conversationId);
      if (!lastMessageByConversation.has(key)) {
        lastMessageByConversation.set(key, message);
      }
    }

    const conversations = Array.from(latestByCaregiver.entries()).map(([conversationId, booking]) => {
      const lastMessage = lastMessageByConversation.get(conversationId);
      return {
        _id: conversationId,
        conversationId,
        bookingId: booking._id?.toString?.() || booking._id,
        userEmail: booking.userEmail || "",
        userName: booking.userName || "User",
        caregiverId: booking.caregiverId || "",
        caregiverEmail: booking.caregiverEmail || "",
        caregiverName: booking.caregiverName || "Caregiver",
        serviceTitle: booking.serviceTitle || "Care Service",
        status: booking.status || "Pending",
        createdAt: booking.createdAt || new Date(),
        updatedAt: booking.updatedAt || booking.createdAt || new Date(),
        lastMessage: lastMessage?.text || lastMessage?.message || lastMessage?.content || "",
        lastMessageAt: lastMessage?.createdAt || booking.updatedAt || booking.createdAt || new Date(),
        unreadCount: 0,
      };
    });

    return NextResponse.json(conversations);
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}