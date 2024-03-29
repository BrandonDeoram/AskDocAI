"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth, UserButton } from "@clerk/nextjs";
import dynamic from "next/dynamic";
interface NavItem {
  label: string;
  link: string;
}

const navItems: NavItem[] = [
  { label: "Pricing", link: "/pricing" },
  { label: "Sign In", link: "/sign-in" },
  { label: "Get Started", link: "/get-started" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userId } = useAuth();
  const isAuth = !!userId;
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const DynamicUserButton = dynamic(
    () => import("@clerk/nextjs").then((mod) => mod.UserButton),
    {
      ssr: false, // Set ssr to false to ensure client-side rendering
    }
  );

  return (
    <nav
      className={`dark bg-transparent overflow-hidden items-center${
        isOpen ? "h-auto" : "h-16"
      } p-4`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href={"/"}>
          <div className="text-white font-bold text-xl  p-[.32rem] rounded-lg cursor-pointer hover:opacity-50 transition ease-linear">
            AskDocAi
          </div>
        </Link>

        <div className="lg:hidden" onClick={toggleMenu}>
          <svg
            className={`w-6 h-6 cursor-pointer ${
              isOpen ? "text-white" : "text-white"
            }`}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </div>

        <ul
          className={`flex lg:flex ${
            isOpen ? "block" : "hidden"
          } lg:items-center space-x-4 flex-row items-center `}
        >
          {isAuth ? (
            <>
              <li key="pricingkey123">
                <a
                  href="/pricing"
                  className="text-white hover:opacity-50 transition ease-linear"
                >
                  Pricing
                </a>
              </li>
              <li key="clerk">
                <DynamicUserButton afterSignOutUrl="/" />
              </li>
            </>
          ) : (
            navItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.link}
                  className={`text-white ${
                    index === navItems.length - 1
                      ? " p-2 rounded-lg hover:opacity-50 hover:text-white transition ease-linear font-medium"
                      : "hover:opacity-50 transition ease-linear"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
