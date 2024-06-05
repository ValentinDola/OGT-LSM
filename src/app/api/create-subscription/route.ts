import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { auth, currentUser } from "@clerk/nextjs/server";
import { ObjectId } from "bson";
import { NextResponse } from "next/server";
import Stripe from "stripe";
//  Generates a new ObjectId which seems unused in the rest of the code.
const id = new ObjectId();

// Defines an asynchronous function named POST that takes a Request object as an argument. This function likely handles POST requests to create a subscription checkout session.
export async function POST(req: Request) {
  try {
    // Retrieves the current user using the currentUser function from Clerk.
    const user = await currentUser();
    // Destructures amount, title, quote, and count from the JSON body of the request.
    const { amount, title, quote, count }: any = await req.json();
    // Calculates a new amount, possibly for currency conversion.
    const newAmount = amount * 605;
    // Checks if the newAmount, title, or quote are missing, and if so, returns a NextResponse with a status code of 400 indicating a bad request.
    if ((!newAmount && !title) || !quote) {
      return new NextResponse("RESOURSES_MISSING", { status: 400 });
    }
    // Checks if the user is not authenticated or missing necessary user data, and if so, returns a NextResponse with a status code of 401 indicating unauthorized access.
    if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    // Creates an array line_items containing the subscription details for Stripe.
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "XOF",
          unit_amount: newAmount,
          recurring: {
            interval: "month",
            interval_count: count,
          },

          product_data: {
            name: title,
            description: quote,
          },
        },
      },
    ];
    // Retrieves or creates a Stripe customer for subscriptions (stripeSubsCustomer) associated with the user's email address.
    let stripeSubsCustomer = await db.subscriptionCustomer.findUnique({
      where: {
        id: id.toHexString(),
        userId: user.id,
      },
      select: {
        customerId: true,
      },
    });

    if (!stripeSubsCustomer) {
      const customer = await stripe.customers.create({
        email: user.emailAddresses[0].emailAddress,
        metadata: {
          userId: user.id,
        },
      });

      stripeSubsCustomer = await db.subscriptionCustomer.create({
        data: {
          userId: user.id,
          customerId: customer.id,
        },
      });
    }
    // Creates a checkout session with Stripe using the stripe.checkout.sessions.create method, specifying the customer, line items, success and cancel URLs, and other parameters.
    const session = await stripe.checkout.sessions.create({
      customer: stripeSubsCustomer.customerId,
      payment_method_types: ["card"],
      line_items,
      mode: "subscription",

      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/?success=1?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/?canceled=1`,
      locale: "fr",
      phone_number_collection: {
        enabled: true,
      },

      metadata: {
        userId: user.id,
        mode: "subscription",
      },
    });
    // Returns a JSON response with the checkout session URL.
    return NextResponse.json({ url: session.url });
  } catch (error) {
    // Catches any errors that occur during the process, logs them, and returns a NextResponse with a status code of 500 indicating an internal server error.
    console.log("SUBSCRIPTION_CHECKOUT", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
