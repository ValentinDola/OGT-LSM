"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Uplaod() {
  const router = useRouter();
  const { user, isLoaded, isSignedIn } = useUser();
  return (
    <section className="max-w-[1380px] w-full mx-auto overflow-hidden  mt-[100px] mb-10">
      <div className="my-0 px-5 py-0">
        <div className="box-border w-full flex flex-col justify-start items-start gap-4 ">
          <h2 className="text-[3rem] tracking-[-0.064em] font-semibold max-[986px]:text-[3rem] max-[400px]:text-[2rem] max-[600px]:text-[2.3rem]">
            Howdy, Mentor {user?.username}
          </h2>
        </div>
      </div>
    </section>
  );
}
