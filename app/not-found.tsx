"use client";

import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { Spotlight } from "@/components/ui/spotlight-new";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarLogo,
  NavbarButton,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";

export default function NotFound() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Use GUI", link: "/bouncer-generator" },
    { name: "Docs", link: "#about" },
  ];

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-2">
            <NavbarButton href="https://github.com/SidhantCodes/branchbouncer" variant="primary">
              GitHub
            </NavbarButton>
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
          </MobileNavHeader>
          <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                className="text-neutral-600 dark:text-neutral-300"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      <div className="h-screen w-full bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <Spotlight />
        <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-32 md:pt-20 flex items-center justify-center h-full">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-9xl md:text-[12rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
              404
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-4 mb-6">
              Page Not Found
            </h2>
            <p className="mt-4 font-normal text-base md:text-lg text-neutral-300 max-w-lg mx-auto mb-8">
              Looks like this page got bounced! The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <HoverBorderGradient
                as="a"
                className="text-white font-medium"
                onClick={() => window.location.href = '/'}
              >
                Go Home
              </HoverBorderGradient>
              <HoverBorderGradient
                as="a"
                className="text-white font-medium"
                onClick={() => window.location.href = '/bouncer-generator'}
              >
                Try Generator
              </HoverBorderGradient>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
