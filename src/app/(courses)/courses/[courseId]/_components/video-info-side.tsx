// Import necessary types from the Prisma client
import { Chapter, Course, UserProgress } from "@prisma/client";

// Define the props interface for the VideoInfo component
interface VideoInfoProps {
  children: React.ReactNode; // children prop for rendering nested components
  course: Course & {
    // course prop which includes chapters with user progress
    chapters: (Chapter & {
      userProgress: UserProgress[] | null; // userProgress can be null or an array of UserProgress
    })[];
  };
}

// Define the VideoInfo functional component
export const VideoInfo = ({ children, course }: VideoInfoProps) => {
  return (
    // Outer div container with flexbox layout, full width, column direction, white background, and transition styling
    <div className="w-full flex flex-col bg-[#fff] [transition:all_.5s_ease]">
      {/* Inner div with top padding for rendering nested children components */}
      <div className="pt-3">{children}</div>
    </div>
  );
};

// Explanation:
// import { Chapter, Course, UserProgress } from "@prisma/client";: Import necessary types from the Prisma client.
// interface VideoInfoProps { ... }: Define the VideoInfoProps interface for the component's props.
// children: React.ReactNode;: children prop for rendering nested components.
// course: Course & { ... };: course prop includes chapters with user progress.
// chapters: (Chapter & { userProgress: UserProgress[] | null; })[];: Each chapter may have user progress data.
// export const VideoInfo = ({ children, course }: VideoInfoProps) => { ... };: Define the VideoInfo functional component.
// return ( ... );: Return the JSX for the component.
// <div className="w-full flex flex-col bg-[#fff] [transition:all_.5s_ease]">: Outer div container with flexbox layout, full width, column direction, white background, and transition styling.
// <div className="pt-3">{children}</div>: Inner div with top padding for rendering nested children components.
// </div>: Close the outer div container.
