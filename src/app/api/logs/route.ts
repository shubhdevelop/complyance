import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { AuthOptions } from "next-auth";
import mongoose from "mongoose";
import User from "@/model/User.model";
import Log from "@/model/Logs.model";

export async function GET() {
  const session = await getServerSession(authOptions as AuthOptions);

  if (!session) {
    // User is not authenticated
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    const userData = await User.findOne({
      email: session.user?.email,
    });

    console.log(userData);

    if (userData) {
      if (
        userData.role === "EMPLOYEE" ||
        userData.role === "MANAGER" ||
        userData.role === "ADMIN"
      ) {
        const logs = await Log.find({});
        console.log(logs);
        if (logs) {
          return NextResponse.json({ logs }, { status: 200 });
        }
      } else {
        return NextResponse.json({
          message: "You're not authorized for this action!",
        });
      }
    }

    return NextResponse.json({ message: "User Not Found!!" }, { status: 404 });
  } catch (error) {
    console.log(error);
    console.log(error);

    return NextResponse.json({ message: error }, { status: 500 });
  }
}
