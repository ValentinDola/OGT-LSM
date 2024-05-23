"use server";

import { auth } from "@clerk/nextjs/server";
import { getCourse, getFreeCourse } from "../../../../../actions/get-courses";
import { redirect } from "next/navigation";
import { Introduction } from "./_components/intoduction";
import { FreeCourses } from "./_components/free-courses";
import { MentorshipCourses } from "./_components/mentorship-courses";

export default async function Dashboard() {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const courses = await getCourse({
    userId,
  });

  const freeCourses = await getFreeCourse({
    userId,
  });

  return (
    <section className="max-w-[1380px] w-full mx-auto overflow-hidden  mt-[160px] mb-10">
      <div className="my-0 px-5 py-0">
        <Introduction />

        <FreeCourses items={freeCourses} />
        <MentorshipCourses items={courses} />
      </div>
    </section>
  );
}
