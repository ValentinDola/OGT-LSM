import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, {params}: {params: {courseId: string, chapterId: string}}) {
    try {
        const { userId } = auth();
        const { courseId, chapterId } = params;
        

        if (!userId) {
            return new NextResponse('UNAUTHORIZED', {status: 401})
        }

        const ownCourse = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId
            }
        });

        if (!ownCourse) {
            return new NextResponse('COURSE UNAUTHORIZED', {status: 401})
        }

        

        const unPusblishedChapter = await db.chapter.update({
            where: {
                id: chapterId,
                courseId: courseId
            },
            data: {
                isPublished: false
            }
        });

        const publishChapterInCourse = await db.chapter.findMany({
            where: {
                courseId: courseId,
                isPublished: true
            }
        })

        if (!publishChapterInCourse.length) {
            await db.course.update({
                where: {
                    id: courseId
                },
                data: {
                    isPublished: false
                }
            })
        }

        return NextResponse.json(unPusblishedChapter);

    } catch (error) {
        console.log('CHAPTER_ID_UPDATE]', error)
        return new NextResponse('Internal Error Server', {status: 500})
    }
}