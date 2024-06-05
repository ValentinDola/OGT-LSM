// import Stripe from "stripe";
// import { headers } from "next/headers";
// import { NextResponse } from "next/server";

// import { stripe } from "@/lib/stripe";
// import { db } from "@/lib/db";

// export async function POST(req: Request) {
//   // Reads the request body as text.
//   const body = await req.text();
//   // Retrieves the Stripe signature from the request headers.
//   const signature = headers().get("Stripe-Signature") as string;

//   let event: Stripe.Event;
//   // Tries to construct a Stripe event from the request body and signature using stripe.webhooks.constructEvent.
//   try {
//     event = stripe.webhooks.constructEvent(
//       body,
//       signature,
//       process.env.STRIPE_WEBHOOK_SECRET!
//     );
//   } catch (error: any) {
//     // Catches any error that occurs during the event construction and returns a NextResponse with a status code of 400 if there is an error.
//     return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
//   }
//   // Extracts necessary information from the Stripe event, such as the session metadata, user ID, phone number, customer ID, and course ID.
//   const session = event.data.object as Stripe.Checkout.Session;
//   const userId = session?.metadata?.userId;
//   const phoneNumber = session.customer_details?.phone;
//   const customerId = session.customer;
//   const courseId = session?.metadata?.courseId;
//   // Switches on the session metadata mode to determine whether the event is for a payment or subscription.
//   switch (session?.metadata?.mode) {
//     // For a payment session, checks if the event type is checkout.session.completed, and if so, creates a purchase record in the database using db.purchase.create.
//     case "payment":
//       if (event.type === "checkout.session.completed") {
//         if (!userId || !courseId) {
//           return new NextResponse(`Webhook Error: Missing Metadata`, {
//             status: 400,
//           });
//         }

//         await db.purchase.create({
//           data: {
//             courseId: courseId,
//             userId: userId,
//             phone: phoneNumber,
//           },
//         });
//       } else {
//         return new NextResponse(
//           `Webhook Error: Unhandled event type ${event.type}`,
//           { status: 200 }
//         );
//       }
//       break;
//     // For a subscription session, checks if the event type is checkout.session.completed, and if so, creates a subscription record in the database using db.subscription.create. It also updates the courses in the database to mark them as subscribed and free.
//     case "subscription":
//       if (event.type === "checkout.session.completed") {
//         if (!userId) {
//           return new NextResponse(`Webhook Error: Missing Metadata`, {
//             status: 400,
//           });
//         }

//         await db.subscription.create({
//           data: {
//             userId: userId,
//             status: "completed",
//             phone: phoneNumber,
//             stripeCustomerId: String(customerId),
//           },
//         });

//         await db.course.updateMany({
//           where: {
//             userId: userId,
//             isFree: false,
//             isSubscribed: false,
//           },
//           data: {
//             isSubscribed: true,
//             isFree: true,
//           },
//         });
//       } else {
//         return new NextResponse(
//           `Webhook Error: Unhandled event type ${event.type}`,
//           { status: 200 }
//         );
//       }

//     default:
//       break;
//   }

//   return new NextResponse(null, { status: 200 });
// }
