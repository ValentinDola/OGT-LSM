"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useUser } from "@clerk/nextjs";
import { Play } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function FreeCourses() {
  const router = useRouter();
  const { user, isLoaded, isSignedIn } = useUser();
  return (
    <section className="max-w-[1380px] w-full mx-auto overflow-hidden  mt-[100px] mb-10">
      <div className="my-0 px-5 py-0">
        <div className="box-border w-full flex flex-col justify-start items-start gap-4 ">
          <Button disabled={!isLoaded} className={"button_auth ml-4 mt-2"}>
            Select Plan
          </Button>
        </div>
        <div className="box-border w-full flex flex-col justify-center items-center text-center  mt-[50px] ">
          <h2 className="text-[2rem] tracking-[-0.064em] font-semibold max-[986px]:text-[3rem] max-[400px]:text-[2rem] max-[600px]:text-[2.3rem]">
            Free Courses
          </h2>
        </div>

        <div className="box-border w-full flex flex-col justify-start items-start  mt-[50px]">
          <div className="grid grid-cols-3 gap-4 w-full">
            <div
              onClick={() => router.push("/freecourses")}
              className="flex flex-col p-4 rounded-xl border-2 border-[#e0e1e4] cursor-pointer transition hover:scale-105"
            >
              <Image
                className="w-full rounded-xl"
                src={"/bgnner.jpg"}
                width={300}
                height={200}
                alt="chart"
              />
              <div className="flex justify-center items-center h-full w-full -mt-10">
                <Play color="white" size={30} />
              </div>
              <div className="w-full flex flex-col justify-start items-start mt-3">
                <p className="text-base font-semibold uppercase">
                  free beginner's class
                </p>

                <p className="text-[14px] font-medium ">
                  This comprehensive course by OGT Academy is FREE of charge. It
                  is perfectly curated for absolute beginners who want a strong
                  foundation for their forex trading journey.
                </p>
                <Progress value={33} />

                <Badge className="mt-5 p-2" variant={"secondary"}>
                  Not Completed
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
