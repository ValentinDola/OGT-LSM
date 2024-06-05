"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export const Introduction = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  return (
    <>
      <div className="box-border w-full flex flex-col justify-start items-start  mt-10 ">
        <h2 className="text-[1.5rem] tracking-[-0.064em] font-semibold max-[986px]:text-[3rem] max-[400px]:text-[2rem] max-[600px]:text-[2.3rem]">
          Voici la liste des cours achetés ou auxquels vous êtes abonné.
        </h2>
      </div>
    </>
  );
};
