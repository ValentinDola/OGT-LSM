// Imports the db object from the @/lib/db module, which likely provides access to a database.
import { db } from "@/lib/db";
//  Imports the isMentor function from the @/lib/mentor module, which likely checks if a user is a mentor.
import { isMentor } from "@/lib/mentor";
// Imports the auth function from the @clerk/nextjs/server module, which handles authentication and provides information about the current user.
import { auth } from "@clerk/nextjs/server";
// Imports the NextResponse class from the next/server module, which represents a response that can be sent back to the client in a Next.js server-side function.
import { NextResponse } from "next/server";

//  Defines an asynchronous function named POST that takes a Request object and an object containing params with a courseId property as arguments. This function likely handles POST requests to create an attachment for a course.
export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    // Destructures the userId from the result of calling the auth function to get the current user's ID.
    const { userId } = auth();
    // Destructures the url property from the JSON body of the request to get the URL of the attachment.
    const { url } = await req.json();
    // Checks if there is no userId (i.e., the user is not authenticated) or if the user is not a mentor. If true, it returns a NextResponse with an "Unauthorized" status code (401).
    if (!userId || !isMentor(userId)) {
      return new NextResponse("USER UNAUTHORIZED", { status: 401 });
    }
    // Finds the course owner in the database based on the courseId and the userId.
    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });
    // Checks if there is no course owner found. If true, it returns a NextResponse with an "Unauthorized" status code (401).
    if (!courseOwner) {
      return new NextResponse("UNAUTHORIZED", { status: 401 });
    }
    //  Creates a new attachment in the database with the provided URL, name (extracted from the URL), and course ID.
    const attachment = await db.attachment.create({
      data: {
        url,
        name: url.split("/").pop(),
        courseId: params.courseId,
      },
    });
    // Returns a JSON response with the created attachment.
    return NextResponse.json(attachment);
    // Starts a catch block to handle any errors that occur during the execution of the try block.
  } catch (error) {
    //  Logs the error to the console, with a prefix indicating that it is related to creating attachments for a course.
    console.log("COURSE_ID_ATTACHMENTS", error);
    //  Returns a NextResponse with an "Internal Server Error" message and a status code of 500 to indicate that an unexpected error occurred.
    return new NextResponse("Internal Error", { status: 500 });
  }
}
