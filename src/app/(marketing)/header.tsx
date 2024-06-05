"use client";

// Import necessary dependencies and modules
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import classnames from "classnames";
import { Button } from "@/components/ui/button";
import {
  ClerkLoading,
  ClerkLoaded,
  SignedIn,
  UserButton,
  SignedOut,
  SignInButton,
  SignUpButton,
  useUser,
} from "@clerk/nextjs";
import { Languages, Loader } from "lucide-react";
import { cn } from "@/lib/utils";

import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define navigation links
const Routes = [
  { name: "Tableau de cours", href: "/dashboard", user: true },
  { name: "Mes cours", href: "/mycourses", user: true },
  { name: "Réservation", href: "/booking", user: true },
  { name: "Programmes", href: "/mentorshippg", user: false },
  { name: "Plans", href: "/mentorshippl", user: false },
  { name: "Blog", href: "/blog", user: false },
  { name: "FAQ", href: "/faq", user: false },
];

const MRoutes = [
  { name: "Créer", href: "/mentor/create", user: true },
  { name: "Cours", href: "/mentor/upload", user: true },
  { name: "Analytique", href: "/mentor/analytics", user: true },
];

// Navigation component definition
export const Header = () => {
  // Hooks for managing state
  const pathname = usePathname();
  const { isSignedIn, user, isLoaded } = useUser();

  const isMentorMode = pathname?.includes("/mentor/");
  const isPlayerMode = pathname?.includes("/courses");
  const isSearchMode = pathname === "/search";

  const routes = isMentorMode ? MRoutes : Routes;

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
      className={cn(
        "GNav text-xl h-24 flex  items-center px-2 absolute right-0 left-0  z-[100]",
        isMentorMode && "bg-[#1b4942] z-[100]",
        isMentorMode && isNavigationSticky && "global-navigation--stickyM",
        isNavigationSticky &&
          "fixed bg-[#fff] h-[90px] [box-shadow:0_0_22px_rgba(0,_0,_0,_.1)] animate-[slideInDown_.42s_cubic-bezier(.165,_.84,_.44,_1)]"
      )}
    >
      {/* <div className="flex min-[770px]:hidden">
        <Select>
          <SelectTrigger className="w-[70px] outline-none">
            <SelectValue placeholder={<Languages className="h4 w-4" />} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="fr-FR">
                <div className="flex items-center justify-center">
                  <Image
                    src={"./FR - France.svg"}
                    width={20}
                    height={15}
                    alt="france"
                    className="rounded-sm mr-2 "
                  />
                </div>
              </SelectItem>
              <SelectItem value="en-EN">
                <div className="flex items-center justify-center">
                  <Image
                    src={"./US - United States.svg"}
                    width={20}
                    height={15}
                    alt="us"
                    className="rounded-sm mr-2 "
                  />
                </div>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div> */}

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
          {routes
            .filter((link) => (isSignedIn ? true : !link.user))
            .map((item, i) => (
              <li
                key={i}
                className="list-none mb-3.5 opacity-1 transform translate(0px, 0px)"
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
        <div>
          <ul className="visible opacity-100 pl-8 pr-0 pt-2.5 pb-0">
            <ClerkLoading>
              <Loader
                color="#fff"
                className="h-5 w-5 text-muted-foreground animate-spin"
              />
            </ClerkLoading>
            <ClerkLoaded>
              <SignedIn>
                <UserButton />
              </SignedIn>
              <li className="mt-[18px]">
                <SignedOut>
                  <SignInButton>
                    <Button
                      variant={"link"}
                      className={"mr-7 text-xl bg-[none] text-[#FFFFFF99]"}
                    >
                      CONNEXION{" "}
                    </Button>
                  </SignInButton>
                </SignedOut>
              </li>

              <li className="mt-[18px]">
                <SignedOut>
                  <SignUpButton>
                    <Button
                      variant={"link"}
                      className={"mr-7 text-xl bg-[none] text-[#FFFFFF99]"}
                    >
                      INSCRIPTION{" "}
                    </Button>
                  </SignUpButton>
                </SignedOut>
              </li>
            </ClerkLoaded>
            {/* Sign Up and Log In Routes */}
          </ul>
        </div>
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
            <h1
              className={`text-[2rem] ${
                isMentorMode && "text-white"
              } tracking-[-4px] leading-[1.1] font-semibold`}
            >
              OGT
            </h1>
          </a>

          {/* Navigation Routes */}
          <div className="flex items-center ml w-full ml-20 justify-between">
            <ul className="list-none hidden relative ml-20 mb-1 min-[1030px]:flex">
              {/* Render navigation Routes */}
              {routes
                .filter((link) => (isSignedIn ? true : !link.user))
                .map((item, i) => (
                  <li key={i} className="mx-5 my-0">
                    <Link
                      className={`${
                        item.href === pathname
                          ? `${
                              isMentorMode
                                ? "text-white pl-1 border-l-2 border-slate-200"
                                : "text-[#0066F5] pl-1 border-l-2 border-[#0066F5]"
                            } outline-none uppercase font-bold text-sm cursor-pointer `
                          : `${
                              isMentorMode && "text-white"
                            } outline-none font-semibold uppercase text-sm cursor-pointer`
                      } transition hover:font-bold `}
                      href={item.href}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
            </ul>

            {/* {isSearchMode && (
              <div className="hidden md:block">
                <SearchInput />
              </div>
            )} */}

            {/* Render user info or login/signup links based on authentication status */}

            <div className=" justify-between hidden items-center min-[1030px]:flex">
              <ClerkLoading>
                <Loader
                  color="#0066f5"
                  className="h-5 w-5 text-muted-foreground animate-spin"
                />
              </ClerkLoading>
              <ClerkLoaded>
                <SignedIn>
                  <UserButton />
                </SignedIn>
                <SignedOut>
                  <SignInButton>
                    <Button
                      variant={"link"}
                      className={
                        "mr-7 text-sm bg-[none] text-[#0066f5] shadow-none  max-[980px]:hidden "
                      }
                    >
                      Connexion{" "}
                    </Button>
                  </SignInButton>
                </SignedOut>
                <SignedOut>
                  <SignUpButton>
                    <button className={"button_auth  max-[980px]:hidden "}>
                      Inscription
                    </button>
                  </SignUpButton>
                </SignedOut>

                {/* <div className="ml-4">
                  <Select>
                    <SelectTrigger className="w-[70px] outline-none">
                      <SelectValue
                        placeholder={<Languages className="h4 w-4" />}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="fr-FR">
                          <div className="flex items-center justify-center">
                            <Image
                              src={"./FR - France.svg"}
                              width={20}
                              height={15}
                              alt="france"
                              className="rounded-sm mr-2 "
                            />
                          </div>
                        </SelectItem>
                        <SelectItem value="en-EN">
                          <div className="flex items-center justify-center">
                            <Image
                              src={"./US - United States.svg"}
                              width={20}
                              height={15}
                              alt="us"
                              className="rounded-sm mr-2 "
                            />
                          </div>
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div> */}
              </ClerkLoaded>
            </div>
          </div>

          {/* Mobile Navigation Trigger */}
          <div className="block opacity-100 min-[1030px]:hidden min-[1030px]:opacity-0">
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
