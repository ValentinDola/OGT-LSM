// Enable client-side rendering for this module
"use client";

// Import necessary functions and components from various libraries
import { cn } from "@/lib/utils"; // Import the `cn` utility function for className manipulation
import {
  CheckCircle,
  LockKeyhole,
  LockKeyholeOpen,
  PlayCircle,
} from "lucide-react"; // Import icon components from the lucide-react library
import { usePathname, useRouter } from "next/navigation"; // Import hooks for navigation

// Define the interface for the props of the CourseChapter component
interface CourseChapterProps {
  id: string; // ID of the chapter
  label: string; // Label or title of the chapter
  isCompleted: boolean; // Boolean indicating if the chapter is completed
  courseId: string; // ID of the course
  isLocked: boolean; // Boolean indicating if the chapter is locked
}

// Define the CourseChapter component
export const CourseChapter = ({
  id,
  label,
  isCompleted,
  courseId,
  isLocked,
}: CourseChapterProps) => {
  const pathname = usePathname(); // Get the current pathname
  const router = useRouter(); // Get the router object for navigation

  // Determine the icon to use based on the chapter's lock and completion status
  const Icon = isLocked ? LockKeyhole : isCompleted ? CheckCircle : PlayCircle;

  // Check if the current pathname includes the chapter ID, indicating it is active
  const isActive = pathname.includes(id);

  // Define the onClick handler to navigate to the specific chapter
  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  };

  // Return the button element for the chapter
  return (
    <button type="button" onClick={onClick}>
      <div
        className={cn(
          "flex justify-start items-start text-sm text-slate-500 font-[500] gap-[20px] p-[15px] [transition:all_.5s_ease] hover:text-slate-600 hover:bg-slate-300/20",
          isActive &&
            "text-slate-700 bg-slate-200/20 hover:gb-slate-200/20 hover:text-slate-700",
          isCompleted && "text-emerald-700 hover:text-emerald-700",
          isCompleted && isActive && "bg-emerald-200/20"
        )}
      >
        <Icon
          size={22}
          className={cn(
            "text-slate-500",
            isActive && "text-slate-700",
            isCompleted && "text-emerald-700"
          )}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-slate-700 h-full transition-all",
          isActive && "opacity-100",
          isCompleted && "border-emerald-700"
        )}
      />
    </button>
  );
};

// Explanation:
// "use client";: Directive to enable client-side rendering for this file.
// Imports: Import necessary utility functions, icons, and hooks.
// CourseChapterProps Interface: Define the structure for the props that the CourseChapter component will receive.
// CourseChapter Component: Define the CourseChapter functional component.
// usePathname and useRouter: Get current pathname and router object.
// Icon: Determine which icon to use based on the lock and completion status of the chapter.
// isActive: Check if the current pathname includes the chapter ID.
// onClick Handler: Define a function to navigate to the chapter's URL.
// Return JSX: Render a button element that:
// Has an onClick handler to navigate to the chapter.
// Applies different styles based on the chapter's status (active, completed, locked).
// Displays the appropriate icon and chapter label.
