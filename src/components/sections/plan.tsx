"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Check, Sparkles } from "lucide-react";
import { formatPrice, CfaFormat } from "@/lib/format";
import { Switch } from "../ui/switch";

const quotes = [
  {
    href: "/",
    title: "Monthly Plan",
    fee: 50,
    quote:
      "FULL access to our free resource and course as you begin your Forex Journey",
    benefits: [
      "Full Access to Live Zoom Class",
      "Full Access to Live Trading",
      "Full Access to Firepips Mentorship Course",
      "Free trade signals (Bonus)",
      "Help & Support",
      "Private Community",
      "Full Access to Live Trading",
    ],
    button: "Enroll Now",
  },
  {
    href: "/",
    title: "3 Months Plan",
    fee: 120,
    quote:
      "FULL access to our free resource and course as you begin your Forex Journey",
    benefits: [
      "Everything in Monthly plan, plus",

      "Mentor's Personal Contact",
      "Weekly Live Trading Sessions",
      "Free Trading Plan Template",
      "Free Premium Trading Journal",
      "Appointment Based Physical Mentorship",
      "Priority Support",
    ],
    button: "Enroll Now",
  },

  {
    href: "/",
    title: "6 Months Plan",
    fee: 210,
    icon: <Sparkles color="#FFC46B" />,
    quote:
      "FULL access to our free resource and course as you begin your Forex Journey",
    benefits: [
      "Everything in 3 Months plan, plus",

      "Daily Live trading session",
      "60 Minutes group call with a Mentor to create a personalized trading plan",
      "Certificate of Attendance",
      "Free Premium Trading Journal",
      "Appointment Based Physical Mentorship",
      "Top Priority Support",
    ],
    button: "Enroll Now",
  },

  {
    href: "/",
    title: "12 Months Plan",
    fee: 400,
    icon: <Sparkles color="#FFC46B" />,
    icon0: <Sparkles color="#FFF851" />,
    quote:
      "FULL access to our free resource and course as you begin your Forex Journey",
    benefits: [
      "Everything in 6 Months plan, plus",

      "Advanced Live trading session",
      "120 Minutes call with a Mentor to create a personalized trading plan",
      "Virtual Graduation Party",
      "Free Premium Trading Journal",
      "Super Priority Instant Support",
    ],
    button: "Enroll Now",
  },
];

export default function Plan() {
  const [isExchange, setIsExchange] = useState<boolean>(false);

  const onCurrencyExchange = (amount: number) => {
    const franc = amount * 602.5;
    return franc;
  };

  return (
    <section className="max-w-[1380px] w-full mx-auto overflow-hidden mb-5">
      <div className="my-0 px-5 py-0">
        <div className="box-border w-full flex flex-col justify-center items-center gap-4 text-center">
          <h2 className="text-[3rem] tracking-[-0.064em] font-semibold max-[986px]:text-[3rem] max-[400px]:text-[2rem] max-[600px]:text-[2.3rem]">
            Choose your plan
          </h2>
          <h2 className="text-[1.2rem] tracking-[-0.064em] font-semibold max-[986px]:text-[3rem] max-[400px]:text-[1rem] max-[600px]:text-[1.2rem]">
            Learning forex made easier
          </h2>
          <div className="mt-4">
            <Select>
              <SelectTrigger className="w-[180px] outline-none">
                <SelectValue placeholder="Method of Payement" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="apple">Fiat</SelectItem>
                  <SelectItem value="banana">Crypto</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={isExchange}
              onCheckedChange={() => setIsExchange(!isExchange)}
            />
            <p className="text-base">Exchange to Franc CFA</p>
          </div>
        </div>
      </div>
      <div className="relative mt-10 mb-0">
        <div className=" grid grid-cols-4 gap-1 max-[400px]:grid-cols-1 max-[400px]:mx-6 max-[600px]:grid-cols-1 max-[600px]:mx-6">
          {quotes.map((item, i) => (
            <div
              key={i}
              className="quote-item flex-col transition hover:scale-105"
            >
              <div>
                <h4 className="font-bold m-4 text-xl mb-2">{item.title}</h4>
                {item.icon && <div className="absolute">{item.icon}</div>}
                {item.icon0 && (
                  <div className="absolute -mt-12">{item.icon0}</div>
                )}
                <p className="text-[30px] font-bold px-4">
                  {item.fee &&
                    (isExchange ? (
                      <span className="text-base">
                        {CfaFormat(onCurrencyExchange(item.fee))}
                      </span>
                    ) : (
                      formatPrice(item.fee)
                    ))}
                </p>
                <p className="text-base ">{item.quote}</p>
                <ul>
                  {item.benefits.map((item, i) => (
                    <div key={i}>
                      <li
                        className={`flex items-center text-sm ${
                          item.includes("plus") && "font-bold"
                        }`}
                      >
                        <Check className="mr-4" size={15} color="#48CFAF" />
                        {item}
                      </li>
                    </div>
                  ))}
                </ul>

                <div className="m-4 p-2 text-base bg-[none] text-[#242628] border-2 border-[#242628] cursor-pointer rounded-md flex justify-center items-center hover:bg-[#242628] hover:text-white">
                  <strong>{item.button}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
