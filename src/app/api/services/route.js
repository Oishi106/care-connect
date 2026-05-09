import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

function toLower(value) {
  return String(value || "").trim().toLowerCase();
}

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
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const activeParam = searchParams.get("active");                     
    const includeInactive = toLower(searchParams.get("includeInactive")) === "true";

    const filter = includeInactive || activeParam === null
      ? {}
      : { active: activeParam === "true" };

    const collection = await getCollection();
    const documents = await collection.find(filter).sort({ createdAt: 1, updatedAt: 1 }).toArray();

    return NextResponse.json(documents.map(normalizeServiceDocument), {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch {
    return NextResponse.json({ error: "Unable to load services right now." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const title = String(body.title || "").trim();
    const description = String(body.description || "").trim();
    const category = String(body.category || "Home").trim() || "Home";
    const image = String(body.image || "").trim();
    const badge = String(body.badge || "").trim();
    const icon = String(body.icon || "✨").trim() || "✨";
    const price = parsePrice(body.price);
    const active = body.active !== false;

    if (!title || !description || !image || price <= 0) {
      return NextResponse.json(
        { error: "Title, description, image and a valid price are required." },
        { status: 400 }
      );
    }

    const collection = await getCollection();
    const now = new Date();
    const result = await collection.insertOne({
      title,
      description,
      category,
      badge,
      image,
      icon,
      price,
      active,
      bookings: 0,
      createdAt: now,
      updatedAt: now,
    });

    const created = await collection.findOne({ _id: result.insertedId });
    return NextResponse.json(normalizeServiceDocument(created), { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to create service right now." }, { status: 500 });
  }
}