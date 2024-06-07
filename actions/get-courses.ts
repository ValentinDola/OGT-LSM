// Import the Category and Course models from Prisma Client to use their types.
import { Category, Course } from "@prisma/client";

// Import a custom function to get the user's progress in a course.
import { getProgress } from "./get-progress";

// Import the database instance from a custom database utility module.
import { db } from "@/lib/db";

// Define a type that combines Course with additional fields for category, chapters, and progress.
type CourseWithProgressWithCategory = Course & {
  category: Category | null; // Category of the course
  chapters: { id: string }[]; // Array of chapter IDs
  progress: number | undefined; // User's progress in the course
};

// Define a type for the parameters required to get a course.
type GetCourse = {
  userId: string; // ID of the user
  title?: string; // Optional title of the course
  categoryId?: string; // Optional category ID of the course
};

// Asynchronous function to get paid courses with user's progress.
export const getCourse = async ({ userId, title, categoryId }: GetCourse) => {
  try {
    // Query the database to find all paid courses that match the search criteria.
    const courses = await db.course.findMany({
      where: {
        isPublished: true, // Only include published courses
        isFree: false, // Only include paid courses
        title: {
          contains: title, // Filter by title if provided
        },
        categoryId, // Filter by category ID if provided
      },
      include: {
        category: true, // Include the category of the course
        chapters: {
          where: {
            isPublished: true, // Only include published chapters
          },
          select: {
            id: true, // Select only the ID field of the chapters
          },
        },
        purchases: {
          where: {
            userId, // Filter by user ID to check if the user has purchased the course
          },
        },
      },
      orderBy: {
        createdAt: "desc", // Order by creation date in descending order
      },
    });

    // Initialize an array to hold courses with progress information.
    const coursesWithProgress: CourseWithProgressWithCategory[] = [];

    // Iterate over the fetched courses.
    for (const course of courses) {
      if (course.purchases.length === 0) {
        // If the user has not purchased the course, set progress to null.
        coursesWithProgress.push({
          ...course,
          progress: undefined,
        });
      } else {
        // If the user has purchased the course, get the progress percentage.
        const progressPercentage = await getProgress(userId, course.id);
        coursesWithProgress.push({
          ...course,
          progress: progressPercentage,
        });
      }
    }

    // Return the array of courses with progress information.
    return coursesWithProgress;
  } catch (error: any) {
    // Log any errors that occur during the database query or data processing.
    console.log("[GET_PAID_COURSES]", error);
  }
};

// Asynchronous function to get free courses with user's progress.
export const getFreeCourse = async ({
  userId,
  title,
  categoryId,
}: GetCourse) => {
  try {
    // Query the database to find all free courses that match the search criteria.
    const courses = await db.course.findMany({
      where: {
        isPublished: true, // Only include published courses
        isFree: true, // Only include free courses
        isSubscribable: false,
        title: {
          contains: title, // Filter by title if provided
        },
        categoryId, // Filter by category ID if provided
      },
      include: {
        category: true, // Include the category of the course
        chapters: {
          where: {
            isPublished: true, // Only include published chapters
          },
          select: {
            id: true, // Select only the ID field of the chapters
          },
        },
        purchases: {
          where: {
            userId, // Filter by user ID to check if the user has purchased the course
          },
        },
      },
      orderBy: {
        createdAt: "desc", // Order by creation date in descending order
      },
    });

    // Initialize an array to hold courses with progress information.
    const coursesWithProgress: CourseWithProgressWithCategory[] = [];

    // Iterate over the fetched courses.
    for (const course of courses) {
      if (course.isFree === false) {
        // If the course is not free, set progress to null.
        coursesWithProgress.push({
          ...course,
          progress: undefined,
        });
      } else {
        // If the course is free, get the progress percentage.
        const progressPercentage = await getProgress(userId, course.id);
        coursesWithProgress.push({
          ...course,
          progress: progressPercentage,
        });
      }
    }

    // Return the array of courses with progress information.
    return coursesWithProgress;
  } catch (error: any) {
    // Log any errors that occur during the database query or data processing.
    console.log("[GET_FREE_COURSES]", error);
  }
};

// Asynchronous function to get subscribed courses with user's progress.
export const getSubsCourse = async ({
  userId,
  title,
  categoryId,
}: GetCourse) => {
  try {
    // Query the database to find all subscribed courses that match the search criteria.
    const courses = await db.course.findMany({
      where: {
        isPublished: true, // Only include published courses
        isFree: false, // Only include subscribed courses
        isSubscribable: true,
        title: {
          contains: title, // Filter by title if provided
        },
        categoryId, // Filter by category ID if provided
      },
      include: {
        category: true, // Include the category of the course
        chapters: {
          where: {
            isPublished: true, // Only include published chapters
          },
          select: {
            id: true, // Select only the ID field of the chapters
          },
        },
      },
      orderBy: {
        createdAt: "desc", // Order by creation date in descending order
      },
    });

    // Initialize an array to hold courses with progress information.
    const coursesWithProgress: CourseWithProgressWithCategory[] = [];

    // Iterate over the fetched courses.
    for (const course of courses) {
      if (course.isSubscribable === false) {
        // If the course is not subscribed, set progress to null.
        coursesWithProgress.push({
          ...course,
          progress: undefined,
        });
      } else {
        // If the course is subscribed, get the progress percentage.
        const progressPercentage = await getProgress(userId, course.id);
        coursesWithProgress.push({
          ...course,
          progress: progressPercentage,
        });
      }
    }

    // Return the array of courses with progress information.
    return coursesWithProgress;
  } catch (error: any) {
    // Log any errors that occur during the database query or data processing.
    console.log("[GET_SUBSCRIBED_COURSES]", error);
  }
};

export const getSubscribedCourse = async ({
  userId,
  title,
  categoryId,
}: GetCourse) => {
  try {
    // Query the database to find all subscribed courses that match the search criteria.
    const courses = await db.course.findMany({
      where: {
        isPublished: true, // Only include published courses
        isFree: true, // Only include subscribed courses
        isSubscribable: true,
        title: {
          contains: title, // Filter by title if provided
        },
        categoryId, // Filter by category ID if provided
      },
      include: {
        category: true, // Include the category of the course
        chapters: {
          where: {
            isPublished: true, // Only include published chapters
          },
          select: {
            id: true, // Select only the ID field of the chapters
          },
        },
      },
      orderBy: {
        createdAt: "desc", // Order by creation date in descending order
      },
    });

    // Initialize an array to hold courses with progress information.
    const coursesWithProgress: CourseWithProgressWithCategory[] = [];

    // Iterate over the fetched courses.
    for (const course of courses) {
      if (course.isSubscribable === false) {
        // If the course is not subscribed, set progress to null.
        coursesWithProgress.push({
          ...course,
          progress: undefined,
        });
      } else {
        // If the course is subscribed, get the progress percentage.
        const progressPercentage = await getProgress(userId, course.id);
        coursesWithProgress.push({
          ...course,
          progress: progressPercentage,
        });
      }
    }

    // Return the array of courses with progress information.
    return coursesWithProgress;
  } catch (error: any) {
    // Log any errors that occur during the database query or data processing.
    console.log("[GET_SUBSCRIBED_COURSES]", error);
  }
};

// Explanation:
// Imports:

// Category, Course: Types from Prisma Client representing the respective database models.
// getProgress: A custom function to get the user's progress in a course.
// db: The database instance to perform queries using Prisma.
// Type Definition:

// CourseWithProgressWithCategory: A type that combines the Course model with additional fields for category, chapters, and progress.
// Function Definitions:

// getCourse: Asynchronous function to get paid courses with user's progress.
// getFreeCourse: Asynchronous function to get free courses with user's progress.
// getSubsCourse: Asynchronous function to get subscribed courses with user's progress.
// Database Queries:

// findMany: Used in each function to find courses based on specific criteria (published, free, subscribed, title, category).
// include: Used to include related data such as category, chapters, and purchases.
// Conditional Logic:

// Paid Courses: Checks if the user has purchased the course and calculates progress.
// Free Courses: Checks if the course is free and calculates progress.
// Subscribed Courses: Checks if the course is subscribed and calculates progress.
// Progress Calculation:

// If the user has access to the course, the getProgress function is called to calculate the user's progress in the course.
// Return Statements:

// Returns an array of courses with progress information.
// Error Handling:

// Logs any errors that occur during the database query or data processing and handles them gracefully.
