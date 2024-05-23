import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, {params}: {params: {courseId: string}}) {
    try {
        const { userId } = auth();
        const { courseId } = params;
        

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

        const course = await db.course.findUnique({
            where: {
                id: courseId,
                userId
            },
            include: {
                chapters: {
                    include: {
                        muxData: true
                    }
                }
            }
        })

        if (!course) {
            return new NextResponse('COURSE NOT FOUND', {status: 404})
        }

        const hasPublishedChapters = course.chapters.some((chapter) => chapter.isPublished);

        if (!hasPublishedChapters || !course.title || !course.description || !course.imageUrl || !course.categoryId ) {
            return new NextResponse('Missing required fields', {status: 400})
        }

        const pusblishedCourse = await db.course.update({
            where: {
                id: courseId,
                userId  
            },
            data: {
                isPublished: true
            }
        })

        return NextResponse.json(pusblishedCourse);

    } catch (error) {
        console.log('[COURSE PUBLISHED]', error)
        return new NextResponse('Internal Error Server', {status: 500})
    }
}