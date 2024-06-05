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

export const CourseCard = ({
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
  const { userId, getToken } = useAuth();
  const [access, setAccess] = useState<boolean>(false);

  // useEffect(() => {
  //   const checkAccess = async () => {
  //     const token = await getToken();
  //     const response = await axios.post("/api/check-access", {
  //       userId,
  //       courseId: id,
  //     });
  //     const data = response.data;
  //     console.log(data.access);
  //   };
  //   checkAccess();
  // }, [userId, getToken, id]);

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
            {progress === undefined ||
              (price !== undefined && (
                <Badge className="mt-3 p-2 text-xs">{CfaFormat(price)}</Badge>
              ))}

            {progress !== undefined && (
              <div className="flex items-center gap-x-2 text-slate-500 mt-4">
                <IconBadge
                  size={"sm"}
                  variant={progress === 100 ? "success" : "default"}
                  icon={progress === 100 ? CheckCircle2 : Clock}
                />
                <span className="text-xs">
                  {Math.round(progress === undefined ? 0 : progress)}%
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
