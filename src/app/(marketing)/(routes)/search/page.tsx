"use server";

import { db } from "@/lib/db";
import { Categories } from "./_components/categories";
import { SearchInput } from "@/components/search-input";
import { auth } from "@clerk/nextjs/server";
import {
  getCourse,
  getSubsCourse,
  getSubscribedCourse,
} from "../../../../../actions/get-courses";
import { redirect } from "next/navigation";
import { CoursesList } from "@/components/courses-list";
import { SubCoursesList } from "@/components/subs-courses-list";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await getCourse({
    userId,
    ...searchParams,
  });

  const subsCourses = await getSubsCourse({
    userId,
    ...searchParams,
  });

  const subscribedCourses = await getSubscribedCourse({
    userId,
    ...searchParams,
  });

  const hasSubscribed = await db.subscription.findFirst({
    where: {
      userId: userId,
    },
    select: {
      status: true,
    },
  });

  return (
    <section className="max-w-[1380px] w-full mx-auto overflow-hidden  mt-[100px] mb-10">
      <div className="my-0 px-5 py-0">
        {/* {hasSubscribed?.status !== "completed" && (
          <div className="flex flex-col items-center justify-center ">
            <SearchInput />
          </div>
        )} */}

        <div className="flex flex-col items-center justify-center pt-6">
          <Categories items={categories} />
        </div>
        <div className="mt-7">
          {hasSubscribed?.status !== "completed" ? (
            <SubCoursesList items={subsCourses} />
          ) : (
            <SubCoursesList items={subscribedCourses} st={"completed"} />
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchPage;
