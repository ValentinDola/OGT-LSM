"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const FAQ = () => {
  const route = useRouter();

  const FAQs = [
    {
      question: "Comment puis-je rejoindre le programme de mentorat ?",
      description: (
        <>
          Vous êtes à un clic de rejoindre notre programme de mentorat.
          <Button variant="link" onClick={() => route.push("#mppl")}>
            Cliquez ici pour créer votre compte / se connecter
          </Button>
          ensuite, rejoignez l'un des plans de mentorat.
        </>
      ),
    },
    {
      question: "J'ai payé pour le mentorat, que faire ensuite ?",
      description: (
        <>
          Nous sommes ravis de vous accueillir dans le mentorat ! Après votre
          paiement, surveillez votre boîte de réception pour un email intitulé
          "Votre commande de mentorat OGT Academy a été reçue." Dans cet email,
          vous trouverez tous les liens d'accès au cours de mentorat et aux
          groupes : WhatsApp (pour trois, six et douze mois) ou Telegram (pour
          un mois). Mais si vous ne le voyez pas dans l'heure suivant votre
          paiement, ne vous inquiétez pas. Envoyez simplement votre preuve de
          paiement et votre adresse email enregistrée à{" "}
          <span>
            <a href="mailto:support@OGTacademy.com">support@OGTacademy.com</a>
          </span>
          , et notre équipe vous assistera rapidement.
        </>
      ),
    },
    {
      question: "Est-ce un mentorat à vie ?",
      description:
        "Non, ce n'est pas le cas. Notre mentorat est basé sur un abonnement. Nous proposons des abonnements de mentorat mensuels, trimestriels, semestriels et annuels qui peuvent être renouvelés à expiration.",
    },
    {
      question:
        "Puis-je payer pour le programme de mentorat maintenant mais commencer un mois plus tard ?",
      description: (
        <>
          Oui, vous pouvez. Après avoir effectué le paiement, envoyez votre
          preuve de paiement et votre adresse email enregistrée à{" "}
          <span>
            <a href="mailto:support@OGTacademy.com">support@OGTacademy.com</a>
          </span>
          et la date à laquelle vous souhaitez commencer votre mentorat.
        </>
      ),
    },
    {
      question: "Acceptez-vous des étudiants d'autres États ou pays ?",
      description:
        "Oui, nous acceptons. Nos cours de mentorat se tiennent en ligne et nous acceptons des étudiants de tous les coins du monde. Nos cours virtuels facilitent la participation de n'importe où. Et si vous manquez un cours en direct, les enregistrements sont facilement et rapidement accessibles sur notre site web.",
    },
    {
      question: "En tant que débutant, comment puis-je commencer avec vous ?",
      description: (
        <>
          Nous sommes ravis de faire partie de votre succès en forex. OGT
          Academy propose une éducation complète adaptée aux traders de tous
          niveaux, et nos cours sont adaptés aux débutants.
          <Button variant="link" onClick={() => route.push("/")}>
            Connectez-vous à votre compte
          </Button>
          pour bien commencer.
        </>
      ),
    },
    {
      question: "Fournissez-vous des signaux de trading à vos mentorés ?",
      description:
        "Oui, nous le faisons ! C'est l'un des bonus inclus dans le mentorat.",
    },
    {
      question: "Puis-je payer en plusieurs fois ?",
      description:
        "Pour l'instant, notre programme de mentorat ne propose pas de paiements échelonnés. Nous l'avons conçu pour vous fournir une éducation et un soutien complets en trading forex.",
    },
    {
      question: "Quel courtier recommandez-vous ?",
      description: (
        <>
          Nos courtiers recommandés sont :{" "}
          <span>
            <a href="https://www.exness.com/">Exness</a>
          </span>
        </>
      ),
    },
    {
      question:
        "Acceptez-vous des investissements ou tradez-vous pour le compte d'autres personnes ?",
      description:
        "Nous nous concentrons sur l'éducation et la formation. Nous n'acceptons pas d'investissements ni ne tradons pour le compte d'autres personnes.",
    },
    {
      question:
        "Offrez-vous une formation physique en tête-à-tête en plus de la formation en ligne ?",
      description:
        "Non, nous ne le faisons pas. Tous nos cours sont dispensés virtuellement.",
    },
    {
      question: "Avez-vous une salle de trading ?",
      description:
        "Non, nous n'en avons pas. Cependant, nous avons un bureau pour les demandes de renseignements. Notre bureau est situé à Birelly Street Villa 404, Old Ashongman Agbogba, Accra.",
    },
    {
      question:
        "Que se passe-t-il si ma question n'est pas répondue lors d'une session en ligne ?",
      description:
        "Nos groupes de soutien fonctionnent comme des extensions de nos cours, où vous pouvez poser vos questions à tout moment. Soyez assuré que vous recevrez une réponse satisfaisante, tout comme lors de nos cours en direct.",
    },
  ];

  return (
    <section className="max-w-[1380px] w-full mx-auto mt-[160px] mb-10 px-5 py-0">
      <div className="my-0 px-5 py-0">
        <div className="box-border w-full flex flex-col justify-center items-center gap-4 text-center">
          <h2 className="text-[3rem] tracking-[-0.064em] font-semibold max-[986px]:text-[3rem] max-[400px]:text-[2rem] max-[600px]:text-[2.3rem]">
            Questions fréquemment posées
          </h2>
          <h2 className="text-[1rem] tracking-[-0.064em] font-semibold max-[986px]:text-[3rem] max-sm:text-[1rem] ">
            Tout ce que vous devez savoir sur l'OGT Academy et ses plans de
            mentorat.
          </h2>
        </div>
      </div>
      <div className="flex flex-col items-center justify-start w-full my-10 px-10">
        <Accordion type="single" collapsible>
          {FAQs.map((item, i) => (
            <AccordionItem key={i} value={i.toString()}>
              <AccordionTrigger className="font-semibold text-lg">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm">
                {item.description}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
