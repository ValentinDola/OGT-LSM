"use client";

import Image from "next/image";

import { Badge } from "./ui/badge";

import Link from "next/link";
import { CfaFormat } from "@/lib/format";
import { IconBadge } from "./icon-badge";
import { BookOpen, CheckCircle2, Clock } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface SubCourseCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  progress: number | undefined;
  category: string;
  isFree: boolean;
  st: string | undefined;
}

export const SubCourseCard = ({
  id,
  title,
  description,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category,
  isFree,
  st,
}: SubCourseCardProps) => {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        st !== "completed"
          ? (toast.success("Subscribe"),
            setTimeout(() => {
              router.push("/mentorshippl");
            }, 4000))
          : router.push(`/courses/${id}`);
      }}
      className="flex flex-col p-4 rounded-xl border border-[#e0e1e4] cursor-pointer overflow-hidden transition hover:scale-105"
    >
      <div className="relative w-full rounded-xl aspect-video overflow-hidden">
        <Image className="object-cover" src={imageUrl} fill alt={title} />
      </div>

      <div className="w-full flex flex-col justify-start items-start">
        <p className="text-lg md:text-base font-semibold uppercase group-hover:text-sky-700 transition line-clamp-2">
          {title}
        </p>
        <p className="text-sm text-slate-400 transition line-clamp-2">
          {description}
        </p>
        <div className="flex items-center gap-x-2 text-slate-500">
          <IconBadge size={"sm"} icon={BookOpen} />
          <span className="text-xs">
            {chaptersLength} {chaptersLength === 1 ? "Chapitre" : "Chapitres"}
          </span>
        </div>

        <Badge className="mt-3 p-2">{category}</Badge>

        <div>
          {progress !== undefined && st === "completed" && (
            <div className="flex items-center gap-x-2 text-slate-500 mt-4">
              <IconBadge
                size={"sm"}
                variant={progress === 100 ? "success" : "default"}
                icon={progress === 100 ? CheckCircle2 : Clock}
              />
              <span className="text-xs">
                {Math.round(Number(progress === undefined ? 0 : progress))}%
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
