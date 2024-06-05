import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import {
  LayoutDashboard,
  MoveLeft,
  ScanFace,
  SquarePlay,
  Video,
  Videotape,
  View,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChapterTitleForm } from "./_components/title-form";
import { ChapterDescriptionForm } from "./_components/description-form";
import { ChapterAccessForm } from "./_components/access-form";
import { ChapterVideoForm } from "./_components/video-form";
import { Banner } from "@/components/banner";
import { ChapterActions } from "./_components/chapter-actions";

const EditChapter = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
    include: {
      muxData: true,
    },
  });

  const requiredFiels = [
    chapter?.title,
    chapter?.description,
    chapter?.videoUrl,
  ];

  const totalFields = requiredFiels.length;
  const completedFields = requiredFiels.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields} )`;

  const isCompleted = requiredFiels.every(Boolean);

  return (
    <>
      {!chapter?.isPublished && (
        <div className="max-w-[1380px] w-full overflow-hidden mt-[95px]">
          <Banner
            variant={"warning"}
            label="Ce chapitre n'est pas publié. Il ne sera pas visible dans le cours."
          />
        </div>
      )}

      <section
        className={`max-w-[1380px] w-full mx-auto overflow-hidden ${
          chapter?.isPublished && "mt-[90px]"
        } mb-10`}
      >
        <div className="my-0 px-5 py-0">
          <div className="flex items-center justify-between">
            <div className="w-full">
              <Link
                href={`/mentor/create/${params.courseId}`}
                className="flex items-center text-sm hover:opacity-75 transition mb-6 cursor-pointer"
              >
                <MoveLeft className="h6 w-6 mr-6" />
                Retour à la configuration du cours
              </Link>
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col gap-y-2">
                  <h1 className="text-[1.7rem] tracking-[-0.064em] font-semibold">
                    Création de chapitre
                  </h1>
                  <span className="text-sm">
                    Tous les champs ont été remplis {completionText}
                  </span>
                </div>
                <ChapterActions
                  disabled={!isCompleted}
                  courseId={params.courseId}
                  chapterId={params.chapterId}
                  isPublished={chapter?.isPublished}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={LayoutDashboard} />
                  <h2 className="text-xl">Personnalisez votre chapitre</h2>
                </div>
                <ChapterTitleForm
                  title={chapter?.title}
                  courseId={params.courseId}
                  chapterId={params.chapterId}
                />
                <ChapterDescriptionForm
                  description={chapter?.description}
                  courseId={params.courseId}
                  chapterId={params.chapterId}
                />
              </div>
              <div>
                <div className="flex items-center gap-x-2 mt-4">
                  <IconBadge icon={ScanFace} />
                  <h2 className="text-xl">Access Settings</h2>
                </div>
                <ChapterAccessForm
                  isFree={chapter?.isFree}
                  courseId={params.courseId}
                  chapterId={params.chapterId}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Video} />
                <h2 className="text-xl">Video settings</h2>
              </div>
              <ChapterVideoForm
                videoUrl={chapter?.videoUrl}
                muxData={chapter?.muxData}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditChapter;
