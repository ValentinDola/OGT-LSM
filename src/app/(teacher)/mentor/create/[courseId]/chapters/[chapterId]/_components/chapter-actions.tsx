"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import axios from "axios";

import Lottie from "react-lottie";
import * as animationData from "@/assets/loader.json";

import { BadgeXIcon, Trash } from "lucide-react";
import { HashLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useConfettiStore } from "../../../../../../../../../hooks/use-confetti-store";

interface ChapterActionsProps {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean | undefined;
}

export const ChapterActions = ({
  disabled,
  courseId,
  chapterId,
  isPublished,
}: ChapterActionsProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const onPublish = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/unpublish`
        );

        toast.success("Chapter unpublished");
        router.refresh();
      } else {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/publish`
        );

        toast.success("Chapter published");
        router.refresh();
        router.push(`/mentor/create/${courseId}`);
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);

      toast.success("Chapter deleted");
      router.refresh();
      router.push(`/mentor/create/${courseId}`);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      {isLoading && (
        // <Lottie
        //   options={defaultOptions}
        //   height={60}
        //   width={60}
        //   isStopped={!isLoading}
        // />
        <HashLoader
          color="#36d7b7"
          className={`h-4 w-4 ${!isLoading && `hidden`}`}
        />
      )}
      <Button
        variant={"outline"}
        size={"sm"}
        disabled={disabled || isLoading}
        onClick={onPublish}
      >
        {isPublished ? "Dépublier" : "Publier"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button disabled={isLoading} size={"sm"}>
          Supprimer
        </Button>
      </ConfirmModal>
    </div>
  );
};
