"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { NextResponse } from "next/server";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getSubscription } from "../../../../../../actions/get-subscription";

interface IntroductionProps {
  status: string | undefined;
}

export const Introduction = ({ status }: IntroductionProps) => {
  const { user, isLoaded, isSignedIn } = useUser();
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  return (
    <>
      <div className="box-border w-full flex flex-col justify-start items-start  mt-10 ">
        <h2 className="text-[2rem] tracking-[-0.064em]  font-semibold max-[986px]:text-[3rem] max-[450px]:text-[2.5rem] max-[800px]:text-[2.5rem]">
          {status === "completed"
            ? "Bravo vous êtes désormais étudiant de OGT Academy."
            : "Accédez à nos cours de mentorat dès aujourd'hui !"}
        </h2>
        <h2 className="text-[2rem] tracking-[-0.064em]  font-semibold max-[986px]:text-[3rem] max-[450px]:text-[2.5rem] max-[800px]:text-[2.5rem]">
          {status === "completed" && "Commencez à regarder les cours."}
        </h2>
        <h2 className="text-[1.2rem] tracking-[-0.064em] max-[986px]:text-[1.2remrem] max-[450px]:text-[1rem] max-[800px]:text-[1.2rem]">
          Obtenez plus de nous avec nos cours premium
        </h2>

        {status !== "completed" && (
          <Link href="/mentorshippl">
            <Button disabled={!isLoaded} className={"button_auth ml-4 mt-2"}>
              Sélectionner un plan
            </Button>
          </Link>
        )}
      </div>
    </>
  );
};
