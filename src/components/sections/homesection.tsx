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
import toast from "react-hot-toast";
import { useToast } from "@/components/ui/use-toast";

export default function HomeSection() {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();

  const [activeThumbnailImage, setActiveThumbnailImage] = useState(0);

  const testimonials = [
    {
      source: "/wura.jpg",
      quote:
        "Je me suis inscrit à OGT Academy avec peu de connaissances sur le Forex trading et je peux dire avec assurance que j'ai beaucoup appris. Ce qui est remarquable, c'est que j'ai aussi pu apprendre sur la vie d'un autre point de vue. Je suis impressionné par leur professionnalisme et leur accessibilité.",
      name: "josephine ABALO",
      href: "/",
      username: "@forextrader",
      background: "rgb(255,236,219)",
    },
    {
      source: "/wande.jpg",
      quote:
        "Commencer mon parcours de Forex trading avec OGT a été une révolution pour moi. J'ai rejoint OGT il y a cinq mois sans aucune connaissance en trading. Mais maintenant, je peux dire que c'est un endroit qui rend votre parcours de trading facile et simple. Leur méthode d'enseignement est superbe et vous permet de comprendre et d'adapter le système en peu de temps.",
      name: "Donne DOGBEVI",
      href: "/",
      username: "@forextrader",
      background: "rgb(255,236,219)",
    },
    {
      source: "/mayokun.jpg",
      quote:
        "J'ai rejoint OGT en tant que débutant complet en août 2023 pendant mes vacances et en 2 mois, j'ai commencé à voir des résultats impressionnants. Les cours sont faciles à comprendre. Tous les professeurs de l'académie me poussent toujours à donner le meilleur de moi-même.",
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
        <div className="grid grid-cols-1 gap-20 grid-flow-dense px-0 py-20 min-[1030px]:grid-cols-2 max-[980px]:gap-[30px] max-[980px]:pt-[30px]">
          <div className="min-h-[650px] relative opacity-100 transition-opacity duration-[0.7s] ease-[ease] ml-[30px] mt-[30px] max-[980px]:min-h-[450px] max-[980px]:ml-0 max-[980px]:mt-4">
            <div className="overflow-x-hidden bg-[#f5f6fa] max-[400px]:p-6">
              <div className="absolute opacity-0 invisible h-full w-full left-0 top-0 TEStimoNIALISacTIVE">
                <div
                  className={`absolute top-[-60px] w-[400px] opacity-50 z-[-1] bg-[#E4FFF9] -left-20 h-[850px] max-[980px]:w-[300px] max-[980px]-left-10 max-[980px]-top-5`}
                ></div>

                <div className="bg-white min-h-[180px] w-[340px] absolute z-[5] px-8 py-6 -right-2.5 -bottom-10 max-[980px]:left-[100px] max-[450px]:left-[10px]">
                  <blockquote className="text-[.9rem] text-[#6c82a3] leading-[1.35] tracking-[-0.2px] m-0 break-words max-[450px]:text-sm:">
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
                  <Image
                    src={getImage(activeThumbnailImage)}
                    alt={getImage(activeThumbnailImage)}
                    className={`h-full w-full object-cover z-[1] absolute left-0 top-0 translate-x-0 translate-y-0 `}
                  />
                </div>
              </div>
            </div>
            <ul className="flex absolute bottom-[-100px] transition mb-5 max-[980px]:-mb-2 max-[980px]:ml-[120px] max-[450px]:mx-[10px]">
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
                  <Image src={item.source} alt={item.source} />
                </li>
              ))}
            </ul>
          </div>
          <div className="max-[980px]:mt-4 max-[980px]:row-[1] max-[980px]:mx-[20px]">
            <h1 className="mb-5 text-[4.5rem] tracking-[-4px] leading-[1.1] font-semibold max-[450px]:text-[2.5rem] max-[450px]:-mx-5 max-[980px]:text-[4.2rem] max-[980px]:tracking-[-2px]">
              Découvrez comment maîtriser l&apos;art de trader le Forex de
              manière rentable.
            </h1>
            <h6 className="text-[1rem] font-normal mt-4 max-[980px]:text-[1rem] max-[980px]:tracking-[-0.9px] max-[450px]:-mx-5 max-[450px]:text-sm ">
              OGT Academy est votre guide sûr vers la liberté financière. Nous
              sommes une communauté solidaire dédiée à vous enseigner l&apos;art
              de trader le Forex de manière rentable.
            </h6>
            <div className="flex w-[600px] justify-center items-center mt-7 max-[450px]:flex-col max-[450px]:-ml-[150px] ">
              <Button
                onClick={() => {
                  isSignedIn
                    ? router.push("/dashboard")
                    : toast.error(
                        "Login or Signup before you can join free class"
                      );
                }}
                variant={"link"}
                className={"mr-7 text-sm bg-[none] text-[#0066f5] shadow-none"}
              >
                Joignez notre classe gratuite.{" "}
              </Button>

              <Button
                disabled={!isLoaded}
                onClick={() => router.push("/mentorshippl")}
              >
                Inscrivez-vous maintenant.
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
