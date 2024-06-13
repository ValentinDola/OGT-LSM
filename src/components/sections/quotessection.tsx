import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Quotes() {
  const quotes = [
    {
      href: "https://t.me/+owVtEKsvNvM4OTY0",
      title: "Communauté de Trading",
      quote:
        "Nous favorisons une communauté de trading de plus de 10 000 abonnés où des signaux de haute qualité, des ressources de trading et des outils sont partagés gratuitement. Cliquez sur le bouton ci-dessous pour rejoindre maintenant.",
      button: "Joindre la chaine Telegram",
    },
    {
      href: "/mentorshippl",
      title: "Formation Forex",
      quote:
        "Nous proposons un programme complet qui couvre tout, des bases du forex aux stratégies de trading avancées. Notre objectif est de vous fournir les connaissances et les compétences nécessaires pour réussir sur le marché du forex. Cliquez sur le bouton ci-dessous pour vous inscrire maintenant.",
      button: "Inscrivez vous",
    },
    {
      href: "/mentorshippl",
      title: "Séance de Trading en Direct",
      quote:
        "Notre séance de trading en direct gratuite sur YouTube chaque vendredi à 13h00 GMT a été créée pour aider les traders à améliorer leur trading et à être rentables de manière constante. Cliquez sur le bouton ci-dessous pour vous abonner à la chaîne.",
      button: "Abonnez vous",
    },
    {
      href: "/booking",
      title: "Réservation en tête-à-tête",
      quote:
        "Réservez des réunions individuelles intensives avec nos tuteurs expérimentés chez OGT et accédez à une session privée en direct pour apprendre et obtenir des informations. Cliquez sur le bouton ci-dessous pour réserver une session",
      button: "Réserver une session",
    },
  ];
  return (
    <section className="max-w-[1380px] w-full mx-auto">
      <div className=" my-0 px-5 py-0">
        <div className="box-border w-full flex flex-col justify-center items-center gap-4 text-center ">
          <h2 className="text-[3rem] tracking-[-0.064em] font-semibold max-[986px]:text-[3rem] max-[450px]:text-[2rem] max-[600px]:text-[2.3rem]">
            Ce que nous avons à offrir
          </h2>
          <h2 className="text-[1.2rem] tracking-[-0.064em] font-semibold max-[450px]:text-[1.3rem] max-[600px]:text-[1.2rem]">
            Vos rêves méritent une académie de formation solide, nous avons ce
            qu&apos;il vous faut!
          </h2>
        </div>
      </div>
      <div className=" flex justify-center items-center relative mt-10 mb-0">
        <div className=" grid grid-cols-4 gap-1 max-[450px]:grid-cols-1 max-[800px]:grid-cols-2 max-[800px]:gap-y-6 ">
          {quotes.map((item, i) => (
            <div
              key={i}
              className="quote-item flex-col transition hover:scale-105"
            >
              <h4 className="font-bold m-4 text-xl mb-2">{item.title}</h4>

              <p className="text-sm ">{item.quote}</p>

              {item.href == "" ? (
                <div className="m-4 p-2 text-base bg-[none] text-[#242628] border-2 border-[#242628] cursor-pointer rounded-md flex justify-center items-center  ">
                  <span className="font-bold ">{item.button}</span>
                </div>
              ) : (
                <Link href={item?.href}>
                  <Button className="text-sm ">{item.button}</Button>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
