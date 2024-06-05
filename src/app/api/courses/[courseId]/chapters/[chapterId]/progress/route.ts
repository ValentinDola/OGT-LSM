// Imports the db object from the @/lib/db module, which likely provides access to a database.
import { db } from "@/lib/db";
// Imports the auth function from the @clerk/nextjs/server module, which handles authentication and provides information about the current user.
import { auth } from "@clerk/nextjs/server";
// Imports the NextResponse class from the next/server module, which represents a response that can be sent back to the client in a Next.js server-side function.
import { NextResponse } from "next/server";

// Defines an asynchronous function named PUT that takes a Request object and an object containing params with courseId and chapterId properties as arguments. This function likely handles PUT requests to update a user's progress in completing a chapter within a course.
export async function PUT(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    // Destructures the userId from the result of calling the auth function to get the current user's ID.
    const { userId } = auth();
    // Destructures the isCompleted property from the JSON body of the request to determine if the chapter is completed.
    const { isCompleted } = await req.json();
    // Checks if there is no userId (i.e., the user is not authenticated). If true, it returns a NextResponse with an "Unauthorized" status code (401).
    if (!userId) {
      return new NextResponse("Unauthorize", { status: 401 });
    }
    // Upserts (inserts or updates) the user's progress in completing the chapter.
    const userProgress = await db.userProgress.upsert({
      where: {
        userId_chapterId_courseId: {
          userId,
          chapterId: params.chapterId,
          courseId: params.courseId,
        },
      },
      update: {
        isCompleted,
      },
      create: {
        userId,
        chapterId: params.chapterId,
        courseId: params.courseId,
        isCompleted,
      },
    });
    // Returns a JSON response with the updated user progress.
    return NextResponse.json(userProgress);
    // Starts a catch block to handle any errors that occur during the execution of the try block.
  } catch (error) {
    // Logs the error to the console, with a prefix indicating that it is related to updating a chapter's progress.
    console.log("[CHAPTER_ID_PROGRESS]", error);
    //  Returns a NextResponse with an "Internal Server Error" message and a status code of 500 to indicate that an unexpected error occurred.
    return new NextResponse("Internal Error", { status: 500 });
  }
}
