// Import the database instance from a custom database utility module.
import { db } from "@/lib/db";

// Import the Attachment, Chapter, and Purchase models from Prisma Client to use their types.
import { Attachment, Chapter, Purchase } from "@prisma/client";

// Define an interface for the properties required to get a chapter.
interface GetChapterProps {
  userId: string;
  courseId: string;
  chapterId: string;
}

// Define an asynchronous function to get chapter details based on user, course, and chapter IDs.
export const getChapter = async ({
  userId,
  courseId,
  chapterId,
}: GetChapterProps) => {
  try {
    // Query the database to find a purchase matching the user and course.
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    const subscription = await db.subscription.findFirst({
      where: {
        userId: userId,
        status: "completed",
      },
    });

    // Query the database to find the course by ID, ensuring it is published.
    const course = await db.course.findUnique({
      where: {
        isPublished: true,
        id: courseId,
      },
      // Select only the price field of the course.
      select: {
        price: true,
      },
    });

    // Query the database to find the chapter by ID, ensuring it is published.
    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      },
    });

    // If either the chapter or course is not found, throw an error.
    if (!chapter || !course) {
      throw new Error("Chapter or course not found");
    }

    // Initialize variables to hold muxData, attachments, and next chapter.
    let muxData = null;
    let attachments: Attachment[] = [];
    let nextChapter: Chapter | null = null;

    // If the user has purchased the course or the chapter is free, fetch the attachments.
    if (purchase || chapter.isFree || subscription) {
      attachments = await db.attachment.findMany({
        where: {
          courseId: courseId,
        },
      });
    }

    // If the chapter is free or the user has purchased the course, fetch muxData and the next chapter.
    if (chapter.isFree || purchase || subscription) {
      muxData = await db.muxData.findUnique({
        where: {
          chapterId: chapterId,
        },
      });

      nextChapter = await db.chapter.findFirst({
        where: {
          courseId: courseId,
          isPublished: true,
          position: {
            gt: chapter?.position,
          },
        },
        orderBy: {
          position: "asc",
        },
      });
    }

    // Query the database to find the user's progress for the specific chapter and course.
    const userProgress = await db.userProgress.findUnique({
      where: {
        userId_chapterId_courseId: {
          userId,
          chapterId,
          courseId,
        },
      },
    });

    // Return the fetched data, including chapter, course, muxData, attachments, next chapter, user progress, and purchase.
    return {
      chapter,
      course,
      muxData,
      attachments,
      nextChapter,
      userProgress,
      purchase,
    };
  } catch (error) {
    // Log any errors that occur during the database query or data processing.
    console.log("[GET_CHAPTER]", error);
    // Return default values in case of an error.
    return {
      chapter: null,
      course: null,
      muxData: null,
      attachments: [],
      nextChapter: null,
      userProgress: null,
      purchase: null,
    };
  }
};

// Explanation:
// Imports:

// db: The database instance to perform queries using Prisma.
// Attachment, Chapter, Purchase: Types from Prisma Client representing the respective database models.
// Interface Definition:

// GetChapterProps: Defines the properties required to get a chapter (userId, courseId, chapterId).
// Function Definition:

// getChapter: An asynchronous function that fetches chapter details based on the provided user, course, and chapter IDs.
// Database Queries:

// Purchase Query: Finds a purchase that matches the user and course.
// Course Query: Finds a published course by its ID and selects only the price field.
// Chapter Query: Finds a published chapter by its ID.
// Error Handling:

// If the chapter or course is not found, an error is thrown.
// Variable Initialization:

// muxData, attachments, nextChapter: Initialized to store data related to the chapter, attachments, and next chapter.
// Conditional Logic:

// If the user has purchased the course or the chapter is free, fetch the attachments.
// If the chapter is free or the user has purchased the course, fetch muxData and the next chapter.
// User Progress Query:

// Finds the user's progress for the specific chapter and course.
// Return Statement:

// Returns the fetched data, including chapter, course, muxData, attachments, next chapter, user progress, and purchase.
// Error Catching:

// Logs any errors that occur and returns default values in case of an error.
