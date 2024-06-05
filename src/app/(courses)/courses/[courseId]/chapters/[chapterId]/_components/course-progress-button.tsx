// Import necessary modules and components
"use client"; // Use Prisma Client
import { Button } from "@/components/ui/button"; // Import Button component
import { formatPrice } from "@/lib/format"; // Import formatPrice function for formatting prices
import axios from "axios"; // Import axios for making HTTP requests
import { CheckCircle, XCircle } from "lucide-react"; // Import icons for completed and not completed states
import { useRouter } from "next/navigation"; // Import useRouter hook from Next.js for routing
import { useState } from "react"; // Import useState hook for managing state
import toast from "react-hot-toast"; // Import toast for displaying notifications
import { useConfettiStore } from "../../../../../../../../hooks/use-confetti-store"; // Import custom hook for confetti animation

// Define the CourseProgressButtonProps interface for the CourseProgressButton component
interface CourseProgressButtonProps {
  chapterId: string;
  courseId: string;
  nextChapterId?: string;
  isCompleted?: boolean;
}

// Define the CourseProgressButton component
export const CourseProgressButton = ({
  courseId,
  chapterId,
  nextChapterId,
  isCompleted,
}: CourseProgressButtonProps) => {
  const router = useRouter(); // Get the router object
  const confetti = useConfettiStore(); // Get the confetti store
  const [isLoading, setIsLoading] = useState(false); // Initialize isLoading state to false

  // onClick handler for the button
  const onClick = async () => {
    try {
      setIsLoading(true); // Set isLoading to true to show loading state

      // Make a PUT request to update the progress of the chapter
      await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/progress`,
        {
          isCompleted: !isCompleted, // Toggle the completion status
        }
      );

      // Trigger confetti animation if chapter is marked as completed and there's no next chapter
      if (!isCompleted && !nextChapterId) {
        confetti.onOpen();
      }

      // Redirect to the next chapter if chapter is marked as completed and there's a next chapter
      if (!isCompleted && nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }

      // Display success toast
      toast.success("Progress Updated");

      // Refresh the router to update the UI
      router.refresh();
    } catch {
      // Display error toast if something goes wrong
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false); // Set isLoading back to false after the request is completed
    }
  };

  // Determine the icon based on the completion status
  const Icon = isCompleted ? XCircle : CheckCircle;

  // Return the Button component with onClick handler, disabled state based on isLoading, and icon
  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      type="button"
      variant={isCompleted ? "outline" : "success"}
      className={" mt-2 md:w-auto"}
    >
      {isCompleted ? "Not completed" : "Mark as completed"}
      <Icon className="h-4 w-4 ml-2" />
    </Button>
  );
};

// Explanation:
// "use client";: Indicates that this file uses Prisma Client.

// Imports:

// Button: Component for the progress button.
// formatPrice: Function for formatting prices (not used in the provided code).
// axios: Library for making HTTP requests.
// CheckCircle and XCircle: Icons for completed and not completed states.
// useRouter: Hook from Next.js for routing.
// useState: Hook for managing state.
// toast: Library for displaying notifications.
// useConfettiStore: Custom hook for confetti animation.
// CourseProgressButtonProps Interface:

// Describes the props expected by the CourseProgressButton component.
// Component Definition:

// The CourseProgressButton component accepts courseId, chapterId, nextChapterId, and isCompleted props.
// It initializes the isLoading state to manage the loading state of the button.
// onClick Handler:

// The onClick handler is called when the button is clicked.
// It sets isLoading to true to show the loading state.
// It makes a PUT request to update the progress of the chapter.
// It triggers a confetti animation if the chapter is marked as completed and there's no next chapter.
// It redirects to the next chapter if the chapter is marked as completed and there's a next chapter.
// It displays a success toast and refreshes the router to update the UI.
// If there's an error, it displays an error toast.
// Icon Rendering:

// The Icon component is rendered based on the completion status.
// The Button component is rendered with an onClick handler, disabled state based on isLoading, and icon.
