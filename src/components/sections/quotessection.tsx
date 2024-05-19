import React from "react";
import { Button } from "../ui/button";

export default function Quotes() {
  const quotes = [
    {
      href: "/",
      title: "Trading Community",
      quote:
        "We foster a trading community of over 10,000 subscribers where high quality signals, trading resources and tools are shared for free. Click the button below to join now.",
      button: "Join the telegram Channel",
    },
    {
      href: "#mppl",
      title: "Forex Education",
      quote:
        "We provide a robust curriculum that covers everything from forex basics to advanced trading strategies. Our aim is to equip you with the knowledge and skills you need to thrive in the forex market. Click the button below to enroll now.",
      button: "Enroll Now",
    },
    {
      href: "/plan",
      title: "Live Trading Session",
      quote:
        "Our free live trading session on YouTube every Friday 1:00 PM GMT was created to help traders improve their trading and be consistently profitable. Click the button below to subscribe to the channel.",
      button: "Click here to Subscribe",
    },
    {
      href: "",
      title: "One-on-One Booking",
      quote:
        "Book intensive one-on-one meetings with our experienced tutors at OGT and get access to a private live session to learn and gain insights. Click the button below to Book a Session",
      button: "Book a Session",
    },
  ];
  return (
    <section className="max-w-[1380px] w-full mx-auto">
      <div className=" my-0 px-5 py-0">
        <div className="box-border w-full flex flex-col justify-center items-center gap-4 text-center ">
          <h2 className="text-[3rem] tracking-[-0.064em] font-semibold max-[986px]:text-[3rem] max-[400px]:text-[2rem] max-[600px]:text-[2.3rem]">
            What we have to offer
          </h2>
          <h2 className="text-[1.2rem] tracking-[-0.064em] font-semibold max-[400px]:text-[1.3rem] max-[600px]:text-[1.2rem]">
            Your dreams deserve a solid training academy, we've got you covered!
          </h2>
        </div>
      </div>
      <div className=" relative mt-10 mb-0">
        <div className=" grid grid-cols-4 gap-4 max-[400px]:grid-cols-1 max-[400px]:mx-6 max-[600px]:grid-cols-1 max-[600px]:mx-6">
          {quotes.map((item, i) => (
            <div
              key={i}
              className="quote-item flex-col transition hover:scale-105 "
            >
              <h4 className="font-bold m-4 text-xl mb-2">{item.title}</h4>

              <p className="text-base ">{item.quote}</p>

              {item.href == "" ? (
                <div className="m-4 p-2 text-base bg-[none] text-[#242628] border-2 border-[#242628] cursor-pointer rounded-md flex justify-center items-center  ">
                  <span className="font-bold ">{item.button}</span>
                </div>
              ) : (
                <a
                  href={item?.href}
                  className="m-4 p-2 text-base bg-[none] text-[#242628] border-2 border-[#242628] cursor-pointer rounded-md flex justify-center items-center "
                >
                  <span className="font-bold e">{item.button}</span>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
