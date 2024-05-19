"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const data = [
  { image: "/bgnner.jpg", title: "Strat from here" },
  { image: "/bgnner.jpg", title: "Live session - Beginner class" },
  { image: "/bgnner.jpg", title: "January 2024 Recorded Live Session" },
  { image: "/bgnner.jpg", title: "Febuary 2024 Recorded Live Session" },
  { image: "/bgnner.jpg", title: "March 2024 Recorded Live Session" },
  { image: "/bgnner.jpg", title: "April 2024 Recorded Live Session" },
  { image: "/bgnner.jpg", title: "May 2024 Recorded Live Session" },
];

export default function Dashboard() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  return (
    <section className="max-w-[1380px] w-full mx-auto overflow-hidden  mt-[160px] mb-10">
      <div className="my-0 px-5 py-0">
        <div className="box-border w-full flex flex-col justify-start items-start gap-4 ">
          <h2 className="text-[3rem] tracking-[-0.064em] font-semibold max-[986px]:text-[3rem] max-[400px]:text-[2rem] max-[600px]:text-[2.3rem]">
            Howdy, {user?.username}
          </h2>
          <h2 className="text-[1rem] tracking-[-0.064em] font-semibold max-[986px]:text-[3rem] max-[400px]:text-[1rem] max-[600px]:text-[1.2rem]">
            “Confidence is not ‘I will profit on this trade.’ Confidence is ‘I
            will be fine if I don’t profit from this trade.” - Yvan Byeajee
          </h2>

          <Button disabled={!isLoaded} className={"button_auth ml-4 mt-2"}>
            Select Plan
          </Button>
        </div>

        <div className="box-border w-full flex flex-col justify-start items-start  mt-10 ">
          <h2 className="text-[2rem] tracking-[-0.064em] font-semibold max-[986px]:text-[3rem] max-[400px]:text-[2rem] max-[600px]:text-[2.3rem]">
            Get access to our mentorship courses today!
          </h2>
          <h2 className="text-[1rem] tracking-[-0.064em] font-semibold max-[986px]:text-[3rem] max-[400px]:text-[1rem] max-[600px]:text-[1.2rem]">
            Get more from us with our premium courses
          </h2>
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
              <div className="w-full flex flex-col justify-start items-start mt-3">
                <p className="text-base font-semibold uppercase">
                  free beginner's class
                </p>
                <div className="flex justify-start items-center gap-2">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className="text-base font-medium ">Valentin Dola</p>
                </div>
                <Badge className="mt-3 p-2" variant={"secondary"}>
                  Intermediate
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="box-border w-full flex flex-col justify-center items-center text-center  mt-[50px] ">
          <h2 className="text-[2rem] tracking-[-0.064em] font-semibold max-[986px]:text-[3rem] max-[400px]:text-[2rem] max-[600px]:text-[2.3rem]">
            Mentorship Courses
          </h2>
        </div>

        <div className="box-border w-full flex flex-col justify-start items-start  mt-[50px]">
          <div className="grid grid-cols-3 gap-7 w-full">
            {data.map((item, i) => (
              <div className="flex flex-col p-4 rounded-xl border-2 border-[#e0e1e4] cursor-pointer transition hover:scale-105">
                <Image
                  className="w-full rounded-xl"
                  src={item.image}
                  width={300}
                  height={200}
                  alt="chart"
                />
                <div className="w-full flex flex-col justify-start items-start mt-3">
                  <p className="text-base font-semibold uppercase">
                    {item.title}
                  </p>
                  <div className="flex justify-start items-center gap-2">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className="text-base font-medium ">Valentin Dola</p>
                  </div>
                  <Badge className="mt-3 p-2" variant={"secondary"}>
                    Intermediate
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <Button disabled={!isLoaded} className={"button_auth mt-[80px]"}>
            View All Courses
          </Button>
        </div>
      </div>
    </section>
  );
}
