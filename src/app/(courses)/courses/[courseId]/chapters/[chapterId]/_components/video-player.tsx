// Import necessary modules and components
"use client"; // Use Prisma Client
import MuxPlayer from "@mux/mux-player-react"; // Import MuxPlayer component for video playback
import { useState } from "react"; // Import useState hook for managing state

import { Loader2, LockKeyhole } from "lucide-react"; // Import Loader2 and LockKeyhole icons from lucide-react

import { cn } from "@/lib/utils"; // Import utility function cn
import { HashLoader } from "react-spinners";

// Define the VideoPlayerProps interface for the VideoPlayer component
interface VideoPlayerProps {
  chapterId: string;
  title: string;
  courseId: string;
  nextChapterId?: string;
  playbackId: string;
  isLocked: boolean;
  isSubscribe: boolean;
  completeOnEnd: boolean;
  muxData: any;
}

// Define the VideoPlayer component
export const VideoPlayer = ({
  chapterId,
  title,
  courseId,
  nextChapterId,
  playbackId,
  isLocked,
  isSubscribe,
  completeOnEnd,
  muxData,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false); // Initialize isReady state to false

  return (
    <div className="relative aspect-video">
      {/* Loader while video is loading */}
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex w-[1/3] items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <HashLoader color="#fff" size={20} />
        </div>
      )}

      {/* Display message and lock icon if chapter is locked */}
      {isLocked && (
        <div className="absolute w-[1/3] inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <LockKeyhole className="h-8 w-8" />
          <p className="text-sm text-white">Ce chapitre est verrouillé</p>
        </div>
      )}

      {/* Display MuxPlayer if chapter is not locked */}
      {!isLocked && (
        <MuxPlayer
          title={title}
          className={cn(!isReady && "hidden")}
          onCanPlay={() => setIsReady(true)} // Set isReady to true when video can play
          onEnded={() => {}} // Placeholder function for when the video ends
          autoPlay // Auto play the video
          playbackId={playbackId} // Provide the playback ID for the video
        />
      )}
    </div>
  );
};

// Explanation:
// "use client";: Indicates that this file uses Prisma Client.

// Imports:

// MuxPlayer: Component for playing videos using Mux.
// useState: Hook from React for managing state.
// Loader2 and LockKeyhole: Icons from lucide-react for displaying loading and lock visuals.
// cn: Utility function for conditional class names.
// VideoPlayerProps Interface:

// Describes the props expected by the VideoPlayer component.
// Component Definition:

// The VideoPlayer component accepts props including chapter ID, title, course ID, playback ID, lock status, and completion status.
// State Management:

// useState(false) initializes the isReady state to false. This state is used to track if the video is ready for playback.
// Conditional Rendering:

// The component conditionally renders different elements based on the isReady and isLocked states.
// If the video is not ready and not locked, a loader is displayed.
// If the chapter is locked, a lock icon and message are displayed.
// If the video is ready and the chapter is not locked, the MuxPlayer component is rendered.
// MuxPlayer Component:

// Renders the MuxPlayer component with the provided props.
// className is conditionally set to "hidden" when the video is not ready to prevent display until it's ready.
// onCanPlay sets isReady to true when the video can play.
// onEnded is a placeholder function for when the video ends.
// autoPlay specifies that the video should start playing automatically.
// playbackId provides the ID for the video playback.
