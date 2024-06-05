import { redirect } from "next/navigation";
import Link from "next/link";
import { IconBadge } from "@/components/icon-badge";
import {
  Banknote,
  LayoutDashboard,
  ListVideo,
  PackageOpen,
} from "lucide-react";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { AttachmentForm } from "./_components/attachment-form";
import { PriceForm } from "./_components/price-form";
import { ChaptersForm } from "./_components/chapter-form";
import { Banner } from "@/components/banner";
import { CourseActions } from "./_components/course-actions";
import { CoursesAccessForm } from "./_components/access-form";

export default async function Edit({
  params,
}: {
  params: { courseId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId,
    },
    include: {
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!course) {
    return redirect("/");
  }

  const requiredFiels = [
    course.title,
    course.description,
    course.imageUrl,
    course.categoryId,
    course.chapters.some((chapter) => chapter.isPublished),
  ];

  const totalFields = requiredFiels.length;
  const completedFields = requiredFiels.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isCompleted = requiredFiels.every(Boolean);

  return (
    <>
      {!course?.isPublished && (
        <div className="max-w-[1380px] w-full overflow-hidden  mt-[95px]">
          <Banner
            variant={"warning"}
            label="Ce cours n'est pas publié. Il ne sera pas visible pour les étudiants."
          />
        </div>
      )}
      <section
        className={`max-w-[1380px] w-full mx-auto overflow-hidden ${
          course?.isPublished && "mt-[90px]"
        } mb-10`}
      >
        <div className="my-0 px-5 py-0">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-[1.7rem] tracking-[-0.064em] font-semibold">
                Configuration du cours
              </h1>
              <span className="text-sm">
                Tous les champs ont été remplis {completionText}
              </span>
            </div>
            <CourseActions
              disabled={!isCompleted}
              courseId={params.courseId}
              isPublished={course?.isPublished}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Personnalisez votre cour</h2>
              </div>
              <TitleForm initialData={course} courseId={course.id} />
              <DescriptionForm initialData={course} courseId={course.id} />
              <ImageForm initialData={course} courseId={course.id} />
              <CategoryForm
                initialData={course}
                courseId={course.id}
                options={categories?.map((category) => ({
                  label: category.name,
                  value: category.id,
                }))}
              />
              <CoursesAccessForm initialData={course} courseId={course.id} />
            </div>
            <div className="space-y-6 ml-4">
              <div>
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={ListVideo} />
                  <h2 className="text-xl">Chapitres du cours</h2>
                </div>
                <ChaptersForm initialData={course} courseId={course.id} />
              </div>
              <div>
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={Banknote} />
                  <h2 className="text-xl">Prix du cours</h2>
                </div>
                <PriceForm initialData={course} courseId={course.id} />
              </div>

              <div>
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={PackageOpen} />
                  <h2 className="text-xl">Pièce jointe du cours</h2>
                </div>

                <AttachmentForm initialData={course} courseId={course.id} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
