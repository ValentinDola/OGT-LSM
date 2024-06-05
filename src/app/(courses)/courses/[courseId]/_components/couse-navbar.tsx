// Import the Progress component from the specified path
import { Progress } from "@/components/ui/progress";

// Import necessary types from the Prisma client
import { Chapter, Course, UserProgress } from "@prisma/client";

// Import the CourseProgress component from the local file
import { CourseProgress } from "./course-progress";

// Define the props interface for the CourseNavbar component
interface CourseBarProps {
  course: Course & {
    // Course object which includes chapters with user progress
    chapters: (Chapter & {
      userProgress: UserProgress[] | null; // User progress can be null or an array of UserProgress
    })[];
  };
  progressCounter: number | undefined; // Optional progress counter
}

// Define the CourseNavbar functional component
export const CourseNavbar = ({ course, progressCounter }: CourseBarProps) => {
  return (
    // Outer div container with flexbox layout, full width, justified content, and background color
    <div className="flex items-center w-full justify-between bg-slate-950 text-xl h-[60px] px-7">
      {/* Heading element displaying the course title with specific text styling */}
      <h1 className="text-white text-[15px] font-semibold">{course.title}</h1>
      {/* Render the CourseProgress component, passing variant and value as props */}
      <CourseProgress variant="default" value={progressCounter} />
    </div>
  );
};

// Explanation:
// import { Progress } from "@/components/ui/progress";: Import the Progress component from the specified path.
// import { Chapter, Course, UserProgress } from "@prisma/client";: Import necessary types from the Prisma client.
// import { CourseProgress } from "./course-progress";: Import the CourseProgress component from the local file.
// interface CourseBarProps { ... }: Define the CourseBarProps interface for the component's props.
// course: Course & { ... };: course prop includes chapters with user progress.
// progressCounter: number | undefined;: Optional progressCounter prop to track progress.
// export const CourseNavbar = ({ ... }: CourseBarProps) => { ... };: Define the CourseNavbar functional component.
// return ( ... );: Return the JSX for the component.
// <div className="flex items-center w-full justify-between bg-slate-950 text-xl h-[60px] px-7">: Outer div container with flexbox layout, items centered, full width, justified content, specific background color, text size, height, and padding.
// <h1 className="text-white text-[15px] font-semibold">{course.title}</h1>: Heading element displaying the course title with white text, specific text size, and font weight.
// <CourseProgress variant="default" value={progressCounter} />: Render the CourseProgress component, passing variant and value as props.
// </div>: Close the outer div container.
