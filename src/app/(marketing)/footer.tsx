"use client";

import { isMentor } from "@/lib/mentor";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export const Footer = () => {
  const [year, setYear] = React.useState(new Date().getFullYear());
  const router = useRouter();
  const { userId } = useAuth();

  const links = [
    { name: "Programmes", href: "/mpr" },
    { name: "Plans", href: "/mpl" },
    { name: "FAQ", href: "/faq" },
    { name: "Conditions générales", href: "/terms" },
    { name: "Politique de confidentialité", href: "/privacy" },
  ];

  return (
    <footer className="footer flex flex-col justify-center items-center border-t-2 border-slate-200 p-2 bg-[#242628]">
      <div className="flex flex-col items-center justify-center max-w-screen-lg mx-6">
        <p className="text-base text-center text-white">
          OGT Academy fournit uniquement des informations générales et des
          supports éducatifs. Veuillez reconnaître que votre succès ou échec
          final dépendra de vos propres efforts.
        </p>
      </div>
      <div className="flex items-center justify-center">
        <ul className="list-none flex justify-between items-center space-x-6 max-[600px]:flex-col">
          {links.map((link, i) => (
            <li key={i} className="text-center hover:font-semibold">
              <Link
                className="text-white outline-none uppercase text-[14px] cursor-pointer text-sm"
                href={link.href}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col align-center text-center text-base mt-4">
        <p className="text-sm text-white">
          <b>Address:</b> Birelly Street, Villa 404, Old Ashongman, Agbogba,
          Accra.
        </p>
        <p className="text-sm text-white">
          <b>Telephone:</b>{" "}
          <a className="text-white" href="tel:+233278947786" target="_blank">
            +233278947786
          </a>
        </p>
      </div>
      <div className="w-full flex items-start justify-evenly mb-7 max-[660px]:flex-col max-[660px]:gap-4">
        <div className="max-[660px]:w-full max-[660px]:text-center">
          <p className="text-sm text-white">
            © {year}{" "}
            <span
              className="cursor-pointer text-white"
              onClick={() => {
                isMentor(userId) && router.push("/mentor/create");
              }}
            >
              OGT Academy
            </span>
            . All Rights Reserved
          </p>
        </div>
        <div className="max-[660px]:w-full max-[660px]:text-center">
          <p className="text-sm text-white">Built with ❤ by OGT</p>
        </div>
      </div>
    </footer>
  );
};
