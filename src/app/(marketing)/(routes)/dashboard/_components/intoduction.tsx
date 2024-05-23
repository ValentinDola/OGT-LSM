"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export const Introduction = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  return (
    <>
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
    </>
  );
};
