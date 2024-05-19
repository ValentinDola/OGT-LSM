import { redirect } from "next/navigation";
import Link from "next/link";
import { IconBadge } from "@/components/icon-badge";
import { LayoutDashboard, ListVideo, PackageOpen } from "lucide-react";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { AttachmentForm } from "./_components/attachment-form";

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
    },
    include: {
      attachments: {
        orderBy: {
          createdAt: "desc",
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
  ];

  const totalFields = requiredFiels.length;
  const completedFields = requiredFiels.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  return (
    <section className="max-w-[1380px] w-full mx-auto overflow-hidden  mt-[100px] mb-10">
      <div className="my-0 px-5 py-0">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-[1.7rem] tracking-[-0.064em] font-semibold">
              Course setup
            </h1>
            <span className="text-sm">
              Completed all fields {completionText}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your course</h2>
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
          </div>
          <div className="space-y-6 ml-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListVideo} />
                <h2 className="text-xl">Course chapters</h2>
              </div>
              <div>TODO: chapters</div>
            </div>

            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={PackageOpen} />
                <h2 className="text-xl">Course attachement</h2>
              </div>

              <AttachmentForm initialData={course} courseId={course.id} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
