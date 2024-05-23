"use client";

import Image from "next/image";

import { Category, Course } from "@prisma/client";

import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { CfaFormat } from "@/lib/format";
import { IconBadge } from "./icon-badge";
import { BookOpen } from "lucide-react";
import { Progress } from "./ui/progress";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
  category: string;
}

export const CourseCard = ({
  id,
  title,
  description,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category,
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
              {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
            </span>
          </div>

          <Badge className="mt-3 p-2">{category}</Badge>

          <div>
            {progress !== null ? (
              <Progress />
            ) : (
              price !== null && (
                <Badge className="mt-3 p-2 text-xs">
                  {CfaFormat(price * 602)}
                </Badge>
              )
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
