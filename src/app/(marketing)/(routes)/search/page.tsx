"use server";

import { db } from "@/lib/db";
import { Categories } from "./_components/categories";
import { SearchInput } from "@/components/search-input";
import { auth } from "@clerk/nextjs/server";
import { getCourse } from "../../../../../actions/get-courses";
import { redirect } from "next/navigation";
import { CoursesList } from "@/components/courses-list";

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

  return (
    <section className="max-w-[1380px] w-full mx-auto overflow-hidden  mt-[100px] mb-10">
      <div className="my-0 px-5 py-0">
        <div className="flex flex-col items-center justify-center ">
          <SearchInput />
        </div>
        <div className="flex flex-col items-center justify-center pt-6">
          <Categories items={categories} />
        </div>
        <div className="mt-7">
          <CoursesList items={courses} />
        </div>
      </div>
    </section>
  );
};

export default SearchPage;
