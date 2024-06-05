// Imports the db object from the @/lib/db module, which likely provides access to a database.
import { db } from "@/lib/db";
// Imports the stripe object from the @/lib/stripe module, which likely provides access to the Stripe API.
import { stripe } from "@/lib/stripe";
// Imports the currentUser function from the @clerk/nextjs/server module, which likely provides information about the current user.
import { currentUser } from "@clerk/nextjs/server";
// Imports the axios library for making HTTP requests.
import axios from "axios";
//  Imports the NextResponse class from the next/server module, which represents a response that can be sent back to the client in a Next.js server-side function.
import { NextResponse } from "next/server";
import Stripe from "stripe";

// Defines an asynchronous function named POST that takes a Request object and an object containing params with a courseId property as arguments. This function likely handles POST requests to initiate a course purchase.
export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    // Retrieves information about the current user.
    const user = await currentUser();
    //  Checks if the user is not logged in, or if their ID or email address is missing. If any condition is true, it returns a NextResponse with an "Unauthorized" status code (401).
    if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    // Retrieves the course with the specified courseId that is published and not free.
    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        isPublished: true,
        isFree: false,
      },
    });
    // Checks if the user has already purchased the course.
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: params.courseId,
        },
      },
    });
    //  Checks if the user has already purchased the course. If true, it returns a NextResponse with a "Already purchased" status code (400).
    if (purchase) {
      return new NextResponse("Already purchased", { status: 400 });
    }
    // Checks if the course does not exist or is not published. If true, it returns a NextResponse with a "Course Not found" status code (404).
    if (!course) {
      return new NextResponse("Course Not found", { status: 404 });
    }

    // const invoice = {
    //   invoice: {
    //     items: [
    //       {
    //         name: course.title,
    //         quantity: 1,
    //         unit_price: Math.round(course.price! * 100),
    //         total_price: Math.round(course.price! * 100),
    //       },
    //     ],
    //     total_amount: Math.round(course.price! * 100),
    //     description: `Payment for ${course.description}`,
    //   },
    //   store: {
    //     name: "Your Store Name",
    //     tagline: "Your Store Tagline",
    //   },
    //   actions: {
    //     cancel_url: "http://localhost:3000/cancel",
    //     return_url: "http://localhost:3000/success",
    //     callback_url: `http://localhost:3000/api/callback?orderId=${course.id}`,
    //   },
    // };

    // const response = await axios.post(
    //   "https://app.paydunya.com/api/v1/checkout-invoice/create",
    //   invoice,
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       "X-PAYDUNYA-MASTER-KEY": process.env.PAYDUNYA_MASTER_KEY,
    //       "X-PAYDUNYA-PRIVATE-KEY": process.env.PAYDUNYA_PRIVATE_KEY,
    //       "X-PAYDUNYA-TOKEN": process.env.PAYDUNYA_TOKEN,
    //     },
    //   }
    // );

    //  Defines the line items for the Stripe checkout session, including the course title, description, and price.
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "XOF",
          product_data: {
            name: course.title,
            description: course.description!,
          },
          unit_amount: course.price! * 605,
        },
      },
    ];
    // Finds or creates a Stripe customer for the current user.
    let stripeCustomer = await db.stripeCustomer.findUnique({
      where: {
        id: course.id,
        userId: user.id,
      },
      select: {
        stripeCustomerId: true,
      },
    });
    // If the Stripe customer does not exist, it creates a new Stripe customer using the user's email address.
    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: user.emailAddresses[0].emailAddress,
      });

      stripeCustomer = await db.stripeCustomer.create({
        data: {
          userId: user.id,
          stripeCustomerId: customer.id,
        },
      });
    }
    // Creates a checkout session using the Stripe API, specifying the customer, line items, success URL, cancel URL, locale, phone number collection, and metadata.
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer.stripeCustomerId,
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?success=1?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?canceled=1`,
      locale: "fr",
      phone_number_collection: {
        enabled: true,
      },

      metadata: {
        courseId: course.id,
        userId: user.id,
        mode: "payment",
      },
    });

    // Returns a JSON object containing the URL of the Stripe checkout session.
    return NextResponse.json({ url: session.url });
    //  Starts a catch block to handle any errors that occur during the execution of the try block.
  } catch (error) {
    //  Logs the error to the console, with a prefix indicating that it is related to a course checkout.
    console.log("COURSE_ID_CHECKOUT", error);
    //  Returns a NextResponse with an "Internal Server Error" message and a status code of 500 to indicate that an unexpected error occurred.
    return new NextResponse("Internal error", { status: 500 });
  }
}
