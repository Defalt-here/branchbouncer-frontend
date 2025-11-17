'use client'
import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'motion/react';

interface TextEncryptedProps {
  text: string;
  interval?: number;
  className?: string;
}

export const TextEncrypted: React.FC<TextEncryptedProps> = ({
  text,
  interval = 50,
  className = "",
}) => {
  const [outputText, setOutputText] = useState("");
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Initialize on client side only to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isInView || !mounted) return;
    
    let revealTimerRef: NodeJS.Timeout | null = null;
    
    revealTimerRef = setInterval(() => {
      setOutputText((prev) => {
        if (prev.length < text.length) {
          return text.slice(0, prev.length + 1);
        }
        if (revealTimerRef) clearInterval(revealTimerRef);
        return prev;
      });
    }, interval);

    return () => {
      if (revealTimerRef) clearInterval(revealTimerRef);
    };
  }, [text, interval, isInView, mounted]);

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return <span ref={ref} className={className}>{text}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {outputText}
    </span>
  );
};