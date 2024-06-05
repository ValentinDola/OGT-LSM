// Imports the db object from the @/lib/db module, which likely provides access to a database.
import { db } from "@/lib/db";
// Imports the isMentor function from the @/lib/mentor module, which likely checks if a user is a mentor.
import { isMentor } from "@/lib/mentor";
// Imports the auth function from the @clerk/nextjs/server module, which handles authentication and provides information about the current user.
import { auth } from "@clerk/nextjs/server";
//  Imports the NextResponse class from the next/server module, which represents a response that can be sent back to the client in a Next.js server-side function.
import { NextResponse } from "next/server";

// Defines an asynchronous function named PATCH that takes a Request object and an object containing params with courseId and chapterId properties as arguments. This function likely handles PATCH requests to update a chapter's publication status in a course.
export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    // Destructures the userId from the result of calling the auth function to get the current user's ID.
    const { userId } = auth();
    // Destructures the courseId and chapterId from the params object.
    const { courseId, chapterId } = params;

    // Checks if there is no userId (i.e., the user is not authenticated) or if the user is not a mentor. If either condition is true, it returns a NextResponse with a "UNAUTHORIZED" status code (401).
    if (!userId || !isMentor(userId)) {
      return new NextResponse("UNAUTHORIZED", { status: 401 });
    }
    // Checks if the user is the owner of the course.
    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });
    // If the user is not the owner of the course, it returns a NextResponse with a "COURSE UNAUTHORIZED" status code (401).
    if (!ownCourse) {
      return new NextResponse("COURSE UNAUTHORIZED", { status: 401 });
    }
    // Finds the chapter to be updated.
    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        courseId: courseId,
      },
    });
    // Finds the muxData associated with the chapter.
    const muxData = await db.muxData.findUnique({
      where: {
        chapterId: chapterId,
      },
    });
    // Checks if the chapter or muxData is missing, or if the chapter's title, description, or videoUrl is missing. If any condition is true, it returns a NextResponse with a "Missing required fields" status code (400).
    if (
      !chapter ||
      !muxData ||
      !chapter.title ||
      !chapter.description ||
      !chapter.videoUrl
    ) {
      return new NextResponse("Missing required fields", { status: 400 });
    }
    // Updates the chapter's publication status to true.
    const pusblishedChapter = await db.chapter.update({
      where: {
        id: chapterId,
        courseId: courseId,
      },
      data: {
        isPublished: true,
      },
    });
    // Returns a JSON response with the updated chapter.
    return NextResponse.json(pusblishedChapter);
    // Starts a catch block to handle any errors that occur during the execution of the try block.
  } catch (error) {
    // Logs the error to the console, with a prefix indicating that it is related to updating a chapter.
    console.log("CHAPTER_ID_UPDATE]", error);
    // Returns a NextResponse with an "Internal Server Error" message and a status code of 500 to indicate that an unexpected error occurred.
    return new NextResponse("Internal Error Server", { status: 500 });
  }
}
