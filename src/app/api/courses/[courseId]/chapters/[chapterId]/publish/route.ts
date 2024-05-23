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

        const chapter = await db.chapter.findUnique({
            where: {
                id: chapterId,
                courseId: courseId
            }
        })

        const muxData = await db.muxData.findUnique({
            where: {
                chapterId: chapterId,
                
            }
        })

        if (!chapter || !muxData || !chapter.title || !chapter.description || !chapter.videoUrl) {
            return new NextResponse('Missing required fields', {status: 400})
        }

        const pusblishedChapter = await db.chapter.update({
            where: {
                id: chapterId,
                courseId: courseId
            },
            data: {
                isPublished: true
            }
        })

        return NextResponse.json(pusblishedChapter);

    } catch (error) {
        console.log('CHAPTER_ID_UPDATE]', error)
        return new NextResponse('Internal Error Server', {status: 500})
    }
}