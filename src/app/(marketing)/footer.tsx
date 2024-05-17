"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";

export const Footer = () => {
  const [year, setYear] = React.useState(0);

  React.useEffect(() => {
    const Y = new Date();
    setYear(Y.getFullYear());
  }, [year]);

  const links = [
    { name: "Mentorship Programs", href: "/mpr" },
    { name: "Mentorship Plans", href: "/mpl" },

    { name: "FAQ'S", href: "/faq" },
    { name: "Terms and Conditions", href: "/blog" },
    { name: "Privacy Policy", href: "/faq" },
  ];

  return (
    <footer className="flex flex-col justify-center items-center h-full w-full border-t-2 border-slate-200 p-2 bg-[#f9fafc] ">
      <div className="flex flex-col items-center justify-center h-full max-[600px]:mx-6">
        <p className="text-base text-center">
          OGT Academy provides general information and educational materials
          only. Please recognize that your ultimate success or failure will be
          the result of your own efforts.
        </p>
      </div>
      <div className=" flex items-center justify-center">
        <ul className="list-none flex justify-between items-center space-x-6 max-[600px]:flex-col ">
          {links.map((link, i) => (
            <li
              key={i}
              className="flex justify-center items-center text-center"
            >
              <Link
                className="text-[#FF7272]  outline-none uppercase text-[14px] cursor-pointer" // Style the active link
                href={link.href}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col align-center text-center text-base mt-4">
        <p className="text-base">
          {" "}
          <b>Address:</b> Birelly Street, Villa 404 ,Old Ashongman, Agbogba,
          Accra.
        </p>
        <p className="text-base">
          {" "}
          <b>Telephone:</b>{" "}
          <a href="tel:+233278947786" target="_blank">
            +233278947786
          </a>
        </p>
      </div>
      <div className="w-full flex items-start justify-evenly mb-7 max-[660px]:flex-col max-[660px]:gap-4">
        <div className="max-[660px]:w-full max-[660px]:text-center">
          <p className="text-base">© {year} OGT Academy. All Rights Reserved</p>
        </div>
        <div className="max-[660px]:w-full max-[660px]:text-center">
          <p className="text-base">Built with ❤ by OGT</p>
        </div>
      </div>
    </footer>
  );
};
