"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { Course, Category } from "@prisma/client";
import { CourseCard } from "./course-card";
import { useEffect, useState } from "react";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | undefined;
};

interface CoursesListProps {
  items: CourseWithProgressWithCategory[] | undefined;
}

export const CoursesList = ({ items }: CoursesListProps) => {
  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-5 w-full">
        {items?.map((item) => (
          <CourseCard
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description!}
            imageUrl={item.imageUrl!}
            chaptersLength={item.chapters.length}
            price={item.price!}
            isFree={item.isFree}
            progress={item.progress!}
            category={item?.category?.name!}
          />
        ))}
      </div>
      {items?.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          Aucun cours trouvé
        </div>
      )}
    </>
  );
};
