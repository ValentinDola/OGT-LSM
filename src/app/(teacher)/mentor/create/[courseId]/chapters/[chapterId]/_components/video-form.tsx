"use client";

import { useState } from "react";
import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MuxPlayer from "@mux/mux-player-react";

import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

import { Plus, Pencil, ImageIcon, Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { Chapter, MuxData } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";

interface ChapterVideoFormProps {
  videoUrl: string | null | undefined;
  muxData: MuxData | null | undefined;
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

export const ChapterVideoForm = ({
  videoUrl,
  muxData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoUrl: videoUrl || "",
    },
  });

  const router = useRouter();

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toast.success("Chapter Updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Video du cour
        <Button onClick={toggleEdit} variant={"ghost"}>
          {isEditing && <>Cancel</>}
          {!isEditing && !videoUrl && (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter une video
            </>
          )}
          {!isEditing && videoUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Modification de la video
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!videoUrl ? (
          <div className="flex justify-center items-center bg-slate-200 h-60 rounded-md">
            <Play className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <MuxPlayer playbackId={muxData?.playbackId || ""} />
          </div>
        ))}

      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Téléchargez la vidéo de ce chapitre
          </div>
        </div>
      )}
      {videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Les vidéos peuvent prendre quelques minutes à être traitées.
          Actualisez la page si la vidéo n&apos;apparaît pas.
        </div>
      )}
    </div>
  );
};
