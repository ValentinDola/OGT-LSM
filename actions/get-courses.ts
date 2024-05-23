import { Category, Course } from "@prisma/client";

import { getProgress } from "./get-progress";

import { db } from "@/lib/db";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

type GetCourse = {
  userId: string;
  title?: string;
  categoryId?: string;
};

export const getCourse = async ({ userId, title, categoryId }: GetCourse) => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        isFree: false,
        title: {
          contains: title,
        },
        categoryId,
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
        purchases: {
          where: {
            userId,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const coursesWithProgress: CourseWithProgressWithCategory[] = [];

    for (const course of courses) {
      if (course.purchases.length === 0) {
        coursesWithProgress.push({
          ...course,
          progress: null,
        });
      } else {
        const progressPercentage = await getProgress(userId, course.id);
        coursesWithProgress.push({
          ...course,
          progress: progressPercentage,
        });
      }
    }

    return coursesWithProgress;
  } catch (error: any) {
    console.log("[GET_COURSE]", error);
  }
};

export const getFreeCourse = async ({
  userId,
  title,
  categoryId,
}: GetCourse) => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        isFree: true,
        title: {
          contains: title,
        },
        categoryId,
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
        purchases: {
          where: {
            userId,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const coursesWithProgress: CourseWithProgressWithCategory[] = [];

    for (const course of courses) {
      if (course.purchases.length === 0) {
        coursesWithProgress.push({
          ...course,
          progress: null,
        });
      } else {
        const progressPercentage = await getProgress(userId, course.id);
        coursesWithProgress.push({
          ...course,
          progress: progressPercentage,
        });
      }
    }

    return coursesWithProgress;
  } catch (error: any) {
    console.log("[GET_COURSE]", error);
  }
};
