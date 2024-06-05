"use client";

import { CoursesList } from "@/components/courses-list";

import { Category, Course } from "@prisma/client";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | undefined;
};

interface MyCoursesProps {
  items: CourseWithProgressWithCategory[] | undefined;
}

export const MyCourses = ({ items }: MyCoursesProps) => {
  return <CoursesList items={items} />;
};
