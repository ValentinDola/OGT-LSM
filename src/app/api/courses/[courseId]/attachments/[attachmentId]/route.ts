// Imports the db object from the @/lib/db module, which likely provides access to a database.
import { db } from "@/lib/db";
// Imports the isMentor function from the @/lib/mentor module, which likely checks if a user is a mentor.
import { isMentor } from "@/lib/mentor";
// Imports the auth function from the @clerk/nextjs/server module, which handles authentication and provides information about the current user.
import { auth } from "@clerk/nextjs/server";
// Imports the NextResponse class from the next/server module, which represents a response that can be sent back to the client in a Next.js server-side function.
import { NextResponse } from "next/server";

// Defines an asynchronous function named DELETE that takes a Request object and an object containing params with courseId and attachmentId properties as arguments. This function likely handles DELETE requests to delete an attachment for a course.
export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; attachmentId: string } }
) {
  try {
    //  Destructures the userId from the result of calling the auth function to get the current user's ID.
    const { userId } = auth();
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
    //  Checks if there is no course owner found. If true, it returns a NextResponse with an "Unauthorized" status code (401).
    if (!courseOwner) {
      return new NextResponse("UNAUTHORIZED", { status: 401 });
    }
    //  Deletes the attachment from the database based on the courseId and the attachmentId.
    const attachment = await db.attachment.delete({
      where: {
        courseId: params.courseId,
        id: params.attachmentId,
      },
    });
    // Returns a JSON response with the deleted attachment.
    return NextResponse.json(attachment);
    // Starts a catch block to handle any errors that occur during the execution of the try block.
  } catch (error) {
    // Logs the error to the console, with a prefix indicating that it is related to deleting an attachment.
    console.log("ATTACHMENT_ID DELETE", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
