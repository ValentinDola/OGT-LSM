// Import the database instance from a custom database utility module.
import { db } from "@/lib/db";

// Import the Category, Chapter, and Course models from Prisma Client to use their types.
import { Category, Chapter, Course } from "@prisma/client";

// Import a custom function to get the user's progress in a course.
import { getProgress } from "./get-progress";

// Define a type that combines Course with additional fields for category, chapters, and progress.
type CourseWithProgressWithCategory = Course & {
  category: Category; // Category of the course
  chapters: Chapter[]; // Array of chapters in the course
  progress: number | null; // User's progress in the course
};

// Define a type for the structure of the returned dashboard courses.
type DashboardCourses = {
  completedCourses: CourseWithProgressWithCategory[]; // Array of completed courses
  coursesInProgress: CourseWithProgressWithCategory[]; // Array of courses in progress
};

// Asynchronous function to get the dashboard courses for a user.
export const getDashboardCourses = async (
  userId: string // ID of the user
): Promise<DashboardCourses> => {
  try {
    // Query the database to find all purchased courses for the user.
    const purchasedCourses = await db.purchase.findMany({
      where: {
        userId: userId, // Filter by user ID
      },
      select: {
        course: {
          include: {
            category: true, // Include the category of the course
            chapters: {
              where: {
                isPublished: true, // Only include published chapters
              },
            },
          },
        },
      },
    });

    // Map the purchased courses to a list of courses with the necessary structure.
    const courses = purchasedCourses.map(
      (purchase) => purchase.course
    ) as CourseWithProgressWithCategory[];

    // Iterate over the fetched courses to calculate and add the progress for each course.
    for (let course of courses) {
      const progress = await getProgress(userId, course.id); // Get the progress for the course
      course["progress"] = progress; // Add the progress to the course object
    }

    // Filter the courses to get the completed courses.
    const completedCourses = courses.filter(
      (course) => course.progress === 100 // Course is completed if progress is 100%
    );

    // Filter the courses to get the courses in progress.
    const coursesInProgress = courses.filter(
      (course) => (course.progress ?? 0) > 0 && (course.progress ?? 0) < 100 // Course is in progress if progress is between 0 and 100%
    );

    // Return the completed courses and courses in progress.
    return {
      completedCourses,
      coursesInProgress,
    };
  } catch (error) {
    // Log any errors that occur during the database query or data processing.
    console.log("[GET_DASHBOARD_COURSES]", error);
    // Return empty arrays for completed courses and courses in progress in case of an error.
    return {
      completedCourses: [],
      coursesInProgress: [],
    };
  }
};

// Explanation:
// Imports:

// db: The database instance to perform queries using Prisma.
// Category, Chapter, Course: Types from Prisma Client representing the respective database models.
// getProgress: A custom function to get the user's progress in a course.
// Type Definition:

// CourseWithProgressWithCategory: A type that combines the Course model with additional fields for category, chapters, and progress.
// DashboardCourses: A type for the structure of the returned dashboard courses, including completed courses and courses in progress.
// Function Definition:

// getDashboardCourses: An asynchronous function that takes a user ID and returns the user's dashboard courses.
// Database Query:

// findMany: Queries the database to find all purchased courses for the user.
// select and include: Specifies that the query should include the course's category and published chapters.
// Mapping and Progress Calculation:

// Mapping: Maps the purchased courses to a list of courses with the necessary structure.
// Progress Calculation: Iterates over the fetched courses and calculates the progress for each course using the getProgress function.
// Filtering:

// Completed Courses: Filters the courses to get the completed courses (progress is 100%).
// Courses in Progress: Filters the courses to get the courses in progress (progress is between 0 and 100%).
// Return Statement:

// Returns the completed courses and courses in progress.
// Error Handling:

// Logs any errors that occur during the database query or data processing and handles them gracefully by returning empty arrays for completed courses and courses in progress.
