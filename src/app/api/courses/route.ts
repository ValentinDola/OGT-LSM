//This line imports the db object from the @/lib/db module. This object likely provides access to a database, possibly for storing course information.
import { db } from "@/lib/db";

//This line imports the isMentor function from the @/lib/mentor module. This function likely checks if a user is a mentor based on their userId.
import { isMentor } from "@/lib/mentor";

//This line imports the auth function from the @clerk/nextjs/server module. This function likely handles authentication and provides information about the current user.
import { auth } from "@clerk/nextjs/server";

//This line imports the NextResponse class from the next/server module. This class likely represents a response that can be sent back to the client in a Next.js server-side function.
import { NextResponse } from "next/server";

//This line exports an asynchronous function named POST that takes a Request object as an argument. This function likely handles POST requests to create a new course.
export async function POST(req: Request) {
  try {
    //This line calls the auth function to get information about the current user, specifically their userId.
    const { userId } = auth();
    //This line uses req.json() to parse the incoming request body as JSON and extract the title property from it.
    const { title } = await req.json();

    //This line checks if there is no userId (i.e., the user is not authenticated) or if the user is not a mentor. If either condition is true, it returns a NextResponse with an "UNAUTHORIZED" status code (401).
    if (!userId || !isMentor(userId)) {
      return new NextResponse("UNAUTHORIZED", { status: 401 });
    }

    //This line uses the db.course.create method to create a new course in the database, using the userId and title extracted earlier.
    const course = await db.course.create({
      data: {
        userId,
        title,
      },
    });

    //This line returns a NextResponse with a JSON representation of the created course.
    return NextResponse.json(course);
  } catch (error) {
    //This line starts a catch block to handle any errors that occur during the execution of the try block.
    //This line logs the error to the console, with a prefix indicating that it is related to courses.
    console.log("[COURSES]", error);
    //This line returns a NextResponse with an "Internal Server Error" message and a status code of 500 to indicate that an unexpected error occurred.
    return new NextResponse("Internal Error Server", { status: 500 });
  }
}
