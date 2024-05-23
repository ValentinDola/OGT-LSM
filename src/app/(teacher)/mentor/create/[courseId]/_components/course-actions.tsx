"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import axios from "axios";

import Lottie from "react-lottie";
import * as animationData from "@/assets/loader.json";

import { BadgeXIcon, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useConfettiStore } from "../../../../../../../hooks/use-confetti-store";

interface CourseActionsProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean | undefined;
}

export const CourseActions = ({
  disabled,
  courseId,
  isPublished,
}: CourseActionsProps) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  const onPublish = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`);

        toast.success("Course unpublished");
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`);

        toast.success("Course published");
        confetti.onOpen();
      }
      router.refresh();
      //router.push(`/mentor/create/${courseId}`);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}`);

      toast.success("Course deleted");
      router.refresh();
      router.push(`/mentor/upload`);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      {isLoading && (
        <Lottie
          options={defaultOptions}
          height={60}
          width={60}
          isStopped={!isLoading}
        />
      )}

      <Button
        variant={"outline"}
        size={"sm"}
        disabled={disabled || isLoading}
        onClick={onPublish}
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button disabled={isLoading} size={"sm"}>
          Delete
        </Button>
      </ConfirmModal>
    </div>
  );
};
