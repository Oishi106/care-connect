import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

function toLower(value) {
  return String(value || "").trim().toLowerCase();
}

function parseAmount(value) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  const parsed = Number(String(value || "").replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function normalizeStatus(value) {
  const status = toLower(value || "paid");

  if (["completed", "confirmed", "success", "succeeded", "paid"].includes(status)) {
    return "paid";
  }

  if (["refund", "refunded"].includes(status)) {
    return "refunded";
  }

  if (["pending", "processing", "incomplete"].includes(status)) {
    return "pending";
  }

  if (["failed", "cancelled", "canceled", "rejected"].includes(status)) {
    return "failed";
  }

  return status;
}

function normalizePaymentRecord(record, source) {
  const status = normalizeStatus(record.status || record.paymentStatus || "paid");
  const amount = parseAmount(record.amount ?? record.totalPrice ?? record.price ?? record.totalAmount ?? 0);
  const createdAt = record.createdAt || record.paidAt || record.updatedAt || record.paymentDate || null;

  return {
    id: record._id?.toString?.() || record.id || record.stripeSessionId || `${source}-${record.serviceTitle || record.service || amount}-${createdAt || "na"}`,
    userEmail: record.userEmail || record.email || record.customerEmail || record.user?.email || "—",
    userName: record.userName || record.customerName || record.name || record.user?.name || "—",
    serviceTitle: record.serviceTitle || record.service || record.serviceName || "Care Service",
    amount,
    status,
    createdAt,
    method: record.method || record.paymentMethod || (record.stripeSessionId ? "Stripe" : "—"),
    stripeSessionId: record.stripeSessionId || record.sessionId || record.paymentIntentId || "",
    source,
  };
}

function isPaidBooking(booking) {
  const paymentStatus = toLower(booking.paymentStatus);
  const status = toLower(booking.status);

  return paymentStatus === "paid" || status === "completed" || status === "confirmed";
}

async function readCollection(collectionName, filter = {}) {
  try {
    const client = await clientPromise;
    const collection = client.db().collection(collectionName);
    return await collection.find(filter).sort({ createdAt: -1, updatedAt: -1 }).toArray();
  } catch {
    return [];
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = toLower(searchParams.get("email"));
    const statusFilter = toLower(searchParams.get("status"));
    const limit = Number(searchParams.get("limit") || 0);

    const emailFilter = email
      ? {
          $or: [
            { userEmail: email },
            { email },
            { customerEmail: email },
            { "user.email": email },
          ],
        }
      : {};

    const [paymentRecords, bookingRecords] = await Promise.all([
      readCollection("payments", emailFilter),
      readCollection("bookings", email ? { $or: [{ userEmail: email }, { email }, { customerEmail: email }, { "user.email": email }] } : {}),
    ]);

    const normalizedPayments = paymentRecords.map((record) => normalizePaymentRecord(record, "payments"));
    const normalizedBookings = bookingRecords
      .filter(isPaidBooking)
      .map((record) => normalizePaymentRecord(record, "bookings"));

    const merged = [...normalizedPayments, ...normalizedBookings]
      .filter((record) => !statusFilter || record.status === statusFilter)
      .sort((left, right) => {
        const leftTime = left.createdAt ? new Date(left.createdAt).getTime() : 0;
        const rightTime = right.createdAt ? new Date(right.createdAt).getTime() : 0;
        return rightTime - leftTime;
      });

    const deduped = [];
    const seen = new Set();

    for (const record of merged) {
      const key = [record.stripeSessionId || record.id, record.userEmail, record.serviceTitle, record.amount, record.createdAt].join("|");
      if (seen.has(key)) {
        continue;
      }

      seen.add(key);
      deduped.push(record);
    }

    const result = limit > 0 ? deduped.slice(0, limit) : deduped;

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Unable to load payment history right now." }, { status: 500 });
  }
}
