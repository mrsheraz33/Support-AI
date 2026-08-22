import connectDB from "@/lib/db";
import Setting from "@/model/setting.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { ownerId } = await req.json();

    if (!ownerId) {
      return NextResponse.json({ message: "ownerId is required!" });
    }

    const setting = await Setting.findOne({ ownerId });

    return NextResponse.json(setting, { status: 200 });
    
  } catch (error) {
    return NextResponse.json(
      { message: `setting error ${error}` },
      { status: 500 },
    );
  }
}
