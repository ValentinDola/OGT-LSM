import { db } from "@/lib/db";
import { checkPaymentStatus } from "@/lib/paydunya";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { token, courseId, userId } = req.body;

    const paymentStatus = await checkPaymentStatus(token);

    if (paymentStatus === "completed") {
      await db.purchase.create({
        data: {
          courseId: courseId,
          userId: userId,
        },
      });
    }

    return NextResponse.json("Payment Successful");
  } catch (error) {
    console.log("COURSE_ID_CHECKOUT", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
