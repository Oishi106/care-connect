import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

function parsePrice(value) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  const parsed = Number(String(value || "").replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function normalizeServiceDocument(document) {
  return {
    _id: document._id?.toString?.() || document._id,
    title: document.title || document.name || "Untitled Service",
    description: document.description || document.desc || "",
    category: document.category || "Home",
    badge: document.badge || "",
    image: document.image || document.img || "",
    price: parsePrice(document.price),
    active: document.active !== false,
    icon: document.icon || "✨",
    bookings: Number(document.bookings || 0),
    createdAt: document.createdAt || null,
    updatedAt: document.updatedAt || null,
  };
}

async function getCollection() {
  const client = await clientPromise;
  return client.db().collection("services");
}

export async function PATCH(request, { params }) {
  try {
    const id = params?.id;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid service id." }, { status: 400 });
    }

    const body = await request.json();
    const updates = {};

    if (body.title !== undefined) updates.title = String(body.title || "").trim();
    if (body.description !== undefined) updates.description = String(body.description || "").trim();
    if (body.category !== undefined) updates.category = String(body.category || "Home").trim() || "Home";
    if (body.image !== undefined) updates.image = String(body.image || "").trim();
    if (body.badge !== undefined) updates.badge = String(body.badge || "").trim();
    if (body.icon !== undefined) updates.icon = String(body.icon || "✨").trim() || "✨";
    if (body.price !== undefined) updates.price = parsePrice(body.price);
    if (body.active !== undefined) updates.active = Boolean(body.active);
    if (body.bookings !== undefined) updates.bookings = Number(body.bookings || 0);

    updates.updatedAt = new Date();

    const collection = await getCollection();
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updates },
      { returnDocument: "after" }
    );

    if (!result?.value) {
      return NextResponse.json({ error: "Service not found." }, { status: 404 });
    }

    return NextResponse.json(normalizeServiceDocument(result.value));
  } catch {
    return NextResponse.json({ error: "Unable to update service right now." }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = params?.id;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid service id." }, { status: 400 });
    }

    const collection = await getCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Service not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Service deleted successfully." });
  } catch {
    return NextResponse.json({ error: "Unable to delete service right now." }, { status: 500 });
  }
}
