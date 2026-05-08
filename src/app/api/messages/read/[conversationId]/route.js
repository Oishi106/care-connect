import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function PATCH(request, { params }) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const conversationId = String(resolvedParams?.conversationId || "");

    if (!conversationId) {
      return NextResponse.json({ error: "Conversation id is required." }, { status: 400 });
    }

    const body = await request.json().catch(() => ({}));
    const readerEmail = (body.readerEmail || "").trim().toLowerCase();

    if (!readerEmail) {
      return NextResponse.json({ error: "Reader email is required." }, { status: 400 });
    }

    const client = await clientPromise;
    const messagesCollection = client.db().collection("messages");

    await messagesCollection.updateMany(
      { conversationId, receiverEmail: readerEmail },
      { $addToSet: { readBy: readerEmail } }
    );

    return NextResponse.json({ message: "Messages marked as read." });
  } catch (error) {
    return NextResponse.json({ error: "Unable to mark messages as read." }, { status: 500 });
  }
}