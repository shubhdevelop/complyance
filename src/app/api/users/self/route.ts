import User from "@/model/User.model";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { AuthOptions } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import mongoose from "mongoose";
import { updateRoleSchema } from "@/schemas/updateRoleSchema";

export async function GET() {
  const session = await getServerSession(authOptions as AuthOptions);

  if (!session) {
    // User is not authenticated
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }
  const email = session.user?.email;

  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ user }, { status: 200 });
    }
    await mongoose.disconnect();
    return NextResponse.json({ message: "User Not Found!!" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions as AuthOptions);
  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }
  const email = session.user?.email;

  try {
    const body = await req.json();
    const roleData = updateRoleSchema.parse(body);
    const { role } = roleData;
    await mongoose.connect(process.env.MONGODB_URI!);
    const userData = await User.findOne({ email: email });
    if (userData) {
      const updatedUser = await User.findByIdAndUpdate(userData._id, {
        role: role,
        incompleteUserDetails: false,
      });

      if (updatedUser) {
        return NextResponse.json(
          { message: "Role Updated Successfully" },
          { status: 200 }
        );
      }
    }
    await mongoose.disconnect();
    return NextResponse.json({ message: "User Not Found!!" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
