// Imports the db object from the @/lib/db module, which likely provides access to a database.
import { db } from "@/lib/db";
// Imports the isMentor function from the @/lib/mentor module, which likely checks if a user is a mentor.
import { isMentor } from "@/lib/mentor";
// Imports the auth function from the @clerk/nextjs/server module, which handles authentication and provides information about the current user.
import { auth } from "@clerk/nextjs/server";
//  Imports the NextResponse class from the next/server module, which represents a response that can be sent back to the client in a Next.js server-side function.
import { NextResponse } from "next/server";

//  Defines an asynchronous function named PUT that takes a Request object and an object containing params with a courseId property as arguments. This function likely handles PUT requests to reorder chapters in a course.
export async function PUT(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    //  Destructures the userId from the result of calling the auth function to get the current user's ID.
    const { userId } = auth();
    // Destructures the list from the JSON body of the request to get the list of chapters with their updated positions.
    const { list } = await req.json();
    // Checks if there is no userId (i.e., the user is not authenticated) or if the user is not a mentor. If either condition is true, it returns a NextResponse with a "USER UNAUTHORIZED" status code (401).
    if (!userId || !isMentor(userId)) {
      return new NextResponse("USER UNAUTHORIZED", { status: 401 });
    }
    // Checks if the user is the owner of the course.
    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });
    //  If the user is not the owner of the course, it returns a NextResponse with an "UNAUTHORIZED" status code (401).
    if (!courseOwner) {
      return new NextResponse("UNAUTHORIZED", { status: 401 });
    }
    // Loops through the list of chapters and updates each chapter's position in the database.
    for (let item of list) {
      await db.chapter.update({
        where: { id: item.id },
        data: { position: item.position },
      });
    }
    // Returns a JSON response with a "success" message and a status code of 200 to indicate that the chapter reordering was successful.
    return NextResponse.json("success", { status: 200 });
    // Starts a catch block to handle any errors that occur during the execution of the try block.
  } catch (error) {
    // Logs the error to the console, with a prefix indicating that it is related to chapter reordering.
    console.log("CHAPTERS REORDER", error);
    // Returns a NextResponse with an "Internal Server Error" message and a status code of 500 to indicate that an unexpected error occurred.
    return new NextResponse("Internal Error", { status: 500 });
  }
}
