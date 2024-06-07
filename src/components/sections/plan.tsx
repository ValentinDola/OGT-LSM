"use client";

import React, { useEffect, useState } from "react";
import "dotenv/config";
import { Check, Sparkles } from "lucide-react";

import { CedisFormat, CfaFormat } from "@/lib/format";
import { PaystackButton } from "react-paystack";
import { HashLoader } from "react-spinners";
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const quotes = [
  {
    title: "Plan mensuel",
    fee: 50,
    count: 1,
    interval: "monthly",
    quote:
      "Accédez à tous nos ressources et cours gratuits pour commencer votre parcours Forex.",
    benefits: [
      "Nous finançons votre compte de trading initial avec 30 % de vos frais d'inscription.",
      "Accès complet aux classes en direct sur Zoom",
      "Accès complet au trading en direct",
      "Accès complet au cours de mentorat OGT",
      "Signaux de trading gratuits (Bonus)",
      "Aide et support",
      "Communauté privée",
      "Accès complet au trading en direct",
    ],
    button: "Abonnez vous",
  },
  {
    title: "Plan de 3 mois",
    fee: 120,
    count: 3,
    interval: "quarterly",
    quote:
      "Accédez à tous nos ressources et cours gratuits pour commencer votre parcours Forex.",
    benefits: [
      "Tout ce qui est inclus dans le plan mensuel, plus",
      "Nous finançons votre compte de trading initial avec 30 % de vos frais d'inscription.",
      "Contact personnel du mentor",
      "Sessions de trading en direct hebdomadaires",
      "Modèle de plan de trading gratuit",
      "Journal de trading premium gratuit",
      "Mentorat physique sur rendez-vous",
      "Support prioritaire",
    ],
    button: "Abonnez vous",
  },

  {
    title: "Plan de 6 mois",
    fee: 210,
    count: 6,
    interval: "biannually",
    icon: <Sparkles color="#FFC46B" />,
    quote:
      "Accédez à tous nos ressources et cours gratuits pour commencer votre parcours Forex.",
    benefits: [
      "Tout ce qui est inclus dans le plan de 3 mois, plus",
      "Nous finançons votre compte de trading initial avec 30 % de vos frais d'inscription.",
      "Séances de trading en direct quotidiennes",
      "Appel de groupe de 60 minutes avec un mentor pour créer un plan de trading personnalisé",
      "Certificat de participation",
      "Journal de trading premium gratuit",
      "Mentorat physique sur rendez-vous",
      "Support prioritaire absolu",
    ],
    button: "Abonnez vous",
  },

  {
    title: "Plan de 12 mois",
    fee: 400,
    count: 12,
    interval: "annually",
    icon: <Sparkles color="#FFC46B" />,
    icon0: <Sparkles color="#FFF851" />,
    quote:
      "Accédez à tous nos ressources et cours gratuits pour commencer votre parcours Forex.",
    benefits: [
      "Tout ce qui est inclus dans le plan de 6 mois, plus",
      "Nous finançons votre compte de trading initial avec 30 % de vos frais d'inscription.",
      "Séances de trading en direct avancées",
      "Appel de 120 minutes avec un mentor pour créer un plan de trading personnalisé",
      "Soirée de remise des diplômes virtuelle",
      "Journal de trading premium gratuit",
      "Support prioritaire instantané super prioritaire",
    ],
    button: "Abonnez vous",
  },
];

export default function Plans() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingIndex, setLoadingIndex] = useState(null);
  const { user } = useUser();
  const router = useRouter();
  const userEmail = user?.emailAddresses[0].emailAddress;
  const firstName = user?.firstName;
  const lastName = user?.lastName;

  // const onSubscription = async (
  //   price: number,
  //   title: string,
  //   quote: string,
  //   count: number,
  //   i: any
  // ) => {
  //   try {
  //     setLoadingIndex(i);
  //     setIsLoading(true);

  //     const response = await axios.post(`/api/create-subscription`, {
  //       amount: price,
  //       title,
  //       quote,
  //       count,
  //     });
  //     const { url } = response.data;

  //     window.location.assign(url);
  //   } catch (error) {
  //     toast.error("Something went wrong");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const onCreatePlan = async (
    title: string | undefined,
    interval: string | undefined,
    amount: number | undefined
  ) => {
    try {
      const secretKey = process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY;
      const url = "https://api.paystack.co/plan";

      const data = {
        name: title,
        interval: interval,
        amount: amount,
      };

      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json",
        },
      });

      return { data: response.data };
    } catch (error) {
      console.error("ERROR_CREATING_PLAN", error);
      toast.error("ERROR_CREATING_PLAN");
    }
  };

  const onCreateSubscription = async (
    customer_id: string | undefined,
    plan_code: string | undefined
  ) => {
    try {
      const url = "https://api.paystack.co/subscription";
      const secretKey = process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY; // Replace with your actual secret key
      const data = {
        customer: customer_id, // Replace with actual customer ID
        plan: plan_code, // Replace with actual plan ID
      };

      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json",
        },
      });

      return { data: response.data };
    } catch (error) {
      console.error("ERROR_CREATING_SUBSCRIPTION", error);
      toast.error("ERROR_CREATING_SUBSCRIPTION");
    }
  };

  const onPaymentSuccess = async (
    title: string | undefined,
    interval: string | undefined,
    amount: number | undefined
  ) => {
    try {
      const email = userEmail; // Replace with the actual email or code
      const url = `https://api.paystack.co/customer/${email}`;
      const secretKey = process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY; // Replace with your actual secret key
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${secretKey}`,
        },
      });

      const plan = await onCreatePlan(title, interval, amount);

      const plan_code = plan?.data.data.plan_code;
      const customerId = response.data.data.customer_code;

      const subscription = await onCreateSubscription(customerId, plan_code);

      const subscription_code = subscription?.data.data.subscription_code;

      const active = subscription?.data.data.status === "active";

      if (active) {
        await axios.post(`/api/paystack`, {
          customerId,
          user,
          subscription_code,
        });
      } else {
        toast.error("Échec de l'abonnement");
        return router.push("/");
      }

      toast.success("Paiement réussi");
      return router.push("/dashboard");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Quelque chose s'est mal passé");
    }
  };

  const onPaymentCancel = () => {
    return toast.error("Vous avez annuler le paiement"), router.push("/");
  };

  return (
    <section className="max-w-[1380px] w-full mx-auto overflow-hidden mt-[100px] mb-10">
      <div className="my-0 px-5 py-0">
        <div className="box-border w-full flex flex-col justify-center items-center gap-4 text-center">
          <h2 className="text-[3rem] tracking-[-0.064em] font-semibold max-[986px]:text-[3rem] max-[450px]:text-[2rem] max-[600px]:text-[2.3rem]">
            Choisissez votre plan.
          </h2>
          <h2 className="text-[1.2rem] tracking-[-0.064em] font-semibold max-[450px]:text-[1rem] max-[600px]:text-[1rem]">
            L&apos;apprentissage du forex rendu plus facile.
          </h2>
        </div>
      </div>
      <div className="flex justify-center items-center relative mt-10 mb-0">
        <div className=" grid grid-cols-4 gap-1 max-[450px]:grid-cols-1 max-[800px]:grid-cols-2 max-[800px]:gap-y-6">
          {quotes.map((item, i) => {
            return (
              <div
                key={i}
                className="quote-item flex-col transition hover:scale-105"
              >
                <div>
                  <h4 className="font-bold m-4 text-2xl mb-2">{item.title}</h4>
                  {item.icon && <div className="absolute">{item.icon}</div>}
                  {item.icon0 && (
                    <div className="absolute -mt-12">{item.icon0}</div>
                  )}
                  <span className="text-xl font-bold px-4">
                    {item.fee && CfaFormat(item.fee)}
                  </span>

                  <ul>
                    {item.benefits.map((item, i) => (
                      <div key={i}>
                        <li
                          className={`flex text-sm  ${
                            item.includes("plus") && "font-bold"
                          }`}
                        >
                          <Check className="mr-4" size={15} color="#48CFAF" />
                          {item}
                        </li>
                      </div>
                    ))}
                  </ul>

                  {user ? (
                    <PaystackButton
                      className="m-4 py-2 px-4 hover:text-white bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                      publicKey={String(
                        process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
                      )}
                      reference={new Date().getTime().toString()}
                      email={String(userEmail)}
                      amount={Number(item.fee * 1500)}
                      currency="GHS"
                      firstname={String(firstName)}
                      lastname={String(lastName)}
                      label={`${CfaFormat(item.fee * 605)} `}
                      onSuccess={() =>
                        onPaymentSuccess(
                          item.title,
                          item.interval,
                          item.fee * 1500
                        )
                      }
                      onClose={() => onPaymentCancel()}
                    >
                      {item.button}
                    </PaystackButton>
                  ) : (
                    <Button
                      onClick={() => (
                        toast.success("Connectez-vous avant de vous abonner"),
                        router.push(
                          "https://stable-ocelot-19.accounts.dev/sign-up"
                        )
                      )}
                      className="m-4 py-2 px-4  text-sm  hover:text-white"
                    >
                      {item.button}
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
