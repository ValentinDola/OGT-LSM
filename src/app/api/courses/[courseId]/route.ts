//This line imports the db object from the @/lib/db module, which is likely a database client for interacting with a database.
import { db } from "@/lib/db";
//This line imports the isMentor function from the @/lib/mentor module, which likely checks if a user is a mentor based on their userId.
import { isMentor } from "@/lib/mentor";
//This line imports the auth function from the @clerk/nextjs/server module, which handles authentication and provides information about the current user.
import { auth } from "@clerk/nextjs/server";
//This line imports the Mux class from the @mux/mux-node module, which is likely a client for interacting with the Mux video platform.
import Mux from "@mux/mux-node";
//This line imports the NextResponse class from the next/server module, which represents a response that can be sent back to the client in a Next.js server-side function.
import { NextResponse } from "next/server";

//This line initializes a video object using the Mux class, providing the Mux API token ID and token secret from environment variables. This object is likely used to interact with the Mux video API.
const { video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
});

//This line exports an asynchronous function named DELETE that takes a Request object and an object containing params with a courseId property as arguments. This function likely handles DELETE requests to delete a course.
export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    //This line gets the userId from the current user's authentication information.
    const { userId } = auth();
    //This line checks if there is no userId (i.e., the user is not authenticated) or if the user is not a mentor. If either condition is true, it returns a NextResponse with an "UNAUTHORIZED" status code (401).
    if (!userId || !isMentor(userId)) {
      return new NextResponse("UNAUTHORIZED", { status: 401 });
    }
    //This line checks if the course with the specified courseId belongs to the current user.
    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });
    //This line checks if the current user does not own the course. If true, it returns a NextResponse with a "COURSE UNAUTHORIZED" status code (401).
    if (!ownCourse) {
      return new NextResponse("COURSE UNAUTHORIZED", { status: 401 });
    }
    //This line fetches the course with the specified courseId, including its chapters and associated Mux data.
    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });
    //This line checks if the course does not exist. If true, it returns a NextResponse with a "COURSE NOT FOUND" status code (404).
    if (!course) {
      return new NextResponse("COURSE NOT FOUND", { status: 404 });
    }
    // This line iterates over each chapter of the course and deletes its associated Mux asset if it exists.
    for (const chapter of course.chapters) {
      if (chapter.muxData?.assetId) {
        await video.assets.delete(chapter.muxData.assetId);
      }
    }
    //This line deletes the course from the database.
    const deletedCourse = await db.course.delete({
      where: {
        id: params.courseId,
      },
    });
    // This line returns a JSON representation of the deleted course.
    return NextResponse.json(deletedCourse);
  } catch (error) {
    console.log("[COURSE_ID_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

const updateCourseStatus = async (
  params: { courseId: string },
  values: { isFree: boolean }
) => {
  // Update chapters to be free or paid based on the isFree value
  await db.chapter.updateMany({
    where: {
      courseId: params.courseId,
    },
    data: {
      isFree: values.isFree,
    },
  });

  // Update course subscription status based on the isFree value
  await db.course.updateMany({
    where: {
      id: params.courseId,
    },
    data: {
      isFree: !values.isFree,
    },
  });

  // Reset user progress for the course
  await db.userProgress.updateMany({
    where: {
      courseId: params.courseId,
    },
    data: {
      isCompleted: false,
    },
  });
};

// Usage

// This line exports an asynchronous function named PATCH that takes a Request object and an object containing params with a courseId property as arguments. This function likely handles PATCH requests to update a course.
export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    //This line gets the userId from the current user's authentication information.
    const { userId } = auth();
    //This line parses the request body as JSON and assigns it to the values variable, which likely contains the updated course data.
    const values = await req.json();
    //This line checks if there is no userId (i.e., the user is not authenticated) or if the user is not a mentor. If either condition is true, it returns a NextResponse with an "UNAUTHORIZED" status code (401).
    if (!userId || !isMentor(userId)) {
      return new NextResponse("UNAUTHORIZED", { status: 401 });
    }

    // This line checks if the course with the specified courseId belongs to the current user.
    const existingCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });
    //This line checks if the current user does not own the course. If true, it returns a NextResponse with a "COURSE NOT FOUND" status code (404).
    if (!existingCourse) {
      return new NextResponse("COURSE NOT FOUND", { status: 404 });
    }

    // This line updates the course with the specified courseId using the data in the values variable, including its chapters.
    const course = await db.course.update({
      where: {
        id: params.courseId,
      },
      data: {
        ...values,
      },
      include: {
        chapters: true,
      },
    });
    //This line checks if the course is set to be free.
    // if (values.isFree === true) {
    //   //This line updates all chapters of the course to be free.
    //   await db.chapter.updateMany({
    //     where: {
    //       courseId: params.courseId,
    //     },
    //     data: {
    //       isFree: true,
    //     },
    //   });

    //   await db.course.updateMany({
    //     where: {
    //       id: params.courseId,
    //     },
    //     data: {
    //       isSubscribed: false,
    //     },
    //   });

    //   await db.userProgress.updateMany({
    //     where: {
    //       id: params.courseId,
    //     },
    //     data: {
    //       isCompleted: false,
    //     },
    //   });
    // }
    // //This line checks if the course is set to be paid.
    // if (values.isFree === false) {
    //   //This line updates all chapters of the course to be paid.
    //   await db.chapter.updateMany({
    //     where: {
    //       courseId: params.courseId,
    //     },
    //     data: {
    //       isFree: false,
    //     },
    //   });

    //   await db.course.updateMany({
    //     where: {
    //       id: params.courseId,
    //     },
    //     data: {
    //       isSubscribed: true,
    //     },
    //   });

    //   await db.userProgress.updateMany({
    //     where: {
    //       courseId: params.courseId,
    //     },
    //     data: {
    //       isCompleted: false,
    //     },
    //   });
    // }

    await updateCourseStatus(params, values);
    //This line returns a JSON representation of the updated course.
    return NextResponse.json(course);
    //This line starts a catch block to handle any errors that occur during the execution of the try block.
  } catch (error) {
    //This line logs the error to the console, with a prefix indicating that it is related to a course ID.
    console.log("[COURSE_ID]", error);
    //This line returns a NextResponse with an "Internal Server Error" message and a status code of 500 to indicate that an unexpected error occurred.
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
