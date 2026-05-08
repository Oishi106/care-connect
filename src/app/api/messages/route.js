import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get("conversationId");

    if (!conversationId) {
      return NextResponse.json([]);
    }

    const client = await clientPromise;
    const messagesCollection = client.db().collection("messages");

    const messages = await messagesCollection
      .find({ conversationId: String(conversationId) })
      .sort({ createdAt: 1 })
      .toArray();

    const normalized = messages.map((message) => ({
      ...message,
      _id: message._id?.toString?.() || message._id,
    }));

    return NextResponse.json(normalized);
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const conversationId = String(body.conversationId || "");

    if (!conversationId || !body.text?.trim()) {
      return NextResponse.json({ error: "Conversation and message are required." }, { status: 400 });
    }

    const client = await clientPromise;
    const messagesCollection = client.db().collection("messages");

    const payload = {
      conversationId,
      bookingId: body.bookingId || "",
      senderEmail: body.senderEmail || "",
      senderName: body.senderName || "",
      receiverEmail: body.receiverEmail || "",
      receiverName: body.receiverName || "",
      text: body.text.trim(),
      createdAt: new Date(),
      readBy: body.senderEmail ? [body.senderEmail] : [],
    };

    const result = await messagesCollection.insertOne(payload);

    return NextResponse.json({ ...payload, _id: result.insertedId.toString() }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Unable to send message." }, { status: 500 });
  }
}