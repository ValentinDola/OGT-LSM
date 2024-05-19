"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Video from "next-video";
import getStarted from "/videos/get-started.mp4";

export default function HomeSection() {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();
  const [activeThumbnailImage, setActiveThumbnailImage] = useState(0);

  const testimonials = [
    {
      source: "/wura.jpg",
      quote:
        "I enrolled into OGT Academy with minimal knowledge of Forex trading and I can boldly say that I have learnt a lot. The remarkable thing is that I have also been able to learn about life from a different angle. I am impressed with their professionalism and approachability.",
      name: "josephine ABALO",
      href: "/",
      username: "@forextrader",
      background: "rgb(255,236,219)",
    },
    {
      source: "/wande.jpg",
      quote:
        "Starting my forex journey with OGT has been a game changer for me, I joined OGT five months ago with zero knowledge about trading. But now I can confess this is a place that can make your trading journey easy and simple. Their teaching style is superb and makes you understand and adapt to the system within a short period of time.",
      name: "Donne DOGBEVI",
      href: "/",
      username: "@forextrader",
      background: "rgb(255,236,219)",
    },
    {
      source: "/mayokun.jpg",
      quote:
        "I Joined OGT as a complete beginner in August 2023 during my holidays and in 2 months I started seeing impressive results. The classes are easy to understand. All the teachers in the academy always push me to be the best special",
      name: "Adjovi LAURA",
      href: "/",
      username: "@adjoatrader",
      background: "rgb(255,236,219)",
    },
  ];

  const handleTestimonailActivity = (i: React.SetStateAction<number>) =>
    setActiveThumbnailImage(i);

  const getImage = (i: number) => {
    return testimonials[i].source;
  };

  const getQuote = (i: number) => testimonials[i].quote;

  const getName = (i: number) => testimonials[i].name;

  const getUsername = (i: number) => testimonials[i].username;

  const getHref = (i: number) => testimonials[i].href;

  const handleEnrollNow = () => {
    if (isSignedIn) router.push("/mentorshippl");
  };

  return (
    <section>
      <div className="max-w-[1380px] w-full mx-auto mt-9 mb-0 px-5 py-0">
        <div className="grid grid-cols-[1fr_1fr] gap-20 grid-flow-dense px-0 py-20 max-[980px]:grid-cols-[1fr] max-[980px]:gap-[30px] max-[980px]:pt-[30px]">
          <div className="min-h-[650px] relative opacity-100 transition-opacity duration-[0.7s] ease-[ease] ml-[30px] mt-[30px] max-[980px]:min-h-[450px] max-[980px]:ml-0 max-[980px]:mt-4">
            <div className="overflow-x-hidden bg-[#f5f6fa] max-[400px]:p-6">
              <div className="absolute opacity-0 invisible h-full w-full left-0 top-0 TEStimoNIALISacTIVE">
                <div
                  className={`absolute top-[-60px] w-[400px] opacity-50 z-[-1] bg-[#E4FFF9] -left-20 h-[850px] max-[980px]:w-[300px] max-[980px]-left-10 max-[980px]-top-5`}
                ></div>

                <div className="bg-white min-h-[180px] w-[340px] absolute z-[5] px-8 py-6 -right-2.5 -bottom-10 max-[980px]:left-5 max-[400px]:w-[280px] max-[1024px]:mb-6">
                  <blockquote className="text-[.9rem] text-[#6c82a3] leading-[1.35] tracking-[-0.2px] m-0 break-words max-[400px]:text-sm:">
                    {getQuote(activeThumbnailImage)}
                  </blockquote>
                  <div className="flex justify-between font-medium text-[1.4rem] mt-6">
                    <span className="text-sm">
                      {getName(activeThumbnailImage)}
                    </span>
                    <a
                      href={getHref(activeThumbnailImage)}
                      target="_blank"
                      className="text-[#0066f5] text-sm"
                    >
                      {getUsername(activeThumbnailImage)}
                    </a>
                  </div>
                </div>
                <div className="absolute w-full h-full bg-white z-[2] opacity-0 left-0 top-0"></div>
                <div className="h-[650px] w-[520px] overflow-hidden relative max-[980px]:w-full max-[980px]:h-full">
                  <img
                    src={getImage(activeThumbnailImage)}
                    alt={getImage(activeThumbnailImage)}
                    className={`h-full w-full object-cover z-[1] absolute left-0 top-0 translate-x-0 translate-y-0 `}
                  />
                </div>
              </div>
            </div>
            <ul className="flex absolute bottom-[-100px] mb-5 max-[980px]:-mb-2 max-[400px]:p-6">
              {testimonials.map((item, i) => (
                <li
                  key={i}
                  className={
                    activeThumbnailImage === i
                      ? "TEStimoNIALthUMBnaIL active max-[980px]:grayscale-0 max-[980px]:contrast-100 "
                      : "TEStimoNIALthUMBnaIL "
                  }
                  onClick={() => handleTestimonailActivity(i)}
                >
                  <img src={item.source} alt={item.source} />
                </li>
              ))}
            </ul>
          </div>
          <div className="max-[980px]:mt-4 max-[980px]:row-[1]">
            <h1 className="mb-5 text-[5rem] tracking-[-4px] leading-[1.1] font-semibold max-[400px]:tracking-[-.5px] max-[400px]:p-8 max-[400px]:text-[3rem] max-[600px]:px-5 max-[600px]:text-[3rem] max-[980px]:text-[4.2rem] max-[980px]:tracking-[-2px]">
              Discover The Pathway to Mastering the Art of Profitable Forex
              Trading.
            </h1>
            <h6 className="text-[1rem] font-normal mt-4 max-[980px]:text-[1rem] max-[980px]:tracking-[-0.9px] max-[400px]:p-8 max-[400px]:text-[1.2rem] max-[400px]:mt-0 max-[600px]:px-5">
              OGT Academy is your sure guide to financial freedom. We're a
              supportive community dedicated to teaching you the art of
              profitable forex trading.
            </h6>
            <div className="flex w-[600px] justify-center items-center mt-7 max-[400px]:mt-4">
              <Button
                onClick={() => router.push("/freecourses")}
                variant={"link"}
                className={
                  "mr-7 text-base bg-[none] text-[#0066f5] shadow-none"
                }
              >
                Join free class{" "}
              </Button>

              <Button
                disabled={!isLoaded}
                onClick={handleEnrollNow}
                className={"button_auth"}
              >
                Enroll now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
