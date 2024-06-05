"use client";

import Image from "next/image";

import { Badge } from "./ui/badge";

import Link from "next/link";
import { CfaFormat } from "@/lib/format";
import { IconBadge } from "./icon-badge";
import { BookOpen, CheckCircle2, Clock } from "lucide-react";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  progress: number | undefined;
  category: string;
  isFree: boolean;
}

export const FreeCourseCard = ({
  id,
  title,
  description,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category,
  isFree,
}: CourseCardProps) => {
  return (
    <Link href={`/courses/${id}`}>
      <div className="flex flex-col p-4 rounded-xl border border-[#e0e1e4] cursor-pointer overflow-hidden transition hover:scale-105">
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
            {progress === null && price !== null && (
              <Badge className="mt-3 p-2 text-xs">{CfaFormat(price)}</Badge>
            )}

            {progress !== null && (
              <div className="flex items-center gap-x-2 text-slate-500 mt-4">
                <IconBadge
                  size={"sm"}
                  variant={progress === 100 ? "success" : "default"}
                  icon={progress === 100 ? CheckCircle2 : Clock}
                />
                <span className="text-xs">{Math.round(Number(progress))}%</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
