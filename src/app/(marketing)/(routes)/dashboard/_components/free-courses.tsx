"use client";

import { Category, Course } from "@prisma/client";
import { FreeCoursesList } from "@/components/free-courses-list";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

interface FreeCoursesProps {
  items: CourseWithProgressWithCategory[] | undefined;
}

export const FreeCourses = ({ items }: FreeCoursesProps) => {
  return (
    <div>
      <div className="box-border w-full flex flex-col justify-center items-center text-center  mt-[50px] ">
        <h2 className="text-[2rem] tracking-[-0.064em] font-semibold max-[986px]:text-[3rem] max-[400px]:text-[2rem] max-[600px]:text-[2.3rem]">
          Cours gratuits
        </h2>
      </div>

      <div className="box-border w-full flex flex-col justify-start items-start  mt-[50px]">
        <div className="mt-7">
          <FreeCoursesList items={items} />
        </div>
      </div>
    </div>
  );
};
