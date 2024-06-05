// Imports the db object from the @/lib/db module, which likely provides access to a database.
import { db } from "@/lib/db";
// Imports the isMentor function from the @/lib/mentor module, which likely checks if a user is a mentor.
import { isMentor } from "@/lib/mentor";
// Imports the auth function from the @clerk/nextjs/server module, which handles authentication and provides information about the current user.
import { auth } from "@clerk/nextjs/server";
//  Imports the NextResponse class from the next/server module, which represents a response that can be sent back to the client in a Next.js server-side function.
import { NextResponse } from "next/server";

// Defines an asynchronous function named POST that takes a Request object and an object containing params with a courseId property as arguments. This function likely handles POST requests to create a new chapter for a course.
export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    //  Destructures the userId from the result of calling the auth function to get the current user's ID.
    const { userId } = auth();
    // Destructures the title from the JSON body of the request to get the title of the new chapter.
    const { title } = await req.json();
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
    // Finds the last chapter of the course to determine the position of the new chapter.
    const lastChapter = await db.chapter.findFirst({
      where: {
        courseId: params.courseId,
      },
      orderBy: {
        position: "desc",
      },
    });
    // Calculates the position of the new chapter based on the position of the last chapter.
    const newPosition = lastChapter ? lastChapter.position + 1 : 1;
    // Creates a new chapter in the database with the provided title, courseId, and position.
    const chapter = await db.chapter.create({
      data: {
        title,
        courseId: params.courseId,
        position: newPosition,
      },
    });
    // Returns a JSON representation of the newly created chapter.
    return NextResponse.json(chapter);
    // Starts a catch block to handle any errors that occur during the execution of the try block.
  } catch (error) {
    // Logs the error to the console, with a prefix indicating that it is related to chapters.
    console.log("CHAPTERS", error);
    // Returns a NextResponse with an "Internal Server Error" message and a status code of 500 to indicate that an unexpected error occurred.
    return new NextResponse("Internal Error", { status: 500 });
  }
}
