"use client";

import { CoursesList } from "@/components/courses-list";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { Category, Course } from "@prisma/client";
import { useRouter } from "next/navigation";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

interface MentorshipCoursesProps {
  items: CourseWithProgressWithCategory[] | undefined;
}

export const MentorshipCourses = ({ items }: MentorshipCoursesProps) => {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  return (
    <div>
      <div className="box-border w-full flex flex-col justify-center items-center text-center  mt-[50px] ">
        <h2 className="text-[2rem] tracking-[-0.064em] font-semibold max-[986px]:text-[3rem] max-[400px]:text-[2rem] max-[600px]:text-[2.3rem]">
          Cours à paiement unique
        </h2>
      </div>

      <div className="box-border w-full flex flex-col justify-start items-start  mt-[50px]">
        <div className="mt-7">
          <CoursesList items={items} />
        </div>
        {items?.length !== 0 && (
          <Button
            onClick={() => router.push("/search")}
            disabled={!isLoaded}
            className={"button_auth mt-[80px]"}
          >
            Voir tous les cours
          </Button>
        )}
      </div>
    </div>
  );
};
