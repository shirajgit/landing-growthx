import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Wishlist from "@/models/Wishlist";

// 🔐 Optional: simple protection (recommended)
const ADMIN_KEY = process.env.ADMIN_KEY;

export async function GET(req: Request) {
  try {
    await connectDB();

    // 🔐 Protect API (optional but important)
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key");

    if (ADMIN_KEY && key !== ADMIN_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await Wishlist.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Fetch wishlist error:", error);
    return NextResponse.json(
      { error: "Failed to fetch wishlist" },
      { status: 500 }
    );
  }
}