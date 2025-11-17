"use client";

import { useState } from "react";
import YamlGenerator from "@/components/YamlGenerator";
import ZipBuilder from "@/components/ZipBuilder";
import DownloadButton from "@/components/DownloadButton";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { Footer } from "@/app/components/Footer";
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

export default function BranchBouncerPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [rules, setRules] = useState({
    accountAge: true,
    prChanges: true,
    repoCount: false,
    protectedPaths: false
  });

  const [values, setValues] = useState({
    accountAgeDays: 730,
    minChanges: 500,
    minRepos: 3,
    blockedPaths: "package.json, .github/workflows/"
  });

  const [zipBlob, setZipBlob] = useState<Blob | null>(null);

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Use GUI", link: "bouncer-generator" },
    { name: "Docs", link: "#about" },
  ];

  function toggleRule(rule: keyof typeof rules) {
    setRules(prev => ({ ...prev, [rule]: !prev[rule] }));
  }

  function updateValue(key: keyof typeof values, value: string | number) {
    setValues(prev => ({ ...prev, [key]: value }));
  }

  async function generateZip() {
    const { configYaml, workflowYaml } = YamlGenerator(rules, values);
    const blob = await ZipBuilder(configYaml, workflowYaml);
    setZipBlob(blob);
  }

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

      <div className="w-full bg-black antialiased bg-grid-white/[0.02] relative pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-4">
              Configure Your Rules
            </h1>
            <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
              Customize BranchBouncer protection rules for your repository
            </p>
          </div>

          <div className="space-y-6">
            {/* Account Age Rule */}
            <div className="p-6 rounded-lg border border-neutral-800 bg-neutral-900/50">
              <label className="flex items-center gap-4 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={rules.accountAge} 
                  onChange={() => toggleRule("accountAge")}
                  className="w-5 h-5 rounded border-neutral-600 bg-neutral-800 text-white focus:ring-2 focus:ring-neutral-500"
                />
                <div className="flex-1 flex flex-wrap items-center gap-3">
                  <span className="text-white font-medium">Account age &gt;</span>
                  <input 
                    type="number" 
                    value={values.accountAgeDays} 
                    onChange={(e) => updateValue("accountAgeDays", Number(e.target.value))}
                    disabled={!rules.accountAge}
                    className="w-24 px-3 py-2 rounded border border-neutral-700 bg-neutral-800 text-white disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-neutral-500"
                  />
                  <span className="text-neutral-300">days (≈ {Math.round(values.accountAgeDays / 365)} years)</span>
                </div>
              </label>
            </div>

            {/* PR Changes Rule */}
            <div className="p-6 rounded-lg border border-neutral-800 bg-neutral-900/50">
              <label className="flex items-center gap-4 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={rules.prChanges} 
                  onChange={() => toggleRule("prChanges")}
                  className="w-5 h-5 rounded border-neutral-600 bg-neutral-800 text-white focus:ring-2 focus:ring-neutral-500"
                />
                <div className="flex-1 flex flex-wrap items-center gap-3">
                  <span className="text-white font-medium">PR must have &gt;</span>
                  <input 
                    type="number" 
                    value={values.minChanges} 
                    onChange={(e) => updateValue("minChanges", Number(e.target.value))}
                    disabled={!rules.prChanges}
                    className="w-24 px-3 py-2 rounded border border-neutral-700 bg-neutral-800 text-white disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-neutral-500"
                  />
                  <span className="text-neutral-300">changes</span>
                </div>
              </label>
            </div>

            {/* Repo Count Rule */}
            <div className="p-6 rounded-lg border border-neutral-800 bg-neutral-900/50">
              <label className="flex items-center gap-4 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={rules.repoCount} 
                  onChange={() => toggleRule("repoCount")}
                  className="w-5 h-5 rounded border-neutral-600 bg-neutral-800 text-white focus:ring-2 focus:ring-neutral-500"
                />
                <div className="flex-1 flex flex-wrap items-center gap-3">
                  <span className="text-white font-medium">Contributor must have &gt;</span>
                  <input 
                    type="number" 
                    value={values.minRepos} 
                    onChange={(e) => updateValue("minRepos", Number(e.target.value))}
                    disabled={!rules.repoCount}
                    className="w-24 px-3 py-2 rounded border border-neutral-700 bg-neutral-800 text-white disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-neutral-500"
                  />
                  <span className="text-neutral-300">public repos</span>
                </div>
              </label>
            </div>

            {/* Protected Paths Rule */}
            <div className="p-6 rounded-lg border border-neutral-800 bg-neutral-900/50">
              <label className="flex items-start gap-4 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={rules.protectedPaths} 
                  onChange={() => toggleRule("protectedPaths")}
                  className="w-5 h-5 mt-1 rounded border-neutral-600 bg-neutral-800 text-white focus:ring-2 focus:ring-neutral-500"
                />
                <div className="flex-1 flex flex-col gap-3">
                  <span className="text-white font-medium">Block protected paths (comma-separated):</span>
                  <input 
                    type="text" 
                    value={values.blockedPaths} 
                    onChange={(e) => updateValue("blockedPaths", e.target.value)}
                    disabled={!rules.protectedPaths}
                    placeholder="e.g., package.json, .github/workflows/"
                    className="w-full px-4 py-2 rounded border border-neutral-700 bg-neutral-800 text-white placeholder-neutral-500 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-neutral-500"
                  />
                </div>
              </label>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center gap-6">
            <HoverBorderGradient
              as="button"
              className="text-white font-medium"
              onClick={generateZip}
            >
              Generate ZIP
            </HoverBorderGradient>

            {zipBlob && <DownloadButton blob={zipBlob} />}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
