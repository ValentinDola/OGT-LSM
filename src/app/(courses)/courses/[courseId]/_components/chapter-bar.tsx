// Import necessary types and modules
import { Chapter, Course, UserProgress } from "@prisma/client"; // Import types from Prisma client
import { redirect } from "next/navigation"; // Import redirect function from Next.js navigation
import { CourseChapter } from "./course-chapter"; // Import CourseChapter component
import { auth } from "@clerk/nextjs/server"; // Import authentication function from Clerk
import { db } from "@/lib/db"; // Import database instance

// Define the interface for ChapterBarProps, specifying the structure of the props
interface ChapterBarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null; // Each chapter includes an array of user progress or null
    })[];
  };
}

// Define the asynchronous functional component ChapterBar
export const ChapterBar = async ({ course }: ChapterBarProps) => {
  const { userId } = auth(); // Get the authenticated user's ID

  // If the user is not authenticated, redirect to the home page
  if (!userId) {
    return redirect("/");
  }

  // Find a purchase record for the current user and course
  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
    },
  });

  // Find the subscription status for the current user
  const isSubscribed = await db.subscription.findFirst({
    where: { userId: userId },
    select: {
      status: true, // Only select the status field
    },
  });

  // Return the JSX layout for the ChapterBar component
  return (
    <div className=" w-full flex flex-col p-3 md:mt-0 mt-[100px] max-[800px]:w-full">
      {/* Container for chapters with a scrollable area */}
      <div className="flex flex-col max-h-[600px] overflow-y-scroll">
        {/* Wrapper for chapter items */}
        <div className="relative flex flex-col justify-start w-full  border-t border-solid border-gray-300 transition-all duration-500 ease last:border-b">
          {/* Container for chapter items */}
          <div className="flex flex-col gap-[10px] bg-[#f8f8f8] relative [transition:all_.5s_ease] top-[0]">
            {/* Map through each chapter in the course */}
            {course.chapters.map((chapter) => {
              // Determine if the chapter should be locked based on course and chapter's free status and purchase status
              const purchasLocking =
                !course.isFree && !chapter.isFree && !purchase;

              // Determine if the user is subscribed
              const isSubscribe = isSubscribed?.status === "completed";

              // Return the CourseChapter component for each chapter
              return (
                <CourseChapter
                  key={chapter.id} // Unique key for each chapter
                  id={chapter.id} // Chapter ID
                  label={chapter.title} // Chapter title
                  isCompleted={!!chapter.userProgress?.[0]?.isCompleted} // Check if the chapter is completed
                  courseId={course.id} // Course ID
                  isLocked={isSubscribe ? false : purchasLocking} // Determine if the chapter is locked
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// Explanation:
// Imports: The code imports necessary modules and types for database operations, authentication, navigation, and components.
// ChapterBarProps Interface: Defines the structure of the props expected by the ChapterBar component, including the course and its chapters.
// ChapterBar Component: An asynchronous React functional component that:
// Authentication: Checks if the user is authenticated. If not, it redirects to the home page.
// Database Queries: Fetches purchase and subscription details for the authenticated user.
// Rendering: Returns a JSX layout that displays a scrollable list of chapters. Each chapter is represented by the CourseChapter component, which includes details like the chapter title, completion status, and whether it is locked based on the user's purchase or subscription status.
