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
            }
        })

        if (!course) {
            return new NextResponse('COURSE NOT FOUND', {status: 404})
        }

        

        const unPusblishedCourse = await db.course.update({
            where: {
                id: courseId,
                userId  
            },
            data: {
                isPublished: false
            }
        })

        return NextResponse.json(unPusblishedCourse);

    } catch (error) {
        console.log('COURSE_UNPUBLISHED]', error)
        return new NextResponse('Internal Error Server', {status: 500})
    }
}