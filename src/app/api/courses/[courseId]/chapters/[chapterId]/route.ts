import Mux from "@mux/mux-node";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

const { video } = new Mux({
    tokenId: process.env.MUX_TOKEN_ID!,
    tokenSecret: process.env.MUX_TOKEN_SECRET!,
});

export async function DELETE(req: Request, {params}: {params: {courseId: string, chapterId: string}}) {
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
        });

        if (!chapter) {
            return new NextResponse('CHAPTER NOT FOUND', {status: 404})
        }

        if (chapter.videoUrl) {
            const existingMuxData = await db.muxData.findFirst({
                where: {
                    chapterId: chapterId
                }
            });

            if (existingMuxData) {
                await video.assets.delete(existingMuxData.assetId);
                await db.muxData.delete({
                    where: {
                        id: existingMuxData.id
                    }
                })
            }
        }

        const deletedChapter = await db.chapter.delete({
            where: {
                id: chapterId
            }
        })

        const publishedChapterInCourse = await db.chapter.findMany({
            where: {
                courseId: courseId,
                isPublished: true
            }
        });

        if (!publishedChapterInCourse.length) {
            await db.course.update({
                where: {
                    id: courseId
                },
                data: {
                    isPublished: false
                }
            })
        }

        return NextResponse.json(deletedChapter);
        
    } catch (error) {
        console.log('[CHAPTER_ID_DELETE]', error)
        return new NextResponse('Internal Error Server', {status: 500})
    }
}

export async function PATCH(req: Request, {params}: {params: {courseId: string, chapterId: string}}) {
    try {
        const { userId } = auth();
        const { courseId, chapterId } = params;
        const {isPublished ,...values} = await req.json();

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

        const chapter = await db.chapter.update({
            where: {
                id: chapterId,
                courseId: courseId
            },
            data: {
                ...values
            }
        })

        if (values.videoUrl) {
            const existingMuxData = await db.muxData.findFirst({
                where: {
                    chapterId: params.chapterId
                }
            });

            if (existingMuxData) {
                await video.assets.delete(existingMuxData.assetId);
                await db.muxData.delete({
                    where: {
                        id: existingMuxData.id
                    }
                })
            }

            const asset = await video.assets.create({
                input: values.videoUrl,
                playback_policy: ['public'],
                test: false

            })

            await db.muxData.create({
                data: {
                    chapterId: params.chapterId,
                    assetId: asset.id,
                    playbackId: asset.playback_ids?.[0]?.id
                }
            })
        }

        if (ownCourse.isFree === true) {
            await db.chapter.updateMany({
              where: {
                courseId: courseId
              },
              data: {
                isFree: true
              }
            });
          }

        return NextResponse.json(chapter);

    } catch (error) {
        console.log('CHAPTER_ID_UPDATE]', error)
        return new NextResponse('Internal Error Server', {status: 500})
    }
}