import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { AuthOptions } from "next-auth";
import TransactionModel from "@/model/Transaction.model";
import mongoose from "mongoose";
import { createTransactionSchema } from "@/schemas/createTransactionSchema";
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

    let transaction;

    if (userData && userData.role === "EMPLOYEE") {
      const userDataWithTransaction = await userData.populate("transactions");
      transaction = userDataWithTransaction.transactions;
    } else {
      transaction = await TransactionModel.find();
      console.log(transaction);
    }

    if (transaction) {
      return NextResponse.json({ transaction: transaction }, { status: 200 });
    }

    return NextResponse.json({ message: "User Not Found!!" }, { status: 404 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions as AuthOptions);

  if (!session) {
    // User is not authenticated
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const transactionData = createTransactionSchema.parse(body);
    await mongoose.connect(process.env.MONGODB_URI!);

    const userData = await User.findOne({ email: session.user?.email });

    if (userData) {
      const transaction = new TransactionModel({
        ...transactionData,
        status: "PENDING",
        createdAt: Date.now(),
        createdBy: userData._id,
        name: userData.fullname,
        email: session.user?.email,
      });
      const createdTransaction = await transaction.save();

      if (createdTransaction) {
        await User.findByIdAndUpdate(userData._id, {
          $push: { transactions: createdTransaction._id },
        });

        const log = new Log({
          createdAt: Date.now(),
          createdBy: userData._id,
          content: createdTransaction.description,
          withRole: userData.role,
          type: "SUBMIT",
        });

        await log.save();

        return NextResponse.json(
          { transaction: createdTransaction },
          { status: 200 }
        );
      }
    } else {
      return NextResponse.json(
        { message: "Error Creating Transaction" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: error }, { status: 500 });
  }
}
