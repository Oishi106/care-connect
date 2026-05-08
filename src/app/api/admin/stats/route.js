import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection("users");
    const bookingsCollection = db.collection("bookings");

    // Get total users
    const totalUsers = await usersCollection.countDocuments({});

    // Get active caregivers (approved caregiver role)
    const activeCaregivers = await usersCollection.countDocuments({
      role: "caregiver",
      applicationStatus: "approved",
    });

    // Get total bookings
    const totalBookings = await bookingsCollection.countDocuments({});

    // Get pending bookings
    const pendingBookings = await bookingsCollection.countDocuments({
      status: { $in: ["Pending", "pending", "Confirmed", "confirmed"] },
    });

    // Get total revenue (sum of all booking totals)
    const revenueResult = await bookingsCollection.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: { $toDouble: "$totalPrice" } },
        },
      },
    ]).toArray();

    const totalRevenue = revenueResult[0]?.totalRevenue || 0;

    // Get monthly revenue for current year
    const currentYear = new Date().getFullYear();
    const monthlyRevenueResult = await bookingsCollection.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${currentYear}-01-01`),
            $lt: new Date(`${currentYear + 1}-01-01`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          revenue: { $sum: { $toDouble: "$totalPrice" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]).toArray();

    return NextResponse.json({
      totalUsers,
      activeCaregivers,
      totalBookings,
      pendingBookings,
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      monthlyRevenue: monthlyRevenueResult,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json(
      {
        totalUsers: 0,
        activeCaregivers: 0,
        totalBookings: 0,
        pendingBookings: 0,
        totalRevenue: 0,
        monthlyRevenue: [],
      },
      { status: 500 }
    );
  }
}
