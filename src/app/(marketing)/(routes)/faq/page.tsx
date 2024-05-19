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
      question: "How can I join the mentorship program?",
      description: `You're just a click away from joining our mentorship program. ${(
        <Button variant={"link"} onClick={() => route.push("#mppl")}>
          Click here to create your account/signin
        </Button>
      )} thereafter, join any of the mentorship plan.`,
    },
    {
      question: "I've paid for the mentorship, what's next?",
      description: `We're excited to have you in the mentorship! After your payment, watch your inbox for an email titled "Your OGT Academy mentorship order has been received." In this email, you'll find all the access links to the mentorship course and groups: WhatsApp (for three, six and twelve months) or Telegram (for one month). But if you don't see it within an hour of your payment, don't worry. Simply forward your proof of payment and registered email address to ${(
        <p>
          <a href="mailto:support@OGTacademy.com">support@OGTacademy.com</a>
        </p>
      )} , and our team will assist you promptly.`,
    },
    {
      question: "Is it a lifetime mentorship?",
      description:
        "No, it is not. Our mentorship is subscription-based. We offer monthly, three-month, six-month and yearly mentorship subscriptions that can be renewed upon expiration.",
    },
    {
      question:
        "Can I pay for the Mentorship program now but start a month later?",
      description: `Yes, you can. After you have made the payment forward your proof of payment and registered email address to ${(
        <p>
          <a href="mailto:support@OGTacademy.com">support@OGTacademy.com</a>
        </p>
      )} and the date you want to commence your mentorship.`,
    },
    {
      question: "Do you accept students from other states or countries?",
      description:
        "Yes, we do. Our mentorship classes are held online and we accept students from every corner of the globe. Our virtual classes make it easy to participate from anywhere. And if you miss any live class – the recordings are easily and readily accessible on our website.",
    },
    {
      question: "As a beginner, how do I start with you?",
      description: `We're thrilled to be part of your forex success. OGT Academy offers comprehensive education suitable for traders of all levels, and our classes are beginner-friendly. ${(
        <Button variant={"link"} onClick={() => route.push("/")}>
          SignIn to your Account
        </Button>
      )} to get started the right way.`,
    },
    {
      question: "Do you provide trade signals to your mentees?",
      description:
        "Yes, we do! It is one of the bonuses included in the mentorship.",
    },
    {
      question: "Can I make payments in instalments?",
      description:
        "At this time, our mentorship program doesn't offer installment payments. We've designed it to provide you with comprehensive forex trading education and support.",
    },
    {
      question: "Which broker do you recommend?",
      description: `Our recommended brokers are: ${(
        <p>
          <a href="https://www.exness.com/">Exness</a>
        </p>
      )} `,
    },
    {
      question: "Do you accept investments or trade on behalf of others?",
      description:
        "We focus on education and training. We do accept investments or trade on behalf of others.",
    },
    {
      question:
        "Do you offer one-on-one physical training besides online training?",
      description: "No, we do not. All our classes are conducted virtually.",
    },
    {
      question: "Do you have a trading floor?",
      description:
        "No, we do not. However, we have an office for inquiry purposes. Our office is located on Birelly Street Villa 404, Old Ashongman Agbogba, Accra.",
    },
    {
      question: "What if my question isn't answered during an online session?",
      description:
        "Our support groups function as extensions of our classes, where you can direct your questions at any time. Be rest assured that you'll receive a satisfactory response, much like you would during our live classes.",
    },
  ];

  return (
    <section className="max-w-[1380px] w-full mx-auto mt-[160px] mb-10 px-5 py-0">
      <div className="my-0 px-5 py-0">
        <div className="box-border w-full flex flex-col justify-center items-center gap-4 text-center">
          <h2 className="text-[3rem] tracking-[-0.064em] font-semibold max-[986px]:text-[3rem] max-[400px]:text-[2rem] max-[600px]:text-[2.3rem]">
            Frequently asked questions
          </h2>
          <h2 className="text-[1rem] tracking-[-0.064em] font-semibold max-[986px]:text-[3rem] max-[400px]:text-[1rem] max-[600px]:text-[1.2rem]">
            Everything you need to know about firepips and its mentorship plans.
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
              <AccordionContent className="text-[14px]">
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
