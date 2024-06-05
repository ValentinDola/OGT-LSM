// Imports: The code imports the db object for database access and the redirect function from next/navigation.
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface Params {
  params: {
    courseId: string;
  };
}
// Component Definition: CourseIdPage is defined as an asynchronous function component that takes params as a prop. The params object contains the courseId.
const CourseIdPage = async ({ params }: Params) => {
  // Database Query: The component uses db.course.findUnique to fetch the course by its ID. The query includes the course's published chapters, ordered by their position in ascending order.
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });
  // Course Not Found: If the course is not found, the component redirects to the home page ("/").
  if (!course) {
    console.log("Course not found");
    return redirect("/");
  }

  if (course.chapters.length === 0) {
    console.log("No published chapters found");
    return redirect("/");
  }
  // Course Found: If the course is found, the component redirects to the first chapter of the course.

  return redirect(`/courses/${course.id}/chapters/${course.chapters[0].id}`);
};

export default CourseIdPage;
