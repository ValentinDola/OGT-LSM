import { auth } from "@clerk/nextjs/server";
import { getDashboardCourses } from "../../../../../actions/get-dashboard-courses";
import { redirect } from "next/navigation";
import { MyCourses } from "./_components/my-courses";
import { Introduction } from "./_components/intoduction";
import { CheckCircle2, Clock } from "lucide-react";
import { InfoCard } from "./_components/info-card";

export default async function Courses() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    userId
  );

  return (
    <section className="max-w-[1380px] w-full mx-auto overflow-hidden  mt-[80px] mb-10">
      <div className="my-0 px-5 py-0">
        {/* <Introduction /> */}
        <div className="box-border w-full flex flex-col justify-start items-start  mt-[50px]">
          <div className="grid grid-cols-3 gap-3 max-sm:grid-cols-1">
            <InfoCard
              icon={Clock}
              label="In progress"
              numberOfItems={coursesInProgress.length}
            />

            <InfoCard
              icon={CheckCircle2}
              label="Completed"
              variant="success"
              numberOfItems={completedCourses.length}
            />
          </div>

          <div className="mt-7">
            <MyCourses items={[...completedCourses, ...coursesInProgress]} />
          </div>
        </div>
      </div>
    </section>
  );
}
