import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Wishlist from  "@/models/Whislist";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL!;
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL!;

export async function POST(req: Request) {
  try {
    await connectDB();

    const { name, email, message } = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and Email required" },
        { status: 400 }
      );
    }

    // ✅ Save to DB
    const entry = await Wishlist.create({
      name,
      email,
      message,
    });

    // ✅ Send email to YOU (admin)
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      subject: "🚀 New Wishlist Signup - GrowthX",
      html: `
        <h2>New Wishlist Signup</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message || "N/A"}</p>
      `,
    });

    // ✅ Send confirmation email to USER
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "You're on the GrowthX Wishlist 🚀",
      html: `
        <h2>Hey ${name},</h2>
        <p>You're officially on the <strong>GrowthX Wishlist</strong> 🎉</p>
        <p>We'll notify you as soon as we launch.</p>
        <br/>
        <p>– Team GrowthX</p>
      `,
    });

    return NextResponse.json({ success: true, entry });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}