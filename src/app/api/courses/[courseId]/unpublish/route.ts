// Imports the db object from the @/lib/db module, which likely provides access to a database.
import { db } from "@/lib/db";
// Imports the isMentor function from the @/lib/mentor module, which likely checks if a user is a mentor.
import { isMentor } from "@/lib/mentor";
// Imports the auth function from the @clerk/nextjs/server module, which handles authentication and provides information about the current user.
import { auth } from "@clerk/nextjs/server";
//Imports the NextResponse class from the next/server module, which represents a response that can be sent back to the client in a Next.js server-side function.
import { NextResponse } from "next/server";

//Defines an asynchronous function named PATCH that takes a Request object and an object containing params with a courseId property as arguments. This function likely handles PATCH requests to update a course's publishing status.
export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    //Destructures the userId from the result of calling the auth function to get the current user's ID.
    const { userId } = auth();
    //Destructures the courseId from the params object, which likely contains the courseId parameter from the request.
    const { courseId } = params;
    //Checks if there is no userId (i.e., the user is not authenticated) or if the user is not a mentor. If either condition is true, it returns a NextResponse with an "UNAUTHORIZED" status code (401).
    if (!userId || !isMentor(userId)) {
      return new NextResponse("UNAUTHORIZED", { status: 401 });
    }
    //Checks if the course with the specified courseId belongs to the current user.
    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });
    //Checks if the current user does not own the course. If true, it returns a NextResponse with a "COURSE UNAUTHORIZED" status code (401).
    if (!ownCourse) {
      return new NextResponse("COURSE UNAUTHORIZED", { status: 401 });
    }
    //Finds the course with the specified courseId and userId.
    const course = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });
    //Checks if the course does not exist. If true, it returns a NextResponse with a "COURSE NOT FOUND" status code (404).
    if (!course) {
      return new NextResponse("COURSE NOT FOUND", { status: 404 });
    }
    //Updates the course with the specified courseId and userId to set its isPublished property to false.
    const unPusblishedCourse = await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: {
        isPublished: false,
      },
    });
    //Returns a JSON representation of the updated course.
    return NextResponse.json(unPusblishedCourse);
  } catch (error) {
    // Logs the error to the console, with a prefix indicating that it is related to a course being unpublished.
    console.log("COURSE_UNPUBLISHED]", error);
    //: Returns a NextResponse with an "Internal Server Error" message and a status code of 500 to indicate that an unexpected error occurred.
    return new NextResponse("Internal Error Server", { status: 500 });
  }
}
