// Import necessary modules and components
import { auth } from "@clerk/nextjs/server"; // Import authentication from Clerk
import { redirect } from "next/navigation"; // Import redirect function from Next.js navigation
import { getChapter } from "../../../../../../../actions/get-chapter"; // Import getChapter function
import { Banner } from "@/components/banner"; // Import Banner component
import { VideoPlayer } from "./_components/video-player"; // Import VideoPlayer component
import { Button } from "@/components/ui/button"; // Import Button component
import { Separator } from "@/components/ui/separator"; // Import Separator component
import { CourseEnrollButton } from "./_components/course-enroll-button"; // Import CourseEnrollButton component
import Link from "next/link"; // Import Link component from Next.js
import { db } from "@/lib/db"; // Import database instance
import { File } from "lucide-react"; // Import File icon from lucide-react
import { CourseProgressButton } from "./_components/course-progress-button"; // Import CourseProgressButton component

// Define the ChapterIdPage component
const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth(); // Get the user ID from authentication
  const { chapterId, courseId } = params; // Destructure chapterId and courseId from params

  if (!userId) {
    return redirect("/"); // Redirect to home if no user ID is found
  }

  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId,
    chapterId,
    courseId,
  }); // Fetch chapter details using the getChapter function

  if (!chapter || !course) {
    return redirect("/"); // Redirect to home if no chapter or course is found
  }

  const isSubscribed = await db.subscription.findFirst({
    where: { userId: userId },
    select: {
      status: true,
    },
  }); // Check if the user is subscribed

  const isSubscribe = isSubscribed?.status === "completed";

  const isLocked = !chapter.isFree && !!purchase && !isSubscribe; // Determine if the chapter is locked
  const completeOnEnd = !!purchase && !userProgress?.isCompleted; // Determine if the chapter should be completed on end
  // Check if the user is subscribed
  const completedSubOnEnd = !isSubscribed && !userProgress?.isCompleted; // Determine if the subscription is completed on end

  return (
    <div>
      {/* Conditionally render banners based on user progress and subscription status */}
      {/* {userProgress?.isCompleted && (
        <Banner
          variant={"success"}
          label="Vous avez déjà terminé ce chapitre"
        />
      )}

      {isLocked && (
        <Banner
          variant={"warning"}
          label="Vous devez acheter ce cours pour regarder ce chapitre"
        />
      )}

      {!isLocked && (
        <Banner
          variant={"success"}
          label="Ce cours est désormais gratuit à regarder, ainsi que ses chapitres"
        />
      )} */}
      <div className="flex flex-col w-full mx-auto max-w-4xl pb-5">
        <div>
          <VideoPlayer
            chapterId={chapterId}
            title={chapter.title}
            courseId={courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            muxData={muxData}
            isLocked={isLocked}
            isSubscribe={isSubscribe}
            completeOnEnd={!isSubscribe ? completedSubOnEnd : completeOnEnd}
          />
        </div>
      </div>
      <div className="w-full pr-4">
        <div className="flex flex-row items-center px-4 justify-between mb-2 max-[450px]:flex-col">
          {/* Render the appropriate button based on subscription status and lock status */}
          {!isSubscribe && (
            <Link href="/mentorshippl" className="-mb-4 max-[450px]:mb-0">
              <Button variant={"ghost"}>Sélectionnez un plan</Button>
            </Link>
          )}

          {isSubscribe ? (
            isSubscribe && (
              <CourseProgressButton
                chapterId={chapterId}
                courseId={courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            )
          ) : !isLocked ? (
            <CourseProgressButton
              chapterId={chapterId}
              courseId={courseId}
              nextChapterId={nextChapter?.id}
              isCompleted={!!userProgress?.isCompleted}
            />
          ) : (
            <CourseEnrollButton courseId={courseId} price={course.price} />
          )}
        </div>
        <Separator />
        <div className="flex flex-col md:flex-row gap-1">
          <p className="text-lg font-bold">{chapter.title}</p>
        </div>
        <div className="w-full flex px-2 gap-2">
          <div className="w-1/5 hidden max-w-[450px]:block">
            <p className="text-gray-500 text-base">Description</p>
          </div>
          <div className="w-full">
            <p className="text-sm italic font-normal flex justify-start items-center">
              {chapter.description}
            </p>
          </div>
        </div>
        {!!attachments.length && (
          <>
            <Separator />
            <div className="p-4">
              {attachments.map((attachment) => (
                <a
                  href={attachment.url}
                  target="_blank"
                  key={attachment.id}
                  className="flex items-center w-full bg-sky-200 border text-sky-700 hover:underline gap-x-2 my-2"
                >
                  <File className="ml-4" />
                  <p className="line-clamp-1 text-lg max-[800px]:text-base">
                    {attachment.name}
                  </p>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Export the ChapterIdPage component as default
export default ChapterIdPage;

// Explanation:
// Imports:

// Authentication: auth from @clerk/nextjs/server.
// Redirection: redirect from next/navigation.
// Chapter fetching: getChapter function.
// Components: Banner, VideoPlayer, Button, Separator, CourseEnrollButton, CourseProgressButton, and Link from Next.js.
// Database: db from @/lib/db.
// Icon: File from lucide-react.
// Component Definition:

// ChapterIdPage: Asynchronous component accepting params as props containing courseId and chapterId.
// Authentication:

// const { userId } = auth();: Retrieves the current user ID.
// const { chapterId, courseId } = params;: Destructures chapterId and courseId from params.
// Redirection for Non-Authenticated Users:

// if (!userId) { return redirect("/"); }: Redirects to the homepage if the user is not authenticated.
// Fetching Chapter Data:

// const { chapter, course, muxData, attachments, nextChapter, userProgress, purchase, } = await getChapter({ userId, chapterId, courseId, });: Fetches chapter data using getChapter function.
// Redirection for Non-Existing Chapters or Courses:

// if (!chapter || !course) { return redirect("/"); }: Redirects to the homepage if the chapter or course does not exist.
// Subscription Check:

// const isSubscribed = await db.subscription.findFirst({ where: { userId: userId }, select: { status: true }, });: Checks if the user is subscribed.
// Lock and Progress Conditions:

// const isLocked = !chapter.isFree && !purchase;: Determines if the chapter is locked.
// const completeOnEnd = !!purchase && !userProgress?.isCompleted;: Determines if the chapter should be marked as completed at the end.
// const isSubscribe = isSubscribed?.status === "completed";: Checks if the subscription is completed.
// const completedSubOnEnd = !isSubscribed && !userProgress?.isCompleted;: Determines if the subscription is completed at the end.
// Rendering JSX:

// Video Player: Renders the VideoPlayer component.
// Subscription and Progress Buttons: Renders appropriate buttons based on subscription status and lock status.
// Chapter Description: Displays chapter title and description.
// Attachments: Displays chapter attachments if available.
