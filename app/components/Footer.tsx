'use client'
import React from 'react';
import { IconBrandGithub } from '@tabler/icons-react';

export const Footer = () => {
  return (
    <footer className="relative w-full border-t border-neutral-800 bg-black backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Made with love message */}
          <p className="text-neutral-300 text-sm md:text-base text-center">
            Made with <span className="text-red-500 animate-pulse">♥</span> by{' '}
            <a
              href="https://github.com/SidhantCodes"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 hover:text-yellow-300 underline underline-offset-4 decoration-yellow-400/50 hover:decoration-yellow-300 transition-colors duration-200 font-medium"
            >
              Sidhant
            </a>
            {' '}and{' '}
            <a
              href="https://github.com/Defalt-here"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 hover:text-yellow-300 underline underline-offset-4 decoration-yellow-400/50 hover:decoration-yellow-300 transition-colors duration-200 font-medium"
            >
              Aditya
            </a>
          </p>

          {/* GitHub project link */}
          <div className="flex items-center space-x-2">
            <a
              href="https://github.com/SidhantCodes/branchbouncer/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-neutral-400 hover:text-yellow-400 transition-colors duration-200 group"
            >
              <IconBrandGithub className="w-5 h-5" />
              <span className="text-sm underline underline-offset-4 decoration-neutral-400/50 group-hover:decoration-yellow-400 group-hover:text-yellow-400 transition-all duration-200">
                View on GitHub
              </span>
            </a>
          </div>

          {/* Copyright or additional info */}
          <p className="text-neutral-500 text-xs">
            © {new Date().getFullYear()} BranchBouncer. Open source protection.
          </p>
        </div>
      </div>
    </footer>
  );
};
