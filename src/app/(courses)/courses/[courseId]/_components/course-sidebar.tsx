// Import necessary types from the Prisma client
import { Chapter, Course, UserProgress } from "@prisma/client";

// Import the VideoInfo component from the local file
import { VideoInfo } from "./video-info-side";

// Import the ChapterBar component from the local file
import { ChapterBar } from "./chapter-bar";

// Define the props interface for the CourseBar component
interface CourseBarProps {
  children: React.ReactNode; // React children to be rendered inside the component
  course: Course & {
    // Course object which includes chapters with user progress
    chapters: (Chapter & {
      userProgress: UserProgress[] | null; // User progress can be null or an array of UserProgress
    })[];
  };
  progressCounter: number | undefined; // Optional progress counter
}

// Define the CourseBar functional component
export const CourseBar = async ({
  children,
  course,
  progressCounter,
}: CourseBarProps) => {
  return (
    <>
      {/* Outer div container with flexbox layout */}
      <div className="flex items-start justify-start w-full pt-[40px]">
        {/* Div container for the VideoInfo component, responsive to screen size */}
        <div className="w-[1000px] max-[450px]:w-full">
          {/* Render the VideoInfo component, passing children and course as props */}
          <VideoInfo children={children} course={course} />
        </div>

        {/* Div container for the ChapterBar component, hidden on small screens */}
        <div className="max-[450px]:hidden">
          {/* Render the ChapterBar component, passing the course as a prop */}
          <ChapterBar course={course} />
        </div>
      </div>
    </>
  );
};

// ### Explanation:
// 1. **`import { Chapter, Course, UserProgress } from "@prisma/client";`**: Import necessary types from the Prisma client.
// 2. **`import { VideoInfo } from "./video-info-side";`**: Import the `VideoInfo` component from the local file.
// 3. **`import { ChapterBar } from "./chapter-bar";`**: Import the `ChapterBar` component from the local file.
// 4. **`interface CourseBarProps { ... }`**: Define the `CourseBarProps` interface for the component's props.
//    - **`children: React.ReactNode;`**: `children` prop is a React node to be rendered inside the component.
//    - **`course: Course & { ... };`**: `course` prop includes chapters with user progress.
//    - **`progressCounter: number | undefined;`**: Optional `progressCounter` prop to track progress.
// 5. **`export const CourseBar = async ({ ... }: CourseBarProps) => { ... };`**: Define the `CourseBar` functional component.
// 6. **`return ( ... );`**: Return the JSX for the component.
// 7. **`<div className="flex items-start justify-start w-full pt-[40px]">`**: Outer `div` container with flexbox layout, full width, and top padding.
// 8. **`<div className="w-[1000px] max-[450px]:w-full">`**: Inner `div` container for the `VideoInfo` component, with a fixed width and full width on small screens.
// 9. **`<VideoInfo children={children} course={course} />`**: Render the `VideoInfo` component, passing `children` and `course` as props.
// 10. **`<div className="max-[450px]:hidden">`**: Inner `div` container for the `ChapterBar` component, hidden on small screens.
// 11. **`<ChapterBar course={course} />`**: Render the `ChapterBar` component, passing the `course` as a prop.
// 12. **`</div>`**: Close the inner `div` container.
// 13. **`</div>`**: Close the outer `div` container.
// 14. **`<> ... </>`**: Fragment used to wrap the returned JSX.
