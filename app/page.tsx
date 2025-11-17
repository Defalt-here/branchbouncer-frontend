"use client";

import { motion } from "framer-motion";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
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
import { EncryptedText } from "@/components/ui/encrypted-text";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Get started", link: "bouncer-generator" },
    { name: "Docs", link: "#about" },
  ];

  return (
    <div className="overflow-x-hidden">
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-2">
            <NavbarButton href="#" variant="secondary">
              Login
            </NavbarButton>
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
            <div className="flex flex-col gap-2 w-full">
              <NavbarButton href="#" variant="secondary">
                Login
              </NavbarButton>
              <NavbarButton href="#" variant="primary">
                Sign Up
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      <div className="h-screen w-full bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <Spotlight />
        <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-32 md:pt-20 flex items-center justify-center h-full">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
              BranchBouncer
            </h1>
            <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
              Select your rules, Generate your YAML, Commit. It&apos;s that simple
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center">
              <HoverBorderGradient
                as="a"
                className="text-white font-medium"
                onClick={() => window.location.href = '#'}
              >
                Documentation
              </HoverBorderGradient>
              <HoverBorderGradient
                as="a"
                className="text-white font-medium"
                onClick={() => window.location.href = 'bouncer-generator'}
              >
                Get Started
              </HoverBorderGradient>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-6 px-4">
        <motion.div className="relative mx-4 my-4 flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row max-w-full">
          <LayoutTextFlip
            text="Save your repo from "
            words={["Spam PRs", "Vandalism", "Fake Contributions", "Pranks"]}
          />
        </motion.div>
        <p className="text-white text-lg md:text-xl px-4 text-center max-w-4xl">
          Hey open source should be fun right?
        </p>
        <HoverBorderGradient
          as="a"
          containerClassName="mt-4"
          className="text-white font-medium"
          onClick={() => window.location.href = '#'}
        >
          Learn More
        </HoverBorderGradient>
      </div>

      <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center px-4">
        <div className="mx-auto max-w-4xl py-10 flex flex-col items-start gap-6">
          <EncryptedText
            text="Open source protection decoded."
            className="text-7xl md:text-5xl text-left"
            encryptedClassName="text-neutral-500"
            revealedClassName="text-white"
            revealDelayMs={50}
          />
          <p className="text-white text-left">BranchBouncer uses smart rules to protect your repository from spam and malicious pull requests. Configure age requirements, minimum contributions, and blocked paths and much more to keep your project secure.</p>
          <HoverBorderGradient
            as="a"
            containerClassName="mt-4"
            className="text-white"
            onClick={() => window.location.href = '#'}
          >
            Get Started
          </HoverBorderGradient>
        </div>
      </div>
    </div>
  );
}
