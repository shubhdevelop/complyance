// import dbConnect from "@/lib/dbConnect";
// import User from "@/model/User.model";
// import { NextRequest, NextResponse } from "next/server";

// async function GET(req: NextRequest) {
//   const reqBody = req.json();
//   //   const { email } = reqBody;
//   try {
//     await dbConnect();

//     const user = await User.findOne({ email });
//     if (user) {
//       return NextResponse.json({ user }, { status: 200 });
//     }

//     return NextResponse.json({ message: "User Not Found!!" }, { status: 404 });
//   } catch (error: Error) {
//     return NextResponse.json({ message: error.message }, { status: 500 });
//   }
// }

// async function POST() {}
