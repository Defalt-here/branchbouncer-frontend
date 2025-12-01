"use client";

import { useState } from "react";
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
import { Footer } from "@/app/components/Footer";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import { Snippet } from "@heroui/snippet";

interface DocSection {
  id: string;
  title: string;
  subsections?: { id: string; title: string }[];
}

const docSections: DocSection[] = [
  {
    id: "introduction",
    title: "Introduction",
    subsections: [
      { id: "what-is-branchbouncer", title: "What is BranchBouncer?" },
      { id: "how-it-works", title: "How It Works" },
    ],
  },
  {
    id: "getting-started",
    title: "Getting Started",
    subsections: [
      { id: "installation", title: "Installation" },
      { id: "quick-setup", title: "Quick Setup" },
      { id: "configuration", title: "Configuration" },
    ],
  },
  {
    id: "commands",
    title: "Commands",
    subsections: [
      { id: "init", title: "init" },
      { id: "protect", title: "protect" },
      { id: "remove-protection", title: "remove-protection" },
      { id: "extra", title: "extra" },
      { id: "help", title: "help" },
    ],
  },
  {
    id: "rules",
    title: "Rules",
    subsections: [
      { id: "account-age", title: "Account Age" },
      { id: "pr-changes", title: "PR Changes" },
      { id: "repository-count", title: "Repository Count" },
      { id: "protected-paths", title: "Protected Paths" },
    ],
  },
  {
    id: "api-reference",
    title: "API Reference",
  },
  {
    id: "contributing",
    title: "Contributing",
  },
];

export default function DocsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("introduction");
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "introduction",
  ]);

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Use GUI", link: "/bouncer-generator" },
    { name: "Docs", link: "/docs" },
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <div className="min-h-screen bg-black overflow-x-hidden flex flex-col">
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-2">
            <NavbarButton
              href="https://github.com/SidhantCodes/branchbouncer"
              variant="primary"
            >
              GitHub
            </NavbarButton>
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isOpen}
              onClick={() => setIsOpen(!isOpen)}
            />
          </MobileNavHeader>
          <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                className="text-white"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      <div className="flex pt-20 flex-1 px-48">
        {/* Mobile Sidebar Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed bottom-6 right-6 z-50 bg-white text-black rounded-full p-4 shadow-lg hover:bg-neutral-200 transition-colors"
          aria-label="Toggle sidebar"
        >
          <IconChevronRight className={`w-6 h-6 transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Sidebar Overlay for Mobile */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          w-64 fixed h-screen bg-neutral-950/50 border-r border-neutral-800 overflow-y-auto z-40 transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:z-10
        `}>
          <div className="p-6">
            <h2 className="text-white font-bold text-lg mb-4">Documentation</h2>
            <nav className="space-y-1">
              {docSections.map((section) => (
                <div key={section.id}>
                  <button
                    onClick={() => {
                      setActiveSection(section.id);
                      if (section.subsections) {
                        toggleSection(section.id);
                      } else {
                        setSidebarOpen(false);
                      }
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded text-sm transition-colors ${
                      activeSection === section.id
                        ? "bg-neutral-800 text-white"
                        : "text-neutral-400 hover:text-white hover:bg-neutral-900"
                    }`}
                  >
                    <span>{section.title}</span>
                    {section.subsections &&
                      (expandedSections.includes(section.id) ? (
                        <IconChevronDown className="w-4 h-4" />
                      ) : (
                        <IconChevronRight className="w-4 h-4" />
                      ))}
                  </button>
                  {section.subsections &&
                    expandedSections.includes(section.id) && (
                      <div className="ml-4 mt-1 space-y-1">
                        {section.subsections.map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() => {
                              setActiveSection(sub.id);
                              setSidebarOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                              activeSection === sub.id
                                ? "bg-neutral-800 text-white"
                                : "text-neutral-400 hover:text-white hover:bg-neutral-900"
                            }`}
                          >
                            {sub.title}
                          </button>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 px-4 md:px-8 py-8 max-w-4xl w-full">
          <div className="prose prose-invert max-w-none">
            {/* Introduction */}
            {activeSection === "introduction" && (
              <div className="space-y-6">
                <h1 className="text-4xl font-bold text-white mb-6">
                  Introduction
                </h1>
                <p className="text-neutral-300 text-lg">
                  Welcome to BranchBouncer documentation. Learn how to protect
                  your repository from spam and malicious pull requests.
                </p>
              </div>
            )}

            {activeSection === "what-is-branchbouncer" && (
              <div className="space-y-6">
                <h1 className="text-4xl font-bold text-white mb-6">
                  What is BranchBouncer?
                </h1>
                <p className="text-neutral-300 text-lg leading-relaxed">
                  BranchBouncer is a powerful, automated GitHub Action designed to protect your
                  open-source repository from spam, vandalism, and low-quality
                  pull requests. In the modern open-source ecosystem, maintaining repository integrity has become increasingly challenging as projects grow in popularity. BranchBouncer acts as your first line of defense, automatically validating contributors and their pull requests against customizable rules before they can merge into your codebase.
                </p>
                <p className="text-neutral-300 leading-relaxed">
                  Unlike manual code review processes that can be time-consuming and error-prone, BranchBouncer operates 24/7, providing instant feedback to contributors while protecting your repository from common attack vectors such as fake contributions, massive file changes, and suspicious account activity. The tool integrates seamlessly with your existing GitHub workflow, requiring minimal setup and zero ongoing maintenance.
                </p>
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 my-6">
                  <h3 className="text-white font-semibold mb-4 text-xl">Key Features</h3>
                  <ul className="space-y-3 text-neutral-300">
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">✓</span>
                      <div>
                        <strong className="text-white">Account Age Verification:</strong> Ensure contributors have established GitHub accounts, preventing spam from newly created fake profiles
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">✓</span>
                      <div>
                        <strong className="text-white">PR Change Size Limits:</strong> Block excessively large pull requests that are difficult to review and may hide malicious code
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">✓</span>
                      <div>
                        <strong className="text-white">Repository Count Requirements:</strong> Verify that contributors have genuine GitHub activity and aren&apos;t just spam accounts
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">✓</span>
                      <div>
                        <strong className="text-white">Protected Path Blocking:</strong> Safeguard critical files like package.json, workflows, and environment configurations from unauthorized changes
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">✓</span>
                      <div>
                        <strong className="text-white">Zero Maintenance After Setup:</strong> Once configured, BranchBouncer runs automatically without any required intervention
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-6">
                  <h3 className="text-blue-400 font-semibold mb-3">💡 Why BranchBouncer?</h3>
                  <p className="text-neutral-300 leading-relaxed">
                    Open-source maintainers face increasing challenges from spam PRs, fake contributions for profile padding, and malicious actors. BranchBouncer was built to address these exact problems, giving you peace of mind knowing your repository is protected around the clock without adding to your maintenance burden.
                  </p>
                </div>
              </div>
            )}

            {activeSection === "how-it-works" && (
              <div className="space-y-6">
                <h1 className="text-4xl font-bold text-white mb-6">
                  How It Works
                </h1>
                <p className="text-neutral-300">
                  BranchBouncer operates as a GitHub Actions workflow that
                  triggers on pull request events. Here&apos;s the flow:
                </p>
                <div className="space-y-4 mt-6">
                  <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center font-bold">
                        1
                      </div>
                      <div className="text-neutral-300">
                        <strong className="text-white">PR Created:</strong> A
                        contributor opens a pull request
                      </div>
                    </div>
                  </div>
                  <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center font-bold">
                        2
                      </div>
                      <div className="text-neutral-300">
                        <strong className="text-white">Rules Check:</strong>{" "}
                        BranchBouncer validates against your rules
                      </div>
                    </div>
                  </div>
                  <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center font-bold">
                        3
                      </div>
                      <div className="text-neutral-300">
                        <strong className="text-white">Result:</strong> PR is
                        blocked or approved with clear feedback
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Getting Started */}
            {activeSection === "getting-started" && (
              <div className="space-y-6">
                <h1 className="text-4xl font-bold text-white mb-6">
                  Getting Started
                </h1>
                <p className="text-neutral-300 text-lg">
                  Get BranchBouncer up and running in your repository in under 2
                  minutes.
                </p>
              </div>
            )}

            {activeSection === "installation" && (
              <div className="space-y-6">
                <h1 className="text-4xl font-bold text-white mb-6">
                  Installation
                </h1>
                <p className="text-neutral-300 text-lg leading-relaxed">
                  BranchBouncer is distributed as an npm package and can be installed using npx, with no global installation required. This makes it incredibly easy to get started - you don&apos;t need to install anything permanently on your system. Simply run the command and you&apos;re ready to go.
                </p>
                <p className="text-neutral-300 leading-relaxed">
                  The package is hosted on the official npm registry, ensuring reliable availability and automatic version management. Each time you run the command, npm will fetch the latest version (unless you specify otherwise), so you&apos;re always using the most up-to-date features and security fixes.
                </p>
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 my-6">
                  <h3 className="text-white font-semibold mb-4 text-xl">Quick Install</h3>
                  <Snippet
                    symbol="$"
                    color="default"
                    variant="bordered"
                    classNames={{
                      base: "bg-black border-neutral-700 w-full",
                      pre: "text-white font-mono text-sm",
                      copyButton: "!text-white !bg-neutral-800 hover:!bg-neutral-700 !opacity-100"
                    }}
                  >
                    npx branchbouncer@latest init
                  </Snippet>
                  <p className="text-neutral-400 text-sm mt-3">
                    This command will guide you through an interactive setup process.
                  </p>
                </div>
                <div className="flex gap-4 mt-6">
                  <a
                    href="https://www.npmjs.com/package/branchbouncer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 256 256" fill="currentColor">
                      <path d="M0 256V0h256v256H0z"/>
                      <path fill="#C12127" d="M48 48h160v160h-32V80h-48v128H48V48z"/>
                    </svg>
                    View on npm Registry
                  </a>
                  <a
                    href="https://github.com/SidhantCodes/branchbouncer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold rounded-lg border border-neutral-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    View on GitHub
                  </a>
                </div>
              </div>
            )}

            {activeSection === "quick-setup" && (
              <div className="space-y-6">
                <h1 className="text-4xl font-bold text-white mb-6">
                  Quick Setup
                </h1>
                <p className="text-neutral-300">
                  Follow these steps to set up BranchBouncer:
                </p>
                <ol className="space-y-4 text-neutral-300 list-decimal list-inside mt-4">
                  <li>Navigate to your repository root directory</li>
                  <li>Run <code className="bg-neutral-800 px-2 py-1 rounded">npx branchbouncer</code></li>
                  <li>Select the rules you want to enable</li>
                  <li>Configure rule parameters (age limits, change thresholds, etc.)</li>
                  <li>Review generated configuration</li>
                  <li>Commit the generated files to your repository</li>
                  <li>Push to GitHub and you&apos;re protected!</li>
                </ol>
              </div>
            )}

            {activeSection === "configuration" && (
              <div className="space-y-6">
                <h1 className="text-4xl font-bold text-white mb-6">
                  Configuration
                </h1>
                <p className="text-neutral-300">
                  BranchBouncer generates two files in your repository:
                </p>
                <div className="space-y-4 mt-6">
                  <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
                    <h3 className="text-white font-semibold mb-2">
                      .github/branchbouncer.yml
                    </h3>
                    <p className="text-neutral-400 text-sm">
                      Contains your rule configuration and parameters
                    </p>
                  </div>
                  <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
                    <h3 className="text-white font-semibold mb-2">
                      .github/workflows/branchbouncer.yml
                    </h3>
                    <p className="text-neutral-400 text-sm">
                      GitHub Actions workflow that runs the checks
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Commands */}
            {activeSection === "commands" && (
              <div className="space-y-6">
                <h1 className="text-4xl font-bold text-white mb-6">Commands</h1>
                <p className="text-neutral-300 text-lg">
                  BranchBouncer CLI commands and their usage.
                </p>
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 my-6">
                  <h3 className="text-white font-semibold mb-4">Usage</h3>
                  <pre className="text-neutral-300 text-sm">
                    {`branchbouncer [command]`}
                  </pre>
                </div>
                <div className="space-y-4 mt-6">
                  <h3 className="text-white font-semibold">Available Commands:</h3>
                  <ul className="space-y-2 text-neutral-300">
                    <li><code className="bg-neutral-800 px-2 py-1 rounded">init</code> - Set up BranchBouncer configuration</li>
                    <li><code className="bg-neutral-800 px-2 py-1 rounded">protect</code> - Enable hard mode branch protection</li>
                    <li><code className="bg-neutral-800 px-2 py-1 rounded">remove-protection</code> - Remove all BranchBouncer files</li>
                    <li><code className="bg-neutral-800 px-2 py-1 rounded">extra</code> - Checkout paintnclick.art</li>
                    <li><code className="bg-neutral-800 px-2 py-1 rounded">help</code> - Show help message</li>
                  </ul>
                </div>
              </div>
            )}

            {activeSection === "init" && (
              <div className="space-y-6">
                <h1 className="text-4xl font-bold text-white mb-6">init Command</h1>
                <p className="text-neutral-300 text-lg leading-relaxed">
                  The <code className="bg-neutral-800 px-2 py-1 rounded">init</code> command is the primary way to set up BranchBouncer in your repository. This is the default command that runs when you execute <code className="bg-neutral-800 px-2 py-1 rounded">branchbouncer</code> without any arguments. It provides an interactive, user-friendly setup process that guides you through configuring all protection rules for your repository.
                </p>
                <p className="text-neutral-300 leading-relaxed">
                  During initialization, you&apos;ll be presented with a series of prompts asking which rules you want to enable and what parameters to set for each rule. The CLI validates your input in real-time and provides helpful suggestions based on best practices from thousands of open-source projects. Once complete, it generates all necessary configuration files and workflows, ready to be committed to your repository.
                </p>
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 my-6">
                  <h3 className="text-white font-semibold mb-4 text-xl">Usage Syntax</h3>
                  <div className="space-y-3">
                    <Snippet
                      symbol="$"
                      color="default"
                      variant="bordered"
                      classNames={{
                        base: "bg-black border-neutral-700 w-full",
                        pre: "text-white font-mono",
                        copyButton: "!text-white !bg-neutral-800 hover:!bg-neutral-700 !opacity-100"
                      }}
                    >
                      branchbouncer init
                    </Snippet>
                    <Snippet
                      symbol="$"
                      color="default"
                      variant="bordered"
                      classNames={{
                        base: "bg-black border-neutral-700 w-full",
                        pre: "text-white font-mono",
                        copyButton: "!text-white !bg-neutral-800 hover:!bg-neutral-700 !opacity-100"
                      }}
                    >
                      branchbouncer -i
                    </Snippet>
                    <Snippet
                      symbol="$"
                      color="default"
                      variant="bordered"
                      classNames={{
                        base: "bg-black border-neutral-700 w-full",
                        pre: "text-white font-mono",
                        copyButton: "!text-white !bg-neutral-800 hover:!bg-neutral-700 !opacity-100"
                      }}
                    >
                      branchbouncer --init
                    </Snippet>
                    <Snippet
                      symbol="$"
                      color="default"
                      variant="bordered"
                      classNames={{
                        base: "bg-black border-neutral-700 w-full",
                        pre: "text-white font-mono",
                        copyButton: "!text-white !bg-neutral-800 hover:!bg-neutral-700 !opacity-100"
                      }}
                    >
                      branchbouncer
                    </Snippet>
                    <p className="text-neutral-400 text-sm mt-2"># All commands above perform the same initialization</p>
                  </div>
                </div>
                <h3 className="text-white font-semibold mt-8 text-xl">Practical Examples</h3>
                <div className="space-y-4 mt-4">
                  <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-5">
                    <h4 className="text-white font-medium mb-3">Example 1: Basic Setup</h4>
                    <Snippet
                      symbol="$"
                      color="default"
                      variant="bordered"
                      classNames={{
                        base: "bg-black border-neutral-700 w-full",
                        pre: "text-white font-mono text-sm",
                        copyButton: "!text-white !bg-neutral-800 hover:!bg-neutral-700 !opacity-100"
                      }}
                    >
                      npx branchbouncer
                    </Snippet>
                    <p className="text-neutral-400 text-sm mt-3">
                      Run the default initialization process with interactive prompts. Perfect for first-time setup.
                    </p>
                  </div>
                  <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-5">
                    <h4 className="text-white font-medium mb-3">Example 2: Using Short Alias</h4>
                    <Snippet
                      symbol="$"
                      color="default"
                      variant="bordered"
                      classNames={{
                        base: "bg-black border-neutral-700 w-full",
                        pre: "text-white font-mono text-sm",
                        copyButton: "!text-white !bg-neutral-800 hover:!bg-neutral-700 !opacity-100"
                      }}
                    >
                      npx branchbouncer -i
                    </Snippet>
                    <p className="text-neutral-400 text-sm mt-3">
                      Identical to the default command but using the short <code className="bg-neutral-800 px-1 py-0.5 rounded text-xs">-i</code> flag. Useful for scripts or quick setups.
                    </p>
                  </div>
                  <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-5">
                    <h4 className="text-white font-medium mb-3">Example 3: Explicit Init Command</h4>
                    <Snippet
                      symbol="$"
                      color="default"
                      variant="bordered"
                      classNames={{
                        base: "bg-black border-neutral-700 w-full",
                        pre: "text-white font-mono text-sm",
                        copyButton: "!text-white !bg-neutral-800 hover:!bg-neutral-700 !opacity-100"
                      }}
                    >
                      npx branchbouncer init
                    </Snippet>
                    <p className="text-neutral-400 text-sm mt-3">
                      Explicitly call the init command for better readability in documentation or team setups.
                    </p>
                  </div>
                </div>
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 mt-8">
                  <h3 className="text-white font-semibold mb-4 text-xl">What This Command Does</h3>
                  <ul className="space-y-4 text-neutral-300">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">1.</span>
                      <div>
                        <strong className="text-white">Creates Configuration File:</strong> Generates <code className="bg-neutral-800 px-2 py-1 rounded">.github/branchbouncer.yml</code> with your selected rules and parameters. This file is the single source of truth for all BranchBouncer settings.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">2.</span>
                      <div>
                        <strong className="text-white">Generates Workflow:</strong> Creates <code className="bg-neutral-800 px-2 py-1 rounded">.github/workflows/branchbouncer.yml</code> which contains the GitHub Actions workflow definition. This workflow automatically triggers on every pull request.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">3.</span>
                      <div>
                        <strong className="text-white">Interactive Rule Selection:</strong> Guides you through choosing which protection rules to enable (account age, PR changes, repository count, protected paths).
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">4.</span>
                      <div>
                        <strong className="text-white">Parameter Configuration:</strong> Helps you set appropriate thresholds for each rule based on your repository&apos;s needs and community size.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">5.</span>
                      <div>
                        <strong className="text-white">Validation & Preview:</strong> Shows you a preview of the generated configuration and validates all settings before writing files.
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="bg-green-900/20 border border-green-800 rounded-lg p-6 mt-6">
                  <h3 className="text-green-400 font-semibold mb-3">✅ Next Steps After Init</h3>
                  <ol className="space-y-2 text-neutral-300 list-decimal list-inside">
                    <li>Review the generated files in <code className="bg-neutral-800 px-2 py-1 rounded">.github/</code></li>
                    <li>Commit both files to your repository: <code className="bg-neutral-800 px-2 py-1 rounded">git add .github/ &amp;&amp; git commit -m &quot;Add BranchBouncer&quot;</code></li>
                    <li>Push to GitHub: <code className="bg-neutral-800 px-2 py-1 rounded">git push</code></li>
                    <li>Your repository is now protected! The workflow will run on all future pull requests.</li>
                  </ol>
                </div>
              </div>
            )}

            {activeSection === "protect" && (
              <div className="space-y-6">
                <h1 className="text-4xl font-bold text-white mb-6">protect Command</h1>
                <p className="text-neutral-300 text-lg leading-relaxed">
                  The <code className="bg-neutral-800 px-2 py-1 rounded">protect</code> command enables GitHub&apos;s native branch protection rules in &quot;hard mode&quot;. This adds an additional layer of security on top of BranchBouncer&apos;s automated checks by configuring GitHub&apos;s branch protection settings directly. While BranchBouncer handles PR validation through workflows, this command enforces repository-level protections that prevent direct pushes and require status checks to pass.
                </p>
                <p className="text-neutral-300 leading-relaxed">
                  This is particularly useful for repositories that need enterprise-grade protection. The command configures settings like requiring pull request reviews, enforcing status checks, restricting who can push to protected branches, and more. It&apos;s recommended to run this command after the initial setup to maximize your repository&apos;s security posture.
                </p>
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 my-6">
                  <h3 className="text-white font-semibold mb-4 text-xl">Usage Syntax</h3>
                  <div className="space-y-3">
                    <Snippet
                      symbol="$"
                      color="default"
                      variant="bordered"
                      classNames={{
                        base: "bg-black border-neutral-700 w-full",
                        pre: "text-white font-mono",
                        copyButton: "!text-white !bg-neutral-800 hover:!bg-neutral-700 !opacity-100"
                      }}
                    >
                      branchbouncer protect
                    </Snippet>
                    <Snippet
                      symbol="$"
                      color="default"
                      variant="bordered"
                      classNames={{
                        base: "bg-black border-neutral-700 w-full",
                        pre: "text-white font-mono",
                        copyButton: "!text-white !bg-neutral-800 hover:!bg-neutral-700 !opacity-100"
                      }}
                    >
                      branchbouncer -p
                    </Snippet>
                    <Snippet
                      symbol="$"
                      color="default"
                      variant="bordered"
                      classNames={{
                        base: "bg-black border-neutral-700 w-full",
                        pre: "text-white font-mono",
                        copyButton: "!text-white !bg-neutral-800 hover:!bg-neutral-700 !opacity-100"
                      }}
                    >
                      branchbouncer --protect
                    </Snippet>
                  </div>
                </div>
                <h3 className="text-white font-semibold mt-8 text-xl">Practical Examples</h3>
                <div className="space-y-4 mt-4">
                  <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-5">
                    <h4 className="text-white font-medium mb-3">Example 1: Enable Protection</h4>
                    <Snippet
                      symbol="$"
                      color="default"
                      variant="bordered"
                      classNames={{
                        base: "bg-black border-neutral-700 w-full",
                        pre: "text-white font-mono text-sm",
                        copyButton: "!text-white !bg-neutral-800 hover:!bg-neutral-700 !opacity-100"
                      }}
                    >
                      npx branchbouncer protect
                    </Snippet>
                    <p className="text-neutral-400 text-sm mt-3">
                      Enable full branch protection on your default branch (usually main or master). Requires GitHub authentication.
                    </p>
                  </div>
                  <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-5">
                    <h4 className="text-white font-medium mb-3">Example 2: Quick Protection Setup</h4>
                    <Snippet
                      symbol="$"
                      color="default"
                      variant="bordered"
                      classNames={{
                        base: "bg-black border-neutral-700 w-full",
                        pre: "text-white font-mono text-sm",
                        copyButton: "!text-white !bg-neutral-800 hover:!bg-neutral-700 !opacity-100"
                      }}
                    >
                      npx branchbouncer -p
                    </Snippet>
                    <p className="text-neutral-400 text-sm mt-3">
                      Same as above but using the short <code className="bg-neutral-800 px-1 py-0.5 rounded text-xs">-p</code> flag. Perfect for scripts or CI/CD pipelines.
                    </p>
                  </div>
                </div>
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 mt-8">
                  <h3 className="text-white font-semibold mb-4 text-xl">What This Command Configures</h3>
                  <ul className="space-y-4 text-neutral-300">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <div>
                        <strong className="text-white">Require Pull Request Reviews:</strong> Enforces that all changes must go through a pull request and cannot be pushed directly to the protected branch.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <div>
                        <strong className="text-white">Require Status Checks:</strong> Makes BranchBouncer&apos;s workflow checks mandatory before merging, preventing bypass of protection rules.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <div>
                        <strong className="text-white">Restrict Push Access:</strong> Limits who can push to protected branches, typically requiring administrator privileges.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <div>
                        <strong className="text-white">Require Linear History:</strong> Prevents merge commits from cluttering your git history, encouraging a clean commit timeline.
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="bg-yellow-900/20 border border-yellow-800 rounded-lg p-6 mt-6">
                  <h3 className="text-yellow-400 font-semibold mb-3">⚠️ Important Requirements</h3>
                  <ul className="space-y-3 text-neutral-300">
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-400">→</span>
                      <div>
                        <strong className="text-white">GitHub Authentication:</strong> You must be authenticated with GitHub and have a valid access token with repository admin permissions.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-400">→</span>
                      <div>
                        <strong className="text-white">Repository Permissions:</strong> Requires admin or owner access to the repository to modify branch protection rules.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-400">→</span>
                      <div>
                        <strong className="text-white">Default Branch:</strong> The command automatically detects and protects your repository&apos;s default branch (main/master).
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeSection === "remove-protection" && (
              <div className="space-y-6">
                <h1 className="text-4xl font-bold text-white mb-6">remove-protection Command</h1>
                <p className="text-neutral-300 text-lg leading-relaxed">
                  The <code className="bg-neutral-800 px-2 py-1 rounded">remove-protection</code> command completely removes all BranchBouncer files and configuration from your repository. This is useful when you want to temporarily disable protection, migrate to a different solution, or clean up after testing. The command will safely delete both the configuration file and the GitHub Actions workflow, leaving your repository in a clean state.
                </p>
                <p className="text-neutral-300 leading-relaxed">
                  After running this command, you&apos;ll need to commit the changes to actually remove the protection from your repository. Until you commit and push, the files still exist locally and the protection remains active on GitHub. This two-step process prevents accidental removal and gives you a chance to review the changes before making them permanent.
                </p>
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 my-6">
                  <h3 className="text-white font-semibold mb-4 text-xl">Usage Syntax</h3>
                  <div className="space-y-3">
                    <Snippet
                      symbol="$"
                      color="default"
                      variant="bordered"
                      classNames={{
                        base: "bg-black border-neutral-700 w-full",
                        pre: "text-white font-mono",
                        copyButton: "!text-white !bg-neutral-800 hover:!bg-neutral-700 !opacity-100"
                      }}
                    >
                      branchbouncer remove-protection
                    </Snippet>
                    <Snippet
                      symbol="$"
                      color="default"
                      variant="bordered"
                      classNames={{
                        base: "bg-black border-neutral-700 w-full",
                        pre: "text-white font-mono",
                        copyButton: "!text-white !bg-neutral-800 hover:!bg-neutral-700 !opacity-100"
                      }}
                    >
                      branchbouncer -rm
                    </Snippet>
                    <Snippet
                      symbol="$"
                      color="default"
                      variant="bordered"
                      classNames={{
                        base: "bg-black border-neutral-700 w-full",
                        pre: "text-white font-mono",
                        copyButton: "!text-white !bg-neutral-800 hover:!bg-neutral-700 !opacity-100"
                      }}
                    >
                      branchbouncer --remove-protection
                    </Snippet>
                  </div>
                </div>
                <h3 className="text-white font-semibold mt-8 text-xl">Practical Examples</h3>
                <div className="space-y-4 mt-4">
                  <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-5">
                    <h4 className="text-white font-medium mb-3">Example 1: Complete Removal</h4>
                    <Snippet
                      symbol="$"
                      color="default"
                      variant="bordered"
                      classNames={{
                        base: "bg-black border-neutral-700 w-full",
                        pre: "text-white font-mono text-sm",
                        copyButton: "!text-white !bg-neutral-800 hover:!bg-neutral-700 !opacity-100"
                      }}
                    >
                      npx branchbouncer remove-protection
                    </Snippet>
                    <p className="text-neutral-400 text-sm mt-3">
                      Remove all BranchBouncer files from your repository. You&apos;ll need to commit the changes afterward.
                    </p>
                  </div>
                  <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-5">
                    <h4 className="text-white font-medium mb-3">Example 2: Quick Removal</h4>
                    <Snippet
                      symbol="$"
                      color="default"
                      variant="bordered"
                      classNames={{
                        base: "bg-black border-neutral-700 w-full",
                        pre: "text-white font-mono text-sm",
                        copyButton: "!text-white !bg-neutral-800 hover:!bg-neutral-700 !opacity-100"
                      }}
                    >
                      npx branchbouncer -rm
                    </Snippet>
                    <p className="text-neutral-400 text-sm mt-3">
                      Same removal using the short <code className="bg-neutral-800 px-1 py-0.5 rounded text-xs">-rm</code> alias. Faster to type.
                    </p>
                  </div>
                  <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-5">
                    <h4 className="text-white font-medium mb-3">Example 3: Complete Workflow</h4>
                    <div className="space-y-2">
                      <Snippet
                        symbol="$"
                        color="default"
                        variant="bordered"
                        classNames={{
                          base: "bg-black border-neutral-700 w-full",
                          pre: "text-white font-mono text-sm",
                          copyButton: "!text-white !bg-neutral-800 hover:!bg-neutral-700 !opacity-100"
                        }}
                      >
                        npx branchbouncer -rm
                      </Snippet>
                      <Snippet
                        symbol="$"
                        color="default"
                        variant="bordered"
                        classNames={{
                          base: "bg-black border-neutral-700 w-full",
                          pre: "text-white font-mono text-sm",
                          copyButton: "!text-white !bg-neutral-800 hover:!bg-neutral-700 !opacity-100"
                        }}
                      >
                        git add .github/
                      </Snippet>
                      <Snippet
                        symbol="$"
                        color="default"
                        variant="bordered"
                        classNames={{
                          base: "bg-black border-neutral-700 w-full",
                          pre: "text-white font-mono text-sm",
                          copyButton: "!text-white !bg-neutral-800 hover:!bg-neutral-700 !opacity-100"
                        }}
                      >
                        git commit -m &quot;Remove BranchBouncer&quot;
                      </Snippet>
                      <Snippet
                        symbol="$"
                        color="default"
                        variant="bordered"
                        classNames={{
                          base: "bg-black border-neutral-700 w-full",
                          pre: "text-white font-mono text-sm",
                          copyButton: "!text-white !bg-neutral-800 hover:!bg-neutral-700 !opacity-100"
                        }}
                      >
                        git push
                      </Snippet>
                    </div>
                    <p className="text-neutral-400 text-sm mt-3">
                      Full workflow: remove files, stage changes, commit, and push to GitHub to complete the removal.
                    </p>
                  </div>
                </div>
                <div className="bg-red-900/20 border border-red-800 rounded-lg p-6 mt-8">
                  <h3 className="text-red-400 font-semibold mb-3 text-xl">⚠️ Warning: Permanent Deletion</h3>
                  <p className="text-neutral-300 mb-4 leading-relaxed">
                    This command will permanently delete the following files from your repository:
                  </p>
                  <ul className="space-y-3 text-neutral-300">
                    <li className="flex items-start gap-3">
                      <span className="text-red-400">✕</span>
                      <div>
                        <code className="bg-neutral-800 px-2 py-1 rounded">.github/branchbouncer.yml</code> - Your configuration file with all rule settings
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400">✕</span>
                      <div>
                        <code className="bg-neutral-800 px-2 py-1 rounded">.github/workflows/branchbouncer.yml</code> - The GitHub Actions workflow definition
                      </div>
                    </li>
                  </ul>
                  <p className="text-neutral-300 mt-4 leading-relaxed">
                    <strong className="text-white">Important:</strong> Once you commit and push these changes, your repository will no longer be protected by BranchBouncer. Make sure this is what you want before proceeding. If you&apos;re unsure, consider backing up the configuration files first.
                  </p>
                </div>
                <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-6 mt-6">
                  <h3 className="text-blue-400 font-semibold mb-3">💡 Alternative: Disable Instead of Remove</h3>
                  <p className="text-neutral-300 leading-relaxed">
                    If you want to temporarily disable BranchBouncer without removing the files, you can simply disable the workflow in your GitHub repository settings under Actions. This preserves your configuration for easy re-enabling later.
                  </p>
                </div>
              </div>
            )}

            {activeSection === "extra" && (
              <div className="space-y-6">
                <h1 className="text-4xl font-bold text-white mb-6">extra Command</h1>
                <p className="text-neutral-300 text-lg leading-relaxed">
                  The <code className="bg-neutral-800 px-2 py-1 rounded">extra</code> command is a fun Easter egg feature that directs you to <strong className="text-white">paintnclick.art</strong>, a creative web project. This is a lighthearted addition to BranchBouncer that showcases the personality behind the tool. While it doesn&apos;t affect your repository protection, it&apos;s a nice way to discover other projects from the BranchBouncer team.
                </p>
                <p className="text-neutral-300 leading-relaxed">
                  Think of it as a bonus feature - it won&apos;t configure anything in your repository or make any changes to your files. It&apos;s simply there for those curious developers who like to explore all the options!
                </p>
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 my-6">
                  <h3 className="text-white font-semibold mb-4 text-xl">Usage Syntax</h3>
                  <Snippet
                    symbol="$"
                    color="default"
                    variant="bordered"
                    classNames={{
                      base: "bg-black border-neutral-700 w-full",
                      pre: "text-white font-mono",
                      copyButton: "!text-white !bg-neutral-800 hover:!bg-neutral-700 !opacity-100"
                    }}
                  >
                    branchbouncer extra
                  </Snippet>
                </div>
                <h3 className="text-white font-semibold mt-8 text-xl">Example</h3>
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-5 mt-4">
                  <Snippet
                    symbol="$"
                    color="default"
                    variant="bordered"
                    classNames={{
                      base: "bg-black border-neutral-700 w-full",
                      pre: "text-white font-mono text-sm",
                      copyButton: "!text-white !bg-neutral-800 hover:!bg-neutral-700 !opacity-100"
                    }}
                  >
                    npx branchbouncer extra
                  </Snippet>
                  <p className="text-neutral-400 text-sm mt-3">
                    Discover paintnclick.art - a creative side project from the BranchBouncer team!
                  </p>
                </div>
                <div className="bg-purple-900/20 border border-purple-800 rounded-lg p-6 mt-8">
                  <h3 className="text-purple-400 font-semibold mb-3">🎨 What is paintnclick.art?</h3>
                  <p className="text-neutral-300 leading-relaxed">
                    paintnclick.art is an interactive web experience that combines art and technology. It&apos;s one of the creative projects built by the same developers who created BranchBouncer. Check it out to see what else we&apos;ve been working on!
                  </p>
                </div>
              </div>
            )}

            {activeSection === "help" && (
              <div className="space-y-6">
                <h1 className="text-4xl font-bold text-white mb-6">help Command</h1>
                <p className="text-neutral-300 text-lg leading-relaxed">
                  The <code className="bg-neutral-800 px-2 py-1 rounded">help</code> command displays comprehensive help information showing all available commands, their aliases, and usage patterns. This is your quick reference guide when you need to remember command syntax or discover what BranchBouncer can do. The help output is formatted for easy readability directly in your terminal.
                </p>
                <p className="text-neutral-300 leading-relaxed">
                  You can call the help command anytime you need a refresher on the available options. It&apos;s particularly useful when you&apos;re introducing BranchBouncer to new team members or when you haven&apos;t used the CLI in a while and need to jog your memory.
                </p>
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 my-6">
                  <h3 className="text-white font-semibold mb-4 text-xl">Usage Syntax</h3>
                  <div className="space-y-3">
                    <Snippet
                      symbol="$"
                      color="default"
                      variant="bordered"
                      classNames={{
                        base: "bg-black border-neutral-700 w-full",
                        pre: "text-white font-mono",
                        copyButton: "!text-white !bg-neutral-800 hover:!bg-neutral-700 !opacity-100"
                      }}
                    >
                      branchbouncer help
                    </Snippet>
                    <Snippet
                      symbol="$"
                      color="default"
                      variant="bordered"
                      classNames={{
                        base: "bg-black border-neutral-700 w-full",
                        pre: "text-white font-mono",
                        copyButton: "!text-white !bg-neutral-800 hover:!bg-neutral-700 !opacity-100"
                      }}
                    >
                      branchbouncer -h
                    </Snippet>
                    <Snippet
                      symbol="$"
                      color="default"
                      variant="bordered"
                      classNames={{
                        base: "bg-black border-neutral-700 w-full",
                        pre: "text-white font-mono",
                        copyButton: "!text-white !bg-neutral-800 hover:!bg-neutral-700 !opacity-100"
                      }}
                    >
                      branchbouncer --help
                    </Snippet>
                  </div>
                </div>
                <h3 className="text-white font-semibold mt-8 text-xl">Examples</h3>
                <div className="space-y-4 mt-4">
                  <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-5">
                    <h4 className="text-white font-medium mb-3">Example 1: Display Help</h4>
                    <Snippet
                      symbol="$"
                      color="default"
                      variant="bordered"
                      classNames={{
                        base: "bg-black border-neutral-700 w-full",
                        pre: "text-white font-mono text-sm",
                        copyButton: "!text-white !bg-neutral-800 hover:!bg-neutral-700 !opacity-100"
                      }}
                    >
                      npx branchbouncer help
                    </Snippet>
                    <p className="text-neutral-400 text-sm mt-3">
                      Show the complete help message with all commands and their descriptions.
                    </p>
                  </div>
                  <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-5">
                    <h4 className="text-white font-medium mb-3">Example 2: Quick Help</h4>
                    <Snippet
                      symbol="$"
                      color="default"
                      variant="bordered"
                      classNames={{
                        base: "bg-black border-neutral-700 w-full",
                        pre: "text-white font-mono text-sm",
                        copyButton: "!text-white !bg-neutral-800 hover:!bg-neutral-700 !opacity-100"
                      }}
                    >
                      npx branchbouncer -h
                    </Snippet>
                    <p className="text-neutral-400 text-sm mt-3">
                      Same help output using the traditional <code className="bg-neutral-800 px-1 py-0.5 rounded text-xs">-h</code> flag. The standard convention across CLI tools.
                    </p>
                  </div>
                </div>
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 mt-8">
                  <h3 className="text-white font-semibold mb-4 text-xl">Complete Help Output</h3>
                  <div className="bg-black border border-neutral-700 rounded p-4">
                    <pre className="text-neutral-300 text-sm overflow-x-auto leading-relaxed">
{`BranchBouncer CLI - Save your repos from spam

Usage:
  branchbouncer [command]

Commands:
  init, -i, --init                            Set up BranchBouncer configuration (default)
  protect, -p, --protect                      Enable hard mode branch protection on GitHub
  remove-protection, -rm, --remove-protection Remove all BranchBouncer files
  extra                                       Checkout paintnclick.art
  help, -h, --help                            Show this help message

Examples:
  branchbouncer                  # Run initial setup
  branchbouncer init             # Run initial setup
  branchbouncer -i               # Run initial setup (alias)
  branchbouncer protect          # Enable branch protection later
  branchbouncer -p               # Enable branch protection (alias)
  branchbouncer remove-protection # Remove BranchBouncer files
  branchbouncer -rm              # Remove BranchBouncer files (alias)
  branchbouncer extra            # Checkout paintnclick.art
  branchbouncer help             # Show help
  branchbouncer -h               # Show help (alias)

For more information, visit: https://github.com/SidhantCodes/branchbouncer`}
                    </pre>
                  </div>
                </div>
                <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-6 mt-6">
                  <h3 className="text-blue-400 font-semibold mb-3">💡 Pro Tip</h3>
                  <p className="text-neutral-300 leading-relaxed">
                    Add <code className="bg-neutral-800 px-2 py-1 rounded">--help</code> or <code className="bg-neutral-800 px-2 py-1 rounded">-h</code> after any command to get specific help for that command. For example: <code className="bg-neutral-800 px-2 py-1 rounded">branchbouncer init --help</code> (when supported in future versions).
                  </p>
                </div>
              </div>
            )}

            {/* Rules */}
            {activeSection === "rules" && (
              <div className="space-y-6">
                <h1 className="text-4xl font-bold text-white mb-6">Rules</h1>
                <p className="text-neutral-300 text-lg">
                  Configure protection rules to secure your repository.
                </p>
              </div>
            )}

            {activeSection === "account-age" && (
              <div className="space-y-6">
                <h1 className="text-4xl font-bold text-white mb-6">
                  Account Age Rule
                </h1>
                <p className="text-neutral-300">
                  Require contributors to have GitHub accounts older than a
                  specified number of days.
                </p>
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 my-6">
                  <h3 className="text-white font-semibold mb-3">
                    Configuration
                  </h3>
                  <pre className="text-neutral-300 text-sm">
                    {`rules:
  accountAge:
    enabled: true
    minDays: 730  # 2 years`}
                  </pre>
                </div>
                <p className="text-neutral-300">
                  <strong className="text-white">Recommended:</strong> 730 days
                  (2 years) to prevent spam from new accounts.
                </p>
              </div>
            )}

            {activeSection === "pr-changes" && (
              <div className="space-y-6">
                <h1 className="text-4xl font-bold text-white mb-6">
                  PR Changes Rule
                </h1>
                <p className="text-neutral-300">
                  Limit the maximum number of changes (additions + deletions) in
                  a single PR.
                </p>
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 my-6">
                  <h3 className="text-white font-semibold mb-3">
                    Configuration
                  </h3>
                  <pre className="text-neutral-300 text-sm">
                    {`rules:
  prChanges:
    enabled: true
    maxChanges: 500`}
                  </pre>
                </div>
                <p className="text-neutral-300">
                  <strong className="text-white">Tip:</strong> Prevents massive
                  PRs that are hard to review and may contain hidden malicious
                  code.
                </p>
              </div>
            )}

            {activeSection === "repository-count" && (
              <div className="space-y-6">
                <h1 className="text-4xl font-bold text-white mb-6">
                  Repository Count Rule
                </h1>
                <p className="text-neutral-300">
                  Require contributors to have a minimum number of public
                  repositories.
                </p>
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 my-6">
                  <h3 className="text-white font-semibold mb-3">
                    Configuration
                  </h3>
                  <pre className="text-neutral-300 text-sm">
                    {`rules:
  repoCount:
    enabled: true
    minRepos: 3`}
                  </pre>
                </div>
                <p className="text-neutral-300">
                  Helps ensure contributors have some GitHub activity and aren&apos;t
                  just spam accounts.
                </p>
              </div>
            )}

            {activeSection === "protected-paths" && (
              <div className="space-y-6">
                <h1 className="text-4xl font-bold text-white mb-6">
                  Protected Paths Rule
                </h1>
                <p className="text-neutral-300">
                  Block changes to critical files and directories.
                </p>
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 my-6">
                  <h3 className="text-white font-semibold mb-3">
                    Configuration
                  </h3>
                  <pre className="text-neutral-300 text-sm">
                    {`rules:
  protectedPaths:
    enabled: true
    paths:
      - package.json
      - .github/workflows/
      - .env`}
                  </pre>
                </div>
                <p className="text-neutral-300">
                  <strong className="text-white">Use case:</strong> Protect
                  sensitive configuration files, workflow definitions, and
                  dependency manifests.
                </p>
              </div>
            )}


            {/* API Reference */}
            {activeSection === "api-reference" && (
              <div className="space-y-6">
                <h1 className="text-4xl font-bold text-white mb-6">
                  API Reference
                </h1>
                <p className="text-neutral-300">
                  Configuration file schema and all available options.
                </p>
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 my-6">
                  <h3 className="text-white font-semibold mb-3">
                    branchbouncer.yml Schema
                  </h3>
                  <pre className="text-neutral-300 text-sm overflow-x-auto">
                    {`version: 1
rules:
  accountAge:
    enabled: boolean
    minDays: number
  prChanges:
    enabled: boolean
    maxChanges: number
  repoCount:
    enabled: boolean
    minRepos: number
  protectedPaths:
    enabled: boolean
    paths: string[]`}
                  </pre>
                </div>
              </div>
            )}

            {/* Contributing */}
            {activeSection === "contributing" && (
              <div className="space-y-6">
                <h1 className="text-4xl font-bold text-white mb-6">
                  Contributing
                </h1>
                <p className="text-neutral-300">
                  We welcome contributions to BranchBouncer! Here&apos;s how you can
                  help:
                </p>
                <div className="space-y-4 mt-6 text-neutral-300">
                  <div>
                    <h3 className="text-white font-semibold mb-2">
                      Report Issues
                    </h3>
                    <p>
                      Found a bug? Open an issue on{" "}
                      <a
                        href="https://github.com/SidhantCodes/branchbouncer"
                        className="text-blue-400 hover:underline"
                      >
                        GitHub
                      </a>
                    </p>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">
                      Submit Pull Requests
                    </h3>
                    <p>Have an improvement? Fork the repo and submit a PR!</p>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">
                      Improve Documentation
                    </h3>
                    <p>
                      Help others by improving or translating our documentation
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
