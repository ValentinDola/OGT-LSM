// Import necessary modules and components
import { db } from "@/lib/db"; // Importing the database instance
import { auth } from "@clerk/nextjs/server"; // Importing the authentication function from Clerk
import { redirect } from "next/navigation"; // Importing the redirect function from Next.js navigation
import { getProgress } from "../../../../../actions/get-progress"; // Importing the getProgress function to get user progress
import { CourseBar } from "./_components/course-sidebar"; // Importing the CourseBar component
import { Header } from "@/app/(marketing)/header"; // Importing the Header component
import { Footer } from "@/app/(marketing)/footer"; // Importing the Footer component
import { CourseNavbar } from "./_components/couse-navbar";
import { CourseMobileSidebar } from "./_components/course-mobile-sidebar"; // Importing the CourseMobileSidebar component

// Define an asynchronous functional component called CourseLayout
const CourseLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode; // Type annotation for children prop
  params: { courseId: string }; // Type annotation for params prop
}) => {
  const { userId } = auth(); // Get the authenticated user's ID

  // If the user is not authenticated, redirect to the home page
  if (!userId) {
    return redirect("/");
  }

  // Fetch the course details from the database including its published chapters and user's progress
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true, // Only include published chapters
        },
        include: {
          userProgress: {
            where: {
              userId, // Include the progress of the authenticated user
            },
          },
        },
        orderBy: {
          position: "asc", // Order chapters by their position in ascending order
        },
      },
    },
  });

  // If the course is not found, redirect to the home page
  if (!course) {
    return redirect("/");
  }

  // Get the user's progress count for the course
  const progressCount = await getProgress(userId, course.id);

  // Return the JSX layout for the course page
  return (
    <div className="m-h-screen flex flex-col overflow-x-hidden">
      <Header /> {/* Render the header component */}
      <div className="max-w-[1380px] w-full mx-auto overflow-hidden mt-[150px] mb-10">
        <div className="my-0 px-5 py-0">
          <CourseMobileSidebar
            course={course}
            progressCounter={progressCount}
          />{" "}
          {/* Render the mobile sidebar component with course and progress data */}
          <CourseNavbar course={course} progressCounter={progressCount} />{" "}
          {/* Render the navbar component with course and progress data */}
          <div>
            <CourseBar course={course} progressCounter={progressCount}>
              {children}{" "}
              {/* Render the CourseBar component with course and progress data and include children components */}
            </CourseBar>
          </div>
        </div>
      </div>
      <Footer /> {/* Render the footer component */}
    </div>
  );
};

export default CourseLayout; // Export the CourseLayout component as the default export
