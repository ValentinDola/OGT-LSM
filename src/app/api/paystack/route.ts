import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { customerId, user, subscription_code } = await req.json();

    await db.subscription.create({
      data: {
        userId: user.id,
        status: "completed",
        subscriptionId: subscription_code,
      },
    });

    await db.subscriptionCustomer.create({
      data: {
        userId: user.id,
        customerId: customerId,
      },
    });

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.log("SUBSCRIPTION_CHECKOUT", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
