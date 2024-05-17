"use client";

// Import necessary dependencies and modules
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import classnames from "classnames";
import { Button } from "@/components/ui/button";

// Navigation component definition
export const Header = () => {
  // Hooks for managing state
  const pathname = usePathname();

  // Define navigation links
  const link = [
    { name: "Mentorship Programs", href: "/mpr" },
    { name: "Mentorship Plans", href: "/mpl" },
    { name: "Blog", href: "/blog" },
    { name: "FAQ'S", href: "/faq" },
  ];

  // State for managing sticky navigation and mobile navigation visibility
  const [isNavigationSticky, setNavigationSticky] = useState(false);
  const [isMobileNavigationTriggered, setMobileNavigationTriggered] =
    useState(false);

  // Effect hook to handle scroll event and adjust sticky navigation
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      // Adjust the value (e.g., 100) based on when you want the navigation to become sticky
      if (offset > 100) {
        setNavigationSticky(true);
      } else {
        setNavigationSticky(false);
      }
    };

    // Add event listener for scroll
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to handle mobile navigation visibility
  const handleMobileNavigationTrigger = () =>
    setMobileNavigationTriggered(!isMobileNavigationTriggered);

  // Component rendering
  return (
    <header
      className={`GNav text-xl h-24 absolute right-0 left-0 top-10 z-[100]  ${
        isNavigationSticky && "global-navigation--sticky"
      }`}
    >
      <div
        className={
          isMobileNavigationTriggered
            ? "GmNM absolute h-screen w-screen bg-blue-600 left-0 -top-1 block"
            : "GmNM absolute h-0 w-screen bg-blue-600 left-0 -top-1 hidden"
        }
      >
        <ul
          className={
            isMobileNavigationTriggered
              ? "opacity-100 visible  pl-8 pr-[35px] pt-[7vh] pb-0"
              : "opacity-0 invisible  pl-8 pr-[35px] pt-[7vh] pb-0"
          }
        >
          {link.map((item, i) => (
            <li
              key={i}
              className="list-none mb-3.5 opacity: 1 transform: translate(0px, 0px)"
            >
              <Link
                href={item.href}
                className={
                  "text-white block font-semibold text-4xl leading-[1.2] tracking-[-1px] capitalize bg-[none] shadow-none p-0"
                }
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="visible opacity-100 pl-8 pr-0 pt-2.5 pb-0">
          {/* Sign Up and Log In links */}
          <li className="mt-[18px]">
            <a href="/signup" className="text-[#FFFFFF99]">
              SIGN UP
            </a>
          </li>
          <li className="mt-[18px]">
            <a href="/login" className="text-[#FFFFFF99]">
              LOG IN
            </a>
          </li>
        </ul>
      </div>

      <div className="GNavMCo pl-5 ">
        <div className="flex items-center h-10">
          {/* Logo */}
          <a
            href="/"
            className={`epLOGO text-2xl no-underline max-[986px]:${
              isNavigationSticky ? "hidden" : "flex"
            } `}
          >
            <h1 className="text-[2rem] tracking-[-4px] leading-[1.1] font-semibold">
              OGT
            </h1>
          </a>

          {/* Navigation Links */}
          <div className="flex items-center ml w-full ml-20 justify-between max-[600px]:justify-end">
            <ul className="list-none flex  relative ml-20 mb-1 max-[980px]:hidden">
              {/* Render navigation links */}
              {link.map((item, i) => (
                <li key={i} className="mx-5 my-0">
                  <Link
                    className={classnames({
                      // Style the active link
                      "text-[#0066F5] font-bold outline-none uppercase text-[16px] cursor-pointer":
                        item.href === pathname,
                      // Style inactive links
                      "outline-none uppercase text-[14px] font-medium cursor-pointer":
                        item.href !== pathname,
                      "hover:text-[#0066F5] font-semibold": true,
                    })}
                    href={item.href}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Render user info or login/signup links based on authentication status */}

            <div className="flex justify-between items-center">
              <Button
                variant={"link"}
                className={
                  "mr-7 text-base bg-[none] text-[#0066f5] shadow-none  max-[980px]:hidden "
                }
              >
                Login{" "}
              </Button>

              <button className={"button_auth  max-[980px]:hidden "}>
                Sign Up
              </button>
            </div>
          </div>

          {/* Mobile Navigation Trigger */}
          <div className=" min-[980px]:hidden max-[980px]:block max-[980px]:opacity-100">
            <div
              onClick={handleMobileNavigationTrigger}
              className={
                isMobileNavigationTriggered
                  ? "cursor-pointer inline-block relative h-6 w-6 ml-[15px] mt-1 isActive"
                  : "cursor-pointer inline-block relative h-6 w-6 ml-[15px] mt-1 transition-opacity duration-[0.5s] ease-[ease]"
              }
            >
              <span
                className={
                  "MObiLMEnu bg-[#082552] block absolute transition-transform duration-[0.3s] ease-[ease] rounded-sm top-[5px] text-[1.3rem]"
                }
              ></span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
