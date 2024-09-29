import User from "@/model/User.model";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { AuthOptions } from "next-auth";
import mongoose from "mongoose";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import TransactionModel from "@/model/Transaction.model";
import Log from "@/model/Logs.model";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { transactionId: string } }
) {
  const session = await getServerSession(authOptions as AuthOptions);
  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }
  const email = session.user?.email;

  try {
    const { transactionId } = params;
    console.log(transactionId);
    await mongoose.connect(process.env.MONGODB_URI!);
    const userData = await User.findOne({ email: email });
    if (userData) {
      if (userData.role === "EMPLOYEE") {
        return NextResponse.json(
          { message: "you're not authrozied for this action" },
          { status: 401 }
        );
      }

      const updatedTransaction = await TransactionModel.findByIdAndUpdate(
        transactionId,
        { status: "REJECTED" }
      );
      if (updatedTransaction) {
        const log = new Log({
          createdAt: Date.now(),
          createdBy: userData._id,
          content: `Rejected transactions: ${transactionId}`,
          withRole: userData.role,
          type: "REJECT",
        });

        await log.save();

        return NextResponse.json(
          { message: "Status Updated Successfully" },
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
