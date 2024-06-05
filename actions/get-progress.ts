// Import the database instance from a custom database utility module.
import { db } from "@/lib/db";

// Define an asynchronous function to get the progress of a user in a specific course.
export const getProgress = async (
  userId: string, // ID of the user
  courseId: string // ID of the course
) => {
  // Returns a promise that resolves to a number (progress percentage)
  try {
    // Query the database to find all published chapters for the given course.
    const publisedChapters = await db.chapter.findMany({
      where: {
        courseId: courseId, // Filter chapters by the course ID
        isPublished: true, // Only include published chapters
      },
      select: {
        id: true, // Only select the ID field of each chapter
      },
    });

    // Extract the IDs of the published chapters into an array.
    const publisedChaptersId: string[] = publisedChapters.map(
      (chapter) => chapter.id // Map each chapter object to its ID
    );

    // Query the database to count the number of completed chapters by the user for the given course.
    const validCompletedChapters = await db.userProgress.count({
      where: {
        userId: userId, // Filter by user ID
        chapterId: {
          in: publisedChaptersId, // Only include chapters that are in the list of published chapter IDs
        },
        courseId: courseId, // Filter by course ID
        isCompleted: true, // Only include completed chapters
      },
    });

    // Calculate the progress percentage as the ratio of completed chapters to total published chapters, multiplied by 100.
    const progressPercentage =
      (validCompletedChapters / publisedChaptersId.length) * 100;

    // Return the calculated progress percentage.
    return progressPercentage;
  } catch (error) {
    // Log any errors that occur during the database query or data processing.
    console.log("[GET_PROGRESS]", error);
  }
};

// Explanation:
// Imports:

// db: The database instance to perform queries using Prisma.
// Function Definition:

// getProgress: An asynchronous function that takes a user ID and a course ID and returns the user's progress in the course as a percentage.
// Database Query (Published Chapters):

// findMany: Queries the database to find all published chapters for the given course.
// where clause: Filters the chapters by course ID and ensures they are published.
// select clause: Specifies that only the ID field of each chapter should be selected.
// Mapping IDs:

// map function: Extracts the IDs of the published chapters into an array (publisedChaptersId).
// Database Query (Completed Chapters):

// count: Queries the database to count the number of completed chapters by the user for the given course.
// where clause: Filters by user ID, ensures the chapter IDs are in the list of published chapter IDs, and filters by course ID and completion status.
// Progress Calculation:

// progressPercentage: Calculates the progress percentage as the ratio of completed chapters to total published chapters, multiplied by 100.
// Return Statement:

// Returns the calculated progress percentage.
// Error Handling:

// Logs any errors that occur during the database query or data processing.
