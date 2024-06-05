// Import the ListOrdered icon from the lucide-react library
import { ListOrdered } from "lucide-react";

// Import types for database models Chapter, Course, and UserProgress from Prisma Client
import { Chapter, Course, UserProgress } from "@prisma/client";

// Import components for creating a sidebar sheet from a custom UI library
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Import the ChapterBar component from the current directory
import { ChapterBar } from "./chapter-bar";

// Define the interface for the props of the CourseMobileSidebar component
interface CourseMobileSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCounter: number | undefined;
}

// Define the CourseMobileSidebar component
export const CourseMobileSidebar = ({
  course,
  progressCounter,
}: CourseMobileSidebarProps) => {
  return (
    <Sheet>
      {/* Define the trigger button for the sidebar, only visible on small screens (md:hidden) */}
      <SheetTrigger className="md:hidden p-4 hover:opacity-75 transition">
        <div className="fixed bottom-[10px] gap-[10px] left-[5vw] z-20 text-sm text-[#fff] px-[10px] py-[10px] bg-slate-600 rounded-sm">
          {/* Display the ListOrdered icon */}
          <ListOrdered />
        </div>
      </SheetTrigger>
      {/* Define the content of the sidebar that slides in from the right */}
      <SheetContent side={"right"} className="p-0 bg-white max-[450px]:w-72">
        {/* Include the ChapterBar component within the sidebar */}
        <ChapterBar course={course} />
      </SheetContent>
    </Sheet>
  );
};

// Explanation:
// import { ListOrdered } from "lucide-react";: Import the ListOrdered icon from the lucide-react library for use in the component.
// import { Chapter, Course, UserProgress } from "@prisma/client";: Import types for database models Chapter, Course, and UserProgress from Prisma Client.
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";: Import Sheet, SheetContent, and SheetTrigger components from a custom UI library.
// import { ChapterBar } from "./chapter-bar";: Import the ChapterBar component from the current directory.
// interface CourseMobileSidebarProps { ... }: Define the interface for the props that the CourseMobileSidebar component will receive.
// export const CourseMobileSidebar = ({ course, progressCounter }: CourseMobileSidebarProps) => { ... }: Define the CourseMobileSidebar functional component.
// <Sheet>: Wrap the component content within a Sheet component to create a sidebar.
// <SheetTrigger className="md:hidden p-4 hover:opacity-75 transition">: Define a trigger button for the sidebar, only visible on medium screens and smaller (md:hidden). It has padding, a hover effect, and a transition.
// <div className="fixed bottom-[10px] gap-[10px] left-[5vw] z-20 text-sm text-[#fff] px-[10px] py-[10px] bg-slate-600 rounded-sm">: Style the trigger button with fixed positioning, padding, background color, and other CSS properties.
// <ListOrdered />: Display the ListOrdered icon inside the trigger button.
// <SheetContent side={"right"} className="p-0 bg-white max-[450px]:w-72">: Define the content of the sidebar, which slides in from the right and has specific styling.
// <ChapterBar course={course} />: Include the ChapterBar component within the sidebar content, passing the course prop to it.
